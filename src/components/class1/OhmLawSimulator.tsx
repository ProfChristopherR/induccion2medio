import React, { useState } from 'react'
import { Zap, Flame, RotateCcw, AlertTriangle, HelpCircle, CheckCircle } from 'lucide-react'

export const OhmLawSimulator: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(9) // Volts
  const [resistance, setResistance] = useState<number>(330) // Ohms
  const [isExploded, setIsExploded] = useState<boolean>(false)

  // Calculate current in Milliamperes (I = V / R * 1000)
  const currentAmps = resistance > 0 ? voltage / resistance : 999
  const currentMilliAmps = currentAmps * 1000
  const powerWatts = voltage * currentAmps

  // LED state
  const isDanger = currentMilliAmps > 50 && !isExploded

  const handleResistanceChange = (val: number) => {
    setResistance(val)
    if (val <= 10 && !isExploded) {
      setIsExploded(true)
    } else if (val > 10 && isExploded) {
      setIsExploded(false)
    }
  }

  const resetCircuit = () => {
    setVoltage(9)
    setResistance(330)
    setIsExploded(false)
  }

  const ledBrightness = Math.min(1, Math.max(0.1, currentMilliAmps / 25))

  return (
    <div className="space-y-6">
      {/* Teacher Prompt Question */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/80 p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
            <HelpCircle className="size-5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Pregunta en Pizarra para Toda la Sala:
            </span>
            <p className="text-base font-black text-slate-900 mt-0.5">
              &ldquo;¿Qué le sucederá a nuestro circuito real si bajamos la resistencia a 0 Ohms con la batería conectada?&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sliders & Numerical Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Formula Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Fórmula de la Ley de Ohm
            </span>
            <div className="mt-1 font-mono text-3xl font-black text-blue-700">
              I = V / R
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-200 pt-3 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">Voltaje (V)</span>
                <span className="text-base font-black text-slate-900">{voltage} V</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Resistencia (R)</span>
                <span className="text-base font-black text-slate-900">{resistance} &Omega;</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Corriente (I)</span>
                <span className={`text-base font-black ${isDanger || isExploded ? 'text-red-600' : 'text-emerald-600'}`}>
                  {resistance === 0 ? 'Infinito' : `${currentMilliAmps.toFixed(1)} mA`}
                </span>
              </div>
            </div>
          </div>

          {/* Voltage Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-800">
              <span>Voltaje de Entrada (Batería):</span>
              <span className="font-mono text-blue-700 font-black">{voltage} V</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={1}
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>1V (Pila AA)</span>
              <span>9V (Batería Arduino)</span>
              <span>24V (Industrial)</span>
            </div>
          </div>

          {/* Resistance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-800">
              <span>Resistencia Eléctrica (R):</span>
              <span className="font-mono text-slate-900 font-black">{resistance} &Omega;</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              step={5}
              value={resistance}
              onChange={(e) => handleResistanceChange(Number(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-red-600 font-black">0 &Omega; (Peligro)</span>
              <span className="text-slate-600">220 &Omega; (Recomendada)</span>
              <span className="text-slate-600">1000 &Omega;</span>
            </div>
          </div>

          {/* Power info & reset */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Potencia: <strong className="text-slate-900">{powerWatts.toFixed(2)} W</strong>
            </div>
            <button
              onClick={resetCircuit}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="size-3.5" />
              Restablecer
            </button>
          </div>
        </div>

        {/* Visual Circuit Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
          {/* Status Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Comportamiento del Circuito Físico
            </span>

            {isExploded ? (
              <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700 border border-red-300 animate-pulse">
                <Flame className="size-4" />
                ¡LED QUEMADO POR SOBRECORRIENTE!
              </span>
            ) : isDanger ? (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 border border-amber-300">
                <AlertTriangle className="size-4" />
                ALERTA DE SOBRECALENTAMIENTO ({currentMilliAmps.toFixed(0)} mA)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 border border-emerald-300">
                <CheckCircle className="size-4" />
                OPERACIÓN SEGURA (15 - 25 mA)
              </span>
            )}
          </div>

          {/* Circuit Visual Schematic */}
          <div className="my-6 flex items-center justify-center relative min-h-[220px]">
            {isExploded ? (
              <div className="flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
                <div className="flex size-24 items-center justify-center rounded-full bg-red-100 border-2 border-red-500 text-red-600 shadow-lg">
                  <Flame className="size-14 animate-bounce" />
                </div>
                <h4 className="mt-4 text-xl font-black text-red-700">
                  ¡BOOM! El LED ha quedado inutilizado
                </h4>
                <p className="mt-1 text-xs text-slate-600 max-w-sm font-medium">
                  Al quitar la resistencia, la corriente subió a niveles extremos y fundió el semiconductor. Por eso en 1° Medio siempre calculamos antes de armar.
                </p>
                <button
                  onClick={resetCircuit}
                  className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-black text-white hover:bg-red-700 shadow-sm transition-colors"
                >
                  Poner un LED nuevo y continuar
                </button>
              </div>
            ) : (
              <svg viewBox="0 0 460 220" className="w-full max-w-md h-auto">
                {/* Outer wire loop */}
                <rect x="50" y="30" width="360" height="160" rx="14" fill="none" stroke="#94a3b8" strokeWidth="4" />
                
                {/* Current Flow Dots */}
                <rect
                  x="50"
                  y="30"
                  width="360"
                  height="160"
                  rx="14"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeDasharray="10 10"
                  className={currentMilliAmps > 0 ? 'animate-[dash_1s_linear_infinite]' : ''}
                  style={{ opacity: Math.min(1, currentMilliAmps / 20) }}
                />

                {/* Battery (Left) */}
                <g transform="translate(50, 110)">
                  <rect x="-24" y="-30" width="48" height="60" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="3" />
                  <line x1="-14" y1="-8" x2="14" y2="-8" stroke="#2563eb" strokeWidth="4" />
                  <line x1="-8" y1="12" x2="8" y2="12" stroke="#64748b" strokeWidth="4" />
                  <text x="0" y="-38" fill="#1e293b" fontSize="12" fontWeight="900" textAnchor="middle">
                    +{voltage}V
                  </text>
                </g>

                {/* Resistor (Top) */}
                <g transform="translate(230, 30)">
                  <rect x="-40" y="-16" width="80" height="32" rx="6" fill="#f1f5f9" stroke="#0284c7" strokeWidth="3" />
                  <text x="0" y="5" fill="#0369a1" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                    {resistance} &Omega;
                  </text>
                  <text x="0" y="-24" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Resistencia Protectora
                  </text>
                </g>

                {/* LED (Right) */}
                <g transform="translate(410, 110)">
                  <circle
                    cx="0"
                    cy="0"
                    r="24"
                    fill={isDanger ? '#f59e0b' : '#10b981'}
                    style={{
                      opacity: ledBrightness * 0.4,
                      filter: 'blur(8px)'
                    }}
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="16"
                    fill={isDanger ? '#d97706' : '#10b981'}
                    stroke="#ffffff"
                    strokeWidth="3"
                    style={{ opacity: ledBrightness }}
                  />
                  <text x="0" y="38" fill="#0f766e" fontSize="12" fontWeight="900" textAnchor="middle">
                    Diodo LED
                  </text>
                </g>

                {/* Ground (Bottom) */}
                <g transform="translate(230, 190)">
                  <line x1="-18" y1="0" x2="18" y2="0" stroke="#64748b" strokeWidth="4" />
                  <text x="0" y="18" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">
                    GND (0V)
                  </text>
                </g>
              </svg>
            )}
          </div>

          {/* Educational Conclusion */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
            <strong className="text-slate-900 font-bold">Lección Pedagógica:</strong> La resistencia protege los componentes limitando los electrones que circulan. En 2° Medio, este cálculo se lleva a la placa PCB mediante las Leyes de Kirchhoff y Thévenin.
          </div>
        </div>
      </div>
    </div>
  )
}
