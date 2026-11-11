import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePlatformStore } from '../../store/usePlatformStore'
import { MEDIA_CATALOG } from '../../data/media'
import { PromptEngineeringLab } from './PromptEngineeringLab'
import { AiRadarLab } from './AiRadarLab'
import { DroneFleetHangar } from './DroneFleetHangar'
import { DgacBriefing } from './DgacBriefing'
import { TelemetryHud } from './TelemetryHud'
import { TacticalTrivia } from './TacticalTrivia'
import { PassAroundCard } from '../layout/PassAroundCard'
import { Cpu, Terminal, Sparkles, Plane, Layers, RotateCw, ShieldCheck } from 'lucide-react'

export const CLASS_2_STATION_TITLES = [
  'El Cerebro Digital (C++, Python & IA)',
  'Ingeniería de Prompts para Hardware',
  'Laboratorio en Vivo: Radar Ultrasónico',
  'Anatomía RPAS + Bandeja 3',
  'Hangar: Flota de 7 Drones del Liceo',
  'Normativa DGAC & Clima Chillán',
  'Sensores Térmicos (SAR), NDVI y 3D',
  'Trivia Final de Especialidad'
]

export const CLASS_2_MINUTE_RANGES = [
  '00\' - 10\' min',
  '10\' - 25\' min',
  '25\' - 45\' min',
  '45\' - 55\' min',
  '55\' - 65\' min',
  '65\' - 75\' min',
  '75\' - 85\' min',
  '85\' - 90\' min'
]

const DRONE_LAYERS = [
  {
    id: 'props',
    layer: 'Nivel 1 • Propulsión Aerodinámica',
    name: 'Hélices Contra-Rotativas (CW y CCW)',
    desc: 'Dos hélices giran en sentido horario (CW) y dos en sentido antihorario (CCW) para cancelar el torque y evitar que el chasis gire sobre su propio eje.'
  },
  {
    id: 'motors',
    layer: 'Nivel 2 • Electromagnetismo',
    name: 'Motores Brushless Trifásicos (Sin Escobillas)',
    desc: 'Bobinas de cobre e imanes de neodimio que giran a más de 25.000 RPM sin fricción mecánica interna.'
  },
  {
    id: 'fc-esc',
    layer: 'Nivel 3 • Cerebro y Potencia',
    name: 'Controladora de Vuelo + ESC 4-en-1 + GPS',
    desc: 'Lee el giroscopio 1.000 veces por segundo para corregir la inclinación ante ráfagas de viento.'
  },
  {
    id: 'frame-lipo',
    layer: 'Nivel 4 • Estructura y Energía',
    name: 'Chasis de Fibra de Carbono 3K + Batería LiPo',
    desc: 'Estructura ultraligera más rígida que el acero combinada con celdas de polímero de litio de alta descarga.'
  }
]

