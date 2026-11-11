export type ClassId = 'class-1' | 'class-2'

export interface CurriculumBlock {
  id: string
  classId: ClassId
  title: string
  subtitle: string
  durationMinutes: number
  startMinute: number
  endMinute: number
  icon: string
  description: string
  passAroundItem?: {
    name: string
    trayNumber: number
    description: string
    keyFeatures: string[]
    safetyNote?: string
  }
  keyConcepts: string[]
}

export interface DroneSpec {
  id: string
  name: string
  category: 'FPV Indoor' | 'FPV Outdoor' | 'Sub-249g' | 'Fotogrametría' | 'Industrial Termal' | 'Industrial Multiespectral' | 'Micro/Selfie'
  weight: string
  flightTime: string
  sensors: string[]
  pedagogicalRole: string
  classMoment: string
  inFlightDemoSafe: boolean
  specs: {
    propellers: string
    battery: string
    range: string
    camera: string
    payload: string
  }
}

export interface MetarData {
  station: string
  stationName: string
  raw: string
  wind: {
    direction: number
    speedKnots: number
    gustKnots?: number
    description: string
  }
  visibility: string
  clouds: string
  temperature: number
  dewPoint: number
  qnh: number
  flightCategory: 'VFR' | 'MVFR' | 'IFR'
  decodedSummary: string
}

