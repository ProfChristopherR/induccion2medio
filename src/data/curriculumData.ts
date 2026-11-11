import type { CurriculumBlock, DroneSpec, MetarData } from '../types'

export interface LadderGrade {
  grade: string
  subject: string
  pillar: string
  modules: string[]
  practicalFocus: string
  color: string
}

export const LADDER_GRADES: LadderGrade[] = [
  {
    grade: '1° Medio',
    subject: 'Geogo I',
    pillar: 'Fundamentos de Ingeniería y Prototipado',
    modules: [
      'Electrónica Básica: Magnitudes eléctricas, Ley de Ohm, armado en protoboard (LEDs, resistencias, transistores)',
      'Programación e IA: Lógica en C++ (Arduino IDE), Prompt Engineering, IA Generativa aplicada',
      'Microcontroladores: Kit Arduino UNO XL y sensores básicos',
      'Diseño 3D: Modelado paramétrico inicial en Autodesk Fusion',
      'Física Aplicada: Circuitos eléctricos y refuerzo formativo'
    ],
    practicalFocus: 'Laboratorios de circuitos iniciales, control de sensores básicos y diseño estructural 3D simple.',
    color: 'emerald'
  },
  {
    grade: '2° Medio',
    subject: 'Geogo II',
    pillar: 'Integración de Sistemas y Manufactura Digital',
    modules: [
      'Electrónica Avanzada: Leyes de Kirchhoff, Teorema de Thévenin, diseño y confección de placas PCB',
      'Programación: C++ intermedio e introducción sólida a Python',
      'Arduino Avanzado: Integración modular de sensores y actuadores con lógica de control',
      'Manufactura Digital: Impresión 3D avanzada, corte láser y ruteo CNC',
      'Física Eléctrica Aplicada: Leyes de potencia y preparación PAES'
    ],
    practicalFocus: 'Creación de prototipos funcionales completos: chasis impreso en 3D + PCB propia soldada + código funcional.',
    color: 'cyan'
  },
  {
    grade: '3° Medio',
    subject: 'Geomática I',
    pillar: 'Operación de Sistemas UAV y Teledetección',
    modules: [
      'Sistemas Drone (RPAS): Clasificación aeronáutica, aerodinámica y componentes para fabricación',
      'Aeronáutica y Normativa: Regulaciones DGAC Chile, meteorología táctica, METAR y NOTAMs',
      'Operación de Vuelo: Práctica de vuelo, checklists pre/post-vuelo, movimientos de fotografía técnica',
      'Drones Industriales: Introducción a sensores multiespectrales y termográficos'
    ],
    practicalFocus: 'Entrenamiento de vuelo seguro, planificación de misiones de reconocimiento y captura de datos aéreos.',
    color: 'blue'
  },
  {
    grade: '4° Medio',
    subject: 'Geomática II',
    pillar: 'Operaciones Tácticas, Industriales y Agrícolas',
    modules: [
      'Regulación y Seguridad: Normativa DGAC avanzada y manipulación segura de plaguicidas agrícolas',
      'Teledetección Avanzada: Operaciones termales (búsqueda y rescate) y multiespectrales (NDVI)',
      'Fotogrametría y Terreno: Levantamientos topográficos, mallas 3D de nubes de puntos y curvas de nivel',
      'Drones Agrícolas: Sistemas de aspersión y aplicación aérea de precisión'
    ],
    practicalFocus: 'Despliegue en proyectos reales del territorio, procesamiento cartográfico profesional y misiones especializadas.',
    color: 'violet'
  }
]

