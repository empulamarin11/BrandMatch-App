# BrandMatch — Módulo de Configuración ADN y Match

**Repositorio:** empulamarin11/BrandMatch-App  
**Rama:** `main`

## 1. Descripción

Implementación de las pantallas de configuración de identidad de marca (`ConfiguracionScreen`) y análisis de compatibilidad psicográfica (`MatchScreen`) de BrandMatch, estructurando su lógica bajo la metodología Domain-Driven Design (DDD). El trabajo se realizó sobre el proyecto existente en React Native con Expo, manteniendo desacopladas las reglas matemáticas de emparejamiento respecto a la interfaz gráfica.

El módulo funciona como un prototipo interactivo completo: el cálculo porcentual de afinidad y el gráfico de radar operan en tiempo real sobre un conjunto de datos simulados (`MOCK_INFLUENCERS`), dejando preparado el repositorio para conectarse posteriormente a un motor real de extracción y perfilamiento con IA.

## 2. Tecnologías y herramientas

| Elemento | Uso |
| :--- | :--- |
| React Native + Expo | Framework de la aplicación móvil multiplataforma |
| JavaScript | Lenguaje principal del proyecto |
| `@react-native-community/slider` | Controles deslizantes nativos para calibrar los 5 rasgos de marca |
| `react-native-svg` (`Polygon`, `Line`, `SvgText`) | Renderizado vectorial del gráfico pentagonal `RadarChart` |
| `expo-blur` (`BlurView`) | Efecto visual translúcido (*Glassmorphism*) en tarjetas de perfil |
| `Animated`, `Dimensions`, `StyleSheet` | Microinteracciones táctiles y dimensionamiento responsivo |
| Visual Studio Code | Editor de código |
| Gemini y DeepSeek | Asistentes de IA para arquitectura base, prompts y codificación DDD |
| Expo Go / Android Studio | Pruebas de interfaz y navegación en dispositivo móvil |
| Git y GitHub | Control de versiones y trabajo colaborativo |

## 3. Metodología: Domain-Driven Design (DDD)

DDD organiza el software alrededor de las reglas del negocio (el dominio) y las separa de la interfaz gráfica y de la fuente de datos. De este modo, el algoritmo que evalúa la afinidad psicográfica Big Five no depende de React Native ni de dónde provengan los datos de los creadores.

### 3.1 Estructura del proyecto

```text
src/
├── domain/match/                 ← reglas del negocio
│   ├── Influencer.js             ← entidad y dataset simulado (11 creadores Big Five)
│   └── MatchCalculator.js        ← servicio de dominio: calcularCompatibilidad()
├── application/match/            ← casos de uso
│   └── calculateMatch.js         ← caso de uso: ejecutarCalculoMatch()
├── infrastructure/match/         ← conexión con el exterior
│   └── InfluencerRepository.js   ← acceso a datos: getInfluencers() (backend pendiente)
├── presentation/                 ← interfaz
│   ├── screens/                  ← ConfiguracionScreen.js, MatchScreen.js, PitchScreen.js
│   ├── components/               ← RadarChart.js, CustomButton.js
│   ├── navigation/               ← AppNavigator.js
│   └── theme/                    ← colors.js
└── container.js                  ← raíz de composición e inyección de dependencias
```

### 3.2 Capas y responsabilidades

| Capa | Responsabilidad | Depende de |
| :--- | :--- | :--- |
| Dominio | Estructura de `Influencer` y fórmula de `MatchCalculator` | Nada |
| Aplicación | Orquesta el caso de uso `ejecutarCalculoMatch` | Dominio |
| Infraestructura | Provee los perfiles mediante `InfluencerRepository` | Dominio |
| Presentación | Renderiza sliders, tarjetas y el gráfico `RadarChart` | Aplicación e Infraestructura |

`container.js` actúa como raíz de composición del proyecto. Cuando se conecte el backend real de perfilamiento psicográfico, bastará con actualizar `InfluencerRepository.js` sin modificar las fórmulas de `MatchCalculator.js` ni las vistas.

### 3.3 Conceptos DDD aplicados

| Concepto | Aplicación en Configuración y Match |
| :--- | :--- |
| Contexto delimitado | Emparejamiento Psicográfico (`match`): calibración de ADN y cálculo de afinidad |
| Lenguaje ubicuo | `Influencer`, `bigfive`, `calcularCompatibilidad`, `ejecutarCalculoMatch`, `arquetipo` |
| Entidades / Modelos | Perfiles de `Influencer` con sus 5 rasgos (`a`, `r`, `e`, `am`, `n`) y arquetipo |
| Servicio de dominio | `MatchCalculator.js`, que encapsula la fórmula matemática de compatibilidad |
| Repositorio | `InfluencerRepository.js` (`getInfluencers()`), que abstrae el origen de los creadores |
| Caso de uso | `ejecutarCalculoMatch(marca, influencer)` en `calculateMatch.js` |

### 3.4 Flujo de configuración y cálculo de Match

1. En `ConfiguracionScreen.js`, el usuario calibra los 5 rasgos ideales de la marca (*Creatividad, Seriedad, Sociabilidad, Empatía y Estabilidad*) mediante sliders de `0` a `100` y avanza hacia `MatchScreen.js`.
2. `MatchScreen.js` obtiene el listado de creadores invocando `getInfluencers()` desde `InfluencerRepository.js`.
3. Por cada creador, la vista llama al caso de uso `ejecutarCalculoMatch(marca, influencer)`.
4. El caso de uso delega el cálculo a `calcularCompatibilidad()` en `MatchCalculator.js`, que compara la media aritmética de la marca contra la media de los 5 rasgos `bigfive` del influencer (`100 - |promedioMarca - promedioInfluencer|`).
5. El dominio devuelve `{ porcentaje, estado }` (`Match Excelente` > 75%, `Match Bueno` > 50%, `Match Bajo` ≤ 50%), y `RadarChart.js` dibuja el polígono vectorial del creador.

