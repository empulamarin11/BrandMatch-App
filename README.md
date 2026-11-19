<p align="left">
  <img src="assets/logo-uce.png" alt="Logo Universidad Central del Ecuador" width="90">
</p>

<div align="center">

## UNIVERSIDAD CENTRAL DEL ECUADOR

<hr>

<br>

**FACULTAD DE INGENIERÍA Y CIENCIAS APLICADAS**

<br>

**SISTEMAS DE INFORMACIÓN**

<br>

**ASIGNATURA:**

Programación para Dispositivos Móviles

<br>

**TÍTULO:**

Reporte - BrandMatch 🤝

<br>

**DOCENTE:**

Ing. Diego Noguera

<br>

**INTEGRANTES:**

\- Amaguaña Kevin<br>
\- Guaicha Jordan<br>
\- Marcalla Jefferson<br>
\- Pilatuña Dayana<br>
\- Pulamarín Erick

<br>

**FECHA:**

17/11/2026

<br>

**2026 - 2027**

</div>

<p align="left">
  <img src="assets/logo-uce.png" alt="Logo Universidad Central del Ecuador" width="90">
</p>

<br>

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo_Go-000020?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

*"El futuro del marketing no es adivinar. Es hacer Match."*

</div>

---

## 📑 Tabla de contenidos