export const CLASS_1_BLOCKS: CurriculumBlock[] = [
  {
    id: 'c1-b1',
    classId: 'class-1',
    title: '1. Briefing Táctico & Panorama General',
    subtitle: 'La Escalera de 1° a 4° Medio (Geogo y Geomática)',
    durationMinutes: 25,
    startMinute: 0,
    endMinute: 25,
    icon: 'Compass',
    description: 'Encuadre táctico de bienvenida. Presentación de los 4 años de especialidad conectando el cuerpo de las máquinas (1°/2° Medio) con el dominio aéreo (3°/4° Medio). Muestra del equipamiento real sobre la mesa del profesor.',
    keyConcepts: [
      'Geogo (1° y 2° Medio): Hardware, circuitos, código y manufactura',
      'Geomática (3° y 4° Medio): Espacio aéreo DGAC, teledetección y drones industriales',
      'Dron industrial en mesa como gancho de visión formativa'
    ]
  },
  {
    id: 'c1-b2',
    classId: 'class-1',
    title: '2. Electrónica en Vivo: Del Diagrama a la Placa',
    subtitle: 'Ley de Ohm, Simulación y Pasa-Manos de Hardware',
    durationMinutes: 30,
    startMinute: 25,
    endMinute: 55,
    icon: 'Zap',
    description: 'Explicación intuitiva de Voltaje, Corriente y Resistencia. Simulación interactiva con sobrecarga extrema de LED y demostración del circuito real en protoboard con circulación de muestras.',
    passAroundItem: {
      name: 'Muestras de Electrónica (3 Bandejas Cerradas)',
      trayNumber: 1,
      description: 'Bandeja 1: Protoboard con LEDs, resistencias y transistores. Bandeja 2: Placa PCB real soldada de 2° Medio. Bandeja 3: Módulos y sensores de Arduino.',
      keyFeatures: [
        'Examinar las pistas de cobre impresas en la PCB vs cables en protoboard',
        'Comprobar el código de colores de las resistencias',
        'Observar la polaridad del LED y patillaje de transistores'
      ],
      safetyNote: 'Mantener las muestras dentro de sus bandejas protectoras y circular de forma continua fila por fila.'
    },
    keyConcepts: [
      'Ley de Ohm: V = I · R (cálculo preventivo antes de armar)',
      'Diferencia táctica: Protoboard rápida (1° Medio) vs Placa PCB definitiva (2° Medio)',
      'Leyes de Kirchhoff y Teorema de Thévenin en diseño de circuitos'
    ]
  },
  {
    id: 'c1-b3',
    classId: 'class-1',
    title: '3. Diseño Paramétrico 3D & Manufactura Digital',
    subtitle: 'Autodesk Fusion, Impresión 3D y Corte Láser CNC',
    durationMinutes: 25,
    startMinute: 55,
    endMinute: 80,
    icon: 'Box',
    description: 'Demostración de modelado 3D paramétrico en vivo. Un alumno da una medida en milímetros y el modelo se recalcula en pantalla. Circulación de piezas reales impresas en 3D y grabadas en láser.',
    passAroundItem: {
      name: 'Muestras de Manufactura Digital',
      trayNumber: 2,
      description: 'Piezas técnicas impresas en 3D (PLA / PETG) con diferentes rellenos (infill) y piezas en acrílico/madera cortadas por láser CNC.',
      keyFeatures: [
        'Sentir las líneas de capa (layer lines) de la manufactura aditiva',
        'Verificar la resistencia estructural según el patrón de infill',
        'Comprobar la precisión milimétrica del encaje de piezas'
      ],
      safetyNote: 'No forzar uniones plásticas rígidas al manipularlas en el puesto.'
    },
    keyConcepts: [
      'Diseño paramétrico: dimensiones vinculadas que se adaptan automáticamente',
      'Manufactura aditiva (impresión 3D) vs sustractiva/corte (láser CNC)',
      'Tolerancias mecánicas para carcasas de drones y sensores'
    ]
  },
  {
    id: 'c1-b4',
    classId: 'class-1',
    title: '4. Cierre & Debriefing Clase 1',
    subtitle: 'Ronda de 3 Preguntas al Azar & Conexión con Clase 2',
    durationMinutes: 10,
    startMinute: 80,
    endMinute: 90,
    icon: 'CheckCircle2',
    description: 'Recolección de muestras. Preguntas rápidas a mano alzada para consolidar conceptos. Gancho hacia Clase 2: "Hoy vimos el cuerpo y la energía; la próxima daremos inteligencia con código y volaremos drones".',
    keyConcepts: [
      '¿Para qué sirve la resistencia que tuvieron en sus manos?',
      '¿Qué ventaja tiene una PCB frente a una protoboard?',
      '¿Cómo el diseño paramétrico ahorra horas de rediseño?'
    ]
  }
]

