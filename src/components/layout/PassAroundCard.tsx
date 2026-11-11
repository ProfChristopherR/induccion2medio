import React from 'react'
import { Package, Sparkles, ShieldCheck } from 'lucide-react'

interface Props {
  trayNumber: number
  trayTitle: string
  description: string
  whatToObserve: string[]
  handlingRule?: string
}

export const PassAroundCard: React.FC<Props> = ({
  trayNumber,
  trayTitle,
  description,
  whatToObserve,
  handlingRule = 'Las bandejas circulan fila por fila. Cada estudiante explora la pieza durante 15 segundos y la entrega con ambas manos al compañero.'
}) => {
  return (
    <div className="apple-glass rounded-3xl p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
          <Package className="size-6" />
        </div>

        <div className="flex-1 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-amber-500/12 border border-amber-500/25 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Experiencia Táctil en Aula • Bandeja {trayNumber}
            </span>
            <span className="text-xs font-medium text-slate-500">
              Hardware real circulando por los puestos
            </span>
          </div>

          <h4 className="text-xl font-extrabold tracking-tight text-slate-900">
            {trayTitle}
          </h4>

          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>

          <div className="grid gap-2.5 sm:grid-cols-3 pt-1">
            {whatToObserve.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/80 border border-slate-200/70 p-3.5 text-xs text-slate-700 leading-relaxed shadow-2xs flex flex-col justify-between"
              >
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                  <Sparkles className="size-3 text-amber-500" />
                  Observación {idx + 1}
                </span>
                <p className="font-medium text-slate-800">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-900/[0.03] px-3.5 py-2 rounded-xl border border-slate-900/[0.06]">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>{handlingRule}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
