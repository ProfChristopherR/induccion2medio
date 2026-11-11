import fs from 'node:fs'
import path from 'node:path'

const mediaDir = path.resolve('public/media')
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true })
}

// 1. Hero Ladder Overview
const heroLadderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="680" fill="url(#bgGrad)" />

  <!-- Subtle grid lines -->
  <g stroke="#334155" stroke-width="1" opacity="0.3">
    <line x1="0" y1="170" x2="1200" y2="170" />
    <line x1="0" y1="340" x2="1200" y2="340" />
    <line x1="0" y1="510" x2="1200" y2="510" />
    <line x1="300" y1="0" x2="300" y2="680" />
    <line x1="600" y1="0" x2="600" y2="680" />
    <line x1="900" y1="0" x2="900" y2="680" />
  </g>

  <!-- Title Badge -->
  <g transform="translate(60, 50)">
    <rect width="320" height="34" rx="17" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
    <circle cx="20" cy="17" r="6" fill="#10b981" />
    <text x="35" y="22" fill="#93c5fd" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" letter-spacing="1">ESPECIALIDAD TÁCTICA &amp; TECNOLÓGICA</text>
  </g>

  <text x="60" y="130" fill="#ffffff" font-family="system-ui, sans-serif" font-size="34" font-weight="900">Ruta Formativa: Geogo &amp; Geomática</text>
  <text x="60" y="160" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">De los fundamentos de la energía y el diseño 3D al dominio aéreo profesional</text>

  <!-- The 4 Steps Ladder -->
  <!-- Step 1: 1° Medio -->
  <g transform="translate(60, 220)">
    <rect width="250" height="380" rx="20" fill="#1e293b" stroke="#10b981" stroke-width="2" />
    <rect width="250" height="50" rx="20" fill="#10b981" />
    <rect y="30" width="250" height="20" fill="#10b981" />
    <text x="125" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="900" text-anchor="middle">1° MEDIO • GEOGO I</text>
    
    <!-- Step 1 Icon Mockup: Protoboard + Arduino -->
    <g transform="translate(45, 80)">
      <rect width="160" height="110" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <rect x="15" y="15" width="50" height="80" rx="4" fill="#0284c7" />
      <text x="40" y="60" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">UNO</text>
      <!-- Breadboard grid -->
      <rect x="75" y="15" width="70" height="80" rx="4" fill="#f8fafc" />
      <circle cx="90" cy="30" r="3" fill="#ef4444" />
      <circle cx="110" cy="30" r="3" fill="#10b981" />
      <line x1="90" y1="45" x2="130" y2="45" stroke="#f59e0b" stroke-width="3" />
    </g>

    <text x="125" y="235" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Fundamentos &amp; Código</text>
    <text x="25" y="270" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Ley de Ohm &amp; Circuitos</text>
    <text x="25" y="295" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• C++ en Arduino IDE</text>
    <text x="25" y="320" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Modelado 3D Inicial</text>
    <text x="25" y="345" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Prompt Engineering IA</text>
  </g>

  <!-- Step 2: 2° Medio -->
  <g transform="translate(340, 220)">
    <rect width="250" height="380" rx="20" fill="#1e293b" stroke="#06b6d4" stroke-width="2" />
    <rect width="250" height="50" rx="20" fill="#06b6d4" />
    <rect y="30" width="250" height="20" fill="#06b6d4" />
    <text x="125" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="900" text-anchor="middle">2° MEDIO • GEOGO II</text>
    
    <!-- Step 2 Icon Mockup: Custom PCB + 3D print -->
    <g transform="translate(45, 80)">
      <rect width="160" height="110" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <rect x="20" y="20" width="120" height="70" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2" />
      <!-- Copper traces -->
      <path d="M 35 40 L 70 40 L 90 60 L 125 60" fill="none" stroke="#fbbf24" stroke-width="2" />
      <path d="M 35 70 L 60 70 L 80 50 L 125 50" fill="none" stroke="#fbbf24" stroke-width="2" />
      <circle cx="45" cy="55" r="5" fill="#e2e8f0" />
      <circle cx="115" cy="55" r="5" fill="#e2e8f0" />
    </g>

    <text x="125" y="235" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Manufactura Digital</text>
    <text x="25" y="270" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Diseño &amp; Soldadura PCB</text>
    <text x="25" y="295" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Impresión 3D Avanzada</text>
    <text x="25" y="320" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Corte Láser &amp; CNC</text>
    <text x="25" y="345" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Python &amp; Sensores</text>
  </g>

  <!-- Step 3: 3° Medio -->
  <g transform="translate(620, 220)">
    <rect width="250" height="380" rx="20" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <rect width="250" height="50" rx="20" fill="#3b82f6" />
    <rect y="30" width="250" height="20" fill="#3b82f6" />
    <text x="125" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="900" text-anchor="middle">3° MEDIO • GEOMÁTICA I</text>
    
    <!-- Step 3 Icon Mockup: Drone Flight + Compass -->
    <g transform="translate(45, 80)">
      <rect width="160" height="110" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <!-- Drone icon -->
      <circle cx="80" cy="55" r="14" fill="#3b82f6" />
      <line x1="45" y1="35" x2="115" y2="75" stroke="#94a3b8" stroke-width="4" />
      <line x1="45" y1="75" x2="115" y2="35" stroke="#94a3b8" stroke-width="4" />
      <ellipse cx="45" cy="35" rx="14" ry="4" fill="none" stroke="#60a5fa" stroke-width="2" />
      <ellipse cx="115" cy="35" rx="14" ry="4" fill="none" stroke="#60a5fa" stroke-width="2" />
      <ellipse cx="45" cy="75" rx="14" ry="4" fill="none" stroke="#60a5fa" stroke-width="2" />
      <ellipse cx="115" cy="75" rx="14" ry="4" fill="none" stroke="#60a5fa" stroke-width="2" />
    </g>

    <text x="125" y="235" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Operación UAV &amp; DGAC</text>
    <text x="25" y="270" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Normativa DGAC Chile</text>
    <text x="25" y="295" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Meteorología &amp; METAR</text>
    <text x="25" y="320" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Vuelo Táctico en Terreno</text>
    <text x="25" y="345" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Cámaras &amp; Gimbal</text>
  </g>

  <!-- Step 4: 4° Medio -->
  <g transform="translate(900, 220)">
    <rect width="240" height="380" rx="20" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" />
    <rect width="240" height="50" rx="20" fill="#8b5cf6" />
    <rect y="30" width="240" height="20" fill="#8b5cf6" />
    <text x="120" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="900" text-anchor="middle">4° MEDIO • GEOMÁTICA II</text>
    
    <!-- Step 4 Icon Mockup: Thermal / NDVI sensor -->
    <g transform="translate(40, 80)">
      <rect width="160" height="110" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <!-- Thermal screen representation -->
      <rect x="20" y="18" width="120" height="74" rx="4" fill="#4c1d95" />
      <circle cx="80" cy="55" r="22" fill="#ef4444" opacity="0.8" />
      <circle cx="80" cy="55" r="12" fill="#f59e0b" />
      <circle cx="80" cy="55" r="5" fill="#ffffff" />
      <text x="80" y="80" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">SAR 37.1°C</text>
    </g>

    <text x="120" y="235" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Misiones Industriales</text>
    <text x="20" y="270" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Fotogrametría 3D Topo</text>
    <text x="20" y="295" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Sensores Térmicos (SAR)</text>
    <text x="20" y="320" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Multiespectral NDVI</text>
    <text x="20" y="345" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">• Drones Agrícolas &amp; Agro</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'hero_ladder.svg'), heroLadderSvg)

