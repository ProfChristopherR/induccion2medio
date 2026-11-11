import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Trophy, Check, X, RotateCcw, ArrowRight, GraduationCap } from 'lucide-react'

interface TriviaItem {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  yearTag: string
}

const TRIVIA_QUESTIONS: TriviaItem[] = [
  {
    id: 1,
    question: '¿En qué año de la especialidad aprendes a diseñar y soldar tus propias placas PCB y operar cortadoras láser/CNC?',
    options: ['1° Medio (Geogo I)', '2° Medio (Geogo II)', '3° Medio (Geomática I)', '4° Medio (Geomática II)'],
    correctIndex: 1,
    explanation: '¡Correcto! En 2° Medio pasas del protoboard a la manufactura digital completa: PCB propia + chasis 3D/láser + C++/Python.',
    yearTag: '2° Medio • Geogo II'
  },
  {
    id: 2,
    question: '¿Cómo calcula la distancia el sensor ultrasónico que programamos en el Arduino con IA?',
    options: [
      'Midiendo el peso del objeto con una balanza',
      'Midiendo el tiempo que tarda la onda de sonido en rebotar e ir y volver',
      'Mediante una cámara de fotos común',
      'Leyendo la temperatura del aire en grados Celsius'
    ],
    correctIndex: 1,
    explanation: '¡Exacto! Emite ultrasonido y usa la fórmula Tiempo x Velocidad del sonido / 2.',
    yearTag: '1° Medio • Electrónica & IA'
  },
  {
    id: 3,
    question: '¿Por qué el DJI Mavic 3T es insustituible en misiones de Búsqueda y Rescate (SAR)?',
    options: [
      'Porque es el dron más pesado',
      'Porque su cámara térmica radiométrica detecta el calor corporal humano incluso en total oscuridad',
      'Porque solo vuela bajo techo',
      'Porque no usa baterías'
    ],
    correctIndex: 1,
    explanation: '¡Brillante! La firma térmica infrarroja revela personas perdidas entre bosques o escombros a kilómetros.',
    yearTag: '3° y 4° Medio • Geomática'
  },
  {
    id: 4,
    question: '¿Para qué consultamos el reporte METAR del aeródromo de Chillán antes de despegar?',
    options: [
      'Para ver qué precio tiene el combustible',
      'Para verificar dirección/fuerza del viento, nubes y visibilidad bajo estándar DGAC',
      'Para encender las luces de la sala',
      'Para programar la placa Arduino'
    ],
    correctIndex: 1,
    explanation: '¡Así se opera! En Geomática cumplimos con la normativa aeronáutica civil chilena en cada vuelo.',
    yearTag: '3° Medio • Aeronáutica DGAC'
  },
  {
    id: 5,
    question: '¿Qué mide el índice multiespectral NDVI del Mavic 3M para el guiado de drones agrícolas de 4° Medio?',
    options: [
      'La profundidad de los ríos',
      'El vigor fotosintético y salud de las plantas para aplicar fitosanitarios con precisión milimétrica',
      'La velocidad de rotación de las hélices',
      'El número de satélites GPS en órbita'
    ],
    correctIndex: 1,
    explanation: '¡Excelente! La agricultura de precisión reduce el uso de químicos y optimiza la producción territorial.',
    yearTag: '4° Medio • Drones Agrícolas'
  }
]

export const TacticalTrivia: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState<number>(0)
  const [isFinished, setIsFinished] = useState<boolean>(false)

  const currentQ = TRIVIA_QUESTIONS[currentIdx]

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return
    setSelectedOption(index)
    if (index === currentQ.correctIndex) {
      setScore((s) => s + 1)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      })
    }
  }

  const handleNext = () => {
    if (currentIdx < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1)
      setSelectedOption(null)
    } else {
      setIsFinished(true)
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      })
    }
  }

  const restartTrivia = () => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setScore(0)
    setIsFinished(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-xs">
            <Trophy className="size-6" />
          </div>
          <div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase text-blue-800">
              DEBRIEFING FINAL DE INDUCCIÓN
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Trivia de la Especialidad: ¿Qué Aprendimos en la Ruta?
            </h3>
          </div>
        </div>

        <div className="font-mono text-sm font-black text-slate-700">
          Aciertos: <span className="text-emerald-600">{score}</span> / {TRIVIA_QUESTIONS.length}
        </div>
      </div>

      {!isFinished ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-blue-800">
              {currentQ.yearTag}
            </span>
            <span className="text-xs text-slate-500 font-bold">
              Pregunta {currentIdx + 1} de {TRIVIA_QUESTIONS.length}
            </span>
          </div>

          <h4 className="text-2xl font-black text-slate-900 leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="grid gap-3 pt-2">
            {currentQ.options.map((opt, i) => {
              const isChosen = selectedOption === i
              const isCorrect = i === currentQ.correctIndex

              let btnStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-slate-300'

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                } else if (isChosen) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-900'
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400'
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  disabled={selectedOption !== null}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && isCorrect && (
                    <Check className="size-5 text-emerald-600 shrink-0 ml-3" />
                  )}
                  {selectedOption !== null && isChosen && !isCorrect && (
                    <X className="size-5 text-red-500 shrink-0 ml-3" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {selectedOption !== null && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 animate-in fade-in duration-200">
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-black text-white hover:bg-blue-800 shadow-sm transition-colors"
                >
                  <span>{currentIdx < TRIVIA_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado Final'}</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final celebration card */
        <div className="rounded-3xl border border-emerald-300 bg-white p-8 text-center space-y-5 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
            <Trophy className="size-8" />
          </div>

          <div>
            <h3 className="text-3xl font-black text-slate-900">
              ¡Inducción Completada con Éxito!
            </h3>
            <p className="text-base text-emerald-700 font-bold mt-1">
              Puntaje: {score} de {TRIVIA_QUESTIONS.length} Aciertos
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 max-w-xl mx-auto leading-relaxed text-left space-y-3 font-medium">
            <div className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs">
              <GraduationCap className="size-5 text-blue-700" />
              Palabras de Bienvenida a la Especialidad:
            </div>
            <p>
              &ldquo;Hoy conocieron el camino completo: desde encender su primer LED y modelar en 3D en 1° y 2° Medio (Geogo), hasta programar con IA y dominar la telemetría aérea con drones térmicos y multiespectrales en 3° y 4° Medio (Geomática).&rdquo;
            </p>
            <p>
              &ldquo;El Liceo San Nicolás les entrega la tecnología más avanzada de Chile; su tarea es asumir la disciplina, la curiosidad y las ganas de construir cosas reales.&rdquo;
            </p>
          </div>

          <button
            onClick={restartTrivia}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RotateCcw className="size-4" />
            Reiniciar Trivia
          </button>
        </div>
      )}
    </div>
  )
}