export const CLASS_2_BLOCKS: CurriculumBlock[] = [
  {
    id: 'c2-b1',
    classId: 'class-2',
    title: '1. Activación: El Cerebro de los Sistemas',
    subtitle: 'Programación en C++, Python e Inteligencia Artificial',
    durationMinutes: 10,
    startMinute: 0,
    endMinute: 10,
    icon: 'Cpu',
    description: 'Conexión con Clase 1: un circuito y una carcasa 3D no hacen nada sin un cerebro digital. Introducción al código estructurado y al uso táctico de la IA.',
    keyConcepts: [
      'C++ en Arduino (1° Medio): Control directo de pines y microsegundos',
      'Python (2° Medio): Procesamiento de datos y visión por computadora',
      'IA Generativa: Tu copiloto de desarrollo de hardware'
    ]
  },
  {
    id: 'c2-b2',
    classId: 'class-2',
    title: '2. Radar Táctico en 5 Minutos con IA',
    subtitle: 'Prompt Engineering, Código C++ y Sonar Ultrasónico',
    durationMinutes: 25,
    startMinute: 10,
    endMinute: 35,
    icon: 'Radio',
    description: 'Construcción del prompt perfecto para LLM. Carga de código C++ en Arduino UNO en vivo. Demostración con voluntario en primera fila acercando la mano al sensor HC-SR04 para escuchar la alarma por zonas.',
    keyConcepts: [
      'Fórmula del Prompt Táctico: [Rol] + [Hardware] + [Lógica de Pines] + [Restricciones]',
      'Sensor HC-SR04: Ondas de ultrasonido calculadas por tiempo de vuelo (Speed of Sound)',
      'Zonas de Alerta: Verde (>30cm), Precaución (15-30cm), Alarma Crítica (<15cm)'
    ]
  },
  {
    id: 'c2-b3',
    classId: 'class-2',
    title: '3. Hangar RPAS & Anatomía de un Dron',
    subtitle: 'Flota Completa, Motores Brushless y Pasa-Manos',
    durationMinutes: 15,
    startMinute: 35,
    endMinute: 50,
    icon: 'Plane',
    description: 'Presentación de la flota completa del liceo. Principios aerodinámicos de sustentación y rotación contra-rotativa. Circulación de componentes reales de dron por las filas.',
    passAroundItem: {
      name: 'Componentes de Dron (Anatomía RPAS)',
      trayNumber: 3,
      description: 'Motor brushless para sentir los imanes permanentes al girarlo con los dedos, hélice de fibra de carbono/plegable, chasis de fibra y controladora de vuelo con giroscopio.',
      keyFeatures: [
        'Girar el motor para sentir el par de retención (cogging torque) magnético',
        'Examinar el perfil aerodinámico alar de la hélice',
        'Notar la rigidez y ligereza de la fibra de carbono 3K'
      ],
      safetyNote: 'Manejar con cuidado los bordes de la fibra y las aspas.'
    },
    keyConcepts: [
      'Motores Brushless trifásicos controlados por ESCs (Electronic Speed Controllers)',
      'Rotación en pares opuestos (CW y CCW) para anular el torque de reacción',
      'Micro-demostración de vuelo seguro con DJI NEO / FPV Indoor'
    ]
  },
  {
    id: 'c2-b4',
    classId: 'class-2',
    title: '4. Aeronáutica DGAC & Meteorología Táctica',
    subtitle: 'METAR Aeródromo Chillán (SCCH) y Checklist Pre-Vuelo',
    durationMinutes: 10,
    startMinute: 50,
    endMinute: 60,
    icon: 'Wind',
    description: 'En 3° y 4° Medio se vuela bajo estándar DGAC profesional. Lectura en vivo de reporte meteorológico aeronáutico METAR y NOTAM de Chillán. Ejecución del checklist de seguridad en mesa.',
    keyConcepts: [
      'Lectura de METAR: Dirección/fuerza del viento en nudos, nubes y presión QNH',
      'Avisos NOTAM: Restricciones de espacio aéreo y zonas de exclusión',
      'Checklist Pre-Vuelo: Inspección de hélices, celdas LiPo en milivoltios y calibración IMU'
    ]
  },
  {
    id: 'c2-b5',
    classId: 'class-2',
    title: '5. HUD de Telemetría, Cámara Térmica y Fotogrametría',
    subtitle: 'Mavic 3T Termal, Mavic 3M Multiespectral y Mallas 3D',
    durationMinutes: 20,
    startMinute: 60,
    endMinute: 80,
    icon: 'Eye',
    description: 'Conexión del dron o control al proyector. Telemetría en pantalla (horizonte artificial, satélites, ángulo gimbal 20°-30°). Proyección de cámara térmica hacia el curso para ver calor humano en operaciones SAR y mapas NDVI agrícolas.',
    keyConcepts: [
      'Cámara Térmica Radiométrica (Mavic 3T): Detección de firmas térmicas para Búsqueda y Rescate (SAR)',
      'Cámara Multiespectral (Mavic 3M): Índice NDVI para salud vegetal y agricultura de precisión',
      'Fotogrametría 3D: Nubes de puntos y ortomosaicos georreferenciados'
    ]
  },
  {
    id: 'c2-b6',
    classId: 'class-2',
    title: '6. Debriefing Táctico Final: Trivia de Inducción',
    subtitle: '5 Preguntas en Proyector a Mano Alzada & Cierre Motivacional',
    durationMinutes: 10,
    startMinute: 80,
    endMinute: 90,
    icon: 'Trophy',
    description: 'Trivia interactiva rápida para consolidar el aprendizaje de la ruta Geogo - Geomática. Palabras de bienvenida a la especialidad técnica.',
    keyConcepts: [
      'Ruta completa: De programar un LED a volar misiones térmicas industriales',
      'Compromiso disciplinario y técnico de la educación premilitar'
    ]
  }
]