// 2. Protoboard vs PCB Split Comparison
const protoVsPcbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="100%" height="100%">
  <defs>
    <linearGradient id="pcbGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
  </defs>

  <!-- Left: 1° Medio Protoboard -->
  <g transform="translate(40, 30)">
    <rect width="440" height="500" rx="20" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
    <rect width="440" height="55" rx="20" fill="#10b981" />
    <rect y="35" width="440" height="20" fill="#10b981" />
    <text x="220" y="35" fill="#ffffff" font-family="system-ui, sans-serif" font-size="17" font-weight="900" text-anchor="middle">1° MEDIO: PROTOBOARD (PROTOTIPO)</text>

    <!-- Protoboard body -->
    <rect x="30" y="80" width="380" height="300" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    
    <!-- Holes matrix -->
    <g fill="#94a3b8">
      ${Array.from({ length: 10 }).map((_, r) => 
        Array.from({ length: 14 }).map((_, c) => 
          `<circle cx="${65 + c * 24}" cy="${110 + r * 24}" r="3" />`
        ).join('')
      ).join('')}
    </g>

    <!-- Components on breadboard -->
    <!-- Resistor -->
    <rect x="135" y="170" width="60" height="20" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
    <line x1="145" y1="170" x2="145" y2="190" stroke="#dc2626" stroke-width="3" />
    <line x1="155" y1="170" x2="155" y2="190" stroke="#dc2626" stroke-width="3" />
    <line x1="165" y1="170" x2="165" y2="190" stroke="#78350f" stroke-width="3" />
    <line x1="175" y1="170" x2="175" y2="190" stroke="#ca8a04" stroke-width="3" />
    <line x1="110" y1="180" x2="135" y2="180" stroke="#64748b" stroke-width="3" />
    <line x1="195" y1="180" x2="230" y2="180" stroke="#64748b" stroke-width="3" />

    <!-- LED -->
    <circle cx="270" cy="180" r="16" fill="#ef4444" stroke="#ffffff" stroke-width="3" />
    <line x1="270" y1="196" x2="270" y2="240" stroke="#dc2626" stroke-width="3" />

    <!-- Loose Jumper wires -->
    <path d="M 90 140 Q 60 260 110 300" fill="none" stroke="#2563eb" stroke-width="4" />
    <path d="M 230 180 Q 290 280 320 220" fill="none" stroke="#f59e0b" stroke-width="4" />

    <!-- Features -->
    <rect x="30" y="400" width="380" height="85" rx="12" fill="#f1f5f9" />
    <text x="50" y="428" fill="#0f172a" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Conexión rápida sin soldar</text>
    <text x="50" y="450" fill="#0f172a" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Permite equivocarse y corregir al instante</text>
    <text x="50" y="472" fill="#dc2626" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✗ Falla con vibraciones de un dron</text>
  </g>

  <!-- Right: 2° Medio PCB -->
  <g transform="translate(520, 30)">
    <rect width="440" height="500" rx="20" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
    <rect width="440" height="55" rx="20" fill="#06b6d4" />
    <rect y="35" width="440" height="20" fill="#06b6d4" />
    <text x="220" y="35" fill="#ffffff" font-family="system-ui, sans-serif" font-size="17" font-weight="900" text-anchor="middle">2° MEDIO: PLACA PCB SOLDADA</text>

    <!-- PCB board -->
    <rect x="30" y="80" width="380" height="300" rx="10" fill="url(#pcbGreen)" stroke="#10b981" stroke-width="3" />
    
    <!-- Copper traces and solder pads -->
    <g stroke="#fbbf24" stroke-width="3" fill="none">
      <path d="M 60 120 L 140 120 L 180 160 L 260 160" />
      <path d="M 60 180 L 120 180 L 160 220 L 320 220" />
      <path d="M 260 160 L 340 160 L 370 190" />
      <path d="M 120 300 L 180 300 L 220 260 L 360 260" />
    </g>

    <!-- Shiny Solder Pads -->
    <g fill="#e2e8f0" stroke="#047857" stroke-width="2">
      <circle cx="60" cy="120" r="7" />
      <circle cx="60" cy="180" r="7" />
      <circle cx="260" cy="160" r="7" />
      <circle cx="320" cy="220" r="7" />
      <circle cx="370" cy="190" r="7" />
      <circle cx="120" cy="300" r="7" />
      <circle cx="360" cy="260" r="7" />
    </g>

    <!-- Surface Mount Chip / IC -->
    <rect x="180" y="190" width="80" height="60" rx="4" fill="#18181b" stroke="#94a3b8" stroke-width="1.5" />
    <text x="220" y="225" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">MCU-ARM</text>

    <!-- Silkscreen text -->
    <text x="60" y="350" fill="#ffffff" font-family="monospace" font-size="12" opacity="0.8">LICEO SAN NICOLAS - GEOGO II</text>

    <!-- Features -->
    <rect x="30" y="400" width="380" height="85" rx="12" fill="#1e293b" />
    <text x="50" y="428" fill="#10b981" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Pistas de cobre integradas al milímetro</text>
    <text x="50" y="450" fill="#10b981" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Puntos soldados con estaño indeformables</text>
    <text x="50" y="472" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ Diseñada para volar en drones y robots</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'proto_vs_pcb.svg'), protoVsPcbSvg)