export const Class2SequentialView: React.FC = () => {
  const { stationIndex } = usePlatformStore()
  const [selectedLayerIdx, setSelectedLayerIdx] = useState<number>(0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      {/* ================= ESTACIÓN 0: ACTIVACIÓN CEREBROS ================= */}
      {stationIndex === 0 && (
        <section aria-labelledby="c2-st0-title" className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              <Sparkles className="size-3.5" />
              Inicio de Clase 2 • Software, IA y Aviación No Tripulada
            </span>
            <h1 id="c2-st0-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              De la Materia Inerte al Código Inteligente
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              En la Clase 1 construimos el cuerpo físico y la electrónica. Hoy le daremos un <strong>cerebro digital</strong> y despegarán los sistemas aéreos del liceo.
            </p>
          </div>

          {/* High Impact Apple Glass Hero Showcase (.webp) */}
          <div className="apple-glass-dark rounded-3xl overflow-hidden relative aspect-[16/8] max-h-[420px] shadow-xl">
            <img
              src={MEDIA_CATALOG.heroOverview.src}
              alt={MEDIA_CATALOG.heroOverview.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-5 inset-x-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-0.5 text-[11px] font-semibold">
                  Taller Integrado • Liceo Bicentenario San Nicolás
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1.5">
                  Convergencia de Electrónica, Diseño 3D, IA y Drones
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-300">
                1° a 4° Medio • Geogo &amp; Geomática
              </span>
            </div>
          </div>

          {/* 3 Apple Glass Pillars of Software */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="apple-glass rounded-3xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
                  <Cpu className="size-5" />
                </div>
                <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                  1° Medio • Geogo I
                </span>
              </div>
              <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                C++ en Arduino IDE
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Control físico en microsegundos: emitir pulsos ultrasónicos, medir distancias al milímetro y accionar servomotores.
              </p>
            </div>

            <div className="apple-glass rounded-3xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600">
                  <Terminal className="size-5" />
                </div>
                <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                  2° Medio • Geogo II
                </span>
              </div>
              <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                Python &amp; Telemetría
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatización de sensores, procesamiento de datos aeroespaciales y visión por computador para robótica.
              </p>
            </div>

            <div className="apple-glass rounded-3xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600">
                  <Sparkles className="size-5" />
                </div>
                <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                  Copiloto Transversal
                </span>
              </div>
              <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                Inteligencia Artificial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingeniería de prompts estructurada para generar, depurar y optimizar código complejo de hardware en 5 minutos.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================= ESTACIÓN 1: PROMPT ENGINEERING ================= */}
      {stationIndex === 1 && (
        <section aria-labelledby="c2-st1-title">
          <PromptEngineeringLab />
        </section>
      )}

      {/* ================= ESTACIÓN 2: DEMO RADAR EN 5 MIN ================= */}
      {stationIndex === 2 && (
        <section aria-labelledby="c2-st2-title">
          <AiRadarLab />
        </section>
      )}

      {/* ================= ESTACIÓN 3: ANATOMÍA DRON + BANDEJA 3 ================= */}
      {stationIndex === 3 && (
        <section aria-labelledby="c2-st3-title" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                <Layers className="size-3.5" />
                Arquitectura Aeronáutica RPAS • 3° Medio
              </span>
              <h2 id="c2-st3-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1.5">
                Anatomía Interna de un Dron: Despiece por Capas
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Explora cada subsistema del cuadricóptero mientras las piezas reales circulan en la Bandeja 3.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {/* High-Res Exploded Drone .webp Photo (7 cols) */}
            <div className="lg:col-span-7 apple-glass-dark rounded-3xl overflow-hidden relative aspect-[16/10]">
              <img
                src={MEDIA_CATALOG.droneExplodedView.src}
                alt={MEDIA_CATALOG.droneExplodedView.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-white">
                <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 font-semibold">
                  Vista Explotada: 4 Niveles de Ingeniería
                </span>
                <span className="font-mono text-slate-300 flex items-center gap-1.5">
                  <RotateCw className="size-3.5 text-emerald-400 animate-spin" />
                  2×CW + 2×CCW Balance de Torque
                </span>
              </div>
            </div>

            {/* Interactive Layer Selector (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
              {DRONE_LAYERS.map((item, idx) => {
                const isSelected = idx === selectedLayerIdx
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLayerIdx(idx)}
                    className={`rounded-2xl p-4 text-left transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-lg ring-2 ring-blue-500/50'
                        : 'apple-glass hover:bg-white/90 text-slate-900'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isSelected ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      {item.layer}
                    </span>
                    <h3 className="text-sm font-extrabold mt-0.5">{item.name}</h3>
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-slate-300 mt-1.5 leading-relaxed overflow-hidden"
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                )
              })}
            </div>
          </div>

          <PassAroundCard
            trayNumber={3}
            trayTitle="Bandeja de Componentes RPAS (Motores Brushless, Hélices y Carbono 3K)"
            description="Sientan en sus manos las piezas reales que hacen volar a nuestros drones antes de pasar al hangar completo."
            whatToObserve={[
              'Gira la campana del motor brushless con los dedos: siente el "cogging" magnético de los imanes de neodimio.',
              'Observa el borde de ataque curvado de la hélice que empuja el aire hacia abajo.',
              'Intenta flectar suavemente el chasis de fibra de carbono 3K: ultraligero pero indeformable.'
            ]}
          />
        </section>
      )}

      {/* ================= ESTACIÓN 4: FLOTA DE DRONES ================= */}
      {stationIndex === 4 && (
        <section aria-labelledby="c2-st4-title" className="space-y-6">
          <DroneFleetHangar />

          {/* Indoor Safe Flight Callout */}
          <div className="apple-glass rounded-3xl p-5 border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                <Plane className="size-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  <ShieldCheck className="size-3.5" />
                  Demostración Segura en Sala
                </span>
                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Micro-Vuelo Estacionario con DJI NEO / FPV Indoor (Hélices Enjauladas)
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Gracias a sus ductos protectores de 360° y sensores ópticos inferiores, el profesor puede despegar el DJI NEO desde la palma de su mano frente a la pizarra con seguridad total en interiores.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 px-4 py-2.5 text-center shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                135 Gramos • Caged Props
              </span>
              <span className="text-xs font-medium text-emerald-700">
                100% Apto para Aula
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ================= ESTACIÓN 5: DGAC & CLIMA CHILLÁN ================= */}
      {stationIndex === 5 && (
        <section aria-labelledby="c2-st5-title">
          <DgacBriefing />
        </section>
      )}

      {/* ================= ESTACIÓN 6: SUPERPODERES VISUALES ================= */}
      {stationIndex === 6 && (
        <section aria-labelledby="c2-st6-title" className="space-y-6">
          {/* 3 High-Res .webp Sensor Showcases */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="apple-glass rounded-3xl overflow-hidden p-2.5 space-y-2.5 group">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={MEDIA_CATALOG.thermalSensorSar.src}
                  alt={MEDIA_CATALOG.thermalSensorSar.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-red-600/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  DJI Mavic 3T • Térmico
                </span>
              </div>
              <div className="px-2 pb-1">
                <h4 className="text-sm font-extrabold text-slate-900">
                  Búsqueda y Rescate (SAR) Infrarrojo
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detecta calor corporal humano en plena oscuridad o bosque denso.
                </p>
              </div>
            </div>

            <div className="apple-glass rounded-3xl overflow-hidden p-2.5 space-y-2.5 group">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={MEDIA_CATALOG.ndviAgriculture.src}
                  alt={MEDIA_CATALOG.ndviAgriculture.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-emerald-600/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  DJI Mavic 3M • NDVI
                </span>
              </div>
              <div className="px-2 pb-1">
                <h4 className="text-sm font-extrabold text-slate-900">
                  Agricultura de Precisión en Ñuble
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mide el estrés hídrico de cultivos antes de que sea visible al ojo humano.
                </p>
              </div>
            </div>

            <div className="apple-glass rounded-3xl overflow-hidden p-2.5 space-y-2.5 group">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={MEDIA_CATALOG.photogrammetry3D.src}
                  alt={MEDIA_CATALOG.photogrammetry3D.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-blue-600/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  Phantom 4 Pro • 3D
                </span>
              </div>
              <div className="px-2 pb-1">
                <h4 className="text-sm font-extrabold text-slate-900">
                  Fotogrametría y Gemelo Digital 3D
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reconstruye terrenos y edificios en nubes de puntos milimétricas.
                </p>
              </div>
            </div>
          </div>

          <TelemetryHud />
        </section>
      )}

      {/* ================= ESTACIÓN 7: TRIVIA FINAL & CIERRE ================= */}
      {stationIndex === 7 && (
        <section aria-labelledby="c2-st7-title">
          <TacticalTrivia />
        </section>
      )}
    </div>
  )
}
