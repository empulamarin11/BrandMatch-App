# BrandMatch 🤝 - Pitch Deck & App Prototype

**BrandMatch** es una plataforma SaaS B2B móvil que utiliza Inteligencia Artificial y el modelo psicológico **Big Five** para emparejar marcas con los creadores de contenido (influencers) ideales, midiendo su afinidad real de personalidad y valores por encima de métricas superficiales.

Este repositorio contiene el **prototipo funcional de la aplicación móvil** desarrollado en **React Native con Expo Go**, estructurado bajo **Domain-Driven Design (DDD)** y **Atomic Design**, trasladando fielmente el diseño UI/UX creado en **Figma**.

---

## 🎯 Problema del Negocio y Solución

En el marketing de influencers actual, las marcas toman decisiones basadas casi exclusivamente en métricas vanidosas (número de seguidores o likes), las cuales son fácilmente manipulables mediante audiencia falsa. Como resultado:

* **El 60% de las campañas fracasan** por falta de afinidad real entre los valores de la marca y la personalidad del creador.
* Las empresas desperdician presupuesto y exponen su reputación corporativa al asociarse con perfiles incoherentes.
* Los equipos de marketing invierten días filtrando perfiles manualmente sin garantías de compatibilidad.

**Propuesta de valor:** BrandMatch automatiza el perfilamiento psicográfico de creadores mediante el modelo **Big Five** (*Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo*), cruza esos rasgos con el "ADN Digital" configurado por la empresa para calcular un porcentaje reactivo de **Match** y genera automáticamente un correo de propuesta comercial (**Pitch**) personalizado con IA.

---

## 🎨 Prototipo Interactivo (Figma)

