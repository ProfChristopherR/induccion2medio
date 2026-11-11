import React, { useState, useEffect, useRef } from 'react'
import { Radio, Volume2, VolumeX, Copy, Check, UserCheck } from 'lucide-react'

const ARDUINO_CPP_CODE = `/*
 * PROYECTO: RADAR ULTRASÓNICO DE PROXIMIDAD
 * Hardware: Arduino UNO + HC-SR04 + Buzzer Pasivo
 * Especialidad Geogo & Geomática - Liceo San Nicolás
 */

const int TRIG_PIN = 9;   // Emite el pulso ultrasónico
const int ECHO_PIN = 10;  // Recibe el eco de rebote
const int BUZZER_PIN = 11; // Generador de audio

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(9600); // Telemetría por cable USB
}

void loop() {
  // 1. Emitir pulso ultrasónico de 10 microsegundos
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2. Medir tiempo que tardó el eco en regresar
  long duration = pulseIn(ECHO_PIN, HIGH);

  // 3. Calcular distancia en centímetros (Velocidad del sonido: 0.0343 cm/us)
  int distanceCm = duration * 0.0343 / 2;

  Serial.print("Distancia: ");
  Serial.print(distanceCm);
  Serial.println(" cm");

  // 4. Lógica de alertas según cercanía
  if (distanceCm < 15 && distanceCm > 0) {
    // PELIGRO INMEDIATO: Alarma continua
    tone(BUZZER_PIN, 1800);
  } else if (distanceCm <= 30) {
    // PRECAUCIÓN: Pitido rápido
    tone(BUZZER_PIN, 1200, 80);
    delay(120);
  } else if (distanceCm <= 60) {
    // RASTREO: Pitido calmado
    tone(BUZZER_PIN, 800, 100);
    delay(400);
  } else {
    // ZONA LIBRE: Silencio
    noTone(BUZZER_PIN);
  }

  delay(60);
}`

