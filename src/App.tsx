import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePlatformStore, initGlobalTimer } from './store/usePlatformStore'
import { EducationalHeader } from './components/layout/EducationalHeader'
import { StationNavigator } from './components/layout/StationNavigator'
import { PremilitarModal } from './components/layout/PremilitarModal'
import { 
  Class1SequentialView, 
  CLASS_1_STATION_TITLES, 
  CLASS_1_MINUTE_RANGES 
} from './components/class1/Class1SequentialView'
import { 
  Class2SequentialView, 
  CLASS_2_STATION_TITLES, 
  CLASS_2_MINUTE_RANGES 
} from './components/class2/Class2SequentialView'

export default function App() {
  const { 
    activeClass, 
    stationIndex, 
    isPremilitarModalOpen, 
    setPremilitarModal 
  } = usePlatformStore()

  useEffect(() => {
    initGlobalTimer()
  }, [])

  const currentTitles = activeClass === 'class-1' ? CLASS_1_STATION_TITLES : CLASS_2_STATION_TITLES
  const currentMinuteRanges = activeClass === 'class-1' ? CLASS_1_MINUTE_RANGES : CLASS_2_MINUTE_RANGES

  const totalStations = currentTitles.length
  const currentStationTitle = currentTitles[stationIndex] || currentTitles[0]
  const currentMinuteRange = currentMinuteRanges[stationIndex] || currentMinuteRanges[0]

  return (
    <div className="min-h-screen apple-ambient-bg text-slate-900 flex flex-col font-sans selection:bg-blue-600/15 selection:text-blue-900 relative overflow-x-hidden">
      {/* Subtle Ambient Light Orbs (Apple Keynote Spatial Backdrop) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-36 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/8 blur-[130px]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-emerald-500/8 blur-[120px]" />
      </div>

      {/* Apple Glassmorphic Top Header & Progress Ribbon */}
      <EducationalHeader
        currentStationTitle={currentStationTitle}
        currentStationNumber={stationIndex + 1}
        totalStations={totalStations}
        minuteRange={currentMinuteRange}
      />

      {/* Main Educational Screen (1 Station at a time, Smooth Fade-In / Fade-Out) */}
      <main className="relative z-10 flex-1 pb-28 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeClass}-${stationIndex}`}
            initial={{ opacity: 0, y: 14, scale: 0.992, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, scale: 0.992, filter: 'blur(6px)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeClass === 'class-1' ? (
              <Class1SequentialView />
            ) : (
              <Class2SequentialView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Glass Dock Navigator (ArrowLeft / ArrowRight / Wireless Clicker) */}
      <StationNavigator
        stationIndex={stationIndex}
        totalStations={totalStations}
        stationNames={currentTitles}
      />

      {/* Liceo San Nicolás Premilitar Project Showcase Modal */}
      <PremilitarModal
        isOpen={isPremilitarModalOpen}
        onClose={() => setPremilitarModal(false)}
      />
    </div>
  )
}