// 3. Manufacturing: 3D FDM vs Laser
const manufacturingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="100%" height="100%">
  <!-- Left: 3D Printing FDM -->
  <g transform="translate(30, 20)">
    <rect width="455" height="480" rx="20" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
    <text x="227" y="45" fill="#0f172a" font-family="system-ui, sans-serif" font-size="18" font-weight="900" text-anchor="middle">IMPRESIÓN 3D FDM (ADITIVA)</text>
    
    <!-- Nozzle and Hotend -->
    <g transform="translate(227, 80)">
      <rect x="-35" y="0" width="70" height="45" rx="4" fill="#94a3b8" />
      <polygon points="0,75 -20,45 20,45" fill="#eab308" />
      <!-- Filament thread entering -->
      <line x1="0" y1="-30" x2="0" y2="0" stroke="#3b82f6" stroke-width="6" />
      <!-- Extruded line -->
      <line x1="0" y1="75" x2="0" y2="90" stroke="#3b82f6" stroke-width="4" />
    </g>

    <!-- Layers of Drone arm being built -->
    <g transform="translate(80, 200)">
      ${Array.from({ length: 8 }).map((_, i) => 
        `<rect x="0" y="${i * 12}" width="295" height="10" rx="3" fill="#3b82f6" opacity="${0.6 + i * 0.05}" stroke="#1d4ed8" stroke-width="1" />`
      ).join('')}
      <!-- Internal Honeycomb infill preview -->
      <text x="147" y="55" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Relleno Infill Panal 20%</text>
    </g>

    <text x="227" y="380" fill="#334155" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Boquilla a 210°C • Filamentos PLA, PETG, TPU</text>
    <text x="227" y="410" fill="#64748b" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle">Fabrica piezas huecas ultra-ligeras con curvas complejas</text>
  </g>

  <!-- Right: Laser Cutting CNC -->
  <g transform="translate(515, 20)">
    <rect width="455" height="480" rx="20" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
    <text x="227" y="45" fill="#0f172a" font-family="system-ui, sans-serif" font-size="18" font-weight="900" text-anchor="middle">CORTE LÁSER &amp; CNC (SUSTRACTIVA)</text>

    <!-- Laser head -->
    <g transform="translate(227, 80)">
      <rect x="-25" y="0" width="50" height="50" rx="4" fill="#334155" />
      <!-- Concentrated Laser Beam -->
      <line x1="0" y1="50" x2="0" y2="120" stroke="#06b6d4" stroke-width="3" />
      <line x1="0" y1="50" x2="0" y2="120" stroke="#ffffff" stroke-width="1" />
      <!-- Spark ring at focal point -->
      <circle cx="0" cy="120" r="10" fill="#22d3ee" opacity="0.6" />
      <circle cx="0" cy="120" r="4" fill="#ffffff" />
    </g>

    <!-- Cut Carbon Fiber Plate -->
    <g transform="translate(80, 220)">
      <rect width="295" height="100" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2" />
      <!-- Carbon fiber weave texture lines -->
      <path d="M 20 20 L 275 20 M 20 50 L 275 50 M 20 80 L 275 80" stroke="#334155" stroke-dasharray="8 8" stroke-width="3" />
      <!-- Precision laser cut contour -->
      <rect x="50" y="25" width="80" height="50" rx="4" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="6 4" />
      <circle cx="210" cy="50" r="18" fill="none" stroke="#06b6d4" stroke-width="2.5" />
    </g>

    <text x="227" y="380" fill="#334155" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Rayo Láser CO2 • Fibra de Carbono 3K, Acrílico, MDF</text>
    <text x="227" y="410" fill="#64748b" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle">Corta un chasis de dron completo en apenas 2 minutos</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'manufacturing_process.svg'), manufacturingSvg)