export const AiRadarLab: React.FC = () => {
  const [distance, setDistance] = useState<number>(45) // cm
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false)
  const [codeCopied, setCodeCopied] = useState<boolean>(false)
  const [isSimulatingHand, setIsSimulatingHand] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const sweepAngleRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  const playBeep = (freq: number, durationMs: number) => {
    if (isAudioMuted) return
    try {
      const ctx = getAudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + durationMs / 1000)
    } catch {
      // Audio not available
    }
  }

  const simulateVolunteerHand = () => {
    if (isSimulatingHand) return
    setIsSimulatingHand(true)
    let currentD = 80
    const interval = setInterval(() => {
      currentD -= 3
      if (currentD <= 8) {
        clearInterval(interval)
        setTimeout(() => {
          setIsSimulatingHand(false)
        }, 1200)
      }
      setDistance(Math.max(8, currentD))
    }, 120)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (distance < 15) {
      interval = setInterval(() => playBeep(1800, 80), 100)
    } else if (distance <= 30) {
      interval = setInterval(() => playBeep(1200, 100), 250)
    } else if (distance <= 60) {
      interval = setInterval(() => playBeep(800, 120), 600)
    }
    return () => clearInterval(interval)
  }, [distance, isAudioMuted])

  // Radar Canvas Sweep
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const render = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height - 20
      const maxRadius = height - 40

      ctx.clearRect(0, 0, width, height)

      // Background soft arc
      ctx.strokeStyle = '#cbd5e1'
      ctx.lineWidth = 1.5

      for (let r = 0.25; r <= 1; r += 0.25) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, maxRadius * r, Math.PI, 0)
        ctx.stroke()
      }

      // Angles
      const angles = [Math.PI * 0.15, Math.PI * 0.3, Math.PI * 0.5, Math.PI * 0.7, Math.PI * 0.85]
      angles.forEach((ang) => {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(ang) * maxRadius, centerY - Math.sin(ang) * maxRadius)
        ctx.stroke()
      })

      // Sweep Beam
      sweepAngleRef.current += 0.03
      if (sweepAngleRef.current > Math.PI) {
        sweepAngleRef.current = 0
      }

      const beamAngle = Math.PI - sweepAngleRef.current
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, maxRadius, beamAngle - 0.25, beamAngle)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = 'rgba(2, 132, 199, 0.15)'
      ctx.fill()

      // Sweep line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(beamAngle) * maxRadius, centerY - Math.sin(beamAngle) * maxRadius)
      ctx.strokeStyle = '#0284c7'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()

      // Target Blip
      const normDist = Math.min(1, Math.max(0.08, distance / 100))
      const targetRadius = maxRadius * normDist
      const targetAngle = Math.PI * 0.5

      const targetX = centerX + Math.cos(targetAngle) * targetRadius
      const targetY = centerY - Math.sin(targetAngle) * targetRadius

      ctx.save()
      ctx.beginPath()
      ctx.arc(targetX, targetY, distance < 15 ? 14 : 10, 0, Math.PI * 2)
      ctx.fillStyle = distance < 15 ? '#ef4444' : distance <= 30 ? '#f59e0b' : '#10b981'
      ctx.shadowColor = ctx.fillStyle
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.restore()

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationId)
  }, [distance])

  const copyCode = () => {
    navigator.clipboard.writeText(ARDUINO_CPP_CODE)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-800">
            DEMO EN VIVO CON VOLUNTARIO • CLASE 2
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">
            Programando un Radar de Proximidad en 5 Minutos con IA
          </h3>
          <p className="text-sm font-medium text-slate-600">
            El profesor carga el código generado por IA en el Arduino. Un voluntario de la primera fila acerca su mano al sensor para que la sala escuche el radar reaccionar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            {isAudioMuted ? <VolumeX className="size-4 text-red-600" /> : <Volume2 className="size-4 text-emerald-600" />}
            {isAudioMuted ? 'Audio Silenciado' : 'Audio Activo'}
          </button>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 rounded-2xl bg-blue-700 px-4 py-2 text-xs font-black text-white hover:bg-blue-800 shadow-sm transition-colors"
          >
            {codeCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {codeCopied ? '¡Copiado!' : 'Copiar C++ para Arduino IDE'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Radar Screen Visualizer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Radio className="size-5 text-blue-700" />
              <span className="text-xs font-black uppercase text-slate-900">
                Barrido Ultrasónico en Tiempo Real
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">DISTANCIA DETECTADA:</span>
              <span
                className={`font-mono text-base font-black px-3 py-1 rounded-xl ${
                  distance < 15
                    ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
                    : distance <= 30
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {distance.toFixed(0)} CM
              </span>
            </div>
          </div>

          {/* Canvas Radar */}
          <div className="relative flex justify-center py-2 bg-slate-50 rounded-2xl border border-slate-200">
            <canvas
              ref={canvasRef}
              width={480}
              height={220}
              className="w-full max-w-md h-auto"
            />
          </div>

          {/* Interactive Distance Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Posición de la Mano del Voluntario:</span>
              <button
                onClick={simulateVolunteerHand}
                disabled={isSimulatingHand}
                className="flex items-center gap-1.5 rounded-xl bg-blue-100 border border-blue-300 px-3 py-1 text-xs font-black text-blue-900 hover:bg-blue-200 transition-colors"
              >
                <UserCheck className="size-3.5" />
                {isSimulatingHand ? 'Acercando mano...' : 'Simular Voluntario en Sala'}
              </button>
            </div>

            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-blue-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className={`p-2 rounded-xl border ${distance < 15 ? 'bg-red-100 border-red-300 text-red-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                &lt; 15 cm: Alarma Peligro
              </div>
              <div className={`p-2 rounded-xl border ${distance >= 15 && distance <= 30 ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                15 - 30 cm: Precaución
              </div>
              <div className={`p-2 rounded-xl border ${distance > 30 ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                &gt; 30 cm: Rastreo Libre
              </div>
            </div>
          </div>
        </div>

        {/* Arduino C++ Code Walkthrough (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-slate-800 font-mono">
                Sketch en C++ para Arduino IDE
              </span>
              <span className="text-xs font-bold text-blue-700">1° y 2° Medio</span>
            </div>

            <div className="mt-3 max-h-[290px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 leading-relaxed">
              <pre>{ARDUINO_CPP_CODE}</pre>
            </div>
          </div>

          <div className="rounded-2xl bg-blue-50 p-3.5 border border-blue-200 text-xs text-slate-700 leading-relaxed font-medium">
            <strong className="text-blue-900 font-bold block mb-0.5">Fórmula física aplicada:</strong>
            El sensor envía un pulso de sonido inaudible, mide los microsegundos de ida y vuelta, y multiplica por la velocidad del sonido (0.0343 cm/microsegundo) dividida por 2.
          </div>
        </div>
      </div>
    </div>
  )
}
