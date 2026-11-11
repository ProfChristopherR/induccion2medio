import { useState, useEffect, useCallback } from 'react'

export type ActiveClass = 'class-1' | 'class-2'

interface PlatformState {
  activeClass: ActiveClass
  stationIndex: number
  timerSeconds: number
  isTimerRunning: boolean
  soundEnabled: boolean
  isPremilitarModalOpen: boolean
  completedStations: { [key: string]: boolean }
}

const DEFAULT_STATE: PlatformState = {
  activeClass: 'class-1',
  stationIndex: 0,
  timerSeconds: 90 * 60, // 90 min
  isTimerRunning: false,
  soundEnabled: true,
  isPremilitarModalOpen: false,
  completedStations: {}
}

let state: PlatformState = { ...DEFAULT_STATE }
const listeners = new Set<(s: PlatformState) => void>()

function notify() {
  listeners.forEach((listener) => listener(state))
}

export function usePlatformStore() {
  const [currentState, setCurrentState] = useState<PlatformState>(state)

  useEffect(() => {
    listeners.add(setCurrentState)
    return () => {
      listeners.delete(setCurrentState)
    }
  }, [])

  const setActiveClass = useCallback((cls: ActiveClass) => {
    state = {
      ...state,
      activeClass: cls,
      stationIndex: 0
    }
    notify()
  }, [])

  const maxIndex = state.activeClass === 'class-1' ? 5 : 7

  const goToStation = useCallback((idx: number) => {
    const limit = state.activeClass === 'class-1' ? 5 : 7
    state = { ...state, stationIndex: Math.max(0, Math.min(limit, idx)) }
    notify()
  }, [])

  const nextStation = useCallback(() => {
    const limit = state.activeClass === 'class-1' ? 5 : 7
    if (state.stationIndex < limit) {
      const nextIdx = state.stationIndex + 1
      const key = `${state.activeClass}-${state.stationIndex}`
      state = {
        ...state,
        stationIndex: nextIdx,
        completedStations: { ...state.completedStations, [key]: true }
      }
      notify()
    }
  }, [])

  const prevStation = useCallback(() => {
    if (state.stationIndex > 0) {
      state = { ...state, stationIndex: state.stationIndex - 1 }
      notify()
    }
  }, [])

  const toggleTimer = useCallback(() => {
    state = { ...state, isTimerRunning: !state.isTimerRunning }
    notify()
  }, [])

  const resetTimer = useCallback((minutes = 90) => {
    state = { ...state, timerSeconds: minutes * 60, isTimerRunning: false }
    notify()
  }, [])

  const toggleSound = useCallback(() => {
    state = { ...state, soundEnabled: !state.soundEnabled }
    notify()
  }, [])

  const setPremilitarModal = useCallback((open: boolean) => {
    state = { ...state, isPremilitarModalOpen: open }
    notify()
  }, [])

  return {
    ...currentState,
    setActiveClass,
    goToStation,
    nextStation,
    prevStation,
    toggleTimer,
    resetTimer,
    toggleSound,
    setPremilitarModal
  }
}

// Global timer interval
let timerInterval: ReturnType<typeof setInterval> | null = null

export function initGlobalTimer() {
  if (timerInterval) return
  timerInterval = setInterval(() => {
    if (state.isTimerRunning && state.timerSeconds > 0) {
      state = { ...state, timerSeconds: state.timerSeconds - 1 }
      notify()
    }
  }, 1000)
}