// 4. Drone Exploded View
const droneExplodedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 620" width="100%" height="100%">
  <rect width="1000" height="620" fill="#0f172a" rx="20" />
  
  <text x="500" y="45" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" letter-spacing="2" text-anchor="middle">ANATOMÍA RPAS • INGENIERÍA EN VUELO</text>
  <text x="500" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" text-anchor="middle">Despiece Táctico de un Dron FPV Cuadricóptero</text>

  <!-- Level 1 (Top): Propellers with CW and CCW indicators -->
  <g transform="translate(150, 130)">
    <!-- Prop 1 (CW) -->
    <ellipse cx="120" cy="20" rx="80" ry="14" fill="none" stroke="#38bdf8" stroke-width="3" />
    <path d="M 80 12 Q 120 20 160 28" stroke="#38bdf8" stroke-width="5" />
    <text x="120" y="-8" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Hélice CW &amp; Rótula</text>

    <!-- Prop 2 (CCW) -->
    <ellipse cx="580" cy="20" rx="80" ry="14" fill="none" stroke="#f43f5e" stroke-width="3" />
    <path d="M 540 28 Q 580 20 620 12" stroke="#f43f5e" stroke-width="5" />
    <text x="580" y="-8" fill="#f43f5e" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Hélice CCW (Contra-rotativa)</text>
  </g>

  <!-- Level 2: Brushless Motors -->
  <g transform="translate(150, 210)">
    <!-- Motor Left -->
    <rect x="95" y="0" width="50" height="40" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2" />
    <line x1="120" y1="-15" x2="120" y2="0" stroke="#f8fafc" stroke-width="4" />
    <text x="30" y="25" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Motor Brushless 25.000 RPM &rarr;</text>

    <!-- Motor Right -->
    <rect x="555" y="0" width="50" height="40" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2" />
    <line x1="580" y1="-15" x2="580" y2="0" stroke="#f8fafc" stroke-width="4" />
  </g>

  <!-- Level 3: Flight Controller & 4in1 ESC -->
  <g transform="translate(380, 290)">
    <rect x="0" y="0" width="240" height="70" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2" />
    <circle cx="30" cy="35" r="10" fill="#0f172a" stroke="#10b981" />
    <text x="120" y="42" fill="#10b981" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">Controladora F7 + Giroscopio IMU</text>
  </g>

  <!-- Level 4: Carbon Fiber 3K Frame -->
  <g transform="translate(180, 400)">
    <!-- Cross frame -->
    <line x1="60" y1="20" x2="580" y2="100" stroke="#334155" stroke-width="18" stroke-linecap="round" />
    <line x1="60" y1="100" x2="580" y2="20" stroke="#334155" stroke-width="18" stroke-linecap="round" />
    <rect x="260" y="30" width="120" height="60" rx="8" fill="#0f172a" stroke="#64748b" stroke-width="3" />
    <text x="320" y="65" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Chasis Fibra 3K (5mm)</text>
  </g>

  <!-- Level 5 (Bottom): LiPo Battery -->
  <g transform="translate(390, 520)">
    <rect x="0" y="0" width="220" height="55" rx="8" fill="#e11d48" stroke="#ffffff" stroke-width="2" />
    <text x="110" y="34" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">Batería LiPo 6S (22.2V Alta Tasa C)</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'drone_exploded.svg'), droneExplodedSvg)

