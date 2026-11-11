import React from 'react'
import { X, ExternalLink, ShieldCheck, Award, Compass } from 'lucide-react'
import { PREMILITAR_PROJECTS } from '../../data/curriculumData'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const PremilitarModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-2xl border border-slate-200 bg-slate-100 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-sm">
            <ShieldCheck className="size-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                Portal Oficial de Especialidad
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-800 border border-blue-200">
                Liceo Bicentenario San Nicolás
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              premilitar.liceosannicolas.cl
            </h3>
            <p className="text-sm font-medium text-slate-600">
              Plataforma institucional donde documentamos noticias, proyectos comunitarios y misiones en terreno.
            </p>
          </div>
        </div>

        {/* Highlighted Projects Showcase */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Award className="size-4 text-emerald-600" />
            Proyectos Reales Desarrollados por Estudiantes de la Especialidad
          </h4>

          <div className="grid gap-4 sm:grid-cols-3">
            {PREMILITAR_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-400 hover:bg-white transition-all shadow-xs"
              >
                <div>
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                    {proj.category}
                  </span>
                  <h5 className="mt-2 text-sm font-black text-slate-900 line-clamp-2">
                    {proj.title}
                  </h5>
                  <p className="mt-1.5 text-xs font-medium text-slate-600 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs font-bold text-emerald-700">
                  {proj.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose Statement */}
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
          <div className="flex items-start gap-3">
            <Compass className="size-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed font-medium">
              <strong className="text-blue-900 font-bold">Aprendizaje en Acción Real:</strong> Desde 1° Medio hasta 4° Medio, nuestros alumnos no solo aprenden teoría en pizarrón; resuelven necesidades territoriales de la región mediante electrónica, diseño paramétrico 3D y análisis aéreo con sensores termales y multiespectrales.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-xs text-slate-500 font-medium">
            Puedes abrir el sitio oficial en una pestaña externa durante la clase.
          </span>
          <a
            href="https://premilitar.liceosannicolas.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-black text-white hover:bg-blue-800 shadow-sm transition-colors"
          >
            <span>Visitar Sitio Oficial</span>
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
