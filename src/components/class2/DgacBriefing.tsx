import React, { useState } from 'react'
import { Wind, ShieldCheck, CheckSquare, Square, Check } from 'lucide-react'
import { CHILLAN_METAR } from '../../data/curriculumData'

const CHECKLIST_ITEMS = [
  { id: 'c1', label: 'Inspección física de hélices (sin fisuras, mellas o deformación térmica)' },
  { id: 'c2', label: 'Voltaje de celdas LiPo balanceadas (mínimo 4.15V por celda)' },
  { id: 'c3', label: 'Calibración de brújula magnética e IMU libre de interferencias' },
  { id: 'c4', label: 'Verificación de NOTAM y espacio aéreo en aeródromo de Chillán (SCCH)' },
  { id: 'c5', label: 'Calibración del Gimbal de cámara y limpieza de lentes ópticos/térmicos' },
  { id: 'c6', label: 'Fijación de Satélites GNSS RTK (> 16 satélites con punto Home Lock fijado)' }
]

export const DgacBriefing: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id))
    } else {
      setCheckedIds([...checkedIds, id])
    }
  }

  const checkAll = () => {
    if (checkedIds.length === CHECKLIST_ITEMS.length) {
      setCheckedIds([])
    } else {
      setCheckedIds(CHECKLIST_ITEMS.map((item) => item.id))
    }
  }

  const isReadyForTakeoff = checkedIds.length === CHECKLIST_ITEMS.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-800">
          AERONÁUTICA & NORMATIVA DGAC • 3° Y 4° MEDIO
        </span>
        <h3 className="text-3xl font-black text-slate-900 mt-1">
          Volar con Estándar Profesional: Meteorología & Checklist Pre-Vuelo
        </h3>
        <p className="text-base text-slate-600 font-medium">
          En el Liceo San Nicolás no volamos drones como juguetes; operamos bajo los reglamentos de la Dirección General de Aeronáutica Civil (DGAC).
        </p>
      </div>

      {/* METAR Decoder Box */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Wind className="size-5 text-blue-700" />
            <h4 className="text-sm font-black text-slate-900">
              Reporte Meteorológico Oficial: {CHILLAN_METAR.station} ({CHILLAN_METAR.stationName})
            </h4>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
            CONDICIÓN: {CHILLAN_METAR.flightCategory} (Vuelo Visual Seguro)
          </span>
        </div>

        {/* Telegram raw */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-3.5 font-mono text-xs text-emerald-400">
          <span className="text-slate-400 select-none block text-[10px] mb-1 font-bold">TELEGRAMA METAR ORIGINAL:</span>
          {CHILLAN_METAR.raw}
        </div>

        {/* Decoded Grid */}
        <div className="grid gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-slate-500 font-bold block text-[11px]">Viento en Superficie:</span>
            <span className="font-mono text-sm font-black text-blue-700 block mt-0.5">190° / 8 Nudos</span>
            <p className="text-[11px] text-slate-600 font-medium mt-1">~15 km/h (Manejable)</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-slate-500 font-bold block text-[11px]">Visibilidad Horizontal:</span>
            <span className="font-mono text-sm font-black text-emerald-700 block mt-0.5">&gt; 10 km</span>
            <p className="text-[11px] text-slate-600 font-medium mt-1">9999 (Ilimitada)</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-slate-500 font-bold block text-[11px]">Temperatura / Rocío:</span>
            <span className="font-mono text-sm font-black text-slate-900 block mt-0.5">19°C / 11°C</span>
            <p className="text-[11px] text-slate-600 font-medium mt-1">Sin riesgo de congelamiento</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-slate-500 font-bold block text-[11px]">Presión Altímetro QNH:</span>
            <span className="font-mono text-sm font-black text-indigo-700 block mt-0.5">1016 hPa</span>
            <p className="text-[11px] text-slate-600 font-medium mt-1">Atmósfera estándar</p>
          </div>
        </div>
      </div>

      {/* Pre-Flight Checklist */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-blue-700" />
            <h4 className="text-base font-black text-slate-900">
              Checklist Pre-Vuelo Interactivo (Revisión Física en Mesa del Profesor)
            </h4>
          </div>

          <button
            onClick={checkAll}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            {checkedIds.length === CHECKLIST_ITEMS.length ? 'Desmarcar Todo' : 'Marcar Todo'}
          </button>
        </div>

        <div className="space-y-2.5">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id)
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50/70 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 text-sm font-semibold">
                  {isChecked ? (
                    <CheckSquare className="size-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="size-5 text-slate-400 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </div>
                {isChecked && (
                  <span className="text-xs font-black text-emerald-700 font-mono">
                    VERIFICADO
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Takeoff status */}
        <div
          className={`rounded-2xl border p-4 text-center transition-all ${
            isReadyForTakeoff
              ? 'border-emerald-400 bg-emerald-100 text-emerald-900 shadow-sm'
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-black uppercase">
            {isReadyForTakeoff ? (
              <>
                <Check className="size-5 text-emerald-700" />
                <span>¡AUTORIZACIÓN DE VUELO DGAC APROBADA! AERONAVE LISTA PARA OPERAR</span>
              </>
            ) : (
              <span>Marca los {CHECKLIST_ITEMS.length - checkedIds.length} puntos pendientes para autorizar misión</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