// 5. Drone Fleet Grid (Lineup of 7 drones)
const fleetGridSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 580" width="100%" height="100%">
  <rect width="1100" height="580" fill="#f8fafc" rx="20" stroke="#e2e8f0" stroke-width="2" />
  
  <text x="550" y="45" fill="#0f172a" font-family="system-ui, sans-serif" font-size="24" font-weight="900" text-anchor="middle">Flota Operacional de Drones • Liceo San Nicolás</text>
  <text x="550" y="70" fill="#64748b" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Equipos disponibles en el liceo para inducción, entrenamiento y operaciones territoriales</text>

  <!-- 7 Drone cards in 2 rows -->
  <!-- 1. DJI NEO -->
  <g transform="translate(50, 100)">
    <rect width="220" height="190" rx="14" fill="#ffffff" stroke="#10b981" stroke-width="2" />
    <rect x="15" y="15" width="190" height="24" rx="12" fill="#d1fae5" />
    <text x="110" y="32" fill="#065f46" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">VUELO SEGURO EN SALA</text>
    <circle cx="110" cy="85" r="28" fill="#f1f5f9" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" />
    <text x="110" y="90" fill="#0f172a" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">DJI NEO</text>
    <text x="110" y="140" fill="#334155" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">135g • Guardas 360°</text>
    <text x="110" y="165" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Despegue en palma</text>
  </g>

  <!-- 2. FPV Indoor -->
  <g transform="translate(300, 100)">
    <rect width="220" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <rect x="15" y="15" width="190" height="24" rx="12" fill="#e0f2fe" />
    <text x="110" y="32" fill="#0369a1" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">MICRO-PILOTAJE ACRO</text>
    <circle cx="110" cy="85" r="28" fill="#f1f5f9" stroke="#0284c7" stroke-width="2" />
    <text x="110" y="90" fill="#0f172a" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">FPV Indoor</text>
    <text x="110" y="140" fill="#334155" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">110g • Whoop Ducted</text>
    <text x="110" y="165" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Gafas de inmersión</text>
  </g>

  <!-- 3. FPV Outdoor -->
  <g transform="translate(550, 100)">
    <rect width="220" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <rect x="15" y="15" width="190" height="24" rx="12" fill="#fee2e2" />
    <text x="110" y="32" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">ANATOMÍA AL DESNUDO</text>
    <rect x="85" y="65" width="50" height="40" rx="6" fill="#1e293b" />
    <text x="110" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">FPV 5"</text>
    <text x="110" y="140" fill="#334155" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">680g • Fibra 3K 5mm</text>
    <text x="110" y="165" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Motores brushless visibles</text>
  </g>

  <!-- 4. DJI Mini 4K -->
  <g transform="translate(800, 100)">
    <rect width="220" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <rect x="15" y="15" width="190" height="24" rx="12" fill="#fef3c7" />
    <text x="110" y="32" fill="#92400e" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">ESCUELA DGAC &lt;249G</text>
    <circle cx="110" cy="85" r="28" fill="#f1f5f9" stroke="#f59e0b" stroke-width="2" />
    <text x="110" y="90" fill="#0f172a" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Mini 4K</text>
    <text x="110" y="140" fill="#334155" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">246g • Gimbal 3 Ejes</text>
    <text x="110" y="165" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">31 min autonomía</text>
  </g>

  <!-- Bottom Row: 3 Heavy Industrial Drones -->
  <!-- 5. Phantom 4 Pro -->
  <g transform="translate(170, 320)">
    <rect width="240" height="210" rx="14" fill="#ffffff" stroke="#6366f1" stroke-width="2" />
    <rect x="15" y="15" width="210" height="24" rx="12" fill="#e0e7ff" />
    <text x="120" y="32" fill="#4338ca" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">FOTOGRAMETRÍA RTK</text>
    <circle cx="120" cy="95" r="32" fill="#e0e7ff" />
    <text x="120" y="100" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">Phantom 4</text>
    <text x="120" y="150" fill="#334155" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">1388g • Sensor 1" Shutter</text>
    <text x="120" y="175" fill="#64748b" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Sin distorsión rolling shutter</text>
  </g>

  <!-- 6. Mavic 3T (Thermal) -->
  <g transform="translate(440, 320)">
    <rect width="240" height="210" rx="14" fill="#ffffff" stroke="#ef4444" stroke-width="2.5" />
    <rect x="15" y="15" width="210" height="24" rx="12" fill="#fee2e2" />
    <text x="120" y="32" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="11" font-weight="black" text-anchor="middle">TÉRMICO RADIOMÉTRICO (SAR)</text>
    <circle cx="120" cy="95" r="32" fill="#fee2e2" />
    <text x="120" y="100" fill="#7f1d1d" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">Mavic 3T</text>
    <text x="120" y="150" fill="#334155" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">920g • Sensor 640x512</text>
    <text x="120" y="175" fill="#dc2626" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Detecta calor humano (37°C)</text>
  </g>

  <!-- 7. Mavic 3M (Multispectral) -->
  <g transform="translate(710, 320)">
    <rect width="240" height="210" rx="14" fill="#ffffff" stroke="#10b981" stroke-width="2.5" />
    <rect x="15" y="15" width="210" height="24" rx="12" fill="#d1fae5" />
    <text x="120" y="32" fill="#065f46" font-family="system-ui, sans-serif" font-size="11" font-weight="black" text-anchor="middle">MULTIESPECTRAL NDVI (AGRO)</text>
    <circle cx="120" cy="95" r="32" fill="#d1fae5" />
    <text x="120" y="100" fill="#064e3b" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">Mavic 3M</text>
    <text x="120" y="150" fill="#334155" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">951g • 4 Bandas G/R/RE/NIR</text>
    <text x="120" y="175" fill="#059669" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Salud vegetal y fitosanitarios</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'drone_fleet_grid.svg'), fleetGridSvg)

