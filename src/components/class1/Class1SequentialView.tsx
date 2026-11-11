import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePlatformStore } from '../../store/usePlatformStore'
import { MEDIA_CATALOG } from '../../data/media'
import { CircuitLab3D } from './CircuitLab3D'
import { Parametric3DLab } from './Parametric3DLab'
import { PassAroundCard } from '../layout/PassAroundCard'
import {
  ExternalLink,
  Check,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  Plane,
  ScanEye,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Box
} from 'lucide-react'
import confetti from 'canvas-confetti'

export const CLASS_1_STATION_TITLES = [
  'Ruta Formativa: Los 4 Años',
  'Laboratorio 3D: Ley de Ohm',
  'Protoboard vs. PCB + Bandeja 1',
  'Diseño CAD 3D Paramétrico',
  'Manufactura 3D & Láser + Bandeja 2',
  'Síntesis & Cierre de Clase 1'
]

export const CLASS_1_MINUTE_RANGES = [
  '00\' - 20\' min',
  '20\' - 45\' min',
  '45\' - 58\' min',
  '58\' - 73\' min',
  '73\' - 84\' min',
  '84\' - 90\' min'
]

interface YearShowcaseItem {
  id: string
  grade: string
  cycle: 'Ciclo Geogo' | 'Ciclo Geomática'
  title: string
  subtitle: string
  image: string
  photoSlotHint: string
  badgeColor: string
  icon: React.ReactNode
  milestone: string
  tools: string[]
  classroomHardware: string
  highlights: string[]
}

const FOUR_YEAR_SHOWCASE: YearShowcaseItem[] = [
  {
    id: '1-medio',
    grade: '1° Medio',
    cycle: 'Ciclo Geogo',
    title: 'Electrónica, Sensores y Modelado 3D',
    subtitle: 'El despertar tecnológico: circuitos en protoboard, código C++ en Arduino y diseño paramétrico.',
    image: MEDIA_CATALOG.grade1Geogo.src,
    photoSlotHint: MEDIA_CATALOG.grade1Geogo.realPhotoSlot,
    badgeColor: 'from-emerald-500 to-teal-600',
    icon: <Cpu className="size-4" />,
    milestone: 'Armar tu primer sistema electrónico funcional con sensores ultrasónicos y diseñar su soporte en 3D.',
    tools: ['Arduino IDE (C++)', 'Protoboard MB-102', 'Autodesk Fusion 360', 'Multímetro Digital'],
    classroomHardware: 'En la mesa del profesor: Placa Arduino Uno, protoboard cableada, resistencias y LEDs.',
    highlights: [
      'Dominio práctico de Voltaje (V), Corriente (I) y Resistencia (R).',
      'Programación de microcontroladores asistida por Inteligencia Artificial.',
      'Diseño de piezas en milímetros listas para fabricar.'
    ]
  },
  {
    id: '2-medio',
    grade: '2° Medio',
    cycle: 'Ciclo Geogo',
    title: 'Placas PCB Soldadas, Impresión 3D y Láser',
    subtitle: 'Del prototipo temporal al hardware definitivo resistente a vibraciones y manufactura digital.',
    image: MEDIA_CATALOG.grade2Pcb3D.src,
    photoSlotHint: MEDIA_CATALOG.grade2Pcb3d?.realPhotoSlot || MEDIA_CATALOG.grade2Pcb3D.realPhotoSlot,
    badgeColor: 'from-blue-600 to-indigo-600',
    icon: <Layers className="size-4" />,
    milestone: 'Diseñar y soldar con estaño tu propia placa electrónica PCB e imprimir chasis estructurales en 3D.',
    tools: ['EasyEDA / KiCad', 'Soldadura con Estaño', 'Impresoras 3D FDM', 'Cortadora Láser CO2'],
    classroomHardware: 'En la mesa del profesor: Placas PCB reales soldadas, piezas impresas en 3D y corte láser.',
    highlights: [
      'Transición de cables sueltos a pistas de cobre de grado industrial.',
      'Fabricación aditiva (filamento capa por capa con relleno panal).',
      'Corte láser de alta velocidad en acrílico, MDF y fibra de carbono.'
    ]
  },
  {
    id: '3-medio',
    grade: '3° Medio',
    cycle: 'Ciclo Geomática',
    title: 'Ingeniería RPAS, Normativa DGAC y Vuelo',
    subtitle: 'Física de vuelo, motores brushless, seguridad aeronáutica y pilotaje de precisión.',
    image: MEDIA_CATALOG.grade3Drones.src,
    photoSlotHint: MEDIA_CATALOG.grade3Drones.realPhotoSlot,
    badgeColor: 'from-indigo-600 to-violet-600',
    icon: <Plane className="size-4" />,
    milestone: 'Dominar la aerodinámica de cuadricópteros, la normativa chilena DAN 151/91 y el vuelo seguro.',
    tools: ['DJI NEO & FPV Indoor', 'FPV Outdoor 5"', 'DJI Mini 4K', 'Regulación DGAC Chile'],
    classroomHardware: 'En la mesa del profesor: Drones DJI NEO, FPV Indoor/Outdoor y componentes brushless.',
    highlights: [
      'Mecánica de motores sin escobillas (brushless) y chasis de fibra de carbono 3K.',
      'Planificación meteorológica real en Chillán (viento, temperatura, KP magnético).',
      'Prácticas de vuelo estacionario y maniobras de seguridad.'
    ]
  },
  {
    id: '4-medio',
    grade: '4° Medio',
    cycle: 'Ciclo Geomática',
    title: 'Sensores Térmicos (SAR), NDVI y Fotogrametría',
    subtitle: 'Operaciones industriales reales: rescate con cámara infrarroja, agricultura de precisión y mapas 3D.',
    image: MEDIA_CATALOG.grade4Geomatica.src,
    photoSlotHint: MEDIA_CATALOG.grade4Geomatica.realPhotoSlot,
    badgeColor: 'from-sky-500 to-blue-700',
    icon: <ScanEye className="size-4" />,
    milestone: 'Ejecutar misiones de búsqueda y rescate térmico, diagnóstico agrícola NDVI y levantamientos 3D.',
    tools: ['DJI Mavic 3T (Térmico)', 'DJI Mavic 3M (NDVI)', 'DJI Phantom 4 Pro', 'Fotogrametría 3D'],
    classroomHardware: 'En la mesa del profesor: Drones industriales DJI Mavic 3T, Mavic 3M y Phantom 4.',
    highlights: [
      'Detección de calor humano en emergencias mediante cámara radiométrica.',
      'Índices de vigor vegetal (NDVI) para optimizar riego y drones de aspersión agrícola.',
      'Reconstrucción de gemelos digitales y nubes de puntos 3D del territorio.'
    ]
  }
]