export const FLEET_DRONES: DroneSpec[] = [
  {
    id: 'dji-neo',
    name: 'DJI NEO',
    category: 'Micro/Selfie',
    weight: '135 g',
    flightTime: '18 min',
    sensors: ['Cámara 4K Estabilizada', 'Sensor óptico inferior', 'Guardas integrales de hélices'],
    pedagogicalRole: 'Demostración de despegue y vuelo estacionario ultra-seguro dentro de la sala de clases gracias a su protección 360°.',
    classMoment: 'Clase 2 - Minuto 45 (Activación de Vuelo Seguro)',
    inFlightDemoSafe: true,
    specs: {
      propellers: 'Hélices tripalas con ductos protectores cerrados',
      battery: 'Li-Po 1435 mAh',
      range: 'Hasta 7 km (O4)',
      camera: 'Sensor 1/2" 12 MP 4K UHD con EIS RockSteady',
      payload: 'Estructura ultraligera integrada'
    }
  },
  {
    id: 'fpv-indoor',
    name: 'Dron FPV Indoor (Whoop/CineWhoop)',
    category: 'FPV Indoor',
    weight: '110 g',
    flightTime: '6 min',
    sensors: ['Cámara analógica/digital FPV', 'Giroscopio/Acelerómetro IMU 6 ejes', 'Ductos plásticos'],
    pedagogicalRole: 'Muestra de pilotaje acro manual en espacios reducidos con gafas de inmersión y protección integral.',
    classMoment: 'Clase 2 - Minuto 45 (Maniobrabilidad en Espacio Confinado)',
    inFlightDemoSafe: true,
    specs: {
      propellers: 'Micro-hélices en conductos de alta resistencia',
      battery: 'LiPo 1S-2S de alta tasa de descarga (C-rate)',
      range: '500 m en interiores',
      camera: 'Cámara FPV de latencia ultrabaja (<20 ms)',
      payload: 'Cámara deportiva HD opcional'
    }
  },
  {
    id: 'fpv-outdoor',
    name: 'Dron FPV Outdoor Táctico (5 pulgadas)',
    category: 'FPV Outdoor',
    weight: '680 g (con batería)',
    flightTime: '9 min',
    sensors: ['Cámara digital HD FPV', 'Controladora Betaflight F7', 'GPS táctico opcional'],
    pedagogicalRole: 'Anatomía e ingeniería al desnudo: conecta electrónica de 1°/2° Medio (soldaduras, ESCs, motores brushless, placa de carbono) con aeronáutica.',
    classMoment: 'Clase 2 - Minuto 38 (Pasa-manos y estructura al desnudo)',
    inFlightDemoSafe: false,
    specs: {
      propellers: 'Trifilares 5x4.3 de policarbonato reforzado',
      battery: 'LiPo 6S 1300 mAh (22.2V)',
      range: 'Hasta 5 km con enlace ExpressLRS',
      camera: 'Sistema digital HD + Acción 4K',
      payload: 'Chasis de fibra de carbono 3K de 5mm'
    }
  },
  {
    id: 'dji-mini-4k',
    name: 'DJI Mini 4K',
    category: 'Sub-249g',
    weight: '246 g',
    flightTime: '31 min',
    sensors: ['Cámara 4K con Gimbal de 3 ejes', 'Sensor de visión inferior + ToF', 'GPS/GLONASS/Galileo'],
    pedagogicalRole: 'Aeronave escuela para 3° Medio: prácticas de vuelo inicial, movimientos de cámara cinematográficos y cumplimiento normativo DGAC <250g.',
    classMoment: 'Clase 2 - Minuto 55 (Inspección y Checklist Pre-Vuelo)',
    inFlightDemoSafe: false,
    specs: {
      propellers: 'Bipalas plegables de bajo ruido',
      battery: 'Li-Po 2S 2250 mAh',
      range: '10 km (OcuSync 2.0)',
      camera: 'Sensor CMOS 1/2.3" 12 MP 4K/30fps con Gimbal mecánico',
      payload: 'Diseño ultra-plegable'
    }
  },
  {
    id: 'phantom-4',
    name: 'DJI Phantom 4 Pro / RTK',
    category: 'Fotogrametría',
    weight: '1388 g',
    flightTime: '30 min',
    sensors: ['Cámara de 1 pulgada con Obturador Mecánico', 'Sensores de obstáculos 5 direcciones', 'Módulo GNSS RTK centimétrico'],
    pedagogicalRole: 'El estándar de oro de la fotogrametría clásica: su obturador mecánico elimina la distorsión por efecto persiana (rolling shutter) en vuelos de mapeo.',
    classMoment: 'Clase 2 - Minuto 75 (Topografía y Fotogrametría Aérea)',
    inFlightDemoSafe: false,
    specs: {
      propellers: 'Hélices de liberación rápida 9450S',
      battery: 'LiPo 4S 5870 mAh',
      range: '7 km (Lightbridge)',
      camera: 'Sensor CMOS 1" 20 MP con Mechanical Shutter (evita distorsión en movimiento)',
      payload: 'Módulo RTK de posicionamiento submétrico'
    }
  },
  {
    id: 'mavic-3t',
    name: 'DJI Mavic 3 Enterprise Thermal (3T)',
    category: 'Industrial Termal',
    weight: '920 g',
    flightTime: '45 min',
    sensors: ['Cámara Térmica Radiométrica 640×512', 'Gran Angular 48 MP', 'Telecámara Zoom 56x', 'Sensores omnidireccionales'],
    pedagogicalRole: 'Operaciones tácticas, búsqueda y rescate (SAR), inspección de líneas eléctricas y detección de calor corporal de personas en terreno.',
    classMoment: 'Clase 1 (Muestra en mesa) y Clase 2 - Minuto 65 (Proyección en Vivo hacia los Alumnos)',
    inFlightDemoSafe: false,
    specs: {
      propellers: 'Hélices 9453F de alta eficiencia',
      battery: 'LiPo 4S 5000 mAh',
      range: '15 km (DJI O3 Enterprise)',
      camera: 'Térmica 640x512 @ 30Hz (precisión ±2°C) + RGB 48 MP Zoom 56x',
      payload: 'Altavoz táctico / Baliza estroboscópica'
    }
  },
  {
    id: 'mavic-3m',
    name: 'DJI Mavic 3 Multispectral (3M)',
    category: 'Industrial Multiespectral',
    weight: '951 g',
    flightTime: '43 min',
    sensors: ['4 Sensores Multiespectrales (G/R/RE/NIR)', 'Cámara RGB 20 MP', 'Sensor de luz solar superior', 'RTK centimétrico'],
    pedagogicalRole: 'Agricultura de precisión de 4° Medio: medición de vigor fotosintético (NDVI), detección de estrés hídrico y plagas para guiado de drones de aspersión.',
    classMoment: 'Clase 2 - Minuto 72 (Índices de Vegetación y Drones Agrícolas)',
    inFlightDemoSafe: false,
    specs: {
      propellers: 'Hélices 9453F',
      battery: 'LiPo 4S 5000 mAh',
      range: '15 km (O3 Enterprise)',
      camera: 'RGB 20 MP + 4x 5 MP (Verde 560nm, Rojo 650nm, Red Edge 730nm, Infrarrojo Cercano NIR 860nm)',
      payload: 'Sensor de irradiancia solar en el domo'
    }
  }
]

