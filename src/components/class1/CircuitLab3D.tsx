import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Flame,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Camera,
  GitCommit,
  GitFork,
  Gauge,
  Cpu
} from 'lucide-react'

export type CircuitScenario =
  | 'normal'
  | 'series'
  | 'parallel'
  | 'potentiometer'
  | 'transistor'
  | 'reversed'
  | 'short-circuit'

type CameraPreset = 'overview' | 'resistor-zoom' | 'led-zoom' | 'top-down'

interface ResistorBands {
  b1: { name: string; hex: string }
  b2: { name: string; hex: string }
  mult: { name: string; hex: string }
  tol: { name: string; hex: string }
}

const getResistorBands = (ohms: number): ResistorBands => {
  if (ohms <= 120) {
    return {
      b1: { name: 'Marrón (1)', hex: '#8B4513' },
      b2: { name: 'Negro (0)', hex: '#111827' },
      mult: { name: 'Marrón (×10)', hex: '#8B4513' },
      tol: { name: 'Oro (±5%)', hex: '#D4AF37' }
    }
  }
  if (ohms <= 260) {
    return {
      b1: { name: 'Rojo (2)', hex: '#DC2626' },
      b2: { name: 'Rojo (2)', hex: '#DC2626' },
      mult: { name: 'Marrón (×10)', hex: '#8B4513' },
      tol: { name: 'Oro (±5%)', hex: '#D4AF37' }
    }
  }
  if (ohms <= 400) {
    return {
      b1: { name: 'Naranja (3)', hex: '#F97316' },
      b2: { name: 'Naranja (3)', hex: '#F97316' },
      mult: { name: 'Marrón (×10)', hex: '#8B4513' },
      tol: { name: 'Oro (±5%)', hex: '#D4AF37' }
    }
  }
  if (ohms <= 650) {
    return {
      b1: { name: 'Amarillo (4)', hex: '#EAB308' },
      b2: { name: 'Violeta (7)', hex: '#7C3AED' },
      mult: { name: 'Marrón (×10)', hex: '#8B4513' },
      tol: { name: 'Oro (±5%)', hex: '#D4AF37' }
    }
  }
  return {
    b1: { name: 'Marrón (1)', hex: '#8B4513' },
    b2: { name: 'Negro (0)', hex: '#111827' },
    mult: { name: 'Rojo (×100)', hex: '#DC2626' },
    tol: { name: 'Oro (±5%)', hex: '#D4AF37' }
  }
}