export const Class1SequentialView: React.FC = () => {
  const { stationIndex, goToStation, setActiveClass, setPremilitarModal } = usePlatformStore()

  // Station 0 state: Selected Year in the Apple Bento Grid
  const [selectedYearIdx, setSelectedYearIdx] = useState<number>(0)

  // Station 2 state: Vibration Stress Test Simulator (Protoboard vs PCB)
  const [vibrationTestActive, setVibrationTestActive] = useState<boolean>(false)

  // Station 4 state: Digital Manufacturing Mode Inspector
  const [mfgTab, setMfgTab] = useState<'fdm' | 'laser'>('fdm')
  const [infillDensity, setInfillDensity] = useState<number>(20)

  // Station 5 state: Debriefing questions
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  const activeYear = FOUR_YEAR_SHOWCASE[selectedYearIdx]

  const questions = [
    {
      q: '1. ¿Qué función cumple la resistencia eléctrica que observaron en el simulador 3D y en la Bandeja 1?',
      a: 'Regula y limita el flujo de corriente eléctrica (Ley de Ohm: I = V / R). Sin ella, el exceso de corriente funde el semiconductor del LED en milisegundos.'
    },
    {
      q: '2. ¿Por qué en 2° Medio pasamos de la protoboard blanca a diseñar y soldar nuestras propias placas PCB?',
      a: 'Porque los cables insertados a presión en una protoboard se sueltan con las vibraciones. Una placa PCB con pistas de cobre soldadas con estaño soporta aceleraciones extremas en un robot o dron.'
    },
    {
      q: '3. ¿Por qué diseñamos en Autodesk Fusion con parámetros milimétricos en lugar de dibujar a mano alzada?',
      a: 'Porque el diseño paramétrico vincula toda la geometría a variables: al cambiar el diámetro de un motor, los orificios M3 y el brazo se adaptan automáticamente sin rehacer el modelo.'
    }
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      {/* ================= ESTACIÓN 0: RUTA FORMATIVA 4 AÑOS (APPLE BENTO SHOWCASE) ================= */}
      {stationIndex === 0 && (
        <section aria-labelledby="st0-title" className="space-y-6">
          {/* Top Apple Hero Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 border border-blue-600/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                <Sparkles className="size-3.5" />
                Mapa de Ruta • 1° a 4° Medio
              </div>
              <h1 id="st0-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Cuatro Años Creando Tecnología Real
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Un viaje continuo desde tu primer circuito en <strong>Geogo</strong> hasta pilotar drones térmicos y multiespectrales en <strong>Geomática</strong>. Selecciona cada año para explorar qué construirás:
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setPremilitarModal(true)}
                className="apple-glass hover:bg-white rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-800 inline-flex items-center gap-2 transition-all"
              >
                <span>Ver Portal premilitar.liceosannicolas.cl</span>
                <ExternalLink className="size-3.5 text-blue-600" />
              </button>
            </div>
          </div>

          {/* 4-Card Apple Bento Selector Row */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {FOUR_YEAR_SHOWCASE.map((item, idx) => {
              const isSelected = idx === selectedYearIdx
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setSelectedYearIdx(idx)}
                  className={`group relative rounded-3xl p-3.5 text-left transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] ring-2 ring-blue-500'
                      : 'apple-glass hover:bg-white/90 text-slate-900'
                  }`}
                >
                  {/* Thumbnail Image with Smooth Zoom */}
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-slate-950 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span
                        className={`rounded-full bg-gradient-to-r ${item.badgeColor} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm`}
                      >
                        {item.grade}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-semibold text-slate-200">
                      <span>{item.cycle}</span>
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-2 py-0.5 text-white">
                        Explorar →
                      </span>
                    </div>
                  </div>

                  {/* Card Text */}
                  <h3 className="text-sm font-extrabold tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </motion.button>
              )
            })}
          </div>

          {/* Interactive Spotlight Stage for the Selected Year (Fade-In / Fade-Out) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear.id}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="apple-glass rounded-3xl p-5 sm:p-6 grid gap-6 lg:grid-cols-12 items-center"
            >
              {/* Left Visual Showcase (7 cols) */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] shadow-lg group">
                <img
                  src={activeYear.image}
                  alt={activeYear.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Top Glass Pill */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${activeYear.badgeColor} px-3.5 py-1 text-xs font-bold text-white shadow-md`}
                  >
                    {activeYear.icon}
                    <span>
                      {activeYear.grade} • {activeYear.cycle}
                    </span>
                  </span>
                </div>

                {/* Bottom Overlay Info inside Image */}
                <div className="absolute bottom-4 inset-x-4 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {activeYear.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white/15 backdrop-blur-xl border border-white/20 px-3 py-1 text-[11px] font-semibold text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-slate-300/90">
                    {activeYear.classroomHardware}
                  </p>
                </div>
              </div>

              {/* Right Pedagogical Details & Quick Jump (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Detalle del Nivel • {activeYear.grade}
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
                    {activeYear.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {activeYear.subtitle}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-600/[0.06] border border-blue-600/15 p-4 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">
                    Meta Práctica del Estudiante
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    {activeYear.milestone}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Competencias Clave
                  </span>
                  {activeYear.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                        <Check className="size-3 stroke-[2.5]" />
                      </div>
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  {selectedYearIdx === 0 && (
                    <button
                      onClick={() => goToStation(1)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 shadow-sm transition-all"
                    >
                      <span>Ir al Simulador 3D de Ley de Ohm</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  )}
                  {selectedYearIdx === 1 && (
                    <button
                      onClick={() => goToStation(3)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 shadow-sm transition-all"
                    >
                      <span>Probar Modelado CAD 3D en Vivo</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  )}
                  {(selectedYearIdx === 2 || selectedYearIdx === 3) && (
                    <button
                      onClick={() => setActiveClass('class-2')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-sm transition-all"
                    >
                      <span>Explorar Flota de Drones en Clase 2</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  )}

                  {selectedYearIdx < 3 && (
                    <button
                      onClick={() => setSelectedYearIdx(selectedYearIdx + 1)}
                      className="rounded-2xl bg-slate-900/5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-900/10 transition-all"
                    >
                      Ver {FOUR_YEAR_SHOWCASE[selectedYearIdx + 1].grade} →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      )}

      {/* ================= ESTACIÓN 1: LABORATORIO 3D DE CIRCUITOS Y LEY DE OHM ================= */}
      {stationIndex === 1 && (
        <section aria-labelledby="st1-title">
          <CircuitLab3D />
        </section>
      )}

      {/* ================= ESTACIÓN 2: PROTOBOARD VS PCB + BANDEJA 1 ================= */}
      {stationIndex === 2 && (
        <section aria-labelledby="st2-title" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                Evolución de Hardware • 1° a 2° Medio
              </span>
              <h2 id="st2-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1.5">
                De la Protoboard Experimental a la Placa PCB Soldada
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Descubre por qué un dron o robot de rescate necesita pistas de cobre soldadas con estaño.
              </p>
            </div>

            <button
              onClick={() => setVibrationTestActive(!vibrationTestActive)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all shrink-0 ${
                vibrationTestActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 animate-pulse'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
              }`}
            >
              <Activity className="size-4" />
              <span>
                {vibrationTestActive ? 'Detener Prueba de Vibración' : 'Simular Vibración de Vuelo en Vivo'}
              </span>
            </button>
          </div>

          {/* Visual Studio Comparison + Interactive Vibration Stress Test */}
          <div className="grid gap-5 lg:grid-cols-12">
            {/* High-Res .webp Studio Comparison Photo (7 cols) */}
            <div className="lg:col-span-7 apple-glass-dark rounded-3xl overflow-hidden relative aspect-[16/10] flex items-center justify-center">
              <img
                src={MEDIA_CATALOG.protoVsPcb.src}
                alt={MEDIA_CATALOG.protoVsPcb.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  vibrationTestActive ? 'scale-103' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-white">
                <span className="rounded-full bg-amber-500/25 border border-amber-400/40 backdrop-blur-md px-3 py-1 font-semibold text-amber-200">
                  Izquierda: Protoboard (1° Medio)
                </span>
                <span className="rounded-full bg-emerald-500/25 border border-emerald-400/40 backdrop-blur-md px-3 py-1 font-semibold text-emerald-200">
                  Derecha: Placa PCB Soldada (2° Medio)
                </span>
              </div>
            </div>

            {/* Interactive Comparison & Vibration Diagnostic (5 cols) */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-4">
              {/* Card A: Protoboard */}
              <motion.div
                animate={
                  vibrationTestActive
                    ? { x: [-3, 3, -3, 3, 0], rotate: [-0.8, 0.8, -0.5, 0] }
                    : { x: 0, rotate: 0 }
                }
                transition={{ repeat: vibrationTestActive ? Infinity : 0, duration: 0.35 }}
                className={`apple-glass rounded-3xl p-5 flex flex-col justify-between border ${
                  vibrationTestActive ? 'border-red-400 bg-red-50/70' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/25 px-3 py-0.5 text-[11px] font-bold text-amber-800">
                    1° Medio • Protoboard sin Soldadura
                  </span>
                  {vibrationTestActive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                      <AlertTriangle className="size-4" />
                      ¡Fallo por cable suelto!
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Uso en mesa</span>
                  )}
                </div>

                <div className="my-2">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Ideal para aprender y cambiar piezas en segundos
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Los componentes se insertan a presión en pinzas internas. Perfecta para ensayar circuitos, pero sensible al movimiento brusco.
                  </p>
                </div>

                <div className="rounded-xl bg-white/80 border border-slate-200/70 px-3 py-2 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Resistencia a vibraciones de vuelo:</span>
                  <span className="text-red-600 font-bold">Baja (Se desconecta)</span>
                </div>
              </motion.div>

              {/* Card B: Soldered PCB */}
              <div
                className={`apple-glass rounded-3xl p-5 flex flex-col justify-between border ${
                  vibrationTestActive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/12 border border-emerald-500/25 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                    2° Medio • Placa PCB Soldada con Estaño
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <ShieldCheck className="size-4" />
                    100% Estable en Vuelo
                  </span>
                </div>

                <div className="my-2">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Pistas de cobre fundidas a 350 °C con estaño
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Reemplazamos todos los cables por caminos de cobre grabados en fibra de vidrio FR4. Nada se suelta aunque el dron gire a 100 km/h.
                  </p>
                </div>

                <div className="rounded-xl bg-white/80 border border-slate-200/70 px-3 py-2 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Resistencia a vibraciones de vuelo:</span>
                  <span className="text-emerald-700 font-bold">Grado Aeronáutico</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pass-Around Guidance Card */}
          <PassAroundCard
            trayNumber={1}
            trayTitle="Bandejas de Electrónica (Protoboard, Placas PCB y Sensores Arduino)"
            description="Mientras observan la comparativa en pantalla, las bandejas circulan por las filas para que comparen el peso, la firmeza y las soldaduras."
            whatToObserve={[
              'Bandeja 1: Observa las 4 bandas de color en las resistencias y siente cómo entran las patas en la protoboard.',
              'Bandeja 2: Da vuelta la placa PCB y toca las pistas de cobre y los conos brillantes de soldadura con estaño.',
              'Bandeja 3: Examina el sensor ultrasónico HC-SR04 (los dos cilindros metálicos que emiten y reciben ecos).'
            ]}
          />
        </section>
      )}

      {/* ================= ESTACIÓN 3: MODELADO 3D PARAMÉTRICO ================= */}
      {stationIndex === 3 && (
        <section aria-labelledby="st3-title">
          <Parametric3DLab />
        </section>
      )}

      {/* ================= ESTACIÓN 4: MANUFACTURA DIGITAL + BANDEJA 2 ================= */}
      {stationIndex === 4 && (
        <section aria-labelledby="st4-title" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                Del Archivo Digital al Objeto Físico • 2° Medio
              </span>
              <h2 id="st4-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1.5">
                Manufactura Digital: Impresión 3D Aditiva vs. Corte Láser Sustractivo
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Una vez diseñado el modelo en Autodesk Fusion, elegimos la máquina ideal según la geometría de la pieza.
              </p>
            </div>

            {/* Process Switcher */}
            <div className="flex items-center gap-1 rounded-2xl bg-slate-900/5 p-1 border border-slate-900/10 shrink-0">
              <button
                onClick={() => setMfgTab('fdm')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
                  mfgTab === 'fdm' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Box className="size-3.5" />
                <span>Impresión 3D (Aditiva)</span>
              </button>
              <button
                onClick={() => setMfgTab('laser')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
                  mfgTab === 'laser' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Flame className="size-3.5" />
                <span>Corte Láser (Sustractivo)</span>
              </button>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {/* High-Resolution .webp Studio Diptych (7 cols) */}
            <div className="lg:col-span-7 apple-glass-dark rounded-3xl overflow-hidden relative aspect-[16/10]">
              <img
                src={MEDIA_CATALOG.manufacturingProcess.src}
                alt={MEDIA_CATALOG.manufacturingProcess.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white">
                <span className="rounded-full bg-blue-500/30 border border-blue-400/40 backdrop-blur-md px-3 py-1 font-semibold">
                  Izquierda: Boquilla 210 °C depositando capas de 0.2 mm
                </span>
                <span className="rounded-full bg-orange-500/30 border border-orange-400/40 backdrop-blur-md px-3 py-1 font-semibold">
                  Derecha: Haz Láser cortando perfiles estructurales
                </span>
              </div>
            </div>

            {/* Interactive Infill & Weight Simulator (5 cols) */}
            <div className="lg:col-span-5 apple-glass rounded-3xl p-6 flex flex-col justify-between space-y-4">
              {mfgTab === 'fdm' ? (
                <>
                  <div className="space-y-2">
                    <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-0.5 text-[11px] font-bold text-blue-700">
                      Secreto Aeronáutico • Relleno Interno (Infill)
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                      ¿Por qué las piezas 3D de un dron no son 100% macizas?
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Para que un dron vuele más tiempo, necesitamos piezas <strong>ultralivianas pero rígidas</strong>. Las impresoras 3D crean una geometría interna de panal de abeja:
                    </p>
                  </div>

                  {/* Interactive Infill Slider */}
                  <div className="rounded-2xl bg-white/80 border border-slate-200/80 p-4 space-y-3">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700">Densidad de Relleno (Infill):</span>
                      <span className="font-mono font-bold text-blue-600">{infillDensity}%</span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={100}
                      step={5}
                      value={infillDensity}
                      onChange={(e) => setInfillDensity(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="rounded-xl bg-slate-50 p-2 border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 block font-semibold">Peso Brazo</span>
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {Math.round(14 + infillDensity * 0.32)} g
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-2 border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 block font-semibold">Tiempo Impresión</span>
                        <span className="font-mono text-xs font-bold text-blue-700">
                          {Math.round(22 + infillDensity * 0.65)} min
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-2 border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 block font-semibold">Eficiencia Vuelo</span>
                        <span
                          className={`font-mono text-xs font-bold ${
                            infillDensity <= 35 ? 'text-emerald-600' : 'text-amber-600'
                          }`}
                        >
                          {infillDensity <= 35 ? 'Óptima (Ligero)' : 'Pesado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-500">
                    Al <strong>20% - 25% de relleno panal</strong> logramos el 85% de la resistencia estructural con menos de la mitad del peso.
                  </p>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-0.5 text-[11px] font-bold text-orange-800">
                      Velocidad Instantánea • Corte Láser CNC
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                      Placas estructurales listas en menos de 2 minutos
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Mientras una impresora 3D tarda 40 minutos en depositar capas para una figura con volumen, la cortadora láser vaporiza el contorno en láminas planas con precisión de <strong>0.1 mm</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="rounded-2xl bg-white/80 border border-slate-200/70 p-3.5">
                      <span className="font-bold text-slate-900 block">Ideal para Impresión 3D</span>
                      <span className="text-slate-600 text-[11px] mt-1 block">
                        Soportes de cámara, carcasas curvas, protectores de hélice (ductos) y engranes.
                      </span>
                    </div>
                    <div className="rounded-2xl bg-white/80 border border-slate-200/70 p-3.5">
                      <span className="font-bold text-slate-900 block">Ideal para Corte Láser</span>
                      <span className="text-slate-600 text-[11px] mt-1 block">
                        Placas centrales de chasis, bases para robots, cajas de instrumentos y paneles.
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <PassAroundCard
            trayNumber={2}
            trayTitle="Muestras de Manufactura (Piezas Impresas en 3D y Corte Láser)"
            description="Sientan en sus manos la diferencia entre el plástico fundido capa por capa y el corte térmico de precisión."
            whatToObserve={[
              'Pasa la uña por el costado de la pieza 3D: sentirás las micro-capas de 0.2 milímetros.',
              'Mira la pieza abierta a mitad de impresión para ver las celdas hexagonales (panal) por dentro.',
              'Compara la rigidez y el borde liso de la placa cortada por láser.'
            ]}
          />
        </section>
      )}

      {/* ================= ESTACIÓN 5: SÍNTESIS Y CIERRE DE CLASE 1 ================= */}
      {stationIndex === 5 && (
        <section aria-labelledby="st5-title" className="space-y-6 max-w-4xl mx-auto">
          <div className="apple-glass rounded-3xl p-8 text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              Síntesis Formativa • Cierre de Clase 1
            </span>
            <h2 id="st5-title" className="text-3xl font-extrabold tracking-tight text-slate-900">
              Verificación de Aprendizaje en Sala
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Tres preguntas clave a mano alzada antes de pasar a la programación con Inteligencia Artificial y el vuelo de drones en la Clase 2.
            </p>
          </div>

          <div className="apple-glass rounded-3xl p-7 space-y-5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>
                PREGUNTA {activeQuestion + 1} DE {questions.length}
              </span>
              <span className="text-blue-600">Participación a mano alzada</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
              {questions[activeQuestion].q}
            </h3>

            <AnimatePresence mode="wait">
              {showAnswer ? (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600 stroke-[2.5]" />
                    Respuesta Técnica Correcta
                  </span>
                  <p className="mt-2 text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {questions[activeQuestion].a}
                  </p>
                </motion.div>
              ) : (
                <motion.button
                  key="reveal-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setShowAnswer(true)
                    confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } })
                  }}
                  className="w-full rounded-2xl border border-slate-300/80 bg-white/80 py-4 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 shadow-2xs transition-all"
                >
                  Revelar Respuesta en Pantalla
                </motion.button>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
              <button
                onClick={() => {
                  setShowAnswer(false)
                  setActiveQuestion((prev) => (prev + 1) % questions.length)
                }}
                className="rounded-full bg-slate-900/5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-900/10 transition-colors"
              >
                Siguiente Pregunta ({((activeQuestion + 1) % questions.length) + 1}/{questions.length})
              </button>

              <button
                onClick={() => {
                  confetti({ particleCount: 90, spread: 80 })
                  setActiveClass('class-2')
                }}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-md transition-all"
              >
                <span>Continuar a Clase 2: IA &amp; Flota de Drones</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
