import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck, Weight, Clock, Camera, Plane } from 'lucide-react'
import { FLEET_DRONES } from '../../data/curriculumData'
import { MEDIA_CATALOG } from '../../data/media'

const DRONE_VISUAL_MAP: Record<string, string> = {
  'dji-neo': MEDIA_CATALOG.grade3Drones.src,
  'fpv-indoor': MEDIA_CATALOG.grade3Drones.src,
  'fpv-outdoor': MEDIA_CATALOG.droneExplodedView.src,
  'dji-mini-4k': MEDIA_CATALOG.grade3Drones.src,
  'phantom-4': MEDIA_CATALOG.photogrammetry3D.src,
  'mavic-3m': MEDIA_CATALOG.ndviAgriculture.src,
  'mavic-3t': MEDIA_CATALOG.thermalSensorSar.src
}

export const DroneFleetHangar: React.FC = () => {
  const [selectedDroneId, setSelectedDroneId] = useState<string>('mavic-3t')

  const activeDrone = FLEET_DRONES.find((d) => d.id === selectedDroneId) || FLEET_DRONES[0]
  const activeVisual = DRONE_VISUAL_MAP[activeDrone.id] || MEDIA_CATALOG.grade3Drones.src

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            <Plane className="size-3.5" />
            Hangar de Aeronaves • 7 Sistemas Reales en el Liceo
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1.5">
            Nuestra Flota RPAS: Desde Entrenamiento Indoor hasta Misiones Industriales
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Selecciona cada aeronave para inspeccionar su rol formativo y sus capacidades de misión.
          </p>
        </div>
      </div>

      {/* 7-Drone Apple Segmented Selector Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {FLEET_DRONES.map((drone) => {
          const isSelected = selectedDroneId === drone.id
          return (
            <button
              key={drone.id}
              onClick={() => setSelectedDroneId(drone.id)}
              className={`flex flex-col justify-between rounded-2xl p-3 text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-lg ring-2 ring-blue-500/50 -translate-y-0.5'
                  : 'apple-glass hover:bg-white/90 text-slate-800 hover:-translate-y-0.5'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-mono font-bold block truncate ${
                    isSelected ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {drone.category}
                </span>
                <h5 className="mt-1 text-xs font-extrabold leading-tight line-clamp-1">
                  {drone.name}
                </h5>
              </div>
              <div
                className={`mt-3 flex items-center justify-between text-[11px] font-mono font-semibold ${
                  isSelected ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                <span>{drone.weight}</span>
                {drone.inFlightDemoSafe && (
                  <span className="size-2 rounded-full bg-emerald-500" title="Apto para vuelo indoor seguro" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Drone Detail Inspection with Smooth Cross-Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDrone.id}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="apple-glass rounded-3xl p-6 grid gap-6 lg:grid-cols-12 items-center"
        >
          {/* Left Visual & Metrics (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] shadow-md">
              <img
                src={activeVisual}
                alt={activeDrone.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-bold text-white">
                  {activeDrone.category}
                </span>
                {activeDrone.inFlightDemoSafe && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                    <ShieldCheck className="size-3.5" />
                    Vuelo Indoor Seguro
                  </span>
                )}
              </div>
              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight">{activeDrone.name}</h3>
                  <p className="text-xs text-slate-300">{activeDrone.classMoment}</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/80 p-3.5 border border-slate-200/70 text-center">
                <Weight className="size-4 text-slate-500 mx-auto" />
                <span className="text-[11px] text-slate-500 block mt-1 font-medium">Peso Despegue</span>
                <span className="font-mono text-sm font-extrabold text-slate-900">{activeDrone.weight}</span>
              </div>
              <div className="rounded-2xl bg-white/80 p-3.5 border border-slate-200/70 text-center">
                <Clock className="size-4 text-blue-600 mx-auto" />
                <span className="text-[11px] text-slate-500 block mt-1 font-medium">Autonomía</span>
                <span className="font-mono text-sm font-extrabold text-blue-700">{activeDrone.flightTime}</span>
              </div>
              <div className="rounded-2xl bg-white/80 p-3.5 border border-slate-200/70 text-center">
                <Camera className="size-4 text-emerald-600 mx-auto" />
                <span className="text-[11px] text-slate-500 block mt-1 font-medium">Alcance Radio</span>
                <span className="font-mono text-sm font-extrabold text-emerald-700">{activeDrone.specs.range}</span>
              </div>
            </div>
          </div>

          {/* Right Technical Specs & Pedagogical Role (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-blue-600/[0.06] border border-blue-600/15 p-4 text-sm text-slate-700 leading-relaxed">
              <strong className="text-blue-900 font-bold block mb-1 text-xs uppercase tracking-wider">
                Rol Pedagógico en el Liceo:
              </strong>
              {activeDrone.pedagogicalRole}
            </div>

            <div className="rounded-2xl bg-white/80 border border-slate-200/70 p-4 space-y-2.5 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Especificaciones de Ingeniería
              </span>

              <div className="border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium block text-[11px]">Cámara y Sensores:</span>
                <span className="font-bold text-slate-900">{activeDrone.specs.camera}</span>
              </div>
              <div className="border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium block text-[11px]">Sistema de Energía:</span>
                <span className="font-bold text-slate-900">{activeDrone.specs.battery}</span>
              </div>
              <div className="border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium block text-[11px]">Propulsión:</span>
                <span className="font-bold text-slate-900">{activeDrone.specs.propellers}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block text-[11px]">Chasis / Carga Útil:</span>
                <span className="font-bold text-slate-900">{activeDrone.specs.payload}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