* **Enlace directo:** [Ver Prototipo Interactivo en Figma](https://www.figma.com/proto/hZZLmnQJlWEa1W4fg9ImRf/BrandMatch-Prototipo?node-id=1-2&starting-point-node-id=1%3A2&t=7Y00eWz3GUwOEqPF-1)
* **Resolución de diseño:** Android Compacto (`412 × 917 px`) con sistema de diseño en modo oscuro (*Dark Mode*) y retícula espacial de `8px`.

---

## 📱 Capturas de Pantalla (UI/UX)

| Bienvenida (`Welcome`) | Autenticación (`Login`) | Registrarse (`Registro`) |
| :---: | :---: | :---: |
| ![Welcome](./assets/screenshots/welcome.jpeg) | ![Login](./assets/screenshots/login.jpeg) | ![Registro](./assets/screenshots/registro.jpeg) |

| Configuración ADN (`Configuracion`) | Análisis de Match (`Match`) | Generador de Pitch IA (`Pitch`) |
| :---: | :---: | :---: |
| ![Configuracion](./assets/screenshots/sliders.jpeg) | ![Match](./assets/screenshots/match.jpeg) | ![Pitch](./assets/screenshots/pitch.jpeg) |

---

## 🏗️ 5. Arquitectura de Software y Metodología DDD

### 5.1 Arquitectura Implementada: Arquitectura en Capas (Layered Architecture)

El frontend móvil de **BrandMatch** implementa una **Arquitectura en Capas (*Layered Architecture*)** guiada por **Domain-Driven Design (DDD)** y conectada mediante **Inyección de Dependencias** (`src/container.js`).

#### ¿Por qué es Arquitectura en Capas y no otro patrón?
- **No es Microservicios:** Toda la aplicación móvil se compila y ejecuta como una sola unidad dentro del dispositivo (Expo Go), sin múltiples servidores independientes comunicándose por red.
- **Diferencia frente a Hexagonal:** Siguiendo el criterio definido por el equipo, se optó por una **Arquitectura en Capas** tradicional y limpia porque se adapta de forma directa a las 4 carpetas principales dentro de `src/`, facilitando la lectura y el mantenimiento por módulos.
- **¿Por qué sí es en Capas? (Organización desde `src/`):** El código divide el sistema en cuatro niveles jerárquicos donde cada carpeta cumple una única responsabilidad y respeta la **regla de dependencia hacia adentro** (`Presentation → Application → Domain`):

| Nivel / Capa | Carpeta en `src/` | Responsabilidad en el Sistema |
| :--- | :--- | :--- |
| **1. Presentación** | `src/presentation/` | Renderiza las 7 pantallas en React Native, componentes atómicos (`CustomButton`, `RadarChart`), estilos (`Theme/`) y navegación (`AppNavigator.js`). No realiza cálculos de negocio. |
| **2. Aplicación** | `src/application/` | Contiene los casos de uso (`loginUser.js`, `registerUser.js`, `calculateMatch.js`) que reciben las acciones de la interfaz y coordinan la ejecución del dominio. |
| **3. Dominio** | `src/domain/` | **El núcleo puro.** Aloja las reglas de validación (`Email`, `Password`, `FullName`, `NewPassword`) y la fórmula matemática Big Five (`MatchCalculator.js`) en **JavaScript puro**, sin importar nada de React Native ni Expo. |
| **4. Infraestructura** | `src/infrastructure/` | Gestiona el acceso a datos y servicios externos (`InfluencerRepository.js` y `AuthApi.js`). Permite conectar una API real en el futuro sin modificar las pantallas ni el dominio. |

```text
[ Presentation (Screens / UI) ] ──▶ [ Application (Casos de Uso) ] ──▶ [ Domain (Reglas Puras) ]
                                            ▲                                   ▲
                                            │ (Inyección en container.js)       │ (Implementa contrato)
                                    [ Infrastructure (AuthApi / InfluencerRepository) ]
```

**Ventaja clave:** Al mantener `src/domain/` completamente aislado de React Native y conectar `src/infrastructure/` mediante `src/container.js`, cualquier cambio en la interfaz gráfica o migración hacia un servidor backend real se realiza sin alterar la lógica principal del negocio.


---

### 5.2 Diseño Estratégico (DDD)

#### Dominio y Actores
- **Dominio:** Emparejamiento inteligente entre marcas y creadores de contenido de TikTok basado en afinidad psicológica Big Five.
- **Actores:** **Marca / Empresa** (usuario activo que configura su ADN, consulta perfiles y genera propuestas) y **Creador / Influencer** (perfil público analizado y almacenado en el catálogo).

#### Clasificación de Subdominios

| Subdominio | Tipo | Justificación Estratégica |
| :--- | :--- | :--- |
| **Brand Matching (`match`)** | **Principal (*Core*)** | Constituye el diferenciador del negocio: calcula la compatibilidad psicográfica entre marca y creador. |
| **Identity & Access (`auth`)** | **De soporte** | Gestiona el acceso, registro y validación estricta de credenciales de las marcas usuarias. |
| **Creator Profiling (`PractScrapyTtk`)** | **De soporte** | Abastece al sistema con métricas públicas, arquetipos y puntajes Big Five verificados. |
| **Extracción TikTok / Proveedor LLM** | **Genérico** | Componentes intercambiables (Playwright, Groq) aislados del núcleo matemático de la app. |

#### Contextos Acotados

| Contexto Acotado | Responsabilidad (Qué hace) | Fuera de Responsabilidad (Qué NO hace) |
| :--- | :--- | :--- |
| **Autenticación (`auth`)** | Validar formatos de correo, longitud de contraseña, coincidencia de registro y delegar la sesión al contrato `AuthRepository`. | No almacena contraseñas en texto plano ni ejecuta reglas de cálculo Big Five. |
| **Emparejamiento (`match`)** | Proveer el catálogo de creadores (`InfluencerRepository`), calcular el porcentaje de afinidad (`MatchCalculator`) y clasificar el nivel de match. | No realiza scraping directo ni valida credenciales de inicio de sesión. |

#### Lenguaje Ubicuo (*Ubiquitous Language*)

| Término del Dominio | En el Código | Significado en el Negocio | Contexto |
| :--- | :--- | :--- | :--- |
| **ADN Digital (Marca)** | `marca` (`creatividad`, `seriedad`, `sociabilidad`, `empatia`, `estabilidad`) | Vector de personalidad ideal calibrado por la empresa en escala `0–100`. | `match` |
| **Perfil Big Five** | `bigfive` (`a`, `r`, `e`, `am`, `n`) | Puntajes psicográficos del creador en Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo. | `match` |
| **Arquetipo** | `arquetipo` | Categoría comunicativa dominante del creador derivada de sus videos y emojis. | `match` |
| **Puntaje de Match** | `porcentaje` / `matchPct` | Índice entero de compatibilidad (`0%–100%`) calculado por `calcularCompatibilidad()`. | `match` |
| **Estado de Afinidad** | `estado` / `status` | Clasificación cualitativa: *Match Excelente* (`>75%`), *Match Bueno* (`>50%`) o *Match Bajo* (`≤50%`). | `match` |
| **Pitch Comercial** | `mensajePitch` | Propuesta de colaboración personalizada construida con el nombre y arquetipo del creador. | `match` |
| **Objetos de Valor** | `Email`, `Password`, `FullName`, `NewPassword` | Clases inmutables (`Object.freeze`) que encapsulan sus propias reglas de validación. | `auth` |
| **Composition Root** | `src/container.js` | Punto único donde se instancian los adaptadores y se inyectan en los casos de uso. | Global |

---

### 5.3 Diseño Táctico e Invariantes del Dominio

#### Bloques Tácticos, Contratos y Adaptadores

| Capa | Elemento / Archivo | Rol Táctico |
| :--- | :--- | :--- |
| **Dominio** | `Email`, `Password`, `FullName`, `NewPassword` | **Objetos de Valor** inmutables con métodos estáticos `validate()` y `create()`. |
| **Dominio** | `ValidationError`, `NotConfiguredError` | **Excepciones de Dominio** tipadas por campo (`fieldErrors`). |
| **Dominio** | `MatchCalculator.js` (`calcularCompatibilidad`) | **Servicio de Dominio** puro que computa la afinidad entre marca e influencer. |
| **Dominio** | `AuthRepository.js` | **Contrato (Puerto)** que define las operaciones `login()`, `register()` y `requestPasswordReset()`. |
| **Aplicación** | `loginUser.js`, `registerUser.js`, `requestPasswordReset.js` | **Casos de Uso** con inyección de dependencias (`makeLoginUser(authRepository)`). |
| **Aplicación** | `calculateMatch.js` (`ejecutarCalculoMatch`) | **Caso de Uso** que orquesta el cálculo de compatibilidad desde `MatchScreen`. |
| **Infraestructura** | `AuthApi.js` | **Adaptador** que implementa `AuthRepository` (listo para conectar a endpoints REST). |
| **Infraestructura** | `InfluencerRepository.js` (`getInfluencers`) | **Repositorio** que abastece los 11 perfiles simulados de `MOCK_INFLUENCERS`. |

#### Invariantes del Dominio (Reglas de Negocio Verificables)

| # | Regla de Negocio (Invariante) | Dónde se Aplica |
| :---: | :--- | :--- |
| 1 | Todo correo electrónico es obligatorio, se normaliza con `.trim()` y debe cumplir el patrón `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. | `domain/auth/Email.js` |
| 2 | El nombre completo de registro debe tener al menos **3 caracteres** sin espacios vacíos. | `domain/auth/FullName.js` |
| 3 | Toda contraseña de cuenta nueva exige mínimo **6 caracteres** y debe coincidir exactamente con `repeatPassword`. | `domain/auth/NewPassword.js` |
| 4 | Los objetos de valor instanciados son inmutables mediante `Object.freeze(this)`. | `Email`, `Password`, `FullName`, `NewPassword` |
| 5 | Cada rasgo del ADN de marca se calibra de forma independiente entre `0` y `100` con incremento entero (`step = 1`). | `presentation/Screens/ConfiguracionScreen.js` |
| 6 | El porcentaje de compatibilidad siempre se entrega como entero redondeado (`Math.round`) entre `0%` y `100%`. | `domain/match/MatchCalculator.js` |
| 7 | No se permite calcular un match sin haber seleccionado previamente un creador del catálogo. | `presentation/Screens/ConfiguracionScreen.js` |


### 3. Estructura de Directorios

```text
PruebaBrandMatch/
├── assets/
│   └── screenshots/            # Capturas UI/UX del prototipo (Welcome, Login, Registro, etc.)
├── src/
│   ├── domain/                 # 1. EL CEREBRO (Lógica pura de negocio, sin React)
│   │   ├── auth/               # Entidades y contratos de autenticación y registro
│   │   │   ├── Email.js
│   │   │   ├── Password.js
│   │   │   ├── FullName.js
│   │   │   ├── NewPassword.js
│   │   │   └── AuthRepository.js
│   │   ├── match/              # Reglas de emparejamiento psicográfico Big Five
│   │   │   ├── Influencer.js
│   │   │   └── MatchCalculator.js
│   │   ├── pitch/              # Reglas de estructuración de propuestas comerciales
│   │   │   └── PitchGenerator.js
│   │   └── profile/            # Reglas y normalización del ADN de marca
│   │       └── BrandProfile.js
│   │
│   ├── application/            # 2. LOS CASOS DE USO (Orquestadores de flujo)
│   │   ├── auth/               # loginUser.js, registerUser.js
│   │   ├── match/              # calculateMatch.js
│   │   ├── pitch/              # generatePitch.js
│   │   └── profile/            # saveBrandProfile.js
│   │
│   ├── infrastructure/         # 3. EL EXTERIOR (APIs simuladas y persistencia)
│   │   ├── auth/               # AuthApi.js (Simula backend de login y registro)
│   │   ├── match/              # InfluencerRepository.js (Simula BD de creadores)
│   │   └── pitch/              # AiApi.js (Simula conexión con motor LLM)
│   │
│   ├── presentation/           # 4. LO VISUAL (Capa UI en React Native + Atomic Design)
│   │   ├── components/         # Átomos y moléculas (CustomButton, RadarChart)
│   │   ├── navigation/         # AppNavigator (Native Stack)
│   │   ├── screens/            # Welcome, Login, RegistroScreen, Configuracion, Match, Pitch
│   │   └── theme/              # colors.js (Tokens del Design System)
│   │
│   └── container.js            # Composition Root (Inyección de dependencias)
│
├── App.js                      # Punto de entrada de la aplicación
└── package.json                # Dependencias y scripts de Expo
```

---

## 🤖 Inteligencias Artificiales y Prompts Empleados

### 1. Herramientas de Inteligencia Artificial Utilizadas

| Herramienta / Modelo | Fase y Rol en el Proyecto | Aporte Técnico |
| :--- | :--- | :--- |
| **Gemini (Google)** | Punto de Partida — Prompt Maestro / General | Concepción del modelo de negocio SaaS B2B a partir de datos del mercado (60% de fracaso en campañas), mapeo completo de las 5 pantallas del prototipo y definición de la arquitectura base bajo DDD y Atomic Design. |
| **DeepSeek** | Desarrollo Técnico — Prompts Principales y Secundarios | Generación del código fuente en React Native con Expo Go, implementación de las 4 capas DDD (`domain`, `application`, `infrastructure`, `presentation`), programación de `MatchCalculator.js` y trazado geométrico del gráfico de radar SVG. |
| **Claude (Anthropic)** | Arquitectura de Software y Lógica de Dominio | Diseño de las 4 capas DDD (`domain`, `application`, `infrastructure`, `presentation`), desacoplamiento de entidades y formulación del cálculo matemático Big Five en `MatchCalculator.js`. |
| **OpenAI Codex / GitHub Copilot** | Asistencia de Codificación y UI en VS Code | Maquetación de pantallas en React Native, exportación de tokens cromáticos de Figma a `colors.js` y cálculo trigonométrico de coordenadas para el gráfico de radar en `react-native-svg`. |
| **Motor LLM (`AiApi.js`)** | IA Integrada en el Producto (Funcionalidad) | Perfilamiento psicográfico Big Five de creadores y redacción dinámica de propuestas comerciales (*Pitch*) adaptadas al estilo comunicativo del influencer. |

### 2. Jerarquía de Prompts Empleados

#### Nivel 1: Prompt Maestro / General — Punto de Partida (`Gemini`)
> *"Actúa como arquitecto de producto digital y desarrollador móvil senior. A partir de los siguientes datos extraídos del mercado —el 60% de las campañas de influencer marketing fracasan porque las marcas seleccionan creadores solo por seguidores/likes sin evaluar afinidad de valores—, genera la propuesta completa de negocio y la estructura base de una aplicación móvil SaaS B2B llamada BrandMatch desarrollada en React Native con Expo Go. El sistema debe: 1) Analizar los 5 rasgos de personalidad del modelo psicológico Big Five (Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo); 2) Mapear el flujo completo en 5 pantallas de prototipo (Welcome, Login, Configuracion de ADN con sliders, Análisis de Match con gráfico de radar y Generador de Pitch comercial con IA); y 3) Organizar el código bajo Domain-Driven Design (DDD) en 4 capas (`domain`, `application`, `infrastructure`, `presentation`) junto con Atomic Design en modo oscuro (`#0B0F19`, acento cian `#25F4EE` y magenta `#FE2C55`)."*

#### Nivel 2: Prompts Principales y Secundarios de Implementación (`DeepSeek`)

* **Prompt Secundario 1 — Andamiaje de Capas DDD:**
  > *"Tomando como base la arquitectura DDD de BrandMatch, genera el árbol completo de directorios y los archivos base en JavaScript puro. Crea dentro de `src/domain/` los subdominios `auth` (`Email.js`, `Password.js`, `AuthRepository.js`), `match` (`Influencer.js`, `MatchCalculator.js`), `pitch` (`PitchGenerator.js`) y `profile` (`BrandProfile.js`) sin importar librerías de React. Luego implementa los casos de uso orquestadores en `src/application/` y los adaptadores simulados en `src/infrastructure/`."*

* **Prompt Secundario 2 — Motor Matemático de Emparejamiento Big Five:**
  > *"Programa en JavaScript puro la clase `MatchCalculator.js`. Debe recibir el perfil de ADN configurado por la marca mediante 5 sliders (Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo en escala de 0 a 100) y compararlo contra el vector Big Five del influencer usando distancia euclidiana normalizada, devolviendo un porcentaje entero de compatibilidad entre 0% y 100% y el rasgo dominante compartido."*

* **Prompt Secundario 3 — Interfaz Dark Mode, Glassmorphism y Radar Chart SVG:**
  > *"Traslada el prototipo de Figma (`412 × 917 px`) a React Native con Expo Go. Configura los tokens en `src/presentation/theme/colors.js` (`#0B0F19` fondo, `#25F4EE` cian marca, `#FE2C55` magenta influencer). Construye el componente `RadarChart.js` con `react-native-svg` dibujando un pentágono de 5 ejes con dos polígonos superpuestos translúcidos, tarjetas con efecto Glassmorphism usando `expo-blur` y botones táctiles animados con la API `Animated`."*

* **Prompt Secundario 4 — Generador Automatizado de Pitch Comercial:**
  > *"Implementa el servicio `AiApi.js` y la entidad `PitchGenerator.js`. A partir de los datos del influencer seleccionado, su porcentaje de compatibilidad y sus dos rasgos Big Five más altos, estructura y redacta automáticamente un correo electrónico de propuesta comercial B2B persuasivo, profesional y adaptado al tono comunicativo del creador."*

---

## 🛠️ Stack Tecnológico y Librerías

* **[React Native](https://reactnative.dev/) & [Expo Go](https://expo.dev/):** Desarrollo móvil multiplataforma con actualización en caliente (*Fast Refresh*) y pruebas inmediatas en dispositivos físicos.
* **[React Navigation (Native Stack)](https://reactnavigation.org/):** Gestión nativa de pilas de navegación entre pantallas (`Welcome`, `Login`, `Configuracion`, `Match`, `Pitch`).
* **[@react-native-community/slider](https://github.com/callstack/react-native-slider):** Controles deslizantes nativos para calibrar en tiempo real los rasgos de personalidad buscados por la marca.
* **[react-native-svg](https://github.com/software-mansion/react-native-svg):** Renderizado vectorial del gráfico de radar comparativo de los 5 ejes Big Five.
* **[expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/):** Implementación nativa del efecto translúcido (*Glassmorphism*) en las tarjetas de perfil.

---

## ⚙️ Cómo ejecutar el proyecto localmente

### Requisitos previos
* Tener instalado **[Node.js](https://nodejs.org/)** (versión LTS recomendada).
* Tener instalada la aplicación **Expo Go** en tu dispositivo móvil (Android / iOS) o un emulador configurado en Android Studio.

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU-USUARIO/BrandMatch-App.git](https://github.com/TU-USUARIO/BrandMatch-App.git)
   ```
   *(Reemplaza `TU-USUARIO` con tu usuario real de GitHub).*

2. **Ingresar al directorio del proyecto:**
   ```bash
   cd BrandMatch-App
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo de Expo:**
   ```bash
   npx expo start
   ```
   *(Si es la primera ejecución, puedes usar `npx expo start -c` para limpiar la caché).*

5. **Visualizar la aplicación:**
   * **En dispositivo físico:** Escanea el código QR desde **Expo Go** (Android) o la cámara (iOS).
   * **En emulador Android:** Presiona la tecla `a` en la terminal.

---

## 👨‍💻 Integrantes / Autores

* **Kevin Amaguaña**
* **Jordan Guaicha**
* **Jefferson Marcalla**
* **Dayana Pilatuña**
* **Erick Pulamarín**

**Institución:** Universidad Central del Ecuador — Facultad de Ingeniería y Ciencias Aplicadas (Carrera de Sistemas de Información)  
**Asignatura:** Programación para Dispositivos Móviles  
**Docente:** Ing. Diego Noguera