export const CircuitLab3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const dynamicGroupRef = useRef<THREE.Group | null>(null)
  const electronsMainRef = useRef<THREE.Mesh[]>([])
  const electronsBranchBRef = useRef<THREE.Mesh[]>([])
  const curveMainRef = useRef<THREE.CatmullRomCurve3 | null>(null)
  const curveBranchBRef = useRef<THREE.CatmullRomCurve3 | null>(null)
  const sparksGroupRef = useRef<THREE.Group | null>(null)
  const ledDieRef = useRef<THREE.Mesh | null>(null)
  const ledLightRef = useRef<THREE.PointLight | null>(null)
  const cameraTargetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 78, 108))
  const cameraLookAtTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 6, 2))
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 6, 2))

  // Interactive State
  const [scenario, setScenario] = useState<CircuitScenario>('normal')
  const [voltage, setVoltage] = useState<number>(9)
  const [resistance, setResistance] = useState<number>(330)
  const [ledColor, setLedColor] = useState<'green' | 'red' | 'blue' | 'amber'>('green')
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview')

  // Live refs for animation loop
  const stateRef = useRef({
    scenario,
    currentMilliAmps: 27.2,
    isBurned: false
  })

  // Effective Resistance & Current (Ohm's Law: I = (V - V_led) / R, simplified for clear classroom teaching I = V / R_eq)
  const effectiveResistance =
    scenario === 'short-circuit'
      ? 20 // Internal wire/battery resistance causing lethal 450mA surge
      : scenario === 'series'
      ? resistance * 2
      : scenario === 'parallel'
      ? Math.round(resistance / 2)
      : resistance

  const currentAmps = scenario === 'reversed' ? 0 : voltage / effectiveResistance
  const currentMilliAmps = currentAmps * 1000
  const isBurned = scenario === 'short-circuit' || currentMilliAmps > 45

  stateRef.current = {
    scenario,
    currentMilliAmps,
    isBurned
  }

  const bands = getResistorBands(resistance)

  // Camera Preset Updater
  const handleCameraPreset = (preset: CameraPreset) => {
    setCameraPreset(preset)
    if (preset === 'overview') {
      cameraTargetPosRef.current.set(0, 78, 108)
      cameraLookAtTargetRef.current.set(0, 6, 2)
    } else if (preset === 'resistor-zoom') {
      cameraTargetPosRef.current.set(-6, 36, 44)
      cameraLookAtTargetRef.current.set(-4, 9, -2)
    } else if (preset === 'led-zoom') {
      cameraTargetPosRef.current.set(28, 34, 42)
      cameraLookAtTargetRef.current.set(24, 12, 2)
    } else if (preset === 'top-down') {
      cameraTargetPosRef.current.set(0, 118, 12)
      cameraLookAtTargetRef.current.set(0, 6, 0)
    }
  }

  // 1. Initialize Base Three.js Studio Scene (Breadboard, 9V Battery, Multimeter, Lighting)
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight || 440

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b1120) // Deep Apple Pro dark studio slate
    scene.fog = new THREE.FogExp2(0x0b1120, 0.0022)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000)
    camera.position.set(0, 78, 108)
    camera.lookAt(0, 6, 2)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    // Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.35)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(45, 95, 65)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1)
    rimLight.position.set(-70, 50, -50)
    scene.add(rimLight)

    // Studio Lab Mat (Anodized Dark Surface with Grid)
    const matGeom = new THREE.PlaneGeometry(320, 220)
    const matMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.75,
      metalness: 0.15
    })
    const matMesh = new THREE.Mesh(matGeom, matMaterial)
    matMesh.rotation.x = -Math.PI / 2
    matMesh.receiveShadow = true
    scene.add(matMesh)

    const gridHelper = new THREE.GridHelper(240, 24, 0x1e293b, 0x1e293b)
    gridHelper.position.y = 0.05
    scene.add(gridHelper)

    // ================= STATIC BENCH HARDWARE =================
    const benchGroup = new THREE.Group()
    scene.add(benchGroup)

    // A. Realistic White Solderless Breadboard (MB-102)
    const bbBodyGeom = new THREE.BoxGeometry(96, 6.5, 62)
    const bbBodyMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.28,
      metalness: 0.05
    })
    const bbBody = new THREE.Mesh(bbBodyGeom, bbBodyMat)
    bbBody.position.set(2, 3.25, 2)
    bbBody.castShadow = true
    bbBody.receiveShadow = true
    benchGroup.add(bbBody)

    // Central DIP IC Channel Trench on Breadboard
    const trenchGeom = new THREE.BoxGeometry(96.2, 1.4, 5)
    const trenchMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 })
    const trench = new THREE.Mesh(trenchGeom, trenchMat)
    trench.position.set(2, 6.0, 2)
    benchGroup.add(trench)

    // Power Rails (+ Red and - Blue stripes)
    const railRed = new THREE.Mesh(
      new THREE.BoxGeometry(88, 0.15, 1.4),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    )
    railRed.position.set(2, 6.55, -23)
    benchGroup.add(railRed)

    const railBlue = new THREE.Mesh(
      new THREE.BoxGeometry(88, 0.15, 1.4),
      new THREE.MeshBasicMaterial({ color: 0x2563eb })
    )
    railBlue.position.set(2, 6.55, 27)
    benchGroup.add(railBlue)

    // Breadboard Tie-Point Pin Matrix (InstancedMesh for crisp realism & 60fps performance)
    const holeGeom = new THREE.BoxGeometry(1.3, 0.2, 1.3)
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x334155 })
    const cols = 22
    const rows = [-20, -14, -10, -6, -2, 6, 10, 14, 18, 24]
    const holeInstanced = new THREE.InstancedMesh(holeGeom, holeMat, cols * rows.length)
    const dummy = new THREE.Object3D()
    let instanceIdx = 0
    for (let c = 0; c < cols; c++) {
      const hx = -38 + c * 3.8
      for (let r = 0; r < rows.length; r++) {
        dummy.position.set(hx, 6.55, rows[r])
        dummy.updateMatrix()
        holeInstanced.setMatrixAt(instanceIdx++, dummy.matrix)
      }
    }
    benchGroup.add(holeInstanced)

    // B. Realistic 9V Industrial Battery (Copper-Top + Matte Black Body)
    const battGroup = new THREE.Group()
    battGroup.position.set(-64, 0, 2)
    benchGroup.add(battGroup)

    const battLower = new THREE.Mesh(
      new THREE.BoxGeometry(22, 23, 15),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.2 })
    )
    battLower.position.y = 11.5
    battLower.castShadow = true
    battGroup.add(battLower)

    const battCopperTop = new THREE.Mesh(
      new THREE.BoxGeometry(22.1, 11, 15.1),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.75 })
    )
    battCopperTop.position.y = 28.5
    battCopperTop.castShadow = true
    battGroup.add(battCopperTop)

    // 9V Snap Terminals (+ and -)
    const snapPos = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.2, 3.5, 20),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
    )
    snapPos.position.set(0, 35.5, -3.5)
    battGroup.add(snapPos)

    const snapNeg = new THREE.Mesh(
      new THREE.CylinderGeometry(3.1, 3.1, 3.5, 6),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
    )
    snapNeg.position.set(0, 35.5, 3.5)
    battGroup.add(snapNeg)

    // Red (+) & Black (-) Braided Battery Leads into Breadboard Rails
    const redLeadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-64, 36.5, -1.5),
      new THREE.Vector3(-50, 28, -18),
      new THREE.Vector3(-38, 6.6, -20)
    ])
    const redLeadMesh = new THREE.Mesh(
      new THREE.TubeGeometry(redLeadCurve, 32, 0.9, 12, false),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 })
    )
    benchGroup.add(redLeadMesh)

    const blackLeadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-64, 36.5, 5.5),
      new THREE.Vector3(-50, 24, 20),
      new THREE.Vector3(-38, 6.6, 24)
    ])
    const blackLeadMesh = new THREE.Mesh(
      new THREE.TubeGeometry(blackLeadCurve, 32, 0.9, 12, false),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    )
    benchGroup.add(blackLeadMesh)

    // C. Digital Multimeter (Right side of Bench)
    const dmmGroup = new THREE.Group()
    dmmGroup.position.set(72, 0, 2)
    dmmGroup.rotation.y = -0.18
    benchGroup.add(dmmGroup)

    // Yellow Holster + Dark Inner Body
    const dmmHolster = new THREE.Mesh(
      new THREE.BoxGeometry(30, 9, 46),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 })
    )
    dmmHolster.position.y = 4.5
    dmmHolster.castShadow = true
    dmmGroup.add(dmmHolster)

    const dmmFace = new THREE.Mesh(
      new THREE.BoxGeometry(26, 1.5, 42),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35 })
    )
    dmmFace.position.y = 9.2
    dmmGroup.add(dmmFace)

    const dmmScreen = new THREE.Mesh(
      new THREE.BoxGeometry(21, 0.4, 13),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    )
    dmmScreen.position.set(0, 10.1, -11)
    dmmGroup.add(dmmScreen)

    const dmmDial = new THREE.Mesh(
      new THREE.CylinderGeometry(7.5, 7.5, 2.2, 28),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.5 })
    )
    dmmDial.position.set(0, 10.2, 5)
    dmmGroup.add(dmmDial)

    // Dynamic Group (Resistors, Potentiometer, Transistor, LED, Jumpers, Electrons)
    const dynamicGroup = new THREE.Group()
    scene.add(dynamicGroup)
    dynamicGroupRef.current = dynamicGroup

    // Sparks & Smoke Group
    const sparksGroup = new THREE.Group()
    scene.add(sparksGroup)
    sparksGroupRef.current = sparksGroup

    // Mouse Orbit Controls
    let isDragging = false
    let prevX = 0
    let prevY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevX = e.clientX
      prevY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      scene.rotation.y = Math.max(-0.85, Math.min(0.85, scene.rotation.y + dx * 0.007))
      scene.rotation.x = Math.max(-0.25, Math.min(0.35, scene.rotation.x + dy * 0.005))
      prevX = e.clientX
      prevY = e.clientY
    }

    const onMouseUp = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Animation Loop
    let animId: number
    let clock = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      clock += 0.014

      // Smooth Camera Glide to Active Preset
      if (cameraRef.current) {
        cameraRef.current.position.lerp(cameraTargetPosRef.current, 0.07)
        currentLookAtRef.current.lerp(cameraLookAtTargetRef.current, 0.07)
        cameraRef.current.lookAt(currentLookAtRef.current)
      }

      const { currentMilliAmps: mA, isBurned: burned, scenario: sc } = stateRef.current
      const speed = burned ? 1.8 : Math.min(1.3, Math.max(0.12, mA / 28))

      // Animate Main Electron Stream
      if (curveMainRef.current && electronsMainRef.current.length > 0) {
        electronsMainRef.current.forEach((el, idx) => {
          if (mA <= 0) {
            el.visible = false
          } else {
            el.visible = true
            const t = (clock * speed * 0.22 + idx / electronsMainRef.current.length) % 1
            el.position.copy(curveMainRef.current!.getPointAt(t))
          }
        })
      }

      // Animate Parallel Branch B Electron Stream (when in 'parallel' scenario)
      if (curveBranchBRef.current && electronsBranchBRef.current.length > 0) {
        electronsBranchBRef.current.forEach((el, idx) => {
          if (sc !== 'parallel' || mA <= 0) {
            el.visible = false
          } else {
            el.visible = true
            const t = (clock * speed * 0.22 + idx / electronsBranchBRef.current.length) % 1
            el.position.copy(curveBranchBRef.current!.getPointAt(t))
          }
        })
      }

      // Animate Sparks & Smoke if Overloaded / Short-Circuit
      if (sparksGroupRef.current) {
        sparksGroupRef.current.visible = burned
        if (burned) {
          sparksGroupRef.current.children.forEach((p, idx) => {
            p.position.y += 0.35 + (idx % 3) * 0.15
            p.position.x += Math.sin(clock * 8 + idx) * 0.22
            p.position.z += Math.cos(clock * 7 + idx) * 0.22
            if (p.position.y > 32) {
              p.position.set(24 + (Math.random() - 0.5) * 3, 12, -2 + (Math.random() - 0.5) * 3)
            }
          })
        }
      }

      // Pulse LED Die
      if (ledDieRef.current && !burned && mA > 0) {
        const s = 1 + Math.sin(clock * 6) * 0.08
        ledDieRef.current.scale.set(s, s, s)
      }

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight || 440
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mousedown', onMouseDown)
      renderer.dispose()
    }
  }, [])

  // 2. Rebuild Dynamic 3D Components on Breadboard whenever Scenario, Resistance, Voltage, or LED Color changes!
  useEffect(() => {
    if (!dynamicGroupRef.current || !sparksGroupRef.current) return
    const group = dynamicGroupRef.current

    // Clean previous dynamic meshes
    while (group.children.length > 0) {
      const child = group.children[0]
      group.remove(child)
    }
    electronsMainRef.current = []
    electronsBranchBRef.current = []
    curveBranchBRef.current = null

    // Helper: Build a Realistic 3D Axial Resistor with 4 Color Bands & Bent Leads
    const createAxialResistor3D = (xCenter: number, zCenter: number, ohmsVal: number, span = 18) => {
      const resGroup = new THREE.Group()
      const b = getResistorBands(ohmsVal)
      const yHeight = 10.2

      // Metal Axial Lead (Bent U-shape plugging into breadboard)
      const leadPoints = [
        new THREE.Vector3(xCenter - span / 2, 6.2, zCenter),
        new THREE.Vector3(xCenter - span / 2, yHeight, zCenter),
        new THREE.Vector3(xCenter + span / 2, yHeight, zCenter),
        new THREE.Vector3(xCenter + span / 2, 6.2, zCenter)
      ]
      const leadCurve = new THREE.CatmullRomCurve3(leadPoints, false, 'catmullrom', 0.08)
      const leadMesh = new THREE.Mesh(
        new THREE.TubeGeometry(leadCurve, 28, 0.42, 10, false),
        new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 })
      )
      resGroup.add(leadMesh)

      // Ceramic Axial Body (Beige Carbon-Film Cylinder + End Bulbs)
      const bodyLen = 10.5
      const bodyRadius = 2.15
      const ceramicMat = new THREE.MeshStandardMaterial({
        color: 0xe6d2b5,
        roughness: 0.35,
        metalness: 0.05
      })

      const centerCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(bodyRadius * 0.92, bodyRadius * 0.92, bodyLen, 24),
        ceramicMat
      )
      centerCyl.rotation.z = Math.PI / 2
      centerCyl.position.set(xCenter, yHeight, zCenter)
      centerCyl.castShadow = true
      resGroup.add(centerCyl)

      // Left & Right Bulbous End Caps (Classic Barbell Resistor Shape)
      const leftCap = new THREE.Mesh(new THREE.SphereGeometry(bodyRadius, 20, 20), ceramicMat)
      leftCap.scale.set(1.1, 1, 1)
      leftCap.position.set(xCenter - bodyLen * 0.38, yHeight, zCenter)
      resGroup.add(leftCap)

      const rightCap = new THREE.Mesh(new THREE.SphereGeometry(bodyRadius, 20, 20), ceramicMat)
      rightCap.scale.set(1.1, 1, 1)
      rightCap.position.set(xCenter + bodyLen * 0.38, yHeight, zCenter)
      resGroup.add(rightCap)

      // 4 Color Code Bands around the Ceramic Body
      const bandColors = [b.b1.hex, b.b2.hex, b.mult.hex, b.tol.hex]
      const bandOffsets = [-3.3, -1.2, 0.9, 3.4]
      bandColors.forEach((hex, idx) => {
        const bandMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(bodyRadius * 0.97, bodyRadius * 0.97, 0.95, 24),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(hex),
            roughness: idx === 3 ? 0.2 : 0.3,
            metalness: idx === 3 ? 0.85 : 0.15
          })
        )
        bandMesh.rotation.z = Math.PI / 2
        bandMesh.position.set(xCenter + bandOffsets[idx], yHeight, zCenter)
        resGroup.add(bandMesh)
      })

      return resGroup
    }

    // Helper: Build a 3D Jumper Wire on Breadboard
    const createJumperWire = (p1: [number, number, number], p2: [number, number, number], hexColor: number) => {
      const midY = Math.max(p1[1], p2[1]) + 2.8
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(p1[0], p1[1], p1[2]),
        new THREE.Vector3((p1[0] + p2[0]) / 2, midY, (p1[2] + p2[2]) / 2),
        new THREE.Vector3(p2[0], p2[1], p2[2])
      ])
      return new THREE.Mesh(
        new THREE.TubeGeometry(curve, 20, 0.55, 10, false),
        new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.35 })
      )
    }

    // ================= PLACE SCENARIO-SPECIFIC 3D COMPONENTS =================
    // Jumper from + Rail (-38, 6.5, -20) to Component Input (-26, 6.5, -6)
    group.add(createJumperWire([-34, 6.5, -20], [-26, 6.5, -6], 0xef4444))

    if (scenario === 'normal') {
      // 1 Axial Resistor R1 + Jumper to LED
      group.add(createAxialResistor3D(-14, -6, resistance, 22))
      group.add(createJumperWire([-3, 6.5, -6], [21, 6.5, -6], 0xf97316))
    } else if (scenario === 'series') {
      // TWO Axial Resistors in Series (R1 + R2)
      group.add(createAxialResistor3D(-17, -6, resistance, 16))
      group.add(createJumperWire([-9, 6.5, -6], [-5, 6.5, -6], 0xfacc15))
      group.add(createAxialResistor3D(3, -6, resistance, 16))
      group.add(createJumperWire([11, 6.5, -6], [21, 6.5, -6], 0xf97316))
    } else if (scenario === 'parallel') {
      // TWO Axial Resistors in Parallel Rows (R1 at z = -10, R2 at z = +2)
      group.add(createJumperWire([-26, 6.5, -6], [-22, 6.5, -10], 0xef4444))
      group.add(createJumperWire([-26, 6.5, -6], [-22, 6.5, 2], 0xef4444))
      group.add(createAxialResistor3D(-10, -10, resistance, 20))
      group.add(createAxialResistor3D(-10, 2, resistance, 20))
      group.add(createJumperWire([0, 6.5, -10], [10, 6.5, -6], 0x38bdf8))
      group.add(createJumperWire([0, 6.5, 2], [10, 6.5, -6], 0x38bdf8))
      group.add(createJumperWire([10, 6.5, -6], [21, 6.5, -6], 0xf97316))
    } else if (scenario === 'potentiometer') {
      // 3-Pin Rotary Potentiometer + Fixed Protection Resistor
      const potGroup = new THREE.Group()
      potGroup.position.set(-12, 6.5, -6)

      // Blue Potentiometer Box Base
      const potBase = new THREE.Mesh(
        new THREE.BoxGeometry(11, 6, 11),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
      )
      potBase.position.y = 3.5
      potBase.castShadow = true
      potGroup.add(potBase)

      // Knurled Metallic Rotary Knob (rotates based on resistance!)
      const knobGroup = new THREE.Group()
      knobGroup.position.y = 8.5
      const normAngle = ((resistance - 100) / 900) * Math.PI * 1.4 - Math.PI * 0.7
      knobGroup.rotation.y = -normAngle

      const knobCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(3.8, 3.8, 6, 24),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 })
      )
      knobGroup.add(knobCyl)

      const indicatorMarker = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 6.3, 3.6),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      )
      indicatorMarker.position.z = -1.2
      knobGroup.add(indicatorMarker)

      potGroup.add(knobGroup)
      group.add(potGroup)
      group.add(createJumperWire([-5, 6.5, -6], [21, 6.5, -6], 0xf97316))
    } else if (scenario === 'transistor') {
      // TO-92 NPN Transistor (2N2222) + Base Resistor
      group.add(createAxialResistor3D(-16, -6, resistance, 16))
      const transGroup = new THREE.Group()
      transGroup.position.set(2, 6.5, -6)

      // TO-92 Half-Cylinder Black Epoxy Body
      const to92Geom = new THREE.CylinderGeometry(3.4, 3.4, 6.5, 20, 1, false, 0, Math.PI)
      const to92Mat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.25 })
      const to92 = new THREE.Mesh(to92Geom, to92Mat)
      to92.position.y = 6.2
      to92.castShadow = true
      transGroup.add(to92)

      // 3 Metal Transistor Pins (E, B, C)
      ;[-2.2, 0, 2.2].forEach((px) => {
        const pin = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.32, 5, 8),
          new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9 })
        )
        pin.position.set(px, 2.2, 0)
        transGroup.add(pin)
      })
      group.add(transGroup)
      group.add(createJumperWire([6, 6.5, -6], [21, 6.5, -6], 0x10b981))
    } else if (scenario === 'reversed') {
      // 1 Axial Resistor + Reversed LED
      group.add(createAxialResistor3D(-14, -6, resistance, 22))
      group.add(createJumperWire([-3, 6.5, -6], [21, 6.5, -6], 0xf97316))

      // Glowing Red Diode Block Ring around LED Anode/Cathode inversion
      const blockRing = new THREE.Mesh(
        new THREE.TorusGeometry(6.2, 0.45, 12, 32),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      )
      blockRing.rotation.x = Math.PI / 2
      blockRing.position.set(24, 7.2, -2)
      group.add(blockRing)
    } else if (scenario === 'short-circuit') {
      // NO Resistor! Direct Thick Yellow Short-Circuit Jumper Wire
      group.add(createJumperWire([-26, 6.5, -6], [21, 6.5, -6], 0xeab308))
    }

    // ================= REALISTIC 5MM EPOXY LED ASSEMBLY =================
    const ledGroup = new THREE.Group()
    ledGroup.position.set(24, 6.5, -2)
    if (scenario === 'reversed') {
      ledGroup.rotation.y = Math.PI
    }
    group.add(ledGroup)

    const colorHexMap = {
      green: 0x10b981,
      red: 0xef4444,
      blue: 0x3b82f6,
      amber: 0xf59e0b
    }
    const activeHex = isBurned ? 0x1e293b : colorHexMap[ledColor]

    // LED Metal Legs (Anode & Cathode)
    ;[-2.2, 2.2].forEach((lz) => {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.38, 0.38, 6.5, 10),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
      )
      leg.position.set(0, 3.2, lz)
      ledGroup.add(leg)
    })

    // Internal Cathode Anvil Cup & Semiconductor Die inside LED
    const anvil = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 2.5, 16),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
    )
    anvil.rotation.x = Math.PI
    anvil.position.set(0, 7.8, 0.6)
    ledGroup.add(anvil)

    const dieBrightness = isBurned ? 0 : Math.min(1, currentMilliAmps / 22)
    const ledDie = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 16, 16),
      new THREE.MeshBasicMaterial({
        color: isBurned ? 0xff4500 : activeHex
      })
    )
    ledDie.position.set(0, 8.6, 0)
    ledDie.visible = currentMilliAmps > 0 || isBurned
    ledGroup.add(ledDie)
    ledDieRef.current = ledDie

    // Translucent 5mm Epoxy Cylinder + Hemispherical Dome + Base Flange
    const epoxyMat = new THREE.MeshPhysicalMaterial({
      color: activeHex,
      transparent: true,
      opacity: isBurned ? 0.92 : 0.68,
      roughness: isBurned ? 0.65 : 0.12,
      metalness: 0.05,
      transmission: isBurned ? 0 : 0.45
    })

    const ledFlange = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, 1.2, 28), epoxyMat)
    ledFlange.position.y = 6.0
    ledGroup.add(ledFlange)

    const ledBarrel = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.8, 5.2, 28), epoxyMat)
    ledBarrel.position.y = 9.0
    ledGroup.add(ledBarrel)

    const ledTopDome = new THREE.Mesh(
      new THREE.SphereGeometry(3.8, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2),
      epoxyMat
    )
    ledTopDome.position.y = 11.6
    ledGroup.add(ledTopDome)

    // Dynamic PointLight inside the LED
    const ledLight = new THREE.PointLight(
      isBurned ? 0xff5500 : activeHex,
      isBurned ? 3.5 : dieBrightness * 4.5,
      55
    )
    ledLight.position.set(24, 16, -2)
    group.add(ledLight)
    ledLightRef.current = ledLight

    // Return Jumper from LED Cathode (24, 6.5, 2) to Ground Rail (24, 6.5, 24)
    group.add(createJumperWire([24, 6.5, 2], [24, 6.5, 24], 0x2563eb))

    // ================= ELECTRON STREAM CURVES & SPHERES =================
    const mainPoints =
      scenario === 'parallel'
        ? [
            new THREE.Vector3(-64, 36.5, -1.5),
            new THREE.Vector3(-50, 28, -18),
            new THREE.Vector3(-34, 6.8, -20),
            new THREE.Vector3(-26, 6.8, -6),
            new THREE.Vector3(-22, 6.8, -10),
            new THREE.Vector3(-10, 10.2, -10),
            new THREE.Vector3(0, 6.8, -10),
            new THREE.Vector3(10, 6.8, -6),
            new THREE.Vector3(24, 10, -2),
            new THREE.Vector3(24, 6.8, 24),
            new THREE.Vector3(-38, 6.8, 24),
            new THREE.Vector3(-50, 24, 20),
            new THREE.Vector3(-64, 36.5, 5.5)
          ]
        : [
            new THREE.Vector3(-64, 36.5, -1.5),
            new THREE.Vector3(-50, 28, -18),
            new THREE.Vector3(-34, 6.8, -20),
            new THREE.Vector3(-26, 6.8, -6),
            new THREE.Vector3(-12, 10.2, -6),
            new THREE.Vector3(4, 10.2, -6),
            new THREE.Vector3(24, 10, -2),
            new THREE.Vector3(24, 6.8, 24),
            new THREE.Vector3(-38, 6.8, 24),
            new THREE.Vector3(-50, 24, 20),
            new THREE.Vector3(-64, 36.5, 5.5)
          ]

    curveMainRef.current = new THREE.CatmullRomCurve3(mainPoints)

    const electronGeom = new THREE.SphereGeometry(0.95, 14, 14)
    const electronMat = new THREE.MeshBasicMaterial({
      color: isBurned ? 0xf97316 : 0x38bdf8
    })

    for (let i = 0; i < 38; i++) {
      const m = new THREE.Mesh(electronGeom, electronMat)
      group.add(m)
      electronsMainRef.current.push(m)
    }

    if (scenario === 'parallel') {
      const branchBPoints = [
        new THREE.Vector3(-26, 6.8, -6),
        new THREE.Vector3(-22, 6.8, 2),
        new THREE.Vector3(-10, 10.2, 2),
        new THREE.Vector3(0, 6.8, 2),
        new THREE.Vector3(10, 6.8, -6)
      ]
      curveBranchBRef.current = new THREE.CatmullRomCurve3(branchBPoints)
      for (let i = 0; i < 16; i++) {
        const mb = new THREE.Mesh(electronGeom, electronMat)
        group.add(mb)
        electronsBranchBRef.current.push(mb)
      }
    }

    // Build Sparks & Smoke Particles for Short-Circuit
    const sGroup = sparksGroupRef.current
    while (sGroup.children.length > 0) {
      sGroup.remove(sGroup.children[0])
    }
    for (let i = 0; i < 28; i++) {
      const isSmoke = i % 2 === 0
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(isSmoke ? 1.4 : 0.65, 10, 10),
        new THREE.MeshBasicMaterial({
          color: isSmoke ? 0x64748b : 0xfacc15,
          transparent: true,
          opacity: isSmoke ? 0.55 : 0.95
        })
      )
      pMesh.position.set(
        24 + (Math.random() - 0.5) * 4,
        12 + Math.random() * 16,
        -2 + (Math.random() - 0.5) * 4
      )
      sGroup.add(pMesh)
    }
  }, [scenario, resistance, voltage, ledColor, isBurned, currentMilliAmps])

  const scenarioCards: {
    id: CircuitScenario
    title: string
    subtitle: string
    icon: React.ReactNode
    badge: string
  }[] = [
    {
      id: 'normal',
      title: '1. Circuito Normal',
      subtitle: '1 Resistencia + LED protegido',
      icon: <CheckCircle2 className="size-4 text-emerald-500" />,
      badge: 'Óptimo'
    },
    {
      id: 'series',
      title: '2. En Serie (R1 + R2)',
      subtitle: 'Agrega 2ª resistencia en fila',
      icon: <GitCommit className="size-4 text-blue-500" />,
      badge: 'R × 2'
    },
    {
      id: 'parallel',
      title: '3. En Paralelo (R1 ∥ R2)',
      subtitle: 'Divide la corriente en 2 ramas',
      icon: <GitFork className="size-4 text-indigo-500" />,
      badge: 'R / 2'
    },
    {
      id: 'potentiometer',
      title: '4. Potenciómetro',
      subtitle: 'Resistencia rotatoria variable',
      icon: <Gauge className="size-4 text-cyan-500" />,
      badge: 'Dimmer'
    },
    {
      id: 'transistor',
      title: '5. Transistor NPN',
      subtitle: 'Conmutación electrónica 2N2222',
      icon: <Cpu className="size-4 text-purple-500" />,
      badge: 'Switch'
    },
    {
      id: 'reversed',
      title: '6. LED Invertido',
      subtitle: 'Polaridad inversa (bloquea paso)',
      icon: <RotateCcw className="size-4 text-amber-500" />,
      badge: '0 mA'
    },
    {
      id: 'short-circuit',
      title: '7. Sin Resistencia (0 Ω)',
      subtitle: 'Cable directo ¡Quema el LED!',
      icon: <Flame className="size-4 text-red-500" />,
      badge: '¡Peligro!'
    }
  ]

  return (
    <div className="space-y-5">
      {/* Apple Header & Formula Pill */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            <Zap className="size-3.5" />
            Simulador 3D Interactivo • Ley de Ohm en Tiempo Real
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1.5">
            Laboratorio Virtual de Electrónica: Voltaje, Corriente y Resistencia
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Observa las <strong>resistencias reales con sus bandas de color</strong> en la protoboard y prueba qué ocurre al conectarlas en serie, paralelo o quitarlas.
          </p>
        </div>

        {/* Live Ohm's Law Readout Pill */}
        <div className="apple-glass rounded-2xl px-5 py-3 flex items-center gap-5 shrink-0">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Voltaje (V)</span>
            <span className="font-mono text-lg font-extrabold text-amber-600">{voltage.toFixed(1)} V</span>
          </div>
          <span className="text-slate-300 font-light text-xl">/</span>
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Resistencia Eq.</span>
            <span className="font-mono text-lg font-extrabold text-blue-600">
              {scenario === 'short-circuit' ? '0 Ω' : `${effectiveResistance} Ω`}
            </span>
          </div>
          <span className="text-slate-300 font-light text-xl">=</span>
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Corriente (I)</span>
            <span
              className={`font-mono text-lg font-extrabold ${
                isBurned ? 'text-red-600 animate-pulse' : currentMilliAmps === 0 ? 'text-slate-400' : 'text-emerald-600'
              }`}
            >
              {currentMilliAmps.toFixed(1)} mA
            </span>
          </div>
        </div>
      </div>

      {/* Scenario Selector Bar (7 Interactive Hardware Configurations) */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {scenarioCards.map((sc) => {
          const active = scenario === sc.id
          return (
            <button
              key={sc.id}
              onClick={() => {
                setScenario(sc.id)
                if (sc.id === 'series' || sc.id === 'parallel') {
                  handleCameraPreset('resistor-zoom')
                } else if (sc.id === 'short-circuit' || sc.id === 'reversed') {
                  handleCameraPreset('led-zoom')
                }
              }}
              className={`group relative rounded-2xl p-3 text-left transition-all duration-200 ${
                active
                  ? 'bg-slate-900 text-white shadow-lg ring-2 ring-blue-500/50 -translate-y-0.5'
                  : 'apple-glass hover:bg-white/90 text-slate-800 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                {sc.icon}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    active ? 'bg-white/15 text-white' : 'bg-slate-900/5 text-slate-600'
                  }`}
                >
                  {sc.badge}
                </span>
              </div>
              <div className="text-xs font-bold leading-snug">{sc.title}</div>
              <div className={`text-[11px] mt-0.5 leading-tight ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                {sc.subtitle}
              </div>
            </button>
          )
        })}
      </div>

      {/* Main 3D Viewport + Side Apple Glass Control Deck */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left: 3D Hardware Stage (8 Columns) */}
        <div className="lg:col-span-8 apple-glass-dark rounded-3xl overflow-hidden relative flex flex-col justify-between min-h-[450px]">
          {/* Top Floating Camera Presets & Telemetry Bar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-4 pointer-events-none">
            <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 rounded-full bg-slate-900/80 border border-white/15 p-1 backdrop-blur-xl">
              {(
                [
                  { id: 'overview', label: 'Vista General' },
                  { id: 'resistor-zoom', label: 'Zoom Resistencias' },
                  { id: 'led-zoom', label: 'Zoom al LED' },
                  { id: 'top-down', label: 'Plano Superior' }
                ] as const
              ).map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => handleCameraPreset(cam.id)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                    cameraPreset === cam.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Camera className="size-3" />
                  <span>{cam.label}</span>
                </button>
              ))}
            </div>

            <div className="rounded-full bg-slate-900/80 border border-white/15 px-3.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-xl">
              Arrastra con el mouse para rotar en 3D
            </div>
          </div>

          {/* Three.js Canvas Mount */}
          <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Bottom Floating Live Explanation Overlay inside 3D Viewport */}
          <div className="relative z-20 p-4 mt-auto pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario + (isBurned ? '-burned' : '-ok')}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`pointer-events-auto rounded-2xl border p-4 backdrop-blur-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isBurned
                    ? 'bg-red-950/85 border-red-500/40 text-red-100'
                    : scenario === 'reversed'
                    ? 'bg-amber-950/85 border-amber-500/40 text-amber-100'
                    : 'bg-slate-900/85 border-white/15 text-slate-100'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    {isBurned ? (
                      <>
                        <AlertTriangle className="size-4 text-red-400 animate-bounce" />
                        <span className="text-red-300">¡Cortocircuito Térmico! El LED se ha quemado</span>
                      </>
                    ) : scenario === 'series' ? (
                      <span className="text-blue-300">
                        Conexión en Serie: 2 Resistencias sumadas ({resistance} Ω + {resistance} Ω = {effectiveResistance} Ω)
                      </span>
                    ) : scenario === 'parallel' ? (
                      <span className="text-cyan-300">
                        Conexión en Paralelo: 2 Ramas dividen el camino ({resistance} Ω ∥ {resistance} Ω = {effectiveResistance} Ω)
                      </span>
                    ) : scenario === 'potentiometer' ? (
                      <span className="text-emerald-300">
                        Potenciómetro Activo: Gira la perilla con el deslizador para regular el brillo
                      </span>
                    ) : scenario === 'transistor' ? (
                      <span className="text-purple-300">
                        Transistor NPN 2N2222: Pequeña corriente en la Base activa el paso Colector-Emisor
                      </span>
                    ) : scenario === 'reversed' ? (
                      <span className="text-amber-300">
                        Diodo en Polarización Inversa: El LED solo conduce en un sentido (Ánodo → Cátodo)
                      </span>
                    ) : (
                      <span className="text-emerald-300">
                        Circuito Protegido: La resistencia frena los electrones a {currentMilliAmps.toFixed(1)} mA seguros
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBurned
                      ? `Al eliminar la resistencia, la corriente se dispara a ${currentMilliAmps.toFixed(0)} mA (el máximo seguro de un LED de 5 mm es 25 mA). El filamento semiconductor se funde al instante.`
                      : scenario === 'series'
                      ? 'Observa en la protoboard las dos resistencias colocadas una tras otra: a mayor oposición total, los electrones viajan a la mitad de velocidad.'
                      : scenario === 'parallel'
                      ? 'Observa cómo las esferas azules (electrones) se bifurcan por las dos resistencias en paralelo y se vuelven a unir antes de entrar al LED.'
                      : scenario === 'reversed'
                      ? 'La pata larga del LED (Ánodo +) quedó conectada al negativo. La barrera interna del diodo impide el flujo eléctrico.'
                      : 'Las 4 bandas de color sobre el cuerpo cerámico indican su valor exacto en Ohmios (Ω).'}
                  </p>
                </div>

                {isBurned && (
                  <button
                    onClick={() => {
                      setScenario('normal')
                      setResistance(330)
                      handleCameraPreset('overview')
                    }}
                    className="shrink-0 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-100 shadow-md transition-all"
                  >
                    Reemplazar LED y Poner Resistencia
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Apple Glass Parameter & Color-Code Inspector (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Interactive Sliders Card */}
          <div className="apple-glass rounded-3xl p-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Sliders className="size-3.5 text-blue-600" />
                Variables Físicas
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-blue-700">
                I = V / R
              </span>
            </div>

            {/* Voltage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Voltaje de Batería (V)</span>
                <span className="font-mono font-bold text-amber-600">{voltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={0.5}
                value={voltage}
                onChange={(e) => setVoltage(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400">
                <span>3.0 V (2 Pilas AA)</span>
                <span>9.0 V (Batería)</span>
                <span>12.0 V (LiPo 3S)</span>
              </div>
            </div>

            {/* Resistance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">
                  Valor de {scenario === 'series' || scenario === 'parallel' ? 'cada Resistencia' : 'la Resistencia'}
                </span>
                <span className="font-mono font-bold text-blue-600">{resistance} Ω</span>
              </div>
              <input
                type="range"
                min={100}
                max={1000}
                step={10}
                disabled={scenario === 'short-circuit'}
                value={resistance}
                onChange={(e) => setResistance(parseInt(e.target.value, 10))}
                className="w-full disabled:opacity-40"
              />
              {/* Quick Standard Resistor Presets */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[100, 220, 330, 1000].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      if (scenario === 'short-circuit') setScenario('normal')
                      setResistance(val)
                    }}
                    className={`rounded-xl py-1.5 font-mono text-xs font-bold transition-all ${
                      resistance === val && scenario !== 'short-circuit'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-900/5 text-slate-700 hover:bg-slate-900/10'
                    }`}
                  >
                    {val === 1000 ? '1 kΩ' : `${val} Ω`}
                  </button>
                ))}
              </div>
            </div>

            {/* LED Color Picker */}
            <div className="space-y-2 pt-1 border-t border-slate-200/70">
              <span className="text-xs font-semibold text-slate-700 block">Color del Diodo LED (5 mm)</span>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { id: 'green', label: 'Verde', dot: 'bg-emerald-500' },
                    { id: 'red', label: 'Rojo', dot: 'bg-red-500' },
                    { id: 'blue', label: 'Azul', dot: 'bg-blue-500' },
                    { id: 'amber', label: 'Ámbar', dot: 'bg-amber-500' }
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setLedColor(c.id)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold border transition-all ${
                      ledColor === c.id
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200/80 bg-white/70 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <span className={`size-2.5 rounded-full ${c.dot}`} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual 4-Band Resistor Color Code Reader */}
          <div className="apple-glass rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Código de 4 Bandas ({resistance} Ω)
              </span>
              <span className="text-[11px] font-semibold text-blue-600">En tu bandeja</span>
            </div>

            {/* Graphic 2D/Isometric Preview of the Resistor Bands */}
            <div className="relative flex items-center justify-center py-3">
              {/* Wire Lead */}
              <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300" />
              {/* Ceramic Body */}
              <div className="absolute flex h-10 w-48 items-center justify-around rounded-2xl bg-[#e6d2b5] px-5 shadow-md border border-[#cbb08a]">
                <div className="h-full w-3" style={{ backgroundColor: bands.b1.hex }} title={bands.b1.name} />
                <div className="h-full w-3" style={{ backgroundColor: bands.b2.hex }} title={bands.b2.name} />
                <div className="h-full w-3" style={{ backgroundColor: bands.mult.hex }} title={bands.mult.name} />
                <div className="h-full w-2.5 ml-3" style={{ backgroundColor: bands.tol.hex }} title={bands.tol.name} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="rounded-xl bg-white/80 px-2.5 py-1.5 border border-slate-200/60 flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: bands.b1.hex }} />
                <span className="truncate font-medium text-slate-700">1ª: {bands.b1.name}</span>
              </div>
              <div className="rounded-xl bg-white/80 px-2.5 py-1.5 border border-slate-200/60 flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: bands.b2.hex }} />
                <span className="truncate font-medium text-slate-700">2ª: {bands.b2.name}</span>
              </div>
              <div className="rounded-xl bg-white/80 px-2.5 py-1.5 border border-slate-200/60 flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: bands.mult.hex }} />
                <span className="truncate font-medium text-slate-700">Mult: {bands.mult.name}</span>
              </div>
              <div className="rounded-xl bg-white/80 px-2.5 py-1.5 border border-slate-200/60 flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: bands.tol.hex }} />
                <span className="truncate font-medium text-slate-700">Tol: {bands.tol.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
