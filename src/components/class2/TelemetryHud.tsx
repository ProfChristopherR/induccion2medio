import React, { useState } from 'react'
import { Camera, Flame, Sprout, Box, Crosshair } from 'lucide-react'

export const TelemetryHud: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<'rgb' | 'thermal' | 'ndvi' | 'photogrammetry'>('thermal')
  const [gimbalPitch, setGimbalPitch] = useState<number>(25)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-800">
            DEMOSTRACIÓN SENSORIAL EN VIVO • CLASE 2
          </span>
          <h3 className="text-3xl font-black text-slate-900 mt-1">
            Los Superpoderes Visuales de los Drones: Térmica, NDVI y 3D
          </h3>
          <p className="text-base text-slate-600 font-medium">
            Simulador de la pantalla de vuelo (DJI Pilot 2). El profesor apunta la cámara hacia el curso para ver calor corporal o salud vegetal.
          </p>
        </div>

        {/* Feed Switcher Buttons */}
        <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
          <button
            onClick={() => setActiveFeed('rgb')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all ${
              activeFeed === 'rgb'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="size-4" />
            Cámara Óptica RGB
          </button>

          <button
            onClick={() => setActiveFeed('thermal')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all ${
              activeFeed === 'thermal'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="size-4" />
            Mavic 3T Termal (Calor Humano)
          </button>

          <button
            onClick={() => setActiveFeed('ndvi')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all ${
              activeFeed === 'ndvi'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sprout className="size-4" />
            Mavic 3M NDVI (Agrícola)
          </button>

          <button
            onClick={() => setActiveFeed('photogrammetry')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all ${
              activeFeed === 'photogrammetry'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="size-4" />
            Fotogrametría 3D
          </button>
        </div>
      </div>

      {/* Main Screen */}
      <div className="relative aspect-video w-full rounded-3xl border-2 border-slate-300 bg-slate-950 overflow-hidden shadow-xl">
        {/* Top Telemetry OSD */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between bg-slate-900/90 px-5 py-2.5 text-xs font-mono text-white backdrop-blur-sm border-b border-slate-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              RTK FIX (PRECISIÓN &plusmn;1 CM)
            </span>
            <span>SATÉLITES: <strong>26 (GPS+GALILEO)</strong></span>
            <span>BATERÍA: <strong className="text-emerald-400">94% (4.21V)</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span>INCLINACIÓN GIMBAL: <strong className="text-cyan-400">{gimbalPitch}&deg;</strong></span>
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
              VISTA EN VIVO EN SALA
            </span>
          </div>
        </div>

        {/* Center Display */}
        <div className="relative h-full w-full flex items-center justify-center pt-8">
          {activeFeed === 'rgb' && (
            <div className="relative h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center space-y-2 p-6 z-10 text-white">
                <Camera className="size-12 text-slate-300 mx-auto" />
                <h4 className="text-base font-black">
                  Cámara Óptica 4K Ultra HD • Vista Normal
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto font-medium">
                  Apuntando hacia los alumnos en la sala de clases. Utilizada para inspecciones visuales detalladas de estructuras y fotografía aérea técnica.
                </p>
              </div>
            </div>
          )}

          {activeFeed === 'thermal' && (
            <div className="relative h-full w-full bg-gradient-to-br from-purple-950 via-red-950 to-amber-950 flex items-center justify-center overflow-hidden">
              {/* Heat signatures */}
              <div className="absolute left-[20%] top-[45%] rounded-xl border-2 border-amber-400 bg-red-500/30 p-2 text-center text-white animate-pulse">
                <span className="font-mono text-xs font-black text-amber-300 block">36.8°C</span>
                <span className="text-[10px] font-bold uppercase">Humano (Fila 1)</span>
              </div>

              <div className="absolute left-[50%] top-[40%] rounded-xl border-2 border-amber-400 bg-red-500/30 p-2 text-center text-white animate-pulse">
                <span className="font-mono text-xs font-black text-amber-300 block">37.1°C</span>
                <span className="text-[10px] font-bold uppercase">Humano (Fila 2)</span>
              </div>

              <div className="absolute right-[22%] top-[48%] rounded-xl border-2 border-amber-400 bg-red-500/30 p-2 text-center text-white animate-pulse">
                <span className="font-mono text-xs font-black text-amber-300 block">36.5°C</span>
                <span className="text-[10px] font-bold uppercase">Humano (Fila 3)</span>
              </div>

              {/* Thermal Bar */}
              <div className="absolute right-4 top-16 bottom-16 w-4 rounded-full bg-gradient-to-t from-blue-700 via-red-600 to-amber-300 border border-white/20 flex flex-col justify-between py-1 text-[9px] font-mono text-white text-center font-bold">
                <span>40°</span>
                <span>36°</span>
                <span>20°</span>
              </div>

              <div className="text-center space-y-1 z-10 bg-black/60 p-5 rounded-2xl backdrop-blur-sm border border-red-500/40 text-white max-w-md mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-sm font-black text-red-400 uppercase">
                  <Flame className="size-4" />
                  Mavic 3T Termal • Radiometría Infrarroja
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  Detecta la temperatura exacta del cuerpo humano a distancia. Es la tecnología que permite encontrar personas extraviadas en misiones de Búsqueda y Rescate (SAR) en plena noche.
                </p>
              </div>
            </div>
          )}

          {activeFeed === 'ndvi' && (
            <div className="relative h-full w-full bg-gradient-to-br from-emerald-950 via-lime-950 to-slate-950 flex items-center justify-center overflow-hidden">
              {/* Scale bar */}
              <div className="absolute right-4 top-16 bottom-16 w-4 rounded-full bg-gradient-to-t from-red-600 via-amber-400 to-emerald-400 border border-white/20 flex flex-col justify-between py-1 text-[9px] font-mono text-white text-center font-bold">
                <span>+0.9</span>
                <span>+0.5</span>
                <span>0.0</span>
              </div>

              <div className="text-center space-y-2 z-10 bg-black/60 p-5 rounded-2xl backdrop-blur-sm border border-emerald-500/40 text-white max-w-md mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-sm font-black text-emerald-400 uppercase">
                  <Sprout className="size-4" />
                  Mavic 3M Multiespectral • Índice de Vigor Vegetal (NDVI)
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  Las zonas verdes indican alta fotosíntesis y plantas sanas; las zonas rojas indican plagas o falta de agua. Este mapa le dice al <strong>dron agrícola de 4° Medio</strong> exactamente dónde aplicar fitosanitarios sin gastar de más.
                </p>
              </div>
            </div>
          )}

          {activeFeed === 'photogrammetry' && (
            <div className="relative h-full w-full bg-slate-950 flex items-center justify-center">
              <div className="text-center space-y-2 z-10 bg-slate-900/90 p-6 rounded-3xl border border-indigo-500/40 text-white max-w-md mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-sm font-black text-indigo-400 uppercase">
                  <Box className="size-4" />
                  Fotogrametría Aérea con Phantom 4 Pro
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  A partir de cientos de fotografías aéreas superpuestas, el software genera una nube de millones de puntos 3D para medir curvas de nivel, pendientes y volúmenes de terreno con precisión de centímetros.
                </p>
              </div>
            </div>
          )}

          {/* Crosshair */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Crosshair className="size-16 text-white/30" />
          </div>
        </div>

        {/* Bottom Gimbal Slider */}
        <div className="absolute bottom-2 inset-x-4 z-20 flex items-center justify-between rounded-2xl bg-slate-900/90 px-5 py-2 border border-slate-800 text-xs text-white">
          <span className="font-bold">Inclinación de Cámara (Gimbal): {gimbalPitch}&deg;</span>
          <div className="flex items-center gap-3 w-1/2">
            <span className="text-[10px] text-slate-400">0&deg; (Hacia el Suelo)</span>
            <input
              type="range"
              min={0}
              max={90}
              step={5}
              value={gimbalPitch}
              onChange={(e) => setGimbalPitch(Number(e.target.value))}
              className="flex-1 accent-blue-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">90&deg; (Frente)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
