import React, { useState } from 'react'
import { Layers, Scissors, Check, Flame, Box, Sparkles, ShieldCheck } from 'lucide-react'

export const ManufacturingCompare: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState<'3d' | 'laser'>('3d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
            MANUFACTURA DIGITAL • 1° Y 2° MEDIO
          </span>
          <h3 className="text-base font-black text-zinc-100 mt-1">
            Del Modelo Virtual al Objeto Físico: Impresión 3D vs Corte Láser CNC
          </h3>
          <p className="text-xs text-zinc-400">
            Dos tecnologías complementarias para fabricar carcasas, soportes de sensores y piezas estructurales de drones.
          </p>
        </div>

        <div className="flex gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 p-1">
          <button
            onClick={() => setActiveProcess('3d')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeProcess === '3d'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Box className="size-3.5" />
            Impresión 3D (FDM)
          </button>
          <button
            onClick={() => setActiveProcess('laser')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeProcess === 'laser'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Scissors className="size-3.5" />
            Corte Láser & CNC
          </button>
        </div>
      </div>

      {/* Main Process Cards */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Detail Panel (7 cols) */}
        <div className="md:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          {activeProcess === '3d' ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  MANUFACTURA ADITIVA • CAPA POR CAPA
                </span>
                <span className="text-xs text-zinc-400 font-mono">Tolerancia: ±0.15 mm</span>
              </div>
              <h4 className="mt-3 text-lg font-black text-zinc-100">
                Impresión 3D FDM (Fused Deposition Modeling)
              </h4>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                El plástico fundido sale por una boquilla caliente (200°C a 240°C) depositando filamento en coordenadas X-Y-Z precisas. Permite geometrías huecas y curvas complejas imposibles de hacer a mano.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800 text-xs">
                  <span className="font-bold text-emerald-400 block mb-1">Materiales que usamos en el liceo:</span>
                  <ul className="space-y-1 text-zinc-300 list-disc pl-4">
                    <li><strong>PLA:</strong> Rápido, biodegradable, ideal para prototipos iniciales y maquetas.</li>
                    <li><strong>PETG:</strong> Resistente a golpes, humedad y rayos solares UV; ideal para brazos y soportes de drones.</li>
                    <li><strong>TPU (Flexible):</strong> Para protectores de cámaras FPV y soportes antivibración de gimbals.</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800 text-xs">
                  <span className="font-bold text-cyan-400 block mb-1">El Secreto del Relleno (Infill):</span>
                  <p className="text-zinc-300">
                    Las piezas no son sólidas por dentro. Tienen una estructura interna tipo panal de abejas o giroscópica al 15% o 25%, reduciendo el peso en un 80% sin perder rigidez.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                  MANUFACTURA SUSTRACTIVA • ALTA VELOCIDAD
                </span>
                <span className="text-xs text-zinc-400 font-mono">Tolerancia: ±0.05 mm</span>
              </div>
              <h4 className="mt-3 text-lg font-black text-zinc-100">
                Corte y Grabado Láser CO2 / Fibra CNC
              </h4>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                Un rayo de luz concentrado de alta energía sublima el material al instante siguiendo vectores 2D. Permite producir piezas planas en segundos con un encaje milimétrico por ranuras machihembradas.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800 text-xs">
                  <span className="font-bold text-cyan-400 block mb-1">Materiales y Aplicaciones:</span>
                  <ul className="space-y-1 text-zinc-300 list-disc pl-4">
                    <li><strong>Acrílico:</strong> Carcasas transparentes para ver circuitos internos funcionando.</li>
                    <li><strong>MDF / Terciado:</strong> Prototipos estructurales rápidos de bajo costo.</li>
                    <li><strong>Fibra de Carbono (CNC Router):</strong> Placas maestras de chasis para drones de alta velocidad FPV.</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800 text-xs">
                  <span className="font-bold text-amber-400 block mb-1">Ventaja Táctica:</span>
                  <p className="text-zinc-300">
                    Mientras una pieza 3D tarda 4 horas en imprimirse, un chasis cortado por láser está listo en apenas 2 minutos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Observation Guide for the Pasa-Manos in Room (5 cols) */}
        <div className="md:col-span-5 rounded-2xl border border-amber-500/30 bg-zinc-950 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles className="size-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Muestra en Sala • Pasa-Manos 2
              </span>
            </div>
            <h4 className="mt-2 text-sm font-black text-zinc-100">
              Qué debes sentir al tener la pieza en la mano:
            </h4>

            <div className="mt-4 space-y-3 text-xs text-zinc-300">
              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <strong className="text-amber-300 block mb-1">1. Líneas de Capa (Layer Lines):</strong>
                Pasa la uña por la cara lateral. Sentirás los pequeños surcos de 0.2 mm donde el plástico fundido se fue apilando capa tras capa.
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <strong className="text-amber-300 block mb-1">2. Peso vs Rigidez:</strong>
                Toma la pieza con las dos manos. Es tan liviana como una pluma pero casi imposible de doblar gracias al relleno interno.
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <strong className="text-amber-300 block mb-1">3. Calce y Tornillos:</strong>
                Los orificios tienen el diámetro exacto para tornillos M3 sin juego ni holgura.
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-2.5 text-[11px] text-amber-300">
            <ShieldCheck className="size-4 shrink-0" />
            <span>Circula fila por fila sin interrumpir la atención a la pizarra.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