1. [Descripción del proyecto](#-descripción-del-proyecto)
2. [Problema del negocio y solución](#-problema-del-negocio-y-solución)
3. [Prototipo interactivo (Figma)](#-prototipo-interactivo-figma)
4. [Capturas de pantalla (UI/UX)](#-capturas-de-pantalla-uiux)
5. [Distribución del trabajo y mejoras por pantalla](#-distribución-del-trabajo-y-mejoras-por-pantalla)
6. [Metodología y arquitectura](#️-metodología-y-arquitectura-del-proyecto)
7. [Inteligencias artificiales y prompts empleados](#-inteligencias-artificiales-y-prompts-empleados)
8. [Stack tecnológico](#️-stack-tecnológico-y-librerías)
9. [Cómo ejecutar el proyecto](#️-cómo-ejecutar-el-proyecto-localmente)
10. [Integrantes](#-integrantes--autores)

---

## 📌 Descripción del proyecto

**BrandMatch** es una plataforma **SaaS B2B móvil** que utiliza Inteligencia Artificial y el modelo psicológico **Big Five** para emparejar marcas con los creadores de contenido (influencers) ideales, midiendo su **afinidad real de personalidad y valores** por encima de métricas superficiales como seguidores o likes.

Este repositorio contiene el **prototipo funcional** de la aplicación móvil, desarrollado en **React Native con Expo Go**, estructurado bajo **Domain-Driven Design (DDD)** y **Atomic Design**, y trasladando fielmente el diseño UI/UX creado en Figma.

---

## 🎯 Problema del negocio y solución

### El problema

En el marketing de influencers actual, las marcas toman decisiones basadas casi exclusivamente en **métricas vanidosas** (número de seguidores o likes), que son fácilmente manipulables mediante audiencias falsas. Como resultado:

- 📉 El **60 %** de las campañas fracasan por falta de afinidad real entre los valores de la marca y la personalidad del creador.
- 💸 Las empresas desperdician presupuesto y exponen su reputación corporativa al asociarse con perfiles incoherentes.
- ⏳ Los equipos de marketing invierten **días** filtrando perfiles manualmente, sin garantías de compatibilidad.

### Propuesta de valor

BrandMatch automatiza el **perfilamiento psicográfico** de creadores mediante el modelo Big Five:

| Rasgo | Qué mide |
|:--|:--|
| **A**pertura | Creatividad y apertura a nuevas experiencias |
| **R**esponsabilidad | Orden, disciplina y compromiso |
| **E**xtraversión | Sociabilidad y energía comunicativa |
| **Am**abilidad | Empatía y cooperación |
| **N**euroticismo | Inestabilidad emocional (inverso a estabilidad) |

Estos rasgos se cruzan con el **"ADN Digital"** configurado por la empresa para calcular un **porcentaje de Match** en tiempo real y generar automáticamente un **correo de propuesta comercial (Pitch)** personalizado con IA.

> **No medimos, emparejamos.**

---

## 🎨 Prototipo interactivo (Figma)

- **Enlace directo:** [Ver prototipo interactivo en Figma](https://www.figma.com/proto/hZZLmnQJlWEa1W4fg9ImRf/BrandMatch-Prototipo?node-id=1-2&p=f&t=Lkxlk6SB37UBjoMG-1&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=1%3A2)
- **Resolución de diseño:** Android compacto (412 × 917 px).
- **Design System:** modo oscuro (Dark Mode), tipografía Inter y retícula espacial de 8 px.

| Token | Color | Uso |
|:--|:--|:--|
| Surface | `#0B0F19` | Fondo principal |
| Primary | `#25F4EE` | Acento cian, gráficos e indicadores activos |
| Action | `#FE2C55` | Botones primarios y alertas |
| Muted | `#94A3B8` | Texto secundario |

---

## 📱 Capturas de pantalla (UI/UX)

| Bienvenida (Welcome) | Autenticación (Login) | Registro |
|:--:|:--:|:--:|
| <img src="assets/screenshots/Welcome.png" width="220"> | <img src="assets/screenshots/Login.png" width="220"> | <img src="assets/screenshots/Registro.png" width="220"> |

| Configuración ADN (Sliders) | Análisis de Match (Radar) | Generador de Pitch IA |
|:--:|:--:|:--:|
| <img src="assets/screenshots/Configuracion.png" width="220"> | <img src="assets/screenshots/Match.png" width="220"> | <img src="assets/screenshots/Pitch.png" width="220"> |

---

## 👥 Distribución del trabajo y mejoras por pantalla

Cada integrante fue responsable de desarrollar una o más pantallas del prototipo. La columna **"Aspectos a mejorar"** recoge las observaciones identificadas al comparar cada pantalla implementada con el diseño de Figma y el Design System del proyecto.

| Código | Integrante | Pantalla(s) | Archivo(s) | Aspectos a mejorar |
|:--:|:--|:--|:--|:--|
| **P1** | Jordan Guaicha | Bienvenida (Welcome) | `WelcomeScreen.js` | • Ocultar el ícono de configuración ⚙️, ya que en la bienvenida aún no hay sesión iniciada.<br>• Completar el eslogan: falta la segunda parte *"Es hacer Match."*<br>• Unificar el emoji de marca (🤝 en la app y 💌 en el pitch deck).<br>• Aprovechar el espacio vacío central con una breve propuesta de valor o ilustración. |
| **P2** | Jefferson Marcalla | Autenticación (Login) | `loginScreen.js` | • Agregar el enlace *"¿Olvidaste tu contraseña?"*, que ya existe como `ForgotPasswordScreen.js` pero no es accesible desde el login.<br>• Incorporar el botón de mostrar/ocultar contraseña usando `EyeIcon` / `EyeOffIcon` de `AuthIcons.js`.<br>• Aumentar la altura de los campos a 48 px (área táctil mínima del Design System).<br>• Mejorar el contraste del texto de los *placeholders*. |
| **P3** | Kevin Amaguaña | Registro | `RegistroScreen.js` | • Añadir los íconos a los botones de **Google** y **TikTok** (`GoogleIcon` ya está disponible en `AuthIcons.js`).<br>• Incluir confirmación de contraseña e indicador de requisitos de seguridad.<br>• Mostrar los mensajes de validación debajo de cada campo (nombre, correo y contraseña).<br>• Ocultar el ícono de configuración ⚙️ antes de iniciar sesión. |
| **P4** | Dayana Pilatuña | Configuración del ADN | `ConfiguracionScreen.js` | • Aclarar la equivalencia entre los sliders (Creatividad, Seriedad, Sociabilidad, Empatía, Estabilidad) y los rasgos Big Five.<br>• Mostrar los porcentajes en cian (`#25F4EE`): el rojo-rosa (`#FE2C55`) está reservado para botones y alertas.<br>• Agregar una breve descripción de cada rasgo para orientar a la marca.<br>• Hacer visible el acceso a la *"Base de Datos de Influencers"*. |
| **P5** | Erick Pulamarín | Análisis de Match y Pitch IA | `MatchScreen.js`<br>`PitchScreen.js` | **Match:**<br>• Agregar etiquetas a los 5 ejes del gráfico de radar y una leyenda (Marca vs. Influencer).<br>• Mostrar el rasgo dominante compartido que calcula `MatchCalculator.js`.<br>• Permitir ver un ranking de varios influencers, no solo uno.<br>**Pitch:**<br>• Personalizar el mensaje con el porcentaje de match y los rasgos Big Five del creador (hoy es un texto genérico).<br>• Añadir un botón para regresar al análisis, además de *"Cerrar sesión"*. |

> 📝 **Observación general:** la lista `MOCK_INFLUENCERS` (datos simulados) se encuentra actualmente en `src/domain/match/Influencer.js`. Siguiendo la regla de dependencia de DDD, se recomienda moverla a `src/infrastructure/match/`, dejando en el dominio únicamente las reglas de negocio.

---

## 🏗️ Metodología y arquitectura del proyecto

El proyecto implementa una **arquitectura en capas basada en Domain-Driven Design (DDD)**, alineada con los principios de **Clean Architecture**, complementada con **Inyección de Dependencias** para el desacoplamiento de servicios y **Atomic Design** para la construcción modular de la interfaz.

### 1. Capas arquitectónicas

| Capa | Directorio | Rol arquitectónico | Componentes implementados |
|:--|:--|:--|:--|
| **1. Dominio** | `src/domain/` | El núcleo puro. Reglas de negocio, validaciones y cálculos matemáticos sin dependencias de React ni librerías externas. | `Email.js`, `Password.js`, `FullName.js`, `NewPassword.js`, `AuthRepository.js`, `Influencer.js`, `MatchCalculator.js`, `PitchGenerator.js`, `BrandProfile.js` |
| **2. Aplicación** | `src/application/` | Orquestadores. Casos de uso que reciben datos de la vista, ejecutan reglas del dominio y coordinan la infraestructura. | `loginUser.js`, `registerUser.js`, `calculateMatch.js`, `generatePitch.js`, `saveBrandProfile.js` |
| **3. Infraestructura** | `src/infrastructure/` | El exterior. Adaptadores técnicos, repositorios de datos y conexión con APIs externas (actualmente simuladas). | `AuthApi.js`, `InfluencerRepository.js`, `AiApi.js` |
| **4. Presentación** | `src/presentation/` | Lo visual. Renderiza pantallas, gestiona rutas y captura eventos táctiles en React Native. | `components/`, `navigation/`, `screens/`, `theme/` |

### 2. Patrones complementarios

- **Inyección de Dependencias (`src/container.js`):** actúa como *Composition Root*, instanciando los servicios de infraestructura (`AuthApi`, `InfluencerRepository`, `AiApi`) e inyectándolos en los casos de uso para evitar el acoplamiento directo desde las vistas.
- **Atomic Design y Design System (`src/presentation/`):** organiza la UI por jerarquía de reutilización: tokens globales (`theme/colors.js`), átomos y moléculas (`CustomButton`, `RadarChart`), páginas (`screens/`) y navegación nativa (`navigation/AppNavigator`).
- **Regla de dependencia hacia adentro:** toda la lógica psicográfica (Big Five) y las reglas de validación residen aisladas en `src/domain/`, lo que permite sustituir en el futuro las APIs simuladas por un backend real sin alterar la interfaz gráfica.

### 3. Flujo de la aplicación

```
Welcome ──► Login ──► Configuración ADN ──► Análisis de Match ──► Pitch IA
              │
              └──► Registro
```

---

## 📂 6. Estructura Real del Repositorio (`src/`)

```text
PruebaBrandMatch/
├── assets/
│   └── screenshots/                # Capturas UI/UX de la app y del prototipo Figma
├── docs/
│   └── Reporte_Final_BrandMatch.pdf # Informe técnico institucional
├── src/
│   ├── domain/                     # 1. DOMINIO (Reglas puras e invariantes, sin React)
│   │   ├── auth/
│   │   │   ├── AuthErrors.js
│   │   │   ├── AuthRepository.js
│   │   │   ├── Email.js
│   │   │   ├── FullName.js
│   │   │   ├── NewPassword.js
│   │   │   └── Password.js
│   │   └── match/
│   │       ├── Influencer.js
│   │       └── MatchCalculator.js
│   │
│   ├── application/                # 2. APLICACIÓN (Casos de uso)
│   │   ├── auth/
│   │   │   ├── loginUser.js
│   │   │   ├── registerUser.js
│   │   │   └── requestPasswordReset.js
│   │   └── match/
│   │       └── calculateMatch.js
│   │
│   ├── infrastructure/             # 3. INFRAESTRUCTURA (Adaptadores externos)
│   │   ├── auth/
│   │   │   └── AuthApi.js
│   │   └── match/
│   │       └── InfluencerRepository.js
│   │
│   ├── presentation/               # 4. PRESENTACIÓN (UI React Native + Atomic Design)
│   │   ├── components/
│   │   │   ├── AuthIcons.js
│   │   │   ├── CustomButton.js
│   │   │   └── RadarChart.js
│   │   ├── Navigation/
│   │   │   └── AppNavigator.js
│   │   ├── Screens/
│   │   │   ├── ConfiguracionScreen.js
│   │   │   ├── ForgotPasswordScreen.js
│   │   │   ├── loginScreen.js
│   │   │   ├── MatchScreen.js
│   │   │   ├── PitchScreen.js
│   │   │   ├── RegistroScreen.js
│   │   │   └── WelcomeScreen.js
│   │   └── Theme/
│   │       └── colors.js
│   │
│   └── container.js                # Composition Root (Inyección de dependencias)
│
├── App.js                          # Punto de entrada y carga de tipografía Inter
├── package.json                    # Dependencias y scripts de Expo
├── README.md                       # Documentación principal del sistema
├── README_CONFIGURACION.md         # Manual técnico del módulo Configuración ADN
├── README_LOGIN.md                 # Manual técnico del módulo Login
├── README_MATCH.md                 # Manual técnico del módulo Match y Radar
└── README_REGISTRO.md              # Manual técnico del módulo Registro
```

---

## 📊 7. Estado Real del Proyecto

| Componente / Funcionalidad | Estado Actual | Detalle Técnico |
| :--- | :--- | :--- |
| Ejecución en Expo Go y navegación Native Stack (7 pantallas) | **Funciona** | Operativo en Android e iOS sin encabezados nativos invasivos. |
| Validaciones de dominio en Login y Registro (`Email`, `NewPassword`, `FullName`) | **Funciona** | Validación por campo en tiempo real mediante `ValidationError`. |
| Calibración de 5 sliders Big Five y buscador modal (`FlatList`) | **Funciona** | Actualización reactiva y validación de selección obligatoria. |
| Cálculo matemático de compatibilidad (`MatchCalculator.js`) | **Funciona** | Computa porcentaje entero y clasificación por umbrales. |
| Gráfico pentagonal vectorial (`RadarChart.js`) y responsividad (`9:16`, `16:9`, `1:1`) | **Funciona** | Redimensionamiento dinámico con `useWindowDimensions()` y SVG. |
| Generación y copiado al portapapeles de propuesta comercial (`PitchScreen.js`) | **Funciona** | Plantilla personalizada con `Clipboard.setString` y alerta nativa. |
| Persistencia de usuarios, recuperación de contraseña y OAuth | **Simulado / Pendiente** | `AuthApi.js` mantiene el flujo navegable y lanza `NotConfiguredError` en recuperación. |
| Conexión en vivo con API backend de scraping | **En progreso** | Consume los 11 perfiles estructurados en `MOCK_INFLUENCERS`. |

---

## 🤖 Inteligencias artificiales y prompts empleados

### 1. Herramientas de IA utilizadas

| Herramienta / Modelo | Fase y rol en el proyecto | Aporte técnico |
|:--|:--|:--|
| **Gemini** (Google) | Punto de partida — Prompt maestro | Concepción del modelo de negocio SaaS B2B, mapeo de las pantallas del prototipo y definición de la arquitectura base bajo DDD y Atomic Design. |
| **DeepSeek** | Desarrollo técnico — Prompts principales y secundarios | Generación del código en React Native con Expo Go, implementación de las 4 capas DDD, programación de `MatchCalculator.js` y trazado del gráfico de radar SVG. |
| **Claude** (Anthropic) | Arquitectura de software y lógica de dominio | Diseño de las 4 capas DDD, desacoplamiento de entidades y formulación del cálculo matemático Big Five en `MatchCalculator.js`. |
| **OpenAI Codex / GitHub Copilot** | Asistencia de codificación y UI en VS Code | Maquetación de pantallas, exportación de tokens cromáticos de Figma a `colors.js` y cálculo trigonométrico de coordenadas del radar en `react-native-svg`. |
| **Motor LLM** (`AiApi.js`) | IA integrada en el producto | Perfilamiento psicográfico Big Five de creadores y redacción dinámica de propuestas comerciales (Pitch) adaptadas al estilo del influencer. |

### 2. Jerarquía de prompts empleados

#### Nivel 1: Prompt maestro — Punto de partida (Gemini)

> *"Actúa como arquitecto de producto digital y desarrollador móvil senior. A partir de los siguientes datos extraídos del mercado —el 60 % de las campañas de influencer marketing fracasan porque las marcas seleccionan creadores solo por seguidores/likes sin evaluar afinidad de valores—, genera la propuesta completa de negocio y la estructura base de una aplicación móvil SaaS B2B llamada BrandMatch desarrollada en React Native con Expo Go. El sistema debe: 1) Analizar los 5 rasgos de personalidad del modelo psicológico Big Five (Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo); 2) Mapear el flujo completo en 5 pantallas de prototipo (Welcome, Login, Configuración de ADN con sliders, Análisis de Match con gráfico de radar y Generador de Pitch comercial con IA); y 3) Organizar el código bajo Domain-Driven Design (DDD) en 4 capas (domain, application, infrastructure, presentation) junto con Atomic Design en modo oscuro (#0B0F19, acento cian #25F4EE y magenta #FE2C55)."*

#### Nivel 2: Prompts de implementación (DeepSeek)

**Prompt secundario 1 — Andamiaje de capas DDD**

> *"Tomando como base la arquitectura DDD de BrandMatch, genera el árbol completo de directorios y los archivos base en JavaScript puro. Crea dentro de src/domain/ los subdominios auth (Email.js, Password.js, AuthRepository.js), match (Influencer.js, MatchCalculator.js), pitch (PitchGenerator.js) y profile (BrandProfile.js) sin importar librerías de React. Luego implementa los casos de uso orquestadores en src/application/ y los adaptadores simulados en src/infrastructure/."*

**Prompt secundario 2 — Motor matemático de emparejamiento Big Five**

> *"Programa en JavaScript puro la clase MatchCalculator.js. Debe recibir el perfil de ADN configurado por la marca mediante 5 sliders (Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo en escala de 0 a 100) y compararlo contra el vector Big Five del influencer usando distancia euclidiana normalizada, devolviendo un porcentaje entero de compatibilidad entre 0 % y 100 % y el rasgo dominante compartido."*

**Prompt secundario 3 — Interfaz Dark Mode, Glassmorphism y Radar Chart SVG**

> *"Traslada el prototipo de Figma (412 × 917 px) a React Native con Expo Go. Configura los tokens en src/presentation/theme/colors.js (#0B0F19 fondo, #25F4EE cian marca, #FE2C55 magenta influencer). Construye el componente RadarChart.js con react-native-svg dibujando un pentágono de 5 ejes con dos polígonos superpuestos translúcidos, tarjetas con efecto Glassmorphism usando expo-blur y botones táctiles animados con la API Animated."*

**Prompt secundario 4 — Generador automatizado de Pitch comercial**

> *"Implementa el servicio AiApi.js y la entidad PitchGenerator.js. A partir de los datos del influencer seleccionado, su porcentaje de compatibilidad y sus dos rasgos Big Five más altos, estructura y redacta automáticamente un correo electrónico de propuesta comercial B2B persuasivo, profesional y adaptado al tono comunicativo del creador."*

---

## 🛠️ Stack tecnológico y librerías

| Tecnología | Uso en el proyecto |
|:--|:--|
| **React Native & Expo Go** | Desarrollo móvil multiplataforma con *Fast Refresh* y pruebas inmediatas en dispositivos físicos. |
| **React Navigation (Native Stack)** | Navegación nativa entre pantallas (Welcome, Login, Registro, Configuración, Match, Pitch). |
| **@react-native-community/slider** | Controles deslizantes para calibrar en tiempo real los rasgos que busca la marca. |
| **react-native-svg** | Renderizado vectorial del gráfico de radar comparativo de los 5 ejes Big Five. |
| **expo-blur** | Efecto translúcido (Glassmorphism) en las tarjetas de perfil. |

---

## 🌿 10. Flujo de Trabajo en Git y Responsables

### Estrategia de Ramas y Commits
- **`main`:** Rama principal de entrega estable.
- **`features` / `feature/<módulo>`:** Ramas de trabajo independiente por funcionalidad (`login-rediseno`, `features`, `feature/match-radar`, `feature/pitch-ui`) integradas hacia `main` mediante **Pull Requests (PR)** y mensajes semánticos (*Conventional Commits*: `feat:`, `fix:`, `docs:`, `refactor:`).

### Asignación de Roles del Equipo

| Integrante | Rol Principal | Responsabilidades y Entregables Técnicos |
| :--- | :--- | :--- |
| **Erick Pulamarín** | Líder de Proyecto, Ingeniería de Datos & Diseño Base (*Product Owner*) | Concepción de la propuesta de negocio SaaS B2B; desarrollo del pipeline de extracción de datos en TikTok y análisis psicométrico Big Five mediante Groq LLM serializado en formato JSON para su consumo en la app; programación de la primera versión funcional completa del frontend; diseño inicial del prototipo en Figma, documentación base y coordinación de la colaboración y flujo de trabajo del equipo. |
| **Jefferson Marcalla** | Arquitectura DDD & Módulo de Autenticación | Reestructuración y organización integral del proyecto hacia una **Arquitectura en Capas** guiada por **Domain-Driven Design (DDD)** (`domain`, `application`, `infrastructure`, `presentation` y `src/container.js`); implementación del flujo de acceso (`loginScreen.js`, `ForgotPasswordScreen.js`), objetos de valor y validaciones puras (`Email.js`, `Password.js`, `AuthErrors.js`), además de auditoría y correcciones técnicas en el `README.md`. |
| **Kevin Amaguaña** | Módulo de Registro, Enrutamiento & Documentación Principal | Implementación del flujo de registro de marcas (`RegistroScreen.js`), caso de uso `registerUser.js` e invariantes de dominio (`FullName.js`, `NewPassword.js`); integración y pruebas de navegación en `AppNavigator.js`, validación de estados de error en formularios y edición estructurada del `README.md` principal del repositorio. |
| **Jordan Guaicha** | Experiencia de Bienvenida, Animaciones & Diseño Adaptativo | Desarrollo de la interfaz de entrada (`WelcomeScreen.js`) con microinteracciones fluidas a 60 FPS mediante la API nativa `Animated` (`useNativeDriver: true`); ingeniería de adaptación responsiva multi-formato para relaciones de aspecto **`9:16`**, **`16:9`** y **`1:1`** utilizando `useWindowDimensions()`, gestión de densidad de píxeles (`dp`) y contenedores flexibles libres de recortes en cualquier resolución. |
| **Dayana Pilatuña** | Módulo Pitch B2B, Sistema Tipográfico & Documentación Final | Desarrollo del generador dinámico de propuestas comerciales (`PitchScreen.js`) con personalización por arquetipo y copiado al portapapeles; integración global de la familia tipográfica **Inter** (`@expo-google-fonts/inter` y `expo-font`) en `App.js` y tokens del *Design System* para garantizar fidelidad estética con Figma; redacción de manuales técnicos y consolidación del informe académico final. |

---

## ⚙️ 11. Ejecución Local

### Requisitos Previos
- **[Node.js](https://nodejs.org/)** (versión LTS).
- Aplicación **Expo Go** instalada en Android/iOS o emulador en Android Studio.

### Instalación y Arranque

```bash
# 1. Clonar el repositorio
git clone [https://github.com/empulamarin11/BrandMatch-App.git](https://github.com/empulamarin11/BrandMatch-App.git)

# 2. Ingresar al directorio
cd BrandMatch-App

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo Expo (limpiando caché)
npx expo start -c
```

Escanea el código QR desde **Expo Go** en tu teléfono o presiona `a` en la terminal para abrirlo en el emulador de Android.

### Ver los datos simulados

```powershell
# Ver la base de influencers simulada
Get-Content src\domain\match\Influencer.js

# Ver en qué archivos se usa
git grep -n "MOCK_INFLUENCERS"
```

---

<div align="center">

<br>

**Universidad Central del Ecuador** — Facultad de Ingeniería y Ciencias Aplicadas<br>
Carrera de Sistemas de Información · Programación para Dispositivos Móviles<br>
Docente: Ing. Diego Noguera

<br>

*BrandMatch 🤝 — El futuro del marketing no es adivinar. Es hacer Match.*

</div>
