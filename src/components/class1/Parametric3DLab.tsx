import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Sparkles, Eye, Sliders, Layers, Box, RotateCw } from 'lucide-react'

type CadMaterialFinish = 'petg-blue' | 'carbon-3k' | 'aluminum-cnc' | 'wireframe'

export const Parametric3DLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const assemblyGroupRef = useRef<THREE.Group | null>(null)
  const rotorBellGroupRef = useRef<THREE.Group | null>(null)

  // Parametric Dimensions in Millimeters
  const [motorDiameter, setMotorDiameter] = useState<number>(28) // mm (18 to 44)
  const [wallThickness, setWallThickness] = useState<number>(4.0) // mm (2.0 to 7.0)
  const [armLength, setArmLength] = useState<number>(85) // mm (55 to 125)
  const [armHeight, setArmHeight] = useState<number>(12) // mm (8 to 20)
  const [explodeFactor, setExplodeFactor] = useState<number>(0) // 0 to 1 (CAD Exploded View)
  const [finish, setFinish] = useState<CadMaterialFinish>('petg-blue')
  const [spinMotor, setSpinMotor] = useState<boolean>(true)

  // Teacher input for live student participation
  const [customStudentInput, setCustomStudentInput] = useState<string>('')
  const [studentFeedbackMsg, setStudentFeedbackMsg] = useState<string | null>(null)

  const spinRef = useRef(spinMotor)
  spinRef.current = spinMotor

  // 1. Setup Three.js CAD Studio Viewport
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const heightPix = container.clientHeight || 440

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b1120)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(38, width / heightPix, 0.1, 1000)
    camera.position.set(105, 82, 125)
    camera.lookAt(18, 4, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(width, heightPix)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Studio CAD Lighting
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(70, 120, 80)
    keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.3)
    fillLight.position.set(-80, 60, -70)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.0)
    rimLight.position.set(20, -50, 90)
    scene.add(rimLight)

    // Precision CAD Workplane Grid
    const grid = new THREE.GridHelper(220, 22, 0x334155, 0x1e293b)
    grid.position.y = -14
    scene.add(grid)

    // Origin Axis Triad (Fusion 360 style X-Red, Y-Green, Z-Blue)
    const axes = new THREE.AxesHelper(22)
    axes.position.set(-45, -13.8, 35)
    scene.add(axes)

    // Main Assembly Group
    const assemblyGroup = new THREE.Group()
    scene.add(assemblyGroup)
    assemblyGroupRef.current = assemblyGroup

    // Orbit Drag Interaction
    let isDragging = false
    let prevPos = { x: 0, y: 0 }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevPos = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !assemblyGroupRef.current) return
      const dx = e.clientX - prevPos.x
      const dy = e.clientY - prevPos.y
      assemblyGroupRef.current.rotation.y += dx * 0.009
      assemblyGroupRef.current.rotation.x = Math.max(
        -0.6,
        Math.min(0.7, assemblyGroupRef.current.rotation.x + dy * 0.007)
      )
      prevPos = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (assemblyGroupRef.current && !isDragging) {
        assemblyGroupRef.current.rotation.y += 0.0025
      }
      if (rotorBellGroupRef.current && spinRef.current) {
        rotorBellGroupRef.current.rotation.y += 0.065
      }
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight || 440
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mousedown', onMouseDown)
      renderer.dispose()
    }
  }, [])

  // 2. Rebuild Multi-Part Parametric CAD Geometry whenever parameters change
  useEffect(() => {
    if (!assemblyGroupRef.current) return
    const group = assemblyGroupRef.current

    while (group.children.length > 0) {
      const child = group.children[0]
      group.remove(child)
    }

    const isWire = finish === 'wireframe'

    // Primary Structural Material based on user selection
    const primaryMat = new THREE.MeshStandardMaterial({
      color:
        finish === 'carbon-3k'
          ? 0x1e293b
          : finish === 'aluminum-cnc'
          ? 0xcbd5e1
          : 0x2563eb,
      roughness: finish === 'aluminum-cnc' ? 0.2 : finish === 'carbon-3k' ? 0.38 : 0.28,
      metalness: finish === 'aluminum-cnc' ? 0.85 : finish === 'carbon-3k' ? 0.35 : 0.2,
      wireframe: isWire
    })

    const secondaryCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.45,
      wireframe: isWire
    })

    const hardwareBoltMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.18,
      metalness: 0.92,
      wireframe: isWire
    })

    const copperCoilMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.25,
      metalness: 0.88,
      wireframe: isWire
    })

    const rotorAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.22,
      metalness: 0.8,
      wireframe: isWire
    })

    const innerR = motorDiameter / 2
    const outerR = innerR + wallThickness
    const armRootW = Math.max(14, outerR * 1.15)
    const armTipW = Math.max(10, outerR * 0.78)

    // ================= PART 1: MOTOR MOUNT RING WITH 4 BOLT LOBES =================
    const mountShape = new THREE.Shape()
    mountShape.absarc(0, 0, outerR, 0, Math.PI * 2, false)

    // Central cooling/shaft hole
    const centerHole = new THREE.Path()
    centerHole.absarc(0, 0, innerR * 0.65, 0, Math.PI * 2, true)
    mountShape.holes.push(centerHole)

    // 4 Radial Ventilation Slots in Motor Mount Base
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4
      const slotHole = new THREE.Path()
      const sr = innerR * 0.82
      slotHole.absarc(Math.cos(angle) * sr, Math.sin(angle) * sr, Math.max(1.4, wallThickness * 0.32), 0, Math.PI * 2, true)
      mountShape.holes.push(slotHole)
    }

    const extrudeMountSettings = {
      depth: armHeight,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.8,
      bevelThickness: 0.8
    }

    const mountGeom = new THREE.ExtrudeGeometry(mountShape, extrudeMountSettings)
    mountGeom.rotateX(Math.PI / 2)
    mountGeom.translate(0, armHeight / 2, 0)
    const mountMesh = new THREE.Mesh(mountGeom, primaryMat)
    mountMesh.castShadow = true
    group.add(mountMesh)

    // ================= PART 2: VENTILATED TRUSS DRONE ARM =================
    const armStartX = outerR * 0.72
    const armEndX = armStartX + armLength

    const armShape = new THREE.Shape()
    armShape.moveTo(armStartX, -armTipW / 2)
    armShape.lineTo(armEndX, -armRootW / 2)
    armShape.lineTo(armEndX, armRootW / 2)
    armShape.lineTo(armStartX, armTipW / 2)
    armShape.closePath()

    // Dynamic Truss Weight-Saving Cutout Pockets along the arm
    const pocketCount = Math.max(2, Math.floor(armLength / 24))
    const marginX = 9
    const usableLen = armLength - marginX * 2
    const pocketSpan = usableLen / pocketCount

    for (let p = 0; p < pocketCount; p++) {
      const px0 = armStartX + marginX + p * pocketSpan + 2
      const px1 = armStartX + marginX + (p + 1) * pocketSpan - 2
      const tMid = (p + 0.5) / pocketCount
      const halfW = ((armTipW * (1 - tMid) + armRootW * tMid) / 2) - Math.max(2.2, wallThickness * 0.65)

      if (px1 > px0 + 3 && halfW > 2) {
        const hole = new THREE.Path()
        hole.moveTo(px0, -halfW)
        hole.lineTo(px1, -halfW)
        hole.lineTo(px1, halfW)
        hole.lineTo(px0, halfW)
        hole.closePath()
        armShape.holes.push(hole)
      }
    }

    const armGeom = new THREE.ExtrudeGeometry(armShape, {
      depth: armHeight * 0.78,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.6,
      bevelThickness: 0.6
    })
    armGeom.rotateX(Math.PI / 2)
    armGeom.translate(0, (armHeight * 0.78) / 2 - 1, 0)
    const armMesh = new THREE.Mesh(armGeom, primaryMat)
    armMesh.castShadow = true
    group.add(armMesh)

    // ================= PART 3: ROOT CHASSIS SANDWICH PLATES & STANDOFFS =================
    const explodeOffset = explodeFactor * 26

    const topPlateGeom = new THREE.BoxGeometry(24, 2.4, armRootW * 1.65)
    const topPlate = new THREE.Mesh(topPlateGeom, secondaryCarbonMat)
    topPlate.position.set(armEndX + 4, armHeight * 0.65 + explodeOffset * 0.6, 0)
    topPlate.castShadow = true
    group.add(topPlate)

    const bottomPlate = new THREE.Mesh(topPlateGeom, secondaryCarbonMat)
    bottomPlate.position.set(armEndX + 4, -armHeight * 0.45 - explodeOffset * 0.6, 0)
    bottomPlate.castShadow = true
    group.add(bottomPlate)

    // Knurled Red/Blue Aluminum Standoffs & M3 Bolts at Root
    ;[-armRootW * 0.58, armRootW * 0.58].forEach((sz) => {
      const standoff = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.6, armHeight * 1.1, 16),
        rotorAnodizedMat
      )
      standoff.position.set(armEndX + 8, 0, sz)
      group.add(standoff)

      const rootBolt = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 3.2, 6),
        hardwareBoltMat
      )
      rootBolt.position.set(armEndX + 8, armHeight * 0.75 + explodeOffset * 0.9, sz)
      group.add(rootBolt)
    })

    // 4 M3 Socket Head Bolts around Motor Mount Ring
    const boltPitchR = innerR + wallThickness * 0.5
    for (let b = 0; b < 4; b++) {
      const ang = (b * Math.PI) / 2
      const bx = Math.cos(ang) * boltPitchR
      const bz = Math.sin(ang) * boltPitchR

      const boltGroup = new THREE.Group()
      boltGroup.position.set(bx, armHeight * 0.65 + explodeOffset * 0.4, bz)

      const head = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 2.2, 16), hardwareBoltMat)
      boltGroup.add(head)

      const shank = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 6, 12), hardwareBoltMat)
      shank.position.y = -3
      boltGroup.add(shank)

      group.add(boltGroup)
    }

    // ================= PART 4: MULTI-PART BRUSHLESS MOTOR (STATOR + 12 COILS + ROTOR BELL) =================
    const motorBaseY = armHeight * 0.55 + explodeOffset * 0.85

    // Stator Base Hub
    const statorHub = new THREE.Mesh(
      new THREE.CylinderGeometry(innerR * 0.86, innerR * 0.86, 3.0, 32),
      secondaryCarbonMat
    )
    statorHub.position.set(0, motorBaseY, 0)
    group.add(statorHub)

    // 12 Electromagnetic Copper Windings (Coils)
    const coilCount = 12
    const coilRadius = innerR * 0.62
    for (let c = 0; c < coilCount; c++) {
      const cAngle = (c * Math.PI * 2) / coilCount
      const coilMesh = new THREE.Mesh(
        new THREE.BoxGeometry(innerR * 0.34, 6.2, 2.4),
        copperCoilMat
      )
      coilMesh.position.set(
        Math.cos(cAngle) * coilRadius,
        motorBaseY + 4.5,
        Math.sin(cAngle) * coilRadius
      )
      coilMesh.rotation.y = -cAngle
      group.add(coilMesh)
    }

    // Spinning CNC Rotor Bell + Prop Shaft + Locknut
    const rotorBellGroup = new THREE.Group()
    rotorBellGroup.position.set(0, motorBaseY + 6.5 + explodeOffset * 1.15, 0)
    group.add(rotorBellGroup)
    rotorBellGroupRef.current = rotorBellGroup

    const bellWall = new THREE.Mesh(
      new THREE.CylinderGeometry(innerR * 0.92, innerR * 0.94, 9.5, 36, 1, true),
      rotorAnodizedMat
    )
    rotorBellGroup.add(bellWall)

    const bellTopRing = new THREE.Mesh(
      new THREE.RingGeometry(innerR * 0.28, innerR * 0.92, 32),
      rotorAnodizedMat
    )
    bellTopRing.rotation.x = -Math.PI / 2
    bellTopRing.position.y = 4.75
    rotorBellGroup.add(bellTopRing)

    // Threaded Titanium Prop Shaft (M5)
    const propShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.5, 13, 20),
      hardwareBoltMat
    )
    propShaft.position.y = 8.5
    rotorBellGroup.add(propShaft)

    // Self-tightening Prop Locknut
    const propNut = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 4.2, 4.5, 6),
      secondaryCarbonMat
    )
    propNut.position.y = 11.5
    rotorBellGroup.add(propNut)

    // ================= PART 5: 3D CAD DIMENSION CALLOUT LINES =================
    const dimMatCyan = new THREE.LineBasicMaterial({ color: 0x38bdf8 })
    const dimMatAmber = new THREE.LineBasicMaterial({ color: 0xf59e0b })

    // Arm Length Dimension Line (Front Z)
    const zDimOffset = outerR + 12
    const armDimPts = [
      new THREE.Vector3(armStartX, 0, outerR),
      new THREE.Vector3(armStartX, 0, zDimOffset),
      new THREE.Vector3(armEndX, 0, zDimOffset),
      new THREE.Vector3(armEndX, 0, armRootW / 2)
    ]
    const armDimLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(armDimPts), dimMatCyan)
    group.add(armDimLine)

    // Motor Diameter Dimension Line (Left X)
    const xDimOffset = -outerR - 10
    const motorDimPts = [
      new THREE.Vector3(0, 0, -innerR),
      new THREE.Vector3(xDimOffset, 0, -innerR),
      new THREE.Vector3(xDimOffset, 0, innerR),
      new THREE.Vector3(0, 0, innerR)
    ]
    const motorDimLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(motorDimPts), dimMatAmber)
    group.add(motorDimLine)
  }, [motorDiameter, wallThickness, armLength, armHeight, explodeFactor, finish])

  const applyStudentMeasure = () => {
    const val = parseFloat(customStudentInput)
    if (isNaN(val) || val < 15 || val > 125) {
      setStudentFeedbackMsg('Ingresa una medida entre 15 mm y 125 mm para recalcular el ensamblaje.')
      return
    }

    if (val <= 44) {
      setMotorDiameter(val)
      setStudentFeedbackMsg(
        `¡Cota aplicada! Diámetro de motor recalculado a Ø ${val} mm. Los 4 pernos M3 y el anillo se desplazaron automáticamente.`
      )
    } else {
      setArmLength(val)
      setStudentFeedbackMsg(
        `¡Cota aplicada! Largo estructural ajustado a ${val} mm. Se regeneraron ${Math.max(2, Math.floor(val / 24))} celdas de aligeramiento (truss).`
      )
    }
  }

  return (
    <div className="space-y-5">
      {/* Apple Header & Material Finish Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            <Box className="size-3.5" />
            Ingeniería CAD Paramétrica • Autodesk Fusion 360
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1.5">
            Ensamblaje Paramétrico en Vivo: Brazo Estructural y Motor Brushless
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Cambia cualquier cota en milímetros y observa cómo la geometría, las celdas de aligeramiento y los pernos M3 se recalculan al instante.
          </p>
        </div>

        {/* Material / View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-slate-900/5 p-1.5 border border-slate-900/10">
          {(
            [
              { id: 'petg-blue', label: 'PETG Impreso 3D' },
              { id: 'carbon-3k', label: 'Fibra Carbono 3K' },
              { id: 'aluminum-cnc', label: 'Aluminio CNC' },
              { id: 'wireframe', label: 'Malla CAD' }
            ] as const
          ).map((mat) => (
            <button
              key={mat.id}
              onClick={() => setFinish(mat.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                finish === mat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {mat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left: 3D CAD Viewport (7 Columns) */}
        <div className="lg:col-span-7 apple-glass-dark rounded-3xl overflow-hidden relative flex flex-col justify-between min-h-[460px]">
          {/* Top Floating CAD Toolbar inside Viewport */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={() => setExplodeFactor(explodeFactor > 0 ? 0 : 1)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border backdrop-blur-xl transition-all ${
                  explodeFactor > 0
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900/80 text-slate-200 border-white/15 hover:bg-white/10'
                }`}
              >
                <Layers className="size-3.5" />
                <span>{explodeFactor > 0 ? 'Unir Ensamblaje' : 'Vista Explotada (Despiece)'}</span>
              </button>

              <button
                onClick={() => setSpinMotor(!spinMotor)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-xl transition-all ${
                  spinMotor
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900/80 text-slate-400 border-white/15'
                }`}
              >
                <RotateCw className={`size-3.5 ${spinMotor ? 'animate-spin' : ''}`} />
                <span>Rotor {spinMotor ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="rounded-full bg-slate-900/80 border border-white/15 px-3 py-1 text-[11px] font-mono text-slate-300 backdrop-blur-xl">
              Celdas Truss: {Math.max(2, Math.floor(armLength / 24))} • Pernos: 4×M3
            </div>
          </div>

          {/* Three.js Canvas */}
          <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Bottom Floating Live Dimension Legend */}
          <div className="relative z-20 p-4 mt-auto pointer-events-none">
            <div className="pointer-events-auto rounded-2xl bg-slate-900/85 border border-white/15 p-3.5 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="text-slate-400">Cota Ø Motor:</span>
                  <strong className="font-mono text-white">{motorDiameter} mm</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-sky-400" />
                  <span className="text-slate-400">Cota Largo Brazo:</span>
                  <strong className="font-mono text-white">{armLength} mm</strong>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Espesor Pared:</span>
                  <strong className="font-mono text-white">{wallThickness.toFixed(1)} mm</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Despiece:</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={explodeFactor}
                  onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Parametric Table & Classroom Student Participation (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Student Participation Box */}
          <div className="apple-glass rounded-3xl p-5 space-y-3 border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Sparkles className="size-4 text-emerald-600" />
                Dinámica en Vivo con la Sala
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Participativo
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              Pide a un estudiante que diga un número entre <strong>18 y 125 mm</strong> y aplícalo para que vean cómo se recalcula la matriz CAD:
            </p>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Ej: 34 o 110 (mm)"
                value={customStudentInput}
                onChange={(e) => setCustomStudentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyStudentMeasure()}
                className="flex-1 rounded-2xl border border-slate-300/80 bg-white/90 px-3.5 py-2 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none shadow-2xs"
              />
              <button
                onClick={applyStudentMeasure}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-sm transition-all"
              >
                Recalcular CAD
              </button>
            </div>

            {studentFeedbackMsg && (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-xs font-semibold text-emerald-900">
                {studentFeedbackMsg}
              </div>
            )}
          </div>

          {/* Fusion 360 Parameter Sliders */}
          <div className="apple-glass rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Sliders className="size-3.5 text-blue-600" />
                Tabla de Parámetros (fx)
              </span>
              <button
                onClick={() => setFinish(finish === 'wireframe' ? 'petg-blue' : 'wireframe')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <Eye className="size-3.5" />
                <span>{finish === 'wireframe' ? 'Ver Sólido' : 'Ver Malla'}</span>
              </button>
            </div>

            {/* Slider 1: Motor Diameter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">1. Diámetro Campana Motor (d1)</span>
                <span className="font-mono font-bold text-amber-600">Ø {motorDiameter} mm</span>
              </div>
              <input
                type="range"
                min={18}
                max={44}
                step={1}
                value={motorDiameter}
                onChange={(e) => setMotorDiameter(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Slider 2: Arm Length */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">2. Longitud Estructural Brazo (d2)</span>
                <span className="font-mono font-bold text-sky-600">{armLength} mm</span>
              </div>
              <input
                type="range"
                min={55}
                max={125}
                step={5}
                value={armLength}
                onChange={(e) => setArmLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Slider 3: Wall Thickness */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">3. Espesor de Pared y Costillas (d3)</span>
                <span className="font-mono font-bold text-emerald-600">{wallThickness.toFixed(1)} mm</span>
              </div>
              <input
                type="range"
                min={2.0}
                max={7.0}
                step={0.5}
                value={wallThickness}
                onChange={(e) => setWallThickness(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Slider 4: Extrusion Height */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">4. Altura de Extrusión (h1)</span>
                <span className="font-mono font-bold text-indigo-600">{armHeight} mm</span>
              </div>
              <input
                type="range"
                min={8}
                max={20}
                step={1}
                value={armHeight}
                onChange={(e) => setArmHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
