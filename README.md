# Plataforma Interactiva de Inducción: Geogo & Geomática
### Liceo Bicentenario Polivalente San Nicolás (1° a 4° Medio)

Una experiencia web pedagógica, moderna y visualmente inmersiva diseñada para guiar dos clases de inducción de 90 minutos para la especialidad de **Geogo y Geomática**, reemplazando las diapositivas estáticas tradicionales por laboratorios interactivos en tiempo real.

---

## 🚀 Despliegue en Vivo (GitHub Pages)

La plataforma se despliega automáticamente en GitHub Pages mediante GitHub Actions:
**[https://profchristopherr.github.io/induccion2medio/](https://profchristopherr.github.io/induccion2medio/)**

---

## 📋 Estructura Pedagógica de las Clases

### 🟢 Clase 1: Del Origen de los Circuitos a la Fabricación Digital 3D (90 min)
1. **Ruta Formativa (1° a 4° Medio)**: Bento Grid interactivo con fotografías de alta resolución de lo que el alumno construirá cada año.
2. **Laboratorio 3D de Ley de Ohm**:
   - Protoboard MB-102 realista en Three.js con batería de 9V, multímetro digital y diodo LED de 5 mm.
   - Resistencias axiales 3D con código de 4 bandas de color dinámico.
   - 7 escenarios de hardware interactivos: *Normal*, *En Serie (R1 + R2)*, *En Paralelo (R1 ∥ R2)*, *Potenciómetro Rotatorio*, *Transistor NPN (2N2222)*, *LED Invertido* y *Sin Resistencia (0 Ω)* con efecto térmico de humo y chispas.
3. **Protoboard vs. Placa PCB Soldada**: Comparativa macro y simulador de prueba de esfuerzo ante vibraciones mecánicas de vuelo + Pasa-Manos de Bandeja 1 en aula.
4. **Diseño CAD 3D Paramétrico**: Ensamblaje técnico en Fusion 360 con cotas en mm ajustables en vivo por los estudiantes y vista explotada (despiece).
5. **Manufactura Digital**: Impresión 3D FDM (relleno en panal infill) vs. Corte Láser de alta velocidad + Pasa-Manos de Bandeja 2.
6. **Síntesis y Debriefing**: Ronda interactiva de 3 preguntas a mano alzada para consolidar el aprendizaje.

### 🔵 Clase 2: Inteligencia Artificial, Telemetría y Flota de Drones RPAS (90 min)
1. **El Cerebro Digital**: Transición hacia C++, Python y la Inteligencia Artificial como copiloto técnico.
2. **Ingeniería de Prompts para Hardware**: Taller guiado de prompts estructurados para programar microcontroladores sin errores.
3. **Demo en Vivo - Radar Ultrasónico**: Código interactivo en Sandpack y simulación de barrido radar con sensor HC-SR04 y servomotor.
4. **Anatomía e Ingeniería Aeronáutica**: Despiece por capas de cuadricóptero (hélices contra-rotativas CW/CCW, motores brushless 2207, controladora de vuelo y chasis de carbono 3K) + Pasa-Manos de Bandeja 3.
5. **Hangar de la Flota (7 Drones del Liceo)**:
   - *DJI NEO* & *FPV Indoor Whoop* (Aptos para micro-vuelo estacionario en sala con hélices protegidas).
   - *FPV Outdoor 5"* (Fibra de carbono acrobática).
   - *DJI Mini 4K* (Ultra-portátil de entrenamiento).
   - *DJI Phantom 4 Pro* (Fotogrametría y gemelos digitales 3D).
   - *DJI Mavic 3M* (Cámara multiespectral e índice NDVI agrícola).
   - *DJI Mavic 3T* (Cámara térmica radiométrica para búsqueda y rescate SAR).
6. **Normativa Aeronáutica DGAC & Meteorología Chillán**: Briefing regulatorio (DAN 151 / DAN 91) y condiciones climáticas locales en tiempo real.
7. **Superpoderes Visuales**: HUD de telemetría y galería fotogramétrica de infrarrojo térmico, NDVI y nubes de puntos 3D.
8. **Trivia Táctica Final**: Gamificación pedagógica de cierre con confeti y retroalimentación inmediata.

---

## 🛠️ Tecnologías y Librerías

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4** (Apple Glassmorphism, efectos de luz ambiental y desenfoque `backdrop-blur-2xl`)
- **Three.js** (Simulaciones 3D de circuitos, resistencias axiales con bandas de color y ensamblaje CAD)
- **Framer Motion** (Transiciones espaciales fade-in/fade-out, sliders interactivos y acordeones)
- **Lucide React** (Iconografía técnica y aeronáutica)
- **Canvas Confetti** (Celebración pedagógica en logros de aula)

---

## 💻 Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/ProfChristopherR/induccion2medio.git
cd induccion2medio

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

---

## 🔗 Enlaces Institucionales

- Portal de Proyectos: **[premilitar.liceosannicolas.cl](https://premilitar.liceosannicolas.cl)**
- Liceo Bicentenario Polivalente San Nicolás — Región de Ñuble, Chile.
