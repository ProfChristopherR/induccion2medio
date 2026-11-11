import React from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ExternalLink,
  GraduationCap,
  Clock,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { usePlatformStore } from '../../store/usePlatformStore'

interface Props {
  currentStationTitle: string
  currentStationNumber: number
  totalStations: number
  minuteRange: string
}

export const EducationalHeader: React.FC<Props> = ({
  currentStationTitle,
  currentStationNumber,
  totalStations,
  minuteRange
}) => {
  const {
    activeClass,
    setActiveClass,
    timerSeconds,
    isTimerRunning,
    toggleTimer,
    resetTimer,
    soundEnabled,
    toggleSound,
    setPremilitarModal
  } = usePlatformStore()

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/75 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
      {/* Top macOS-inspired Glass Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Liceo San Nicolás Brand */}
        <div className="flex items-center gap-3.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md ring-1 ring-black/10">
            <GraduationCap className="size-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Geogo &amp; Geomática
              </span>
              <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-900/10">
                Liceo Bicentenario San Nicolás
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              Plataforma Interactiva de Inducción • 1° a 4° Medio
            </p>
          </div>
        </div>

        {/* Segmented Control (Apple macOS / iPadOS Segmented Pill) */}
        <div className="relative flex items-center gap-1 rounded-2xl bg-slate-900/[0.06] p-1 border border-slate-900/[0.06] shadow-inner">
          {([
            { id: 'class-1', label: 'Clase 1: Electrónica & 3D', dot: 'bg-emerald-500' },
            { id: 'class-2', label: 'Clase 2: IA & Flota Drones', dot: 'bg-blue-500' }
          ] as const).map((tab) => {
            const isActive = activeClass === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveClass(tab.id)}
                className={`relative z-10 flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                  isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeClassPill"
                    className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_10px_rgba(15,23,42,0.08)] border border-black/[0.04]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 size-2 rounded-full ${tab.dot}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right Tools: Timer & Institutional Portal */}
        <div className="flex items-center gap-2.5">
          {/* Classroom Clock */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/80 px-3 py-1.5 shadow-2xs">
            <Clock className={`size-3.5 ${isTimerRunning ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
            <span className="font-mono text-xs font-bold text-slate-800 min-w-[42px]">
              {formatTime(timerSeconds)}
            </span>
            <div className="flex items-center gap-0.5 border-l border-slate-200 pl-1.5">
              <button
                onClick={toggleTimer}
                title={isTimerRunning ? 'Pausar Reloj' : 'Iniciar Tiempo de Clase'}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                {isTimerRunning ? <Pause className="size-3" /> : <Play className="size-3" />}
              </button>
              <button
                onClick={() => resetTimer(90)}
                title="Reiniciar a 90 min"
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="size-3" />
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Sonido Activado' : 'Silenciar'}
            className="rounded-xl border border-slate-900/10 bg-white/80 p-2 text-slate-600 hover:bg-white transition-colors shadow-2xs"
          >
            {soundEnabled ? <Volume2 className="size-3.5 text-emerald-600" /> : <VolumeX className="size-3.5 text-slate-400" />}
          </button>

          {/* Premilitar Portal */}
          <button
            onClick={() => setPremilitarModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-sm transition-all"
          >
            <span>Portal Premilitar</span>
            <ExternalLink className="size-3" />
          </button>
        </div>
      </div>

      {/* Sequential Step Ribbon */}
      <div className="border-t border-slate-900/[0.05] bg-slate-50/50 px-4 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-blue-600/10 border border-blue-600/20 px-2.5 py-0.5 font-bold text-blue-700 text-[11px]">
              Estación {currentStationNumber} de {totalStations}
            </span>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800 text-xs sm:text-sm tracking-tight">
              {currentStationTitle}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-slate-500">
            <span className="rounded-full bg-white/80 border border-slate-200/80 px-2.5 py-0.5 text-slate-700 font-semibold">
              Bloque {minuteRange}
            </span>
            <span>Navegación con teclado ← / →</span>
          </div>
        </div>
      </div>

      {/* Ultra-sleek Progress Hairline */}
      <div className="h-[2px] w-full bg-slate-200/60 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"
          initial={false}
          animate={{ width: `${(currentStationNumber / totalStations) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </header>
  )
}
