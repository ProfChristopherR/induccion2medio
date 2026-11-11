import React, { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePlatformStore } from '../../store/usePlatformStore'

interface Props {
  stationIndex: number
  totalStations: number
  stationNames: string[]
}

export const StationNavigator: React.FC<Props> = ({
  stationIndex,
  totalStations,
  stationNames
}) => {
  const { nextStation, prevStation, goToStation } = usePlatformStore()

  // Keyboard navigation: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        nextStation()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prevStation()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextStation, prevStation])

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 pointer-events-none flex justify-center px-4">
      <nav
        aria-label="Navegación de clase"
        className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border border-white/85 bg-white/80 px-3 py-2 backdrop-blur-2xl shadow-[0_16px_40px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] max-w-4xl w-full"
      >
        {/* Previous Button */}
        <button
          onClick={prevStation}
          disabled={stationIndex === 0}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            stationIndex === 0
              ? 'opacity-35 cursor-not-allowed text-slate-400'
              : 'bg-slate-900/5 text-slate-800 hover:bg-slate-900/10 active:scale-95'
          }`}
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Apple-style Floating Dock Step Indicators */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalStations }).map((_, idx) => {
            const isCurrent = idx === stationIndex
            const isPast = idx < stationIndex

            return (
              <button
                key={idx}
                onClick={() => goToStation(idx)}
                title={`Paso ${idx + 1}: ${stationNames[idx]}`}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'text-white'
                    : isPast
                    ? 'text-slate-700 hover:bg-slate-900/5'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-900/5'
                }`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="dockStationPill"
                    className="absolute inset-0 rounded-full bg-slate-900 shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {isPast && <Check className="size-3 text-emerald-600 stroke-[2.5]" />}
                  <span>{idx + 1}</span>
                  {isCurrent && (
                    <span className="hidden lg:inline max-w-[150px] truncate text-[11px] font-medium text-slate-200 ml-1">
                      • {stationNames[idx]}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextStation}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all active:scale-95"
        >
          <span>{stationIndex === totalStations - 1 ? 'Finalizar' : 'Siguiente'}</span>
          <ArrowRight className="size-3.5" />
        </button>
      </nav>
    </div>
  )
}