// 6. Thermal Sensor SAR (Human heat detection)
const thermalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="100%" height="100%">
  <defs>
    <linearGradient id="ironbow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="40%" stop-color="#701a75" />
      <stop offset="70%" stop-color="#dc2626" />
      <stop offset="90%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>
  </defs>

  <rect width="1000" height="580" fill="url(#ironbow)" rx="20" />

  <!-- OSD Overlays -->
  <g fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">
    <text x="40" y="45">M3T THERMAL IR • PALETTE: IRONBOW</text>
    <text x="40" y="70">SPOT: 37.1°C • AMBIENT: 19.4°C</text>
    <text x="750" y="45">RTK FIX • BAT: 92%</text>
    <text x="750" y="70">MODE: SAR SEARCH &amp; RESCUE</text>
  </g>

  <!-- Human Heat Signatures in Room -->
  <!-- Person 1 -->
  <g transform="translate(250, 200)">
    <!-- Hot body glow -->
    <ellipse cx="60" cy="120" rx="35" ry="80" fill="#fef08a" opacity="0.9" filter="drop-shadow(0 0 15px #f59e0b)" />
    <circle cx="60" cy="30" r="22" fill="#ffffff" filter="drop-shadow(0 0 20px #ef4444)" />
    <!-- Bounding box -->
    <rect x="15" y="-5" width="90" height="230" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="8 4" />
    <rect x="15" y="-30" width="90" height="22" fill="#0f172a" opacity="0.8" rx="4" />
    <text x="60" y="-14" fill="#fef08a" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">36.8°C ALUMNO</text>
  </g>

  <!-- Person 2 -->
  <g transform="translate(600, 180)">
    <ellipse cx="60" cy="130" rx="38" ry="90" fill="#fef08a" opacity="0.95" filter="drop-shadow(0 0 15px #f59e0b)" />
    <circle cx="60" cy="30" r="24" fill="#ffffff" filter="drop-shadow(0 0 20px #ef4444)" />
    <rect x="12" y="-5" width="96" height="250" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="8 4" />
    <rect x="12" y="-30" width="96" height="22" fill="#0f172a" opacity="0.8" rx="4" />
    <text x="60" y="-14" fill="#fef08a" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">37.1°C ALUMNO</text>
  </g>

  <!-- Crosshair in center -->
  <g transform="translate(500, 290)" stroke="#ffffff" stroke-width="2" opacity="0.7">
    <line x1="-30" y1="0" x2="30" y2="0" />
    <line x1="0" y1="-30" x2="0" y2="30" />
    <circle cx="0" cy="0" r="18" fill="none" />
  </g>

  <!-- Temperature gradient bar right -->
  <g transform="translate(930, 120)">
    <rect width="18" height="340" rx="9" fill="url(#ironbow)" stroke="#ffffff" stroke-width="2" />
    <text x="30" y="15" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold">42°</text>
    <text x="30" y="170" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold">30°</text>
    <text x="30" y="335" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold">15°</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'thermal_human_sar.svg'), thermalSvg)