export const CHILLAN_METAR: MetarData = {
  station: 'SCCH',
  stationName: 'Aeródromo Bernardo O\'Higgins, Chillán, Chile',
  raw: 'SCCH 111800Z 19008KT 9999 FEW030 19/11 Q1016 NOSIG',
  wind: {
    direction: 190,
    speedKnots: 8,
    description: 'Viento del Sur-Suroeste (190°) a 8 nudos (~15 km/h) — Condición óptima para vuelo de RPAS'
  },
  visibility: 'Mayor a 10 km (Visibilidad ilimitada)',
  clouds: 'Pocas nubes a 3.000 pies AGL (FEW030)',
  temperature: 19,
  dewPoint: 11,
  qnh: 1016,
  flightCategory: 'VFR',
  decodedSummary: 'Condiciones de Vuelo Visual (VFR) seguras en toda la zona del valle de Chillán / San Nicolás. Techo de nubes despejado y viento moderado perfectamente manejable por aeronaves de categoría C (Mavic 3 / Phantom 4).'
}

export const PREMILITAR_PROJECTS = [
  {
    title: 'Levantamiento Aerofotogramétrico Campus Liceo San Nicolás',
    category: 'Geomática 4° Medio',
    summary: 'Generación de modelo 3D digital de elevación (DEM) y curvas de nivel mediante Phantom 4 Pro con precisión centimétrica.',
    metrics: '12 hectáreas mapeadas • GSD 1.8 cm/px • 480 ortofotos'
  },
  {
    title: 'Monitoreo Multiespectral NDVI en Predios Agrícolas Locales',
    category: 'Geomática & Agrícola',
    summary: 'Detección temprana de clorofila y estrés hídrico con DJI Mavic 3M para optimizar aplicación de nutrientes y reducción de químicos.',
    metrics: '25 hectáreas • 4 bandas espectrales • Ahorro 30% insumos'
  },
  {
    title: 'Diseño e Impresión 3D de Chasis para Estación Meteorológica',
    category: 'Geogo 2° Medio',
    summary: 'Diseño en Autodesk Fusion de carcasa estanca IP65 con soportes para sensores Arduino y anemómetro táctico.',
    metrics: 'Filamento PETG UV • Placa PCB diseñada en KiCad • 100% autónomo'
  }
]

