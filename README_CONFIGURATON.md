# BrandMatch — Módulo de Configuración ADN

**Repositorio:** empulamarin11/BrandMatch-App  
**Rama:** `main`

## 1. Descripción

Implementación de la pantalla de calibración de identidad de marca (`ConfiguracionScreen.js`) de BrandMatch, estructurada bajo la metodología Domain-Driven Design (DDD). El módulo permite a las empresas definir su perfil psicológico ideal mediante cinco dimensiones basadas en el modelo **Big Five** y seleccionar un creador de contenido desde un buscador modal antes de ejecutar el cálculo de compatibilidad.

El módulo funciona como un prototipo de interfaz interactivo: los 5 deslizadores actualizan el estado en tiempo real y el selector consulta los perfiles simulados desde `InfluencerRepository.js`, dejando preparada la estructura para conectarse posteriormente a un motor de búsqueda y persistencia en backend.

## 2. Tecnologías y herramientas

| Elemento | Uso |
| :--- | :--- |
| React Native + Expo | Framework de la aplicación móvil multiplataforma |
| JavaScript (`useState`) | Lenguaje y gestión de estados locales de los sliders y del modal |
| `@react-native-community/slider` | Controles deslizantes nativos de precisión (`0` a `100`, paso `1`) |
| `SafeAreaView` (`react-native-safe-area-context`) | Adaptación segura a los márgenes de pantalla del dispositivo |
| `ScrollView`, `Modal`, `FlatList`, `TouchableOpacity`, `ActivityIndicator` | Componentes nativos de desplazamiento, ventana emergente y retroalimentación de carga |
| `CustomButton` & `COLORS` | Átomo de botón reutilizable y tokens del sistema de diseño |
| Visual Studio Code | Editor de código |
| Gemini y DeepSeek | Asistentes de IA para arquitectura base, prompts y codificación de la vista |
| Expo Go / Android Studio | Pruebas de interfaz y navegación en dispositivo móvil |
| Git y GitHub | Control de versiones y trabajo colaborativo |

## 3. Metodología: Domain-Driven Design (DDD)

DDD separa la captura de preferencias en la interfaz respecto a la fuente de datos de los creadores y al motor matemático de compatibilidad. De este modo, `ConfiguracionScreen.js` se encarga exclusivamente de recoger el vector de marca y el influencer seleccionado, delegando los datos al repositorio de infraestructura y el cálculo al módulo `Match`.

### 3.1 Estructura del proyecto

```text
src/
├── domain/match/                 ← reglas y entidades del negocio
│   ├── Influencer.js             ← dataset simulado de creadores (MOCK_INFLUENCERS)
│   └── MatchCalculator.js        ← regla pura de cálculo de afinidad
├── application/match/            ← casos de uso
│   └── calculateMatch.js         ← orquestador de compatibilidad
├── infrastructure/match/         ← conexión con el exterior
│   └── InfluencerRepository.js   ← acceso a datos: getInfluencers()
├── presentation/                 ← interfaz
│   ├── screens/                  ← ConfiguracionScreen.js, MatchScreen.js, ...
│   ├── components/               ← CustomButton.js
│   ├── navigation/               ← AppNavigator.js
│   └── theme/                    ← colors.js
└── container.js                  ← raíz de composición e inyección de dependencias
```

### 3.2 Capas y responsabilidades

| Capa | Responsabilidad | Depende de |
| :--- | :--- | :--- |
| Dominio | Define la estructura de `Influencer` y sus atributos (`username`, `name`, `seguidores`, `arquetipo`, `bigfive`) | Nada |
| Infraestructura | Expone `getInfluencers()` para abastecer el selector modal sin acoplar datos estáticos en la vista | Dominio |
| Presentación | Renderiza los 5 sliders, el modal `FlatList`, valida la selección obligatoria y navega hacia `Match` | Infraestructura y Componentes |

### 3.3 Conceptos DDD aplicados

| Concepto | Aplicación en Configuración ADN |
| :--- | :--- |
| Contexto delimitado | Perfilamiento y Emparejamiento (`match`): definición del ADN de marca y selección de candidato |
| Lenguaje ubicuo | `creatividad`, `seriedad`, `sociabilidad`, `empatia`, `estabilidad`, `arquetipo`, `getInfluencers` |
| Entidad de referencia | Objeto `Influencer` (`id`, `username`, `name`, `seguidores`, `arquetipo`, `bigfive`) |
| Repositorio | `InfluencerRepository.js` (`getInfluencers()`), que abstrae el origen de los creadores |

### 3.4 Flujo de configuración del ADN de marca

1. Al cargar `ConfiguracionScreen.js`, los 5 rasgos del ADN de marca se inicializan con valores base predeterminados: **Creatividad (`80%`)**, **Seriedad (`50%`)**, **Sociabilidad (`70%`)**, **Empatía (`60%`)** y **Estabilidad (`20%`)**.
2. El usuario ajusta cada deslizador entre `0%` y `100%` en incrementos de `1` unidad.
3. En la sección de búsqueda, el usuario presiona el selector desplegable (`Elegir influencer...`), abriendo un `Modal` inferior con un `FlatList` alimentado por `getInfluencers()`.
4. Al elegir un perfil (`handleSelectInfluencer`), se cierra el modal, se limpia cualquier mensaje de error previo y se despliega una tarjeta resumen (`infoBox`) con el nombre, seguidores y arquetipo del creador.
5. Al presionar **"Ver Análisis Match"** (`handleBuscar`), la vista verifica que exista un influencer seleccionado; si no lo hay, muestra `⚠️ Selecciona un influencer primero.`. Si es válido, activa el indicador `Calculando Match...` durante `1200 ms` y navega a `Match` enviando `{ marca, influencer }`.

