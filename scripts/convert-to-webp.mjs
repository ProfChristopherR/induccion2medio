import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BRAIN_DIR = 'C:\\Users\\Dairo\\.gemini\\antigravity\\brain\\8a38132a-5b7b-4ccf-bc84-bd8c54da46cb'
const OUT_DIR = 'C:\\Users\\Dairo\\OneDrive\\Documents\\Proyectos\\LiceoSN\\induccion-geogo\\public\\media'

const IMAGES = [
  { src: 'hero_overview_1794420447743.jpg', out: 'hero_overview.webp' },
  { src: 'grade_1_geogo_1794421465223.jpg', out: 'grade_1_geogo.webp' },
  { src: 'grade_2_pcb_3d_1794421526068.jpg', out: 'grade_2_pcb_3d.webp' },
  { src: 'grade_3_drones_1794421565940.jpg', out: 'grade_3_drones.webp' },
  { src: 'grade_4_geomatica_1794421595482.jpg', out: 'grade_4_geomatica.webp' },
  { src: 'proto_vs_pcb_1794421633677.jpg', out: 'proto_vs_pcb.webp' },
  { src: 'manufacturing_process_1794421674143.jpg', out: 'manufacturing_process.webp' },
  { src: 'drone_exploded_1794421788867.jpg', out: 'drone_exploded.webp' },
  { src: 'thermal_human_sar_1794421830763.jpg', out: 'thermal_human_sar.webp' },
  { src: 'ndvi_agriculture_1794421886172.jpg', out: 'ndvi_agriculture.webp' },
  { src: 'photogrammetry_3d_1794421941054.jpg', out: 'photogrammetry_3d.webp' }
]

function findBrowser() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ]
  return candidates.find((p) => existsSync(p))
}

async function getPort(proc) {
  return new Promise((resolve, reject) => {
    let text = ''
    const timer = setTimeout(() => reject(new Error('Timeout starting browser')), 15000)
    proc.stderr.on('data', (chunk) => {
      text += chunk
      const m = text.match(/DevTools listening on ws:\/\/[^:]+:(\d+)\//)
      if (m) {
        clearTimeout(timer)
        resolve(Number(m[1]))
      }
    })
  })
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const bin = findBrowser()
  if (!bin) throw new Error('No browser found')
  const profile = mkdtempSync(join(tmpdir(), 'webp-conv-'))
  const proc = spawn(bin, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--do-not-de-elevate',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    'about:blank'
  ])

  try {
    const port = await getPort(proc)
    const page = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json()
    const ws = new WebSocket(page.webSocketDebuggerUrl)
    await new Promise((r) => (ws.onopen = r))

    let id = 0
    const pending = new Map()
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg)
        pending.delete(msg.id)
      }
    }
    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const cid = ++id
        pending.set(cid, resolve)
        ws.send(JSON.stringify({ id: cid, method, params }))
      })

    await send('Runtime.enable')

    for (const item of IMAGES) {
      const fullPath = join(BRAIN_DIR, item.src)
      if (!existsSync(fullPath)) {
        console.warn('Missing:', fullPath)
        continue
      }
      const b64 = readFileSync(fullPath).toString('base64')
      const expr = `(async () => {
        const img = new Image();
        img.src = "data:image/jpeg;base64,${b64}";
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/webp", 0.90);
        return dataUrl.split(",")[1];
      })()`

      const reply = await send('Runtime.evaluate', {
        expression: expr,
        awaitPromise: true,
        returnByValue: true
      })
      const webpBase64 = reply.result?.result?.value
      if (webpBase64) {
        const outPath = join(OUT_DIR, item.out)
        writeFileSync(outPath, Buffer.from(webpBase64, 'base64'))
        console.log(`Converted ${item.src} -> ${item.out}`)
      }
    }
  } finally {
    proc.kill('SIGKILL')
    try {
      rmSync(profile, { recursive: true, force: true })
    } catch {}
  }
}

main()