// 7. NDVI Agriculture
const ndviSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="100%" height="100%">
  <defs>
    <linearGradient id="ndviGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14532d" />
      <stop offset="50%" stop-color="#84cc16" />
      <stop offset="80%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
  </defs>

  <rect width="1000" height="580" fill="#0f172a" rx="20" />

  <text x="500" y="45" fill="#84cc16" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" letter-spacing="2" text-anchor="middle">TELEDETECCIÓN AGRÍCOLA • MAVIC 3M</text>
  <text x="500" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="26" font-weight="900" text-anchor="middle">Índice de Vigor Vegetal (NDVI) &amp; Guiado de Aspersión</text>

  <!-- Crop field patches -->
  <g transform="translate(80, 120)">
    <!-- Zone 1: High vigor (Deep Green) -->
    <path d="M 0 0 L 260 0 L 220 180 L 0 160 Z" fill="#15803d" stroke="#22c55e" stroke-width="2" />
    <text x="110" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">NDVI +0.82</text>
    <text x="110" y="105" fill="#dcfce7" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Cultivo Sano (100%)</text>

    <!-- Zone 2: Moderate (Lime) -->
    <path d="M 280 0 L 560 0 L 520 180 L 240 180 Z" fill="#65a30d" stroke="#a3e635" stroke-width="2" />
    <text x="400" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">NDVI +0.55</text>
    <text x="400" y="105" fill="#ecfccb" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Crecimiento Normal</text>

    <!-- Zone 3: Water Stress / Plaga (Orange/Red) -->
    <path d="M 580 0 L 840 0 L 800 180 L 540 180 Z" fill="#ea580c" stroke="#f97316" stroke-width="2" />
    <text x="690" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="black" text-anchor="middle">NDVI +0.21</text>
    <text x="690" y="105" fill="#ffedd5" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">&iexcl;ALERTA ESTRÉS HÍDRICO!</text>

    <!-- Spray Drone Flight Path Guidance -->
    <path d="M 50 240 L 780 240 L 780 320 L 50 320" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="10 8" />
    <circle cx="780" cy="240" r="12" fill="#38bdf8" />
    <text x="420" y="285" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Ruta de Aplicación Automática para Dron Agrícola de 4° Medio</text>
  </g>

  <!-- Formula Banner Bottom -->
  <g transform="translate(80, 480)">
    <rect width="840" height="60" rx="12" fill="#1e293b" stroke="#334155" />
    <text x="420" y="36" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Fórmula: NDVI = (NIR - Red) / (NIR + Red) • Ahorro del 30% en fitosanitarios y agua</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'ndvi_agriculture.svg'), ndviSvg)

