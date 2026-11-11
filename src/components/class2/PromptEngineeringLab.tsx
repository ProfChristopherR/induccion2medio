import React, { useState } from 'react'
import { Terminal, Check, AlertCircle, Copy, Sparkles } from 'lucide-react'

export const PromptEngineeringLab: React.FC = () => {
  const [role, setRole] = useState('Ingeniero de Software Embebido y Robótica')
  const [hardware, setHardware] = useState('Arduino UNO + Sensor Ultrasonido HC-SR04 (Trig=9, Echo=10) + Buzzer Pasivo (Pin 11)')
  const [logic, setLogic] = useState('Medir distancia en cm. Si dist > 30cm: sonido lento. Si 15-30cm: sonido medio. Si < 15cm: alarma continua de peligro.')
  const [constraints, setConstraints] = useState('Usa C++ limpio para Arduino IDE, comenta las funciones clave y no bloquees el microcontrolador con delays excesivos.')

  const [copied, setCopied] = useState(false)

  const assembledPrompt = `Actúa como ${role}.
Escribe un sketch optimizado en C++ para Arduino IDE para el siguiente hardware: ${hardware}.
Comportamiento requerido:
${logic}
Restricciones de calidad de código:
${constraints}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(assembledPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-800">
          Paso 2 • IA Aplicada a Hardware
        </span>
        <h3 className="text-3xl font-black text-slate-900">
          ¿Cómo Hablarle a la IA para Programar sin Errores?
        </h3>
        <p className="text-base text-slate-600 font-medium">
          Los ingenieros modernos no memorizan cientos de líneas de código; usan IA Generativa con órdenes precisas y estructuradas.
        </p>
      </div>

      {/* Bad vs Good Prompt */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-red-200 bg-red-50/60 p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-red-700">
            <AlertCircle className="size-4" />
            <span>Prompt Confuso de Principiante (Falla):</span>
          </div>
          <div className="rounded-2xl bg-white p-3 font-mono text-xs text-slate-700 border border-red-200">
            &ldquo;Hazme un código para Arduino que use un sensor y suene una alarma cuando algo se acerque.&rdquo;
          </div>
          <p className="text-xs text-slate-600 font-medium">
            <strong>¿Por qué falla?</strong> No dice en qué pines conectar los cables, la IA asume valores arbitrarios y el circuito físico no funciona al encenderlo.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-800">
            <Check className="size-4" />
            <span>Fórmula del Prompt de Ingeniería (Éxito Seguro):</span>
          </div>
          <div className="rounded-2xl bg-white p-3 text-xs text-slate-800 border border-emerald-200 space-y-1 font-semibold">
            <div><strong className="text-blue-700">[1. ROL]:</strong> Quién es la IA (Ingeniero en robótica).</div>
            <div><strong className="text-emerald-700">[2. HARDWARE]:</strong> Placa y pines exactos (Trig 9, Echo 10).</div>
            <div><strong className="text-amber-700">[3. LÓGICA]:</strong> Distancias en cm y frecuencias de sonido.</div>
            <div><strong className="text-purple-700">[4. REGLAS]:</strong> C++ limpio y documentado.</div>
          </div>
        </div>
      </div>

      {/* Interactive Prompt Generator */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Terminal className="size-4 text-blue-700" />
            Generador de Prompt en Vivo (Listo para Proyectar y Enviar al LLM)
          </h4>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-black text-white hover:bg-blue-800 shadow-sm transition-colors"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? '¡Copiado!' : 'Copiar para el LLM'}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">1. Rol Táctico:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">2. Hardware y Pines Conectados:</label>
            <input
              type="text"
              value={hardware}
              onChange={(e) => setHardware(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">3. Lógica y Distancias Físicas:</label>
            <input
              type="text"
              value={logic}
              onChange={(e) => setLogic(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">4. Restricciones de Calidad:</label>
            <input
              type="text"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
          <span className="text-xs font-black uppercase text-blue-900 block mb-1">
            Prompt Ensamblado para Enviar a la IA:
          </span>
          <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-semibold">
            {assembledPrompt}
          </pre>
        </div>
      </div>
    </div>
  )
}