## 4. Diseño de la interfaz

| Elemento | Valor |
| :--- | :--- |
| Fondo de pantalla (`COLORS.background`) | `#0B0F19` |
| Título `"Configura tu ADN"` | Blanco (`COLORS.textLight`), `28 px`, weight `900`, centrado |
| Subtítulo | `#94A3B8` (`COLORS.textMuted`), `14 px`, centrado |
| Tarjetas de sección (`sectionCard`) | `rgba(30, 41, 59, 0.5)`, radio `16 px`, borde `rgba(255,255,255,0.05)` |
| Sliders (`@react-native-community/slider`) | Pista activa `COLORS.primary` (`#25F4EE`), pista inactiva `COLORS.card`, pulgar `COLORS.action` (`#FE2C55`) |
| Selector desplegable (`dropdownButton`) | Fondo `COLORS.card`, radio `10 px`, padding `15 px` |
| Tarjeta de influencer seleccionado (`infoBox`) | Fondo `rgba(37,244,238,0.1)`, borde `1 px` `COLORS.primary`, radio `8 px` |
| Modal inferior (`modalContent`) | Fondo `COLORS.background`, esquinas superiores redondeadas `20 px`, alto máximo `70%` |

**Orden de los elementos:** título, subtítulo, Tarjeta 1 (*"1. Configura el ADN de tu Marca"* con los 5 sliders porcentuales), Tarjeta 2 (*"2. Buscar Influencer"* con mensaje de validación, botón desplegable y ficha resumen del creador), botón de acción *"Ver Análisis Match"* (o indicador de carga) y ventana modal emergente con el listado de creadores.

## 5. Funcionalidad

**Implementado**

- Calibración interactiva de los 5 rasgos psicológicos de la marca (*Creatividad, Seriedad, Sociabilidad, Empatía y Estabilidad*) con retroalimentación porcentual en tiempo real.
- Buscador en ventana modal (`Modal` + `FlatList`) conectado a `InfluencerRepository.getInfluencers()`.
- Ficha de previsualización del creador seleccionado (`Nombre`, `Seguidores` y `Arquetipo`).
- Validación previa al cálculo: impide continuar si no se ha seleccionado un influencer (`⚠️ Selecciona un influencer primero.`).
- Estado de carga visual (`ActivityIndicator` con texto `"Calculando Match..."`) y paso de parámetros (`marca` e `influencer`) hacia `MatchScreen`.

**Pendiente (requiere backend)**

- Conectar el buscador modal a un endpoint de búsqueda remota y filtrado por categoría/audiencia en lugar de listar únicamente los 11 perfiles locales de `MOCK_INFLUENCERS`.
- Guardar el perfil de ADN configurado por la marca en base de datos mediante el caso de uso `saveBrandProfile.js`.

## 6. Prompts utilizados

**Prompt 1 — Prompt Maestro / General (Punto de partida en Gemini)**

> Actúa como arquitecto de producto digital y desarrollador móvil senior. A partir de los datos del mercado donde el 60% de las campañas fracasan por falta de afinidad entre marca y creador, diseña la estructura base de BrandMatch en React Native con Expo Go. Incluye una pantalla de Configuración ADN donde la marca calibre 5 rasgos psicológicos mediante sliders, seleccione un influencer de una lista y envíe esos parámetros a la pantalla de análisis de Match bajo arquitectura Domain-Driven Design (DDD) en modo oscuro (`#0B0F19`, cian `#25F4EE` y acción `#FE2C55`).

**Prompt 2 — Pantalla de Configuración ADN y Buscador Modal (DeepSeek)**

> Crea `src/presentation/screens/ConfiguracionScreen.js` en React Native con Expo usando `SafeAreaView` y `ScrollView`. Implementa dos tarjetas con estilo translúcido (`rgba(30, 41, 59, 0.5)`): en la primera, agrega 5 sliders de `@react-native-community/slider` (`0` a `100`, paso `1`) para Creatividad (80), Seriedad (50), Sociabilidad (70), Empatía (60) y Estabilidad (20); en la segunda, crea un selector desplegable que abra un `Modal` con `FlatList` alimentado por `getInfluencers()` de `InfluencerRepository.js` y muestre una ficha resumen del influencer elegido. Valida que se haya seleccionado un creador antes de mostrar `ActivityIndicator` ("Calculando Match...") y navegar a `Match` pasando `{ marca, influencer }`.

## 7. Ejecución

```bash
git clone [https://github.com/empulamarin11/BrandMatch-App.git](https://github.com/empulamarin11/BrandMatch-App.git)
cd BrandMatch-App
npm install
npx expo start
```

Con el emulador de Android encendido o desde **Expo Go**, presionar `a` en la terminal, iniciar sesión en `Login` y calibrar los valores en `Configuracion`.