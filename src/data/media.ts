/**
 * CATÁLOGO CENTRAL DE RECURSOS MULTIMEDIA (.WEBP OPTIMIZADOS)
 * -------------------------------------------------------------------------
 * Todas las imágenes están generadas en alta resolución y comprimidas en
 * formato .webp dentro de la carpeta 'public/media/' para máximo rendimiento.
 *
 * ¿CÓMO REEMPLAZAR POR UNA FOTO REAL DE TU LICEO?
 * Simplemente guarda tu propia foto en 'public/media/' con el mismo nombre
 * (por ejemplo: 'public/media/grade_1_geogo.webp') o cambia la propiedad 'src'
 * en este archivo apuntando a tu nuevo archivo.
 */

export interface MediaItem {
  id: string
  title: string
  description: string
  src: string
  type: 'image' | 'video' | 'interactive'
  aspectRatio?: string
  realPhotoSlot: string // Guía rápida para el docente al reemplazar por foto propia
}

const baseUrl = import.meta.env.BASE_URL || '/'
const media = (filename: string) => `${baseUrl}media/${filename}`

export const MEDIA_CATALOG: Record<string, MediaItem> = {
  heroOverview: {
    id: 'heroOverview',
    title: 'Laboratorio de Especialidad: De la Electrónica a los Sistemas RPAS',
    description: 'Mesa técnica con Arduino Uno, placa PCB soldada, brazo impreso en 3D y dron DJI Mavic 3 Enterprise.',
    src: media('hero_overview.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/hero_overview.webp — Foto panorámica real de la mesa del taller con tus equipos.'
  },
  grade1Geogo: {
    id: 'grade1Geogo',
    title: '1° Medio • Geogo I: Fundamentos de Electrónica, Ley de Ohm y Diseño 3D',
    description: 'Arduino Uno, protoboard con diodos LED, resistencias axiales y sensor ultrasónico HC-SR04.',
    src: media('grade_1_geogo.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/grade_1_geogo.webp — Foto de un proyecto de 1° Medio en protoboard con Arduino.'
  },
  grade2Pcb3D: {
    id: 'grade2Pcb3D',
    title: '2° Medio • Geogo II: Placas PCB Soldadas, Manufactura 3D y Corte Láser',
    description: 'Placa PCB personalizada con pistas de cobre y oro junto a brazo de dron impreso en fibra de carbono.',
    src: media('grade_2_pcb_3d.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/grade_2_pcb_3d.webp — Foto de una placa PCB soldada e impresa por alumnos de 2° Medio.'
  },
  grade3Drones: {
    id: 'grade3Drones',
    title: '3° Medio • Geomática I: Aerodinámica RPAS, Normativa DGAC y Vuelo Seguro',
    description: 'Flota de entrenamiento con DJI NEO, FPV Whoop, cuadricóptero de carbono y DJI Phantom 4 Pro.',
    src: media('grade_3_drones.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/grade_3_drones.webp — Foto de práctica de vuelo en patio con los drones de 3° Medio.'
  },
  grade4Geomatica: {
    id: 'grade4Geomatica',
    title: '4° Medio • Geomática II: Sensores Térmicos (SAR), Multiespectrales (NDVI) y Fotogrametría',
    description: 'Dron DJI Mavic 3 Enterprise desplegando mapas térmicos de rescate e índices agrícolas NDVI.',
    src: media('grade_4_geomatica.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/grade_4_geomatica.webp — Foto del Mavic 3T / 3M operando en terreno en 4° Medio.'
  },
  protoVsPcb: {
    id: 'protoVsPcb',
    title: 'Evolución del Hardware: Protoboard de Pruebas (1° Medio) vs. Placa PCB Definitiva (2° Medio)',
    description: 'Comparación macro entre conexiones temporales en protoboard y pistas de cobre soldadas con estaño.',
    src: media('proto_vs_pcb.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/proto_vs_pcb.webp — Foto comparativa lado a lado de tu protoboard y tu placa PCB.'
  },
  manufacturingProcess: {
    id: 'manufacturingProcess',
    title: 'Fabricación Digital: Impresión 3D FDM (Relleno Panal) y Corte Láser de Precisión',
    description: 'Boquilla de bronce extruyendo filamento en estructura de panal y láser cortando fibra de carbono.',
    src: media('manufacturing_process.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/manufacturing_process.webp — Foto de la impresora 3D y cortadora láser del liceo.'
  },
  droneExplodedView: {
    id: 'droneExplodedView',
    title: 'Ingeniería Aeronáutica: Despiece Táctico de un Cuadricóptero RPAS',
    description: 'Hélices contra-rotativas, motores brushless 2207, controladora de vuelo, chasis 3K y batería LiPo.',
    src: media('drone_exploded.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/drone_exploded.webp — Foto real del dron FPV desarmado sobre la mesa del taller.'
  },
  thermalSensorSar: {
    id: 'thermalSensorSar',
    title: 'Cámara Térmica Radiométrica (DJI Mavic 3T) • Búsqueda y Rescate (SAR)',
    description: 'Espectro infrarrojo Ironbow detectando firmas de calor humano en zonas boscosas de baja visibilidad.',
    src: media('thermal_human_sar.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/thermal_human_sar.webp — Captura térmica real tomada con el Mavic 3T del liceo.'
  },
  ndviAgriculture: {
    id: 'ndviAgriculture',
    title: 'Cámara Multiespectral (DJI Mavic 3M) • Agricultura de Precisión e Índice NDVI',
    description: 'Ortomosaico multiespectral que mide el vigor fotosintético de los cultivos para guiar drones agrícolas.',
    src: media('ndvi_agriculture.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/ndvi_agriculture.webp — Mapa NDVI real procesado por tus estudiantes.'
  },
  photogrammetry3D: {
    id: 'photogrammetry3D',
    title: 'Fotogrametría Aérea (DJI Phantom 4 Pro) • Gemelo Digital 3D del Campus',
    description: 'Nube de puntos densa y malla tridimensional georreferenciada mediante grilla de vuelo autónomo.',
    src: media('photogrammetry_3d.webp'),
    type: 'image',
    realPhotoSlot: 'public/media/photogrammetry_3d.webp — Captura del modelo 3D del Liceo San Nicolás.'
  }
}