## 4. Diseño de la interfaz

| Elemento | Valor |
| :--- | :--- |
| Fondo de pantalla | `#0B0F19` (Dark Mode) |
| Polígono y acento principal (`COLORS.primary`) | `#25F4EE` (cian, opacidad de relleno `0.4`, borde `2px`) |
| Acento secundario / acción | `#FE2C55` |
| Malla pentagonal del `RadarChart` | 3 niveles concéntricos (`33%`, `66%`, `100%`) y 5 ejes en `#334155` (`1px`) |
| Etiquetas del gráfico radar | `Responsab.`, `Apertura`, `Neurot.`, `Amabilidad`, `Extraver.` (`9px`, bold, `#94A3B8`) |
| Tarjetas de perfil | Efecto translúcido *Glassmorphism* con `expo-blur` |

**Orden de los elementos:**
* **En `ConfiguracionScreen`:** encabezado de ADN de marca, 5 controles deslizantes (*Creatividad, Seriedad, Sociabilidad, Empatía, Estabilidad*) con valor porcentual dinámico y botón de confirmación hacia `Match`.
* **En `MatchScreen`:** encabezado con porcentaje y estado de compatibilidad (`Match Excelente / Bueno / Bajo`), tarjeta Glassmorphism con datos del creador (`name`, `username`, `arquetipo`, `seguidores`), gráfico `RadarChart` de 5 ejes y botón de navegación hacia `PitchScreen`.

## 5. Funcionalidad

**Implementado**

- Calibración interactiva de los 5 rasgos del ADN de marca mediante sliders nativos.
- Base de datos simulada (`MOCK_INFLUENCERS`) con 11 creadores de distintos arquetipos y puntuaciones Big Five.
- Cálculo matemático determinista del porcentaje de afinidad y clasificación automática del nivel de Match.
- Renderizado vectorial responsivo del pentágono Big Five en `RadarChart.js` con etiquetas abreviadas para evitar recortes en pantalla.
- Navegación integrada en `AppNavigator.js` (`Configuracion` → `Match` → `Pitch`).

**Pendiente (requiere backend)**

- `InfluencerRepository.getInfluencers()` devuelve los 11 perfiles estáticos de `MOCK_INFLUENCERS`: falta conectar el servicio de extracción (Web Scraping) y análisis de lenguaje natural en vivo para calcular los rasgos Big Five desde cuentas reales de TikTok.
- Persistencia remota del perfil de marca (`saveBrandProfile`) en base de datos asociada al usuario autenticado.

## 6. Prompts utilizados

**Prompt 1 — Prompt Maestro / General (Punto de partida en Gemini)**

> Actúa como arquitecto de producto digital y desarrollador móvil senior. A partir de los datos del mercado donde el 60% de las campañas fracasan por falta de afinidad entre marca y creador, diseña el flujo central de BrandMatch en React Native con Expo Go. Conecta una pantalla de Configuración ADN (5 sliders psicológicos) con una pantalla de Análisis de Match que evalúe los rasgos Big Five (Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo), calcule un porcentaje de compatibilidad y dibuje un gráfico de radar en modo oscuro (`#0B0F19`, cian `#25F4EE`) bajo arquitectura Domain-Driven Design (DDD).

**Prompt 2 — Dominio, Dataset y Caso de Uso (DeepSeek)**

> Crea la capa `domain/match/` en JavaScript puro sin importar React. En `Influencer.js` define `MOCK_INFLUENCERS` con 11 creadores de distintos arquetipos, seguidores y puntuaciones `bigfive` (`a`, `r`, `e`, `am`, `n`). En `MatchCalculator.js` implementa `calcularCompatibilidad(marca, influencer)` comparando el promedio de los 5 rasgos de la marca contra el promedio Big Five del influencer para devolver `{ porcentaje, estado }` (`Match Excelente` > 75%, `Match Bueno` > 50%, `Match Bajo` ≤ 50%). Expón el caso de uso `ejecutarCalculoMatch` en `application/match/calculateMatch.js` y el acceso a datos `getInfluencers` en `infrastructure/match/InfluencerRepository.js`.

**Prompt 3 — Gráfico de Radar Vectorial SVG (DeepSeek)**

> Desarrolla el componente `RadarChart.js` con `react-native-svg` calculando su tamaño responsivo con `Dimensions.get('window').width - 120`. Dibuja una malla pentagonal de 3 niveles (`0.33`, `0.66`, `1`) y 5 ejes radiales en `#334155`, superponiendo el polígono del influencer con `COLORS.primary` (`fillOpacity="0.4"`). Usa etiquetas abreviadas (`Responsab.`, `Apertura`, `Neurot.`, `Amabilidad`, `Extraver.`) con `textAnchor` dinámico para evitar desbordamientos en pantallas móviles compactas.

## 7. Ejecución

```bash
git clone [https://github.com/empulamarin11/BrandMatch-App.git](https://github.com/empulamarin11/BrandMatch-App.git)
cd BrandMatch-App
npm install
npx expo start
```

Con el emulador de Android encendido o desde **Expo Go**, presionar `a` en la terminal, iniciar sesión y navegar desde `Configuracion` hacia `Match`.