// 8. Photogrammetry 3D
const photoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="100%" height="100%">
  <rect width="1000" height="580" fill="#0f172a" rx="20" />
  
  <text x="500" y="45" fill="#a855f7" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" letter-spacing="2" text-anchor="middle">FOTOGRAMETRÍA AÉREA &amp; MODELADO TERRITORIAL</text>
  <text x="500" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="26" font-weight="900" text-anchor="middle">Nube de Millones de Puntos 3D del Campus Liceo San Nicolás</text>

  <!-- Topographic Isometric Elevation Contour Wireframe -->
  <g transform="translate(150, 140)">
    <!-- Contour ellipses -->
    <ellipse cx="350" cy="180" rx="320" ry="120" fill="none" stroke="#6366f1" stroke-width="2" opacity="0.4" />
    <ellipse cx="350" cy="160" rx="260" ry="100" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.6" />
    <ellipse cx="350" cy="140" rx="200" ry="80" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.8" />
    <ellipse cx="350" cy="120" rx="140" ry="60" fill="none" stroke="#c084fc" stroke-width="2.5" />
    <ellipse cx="350" cy="100" rx="80" ry="40" fill="none" stroke="#e879f9" stroke-width="3" />

    <!-- 3D dense point cloud dots -->
    <g fill="#38bdf8">
      ${Array.from({ length: 120 }).map((_, i) => {
        const x = 120 + ((i * 37) % 480);
        const y = 80 + ((i * 23) % 180);
        return `<circle cx="${x}" cy="${y}" r="${1.5 + (i % 3)}" opacity="0.75" />`
      }).join('')}
    </g>

    <!-- Phantom 4 Drone with Camera Nadir (Straight Down) -->
    <g transform="translate(350, 30)">
      <circle cx="0" cy="0" r="16" fill="#f8fafc" stroke="#a855f7" stroke-width="3" />
      <!-- Overlapping FoV cone -->
      <polygon points="0,16 -120,160 120,160" fill="#a855f7" opacity="0.15" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4 4" />
      <text x="0" y="-12" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Phantom 4 Pro (GSD 1.5 cm/px)</text>
    </g>
  </g>

  <!-- Metrics info box bottom -->
  <g transform="translate(100, 480)">
    <rect width="800" height="60" rx="12" fill="#1e293b" stroke="#334155" />
    <text x="400" y="36" fill="#c084fc" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">PRECISIÓN GNSS RTK CENTIMÉTRICA • OBTURADOR MECÁNICO ANTI-DISTORSIÓN</text>
  </g>
</svg>`

fs.writeFileSync(path.join(mediaDir, 'photogrammetry_3d.svg'), photoSvg)

console.log('Successfully generated all 8 primary SVG technical assets in public/media/')
