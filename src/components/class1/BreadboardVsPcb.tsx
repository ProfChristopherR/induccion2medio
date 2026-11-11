import React, { useState } from 'react'
import { Layers, CheckCircle2, Package, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react'

export const BreadboardVsPcb: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compare' | 'trays'>('compare')
  const [selectedTray, setSelectedTray] = useState<number>(1)

  return (
    <div className="space-y-6">
      {/* Navigation Pill */}
      <div className="flex items-center justify-between">
        <div>
          <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
            MÓDULO DE HARDWARE • 1° VS 2° MEDIO
          </span>
          <h3 className="text-base font-black text-zinc-100 mt-1">
            Evolución: De la Protoboard (1° Medio) a la Placa PCB (2° Medio)
          </h3>
        </div>

        <div className="flex gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 p-1">
          <button
            onClick={() => setActiveTab('compare')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'compare'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Comparador 1° vs 2°
          </button>
          <button
            onClick={() => setActiveTab('trays')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'trays'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Package className="size-3.5" />
            Guía de las 3 Bandejas
          </button>
        </div>
      </div>

      {activeTab === 'compare' ? (
        /* Side by Side Comparison */
        <div className="grid gap-6 md:grid-cols-2">
          {/* 1° Medio: Protoboard */}
          <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-zinc-900/50 p-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  1° MEDIO • GEO GO I
                </span>
                <span className="text-xs text-zinc-400 font-mono">Fase: Prototipado Rápido</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-zinc-100">
                Montaje en Protoboard & Simbología
              </h4>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                Los alumnos aprenden a interpretar diagramas esquemáticos, identificar patillaje de componentes sueltos y conectarlos sin soldadura mediante pistas internas elásticas de bronce fosforoso.
              </p>

              <div className="mt-5 space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Magnitudes Eléctricas:</strong> Voltaje, Corriente, Resistencia y Ley de Ohm.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Componentes Base:</strong> Resistencias por código de colores, diodos LEDs y transistores NPN/PNP.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Ventaja táctica:</strong> Corrección inmediata de errores sin dañar piezas.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-[11px] text-zinc-400">
              <strong className="text-emerald-400">Objetivo del año:</strong> Dominar el comportamiento físico de la electricidad antes de automatizarla.
            </div>
          </div>

          {/* 2° Medio: PCB */}
          <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/30 bg-zinc-900/50 p-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/30">
                  2° MEDIO • GEO GO II
                </span>
                <span className="text-xs text-zinc-400 font-mono">Fase: Hardware Definitivo</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-zinc-100">
                Diseño & Confección de Placas PCB
              </h4>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                El prototipo se consolida en una placa de fibra de vidrio con pistas de cobre grabadas y componentes soldados con estaño. El circuito soporta vibración y se integra a drones y robots.
              </p>

              <div className="mt-5 space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Leyes Avanzadas:</strong> Leyes de Kirchhoff de Nodos y Mallas, Teorema de Thévenin.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Diseño EDA:</strong> Ruteo de pistas, planos de masa y huellas térmicas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Ventaja táctica:</strong> Durabilidad industrial y reducción drástica de peso.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-[11px] text-zinc-400">
              <strong className="text-cyan-400">Objetivo del año:</strong> Crear prototipos listos para misiones en terreno con chasis 3D a medida.
            </div>
          </div>
        </div>
      ) : (
        /* 3 Pass-around Trays Inspection */
        <div className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedTray(num)}
                className={`flex-1 rounded-xl border p-3 text-left transition-all ${
                  selectedTray === num
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-100 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  Bandeja {num}
                </div>
                <div className="text-xs font-bold mt-0.5">
                  {num === 1 ? 'Protoboard & Componentes' : num === 2 ? 'Placa PCB Soldada' : 'Módulos y Sensores Arduino'}
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-6 space-y-4">
            {selectedTray === 1 && (
              <div>
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Package className="size-4" />
                  Bandeja 1: Protoboard con LEDs, Resistencias y Transistores (1° Medio)
                </h4>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Esta muestra permite a cada estudiante sentir la textura física de una protoboard real: los orificios numerados por filas y columnas y la rigidez de las patillas de los componentes.
                </p>
                <div className="mt-3 rounded-xl bg-zinc-900/80 p-3 border border-zinc-800 text-xs text-zinc-300">
                  <span className="font-semibold text-zinc-200 block mb-1">Misión para los alumnos al pasarla:</span>
                  1. Localizar las 4 franjas de color en la resistencia para descifrar su valor en Ohms.<br/>
                  2. Observar la pata más larga del LED (Ánodo, terminal positivo).<br/>
                  3. Ver los 3 terminales del transistor: Colector, Base y Emisor.
                </div>
              </div>
            )}

            {selectedTray === 2 && (
              <div>
                <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                  <Package className="size-4" />
                  Bandeja 2: Placa PCB Real Diseñada y Soldada (2° Medio)
                </h4>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Placa de circuito impreso fabricada por alumnos de 2° Medio. Ya no hay cables sueltos ni conexiones que se puedan desconectar con el movimiento de un dron.
                </p>
                <div className="mt-3 rounded-xl bg-zinc-900/80 p-3 border border-zinc-800 text-xs text-zinc-300">
                  <span className="font-semibold text-zinc-200 block mb-1">Misión para los alumnos al pasarla:</span>
                  1. Mirar al trasluz las pistas de cobre que conducen la electricidad por debajo de la máscara de soldadura verde/azul.<br/>
                  2. Examinar los puntos de soldadura de estaño brillante y verificar que no hagan cortocircuito con pistas vecinas.<br/>
                  3. Notar la extrema delgadez y ligereza comparada con una protoboard.
                </div>
              </div>
            )}

            {selectedTray === 3 && (
              <div>
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Package className="size-4" />
                  Bandeja 3: Módulos y Sensores de Arduino (Kit XL)
                </h4>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Módulos de sensado táctico listos para interconectarse: sensor de ultrasonido, sensor de luz LDR, zumbador piezoeléctrico y pantalla OLED.
                </p>
                <div className="mt-3 rounded-xl bg-zinc-900/80 p-3 border border-zinc-800 text-xs text-zinc-300">
                  <span className="font-semibold text-zinc-200 block mb-1">Misión para los alumnos al pasarla:</span>
                  1. Identificar los dos &ldquo;ojos&rdquo; del sensor de ultrasonido: uno emite la onda sonora y el otro recibe el eco.<br/>
                  2. Leer la serigrafía de los pines (VCC, GND, TRIG, ECHO).<br/>
                  3. Comprender cómo este pequeño módulo se convertirá en el radar táctico de la Clase 2.
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
              <ShieldAlert className="size-3.5 text-amber-400" />
              <span>
                <strong>Regla de aula:</strong> Las bandejas circulan continuamente fila por fila. Cada alumno observa durante 15 segundos y la pasa con ambas manos a su compañero lateral.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

