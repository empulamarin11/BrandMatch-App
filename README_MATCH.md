
# BrandMatch — Módulo de Configuración ADN y Match

**Repositorio:** empulamarin11/BrandMatch-App  
**Rama de desarrollo:** `feature/match-screen-opcion5`

## 1. Descripción

Implementación de las pantallas de configuración de identidad de marca (`ConfiguracionScreen`) y análisis de compatibilidad psicográfica (`MatchScreen`) de BrandMatch, estructurando su lógica bajo la metodología Domain-Driven Design (DDD).

El módulo permite configurar los cinco rasgos de personalidad de una marca y calcular su compatibilidad con perfiles de influencers mediante el modelo Big Five.

La interfaz presenta el porcentaje de compatibilidad, el estado del emparejamiento, información del influencer y una representación gráfica mediante un radar pentagonal.

## 2. Tecnologías y herramientas

| Elemento | Uso |
| :--- | :--- |
| React Native + Expo | Framework de aplicación móvil multiplataforma |
| JavaScript | Lenguaje principal |
| @react-native-community/slider | Controles deslizantes para configurar el ADN |
| react-native-svg | Renderizado vectorial del gráfico RadarChart |
| phosphor-react-native | Iconografía de la interfaz |
| @expo-google-fonts/inter | Tipografía Inter |
| expo-blur | Efectos visuales translúcidos |
| Animated | Animaciones de interfaz |
| useWindowDimensions | Adaptación a las dimensiones de pantalla |
| Visual Studio Code | Editor de código |
| Expo Go / Android Studio | Pruebas de aplicación |
| Git y GitHub | Control de versiones |

## 3. Metodología: Domain-Driven Design (DDD)

DDD organiza el software alrededor de las reglas del negocio, separando la lógica de compatibilidad de la interfaz y de la fuente de datos.

### 3.1 Estructura del proyecto

```text
src/
├── domain/match/
│   ├── Influencer.js
│   └── MatchCalculator.js
├── application/match/
│   └── calculateMatch.js
├── infrastructure/match/
│   └── InfluencerRepository.js
├── presentation/
│   ├── screens/
│   │   ├── ConfiguracionScreen.js
│   │   ├── MatchScreen.js
│   │   └── PitchScreen.js
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── AppText.js
│   │   │   └── CustomButton.js
│   │   └── RadarChart.js
│   ├── navigation/
│   └── theme/
│       └── colors.js
└── container.js
```

### 3.2 Capas y responsabilidades

| Capa | Responsabilidad |
| :--- | :--- |
| Dominio | Define las entidades y reglas de compatibilidad |
| Aplicación | Ejecuta los casos de uso |
| Infraestructura | Gestiona el acceso a los datos de influencers |
| Presentación | Renderiza las pantallas y componentes visuales |

### 3.3 Conceptos DDD aplicados

| Concepto | Aplicación |
| :--- | :--- |
| Contexto delimitado | Emparejamiento psicográfico |
| Lenguaje ubicuo | Influencer, Big Five, Match y ADN de marca |
| Entidades | Perfiles de influencers |
| Servicio de dominio | MatchCalculator.js |
| Repositorio | InfluencerRepository.js |
| Caso de uso | ejecutarCalculoMatch() |

### 3.4 Flujo de configuración y cálculo

1. El usuario configura los cinco rasgos de personalidad de su marca.
2. La aplicación obtiene los perfiles disponibles de influencers.
3. MatchScreen invoca `ejecutarCalculoMatch(marca, influencer)`.
4. El caso de uso delega el cálculo al servicio `MatchCalculator.js`.
5. El dominio devuelve el porcentaje y el estado de compatibilidad.
6. RadarChart representa gráficamente los cinco rasgos de ambos perfiles.
7. El usuario puede continuar hacia Pitch para generar una propuesta de colaboración.

Los umbrales del dominio son:

- Match Excelente: porcentaje superior a 75%.
- Match Bueno: porcentaje superior a 50% y hasta 75%.
- Match Bajo: porcentaje igual o inferior a 50%.

## 4. Diseño de la interfaz

La aplicación utiliza una identidad visual Dark Mode, con colores de alto contraste y elementos gráficos que permiten identificar rápidamente la información relevante.

| Elemento | Valor |
| :--- | :--- |
| Fondo | #0B0F19 |
| Tarjetas | #1E293B |
| Color principal | #25F4EE |
| Color de acción | #FE2C55 |
| Texto principal | #F8FAFC |
| Texto secundario | #94A3B8 |
| Fondo de inputs | #111827 |
| Bordes | #1E293B |
| Acento | #22D3EE |
| Error | #F87171 |
| Tipografía | Inter |

### 4.1 Organización de MatchScreen

La pantalla contiene:

- Encabezado BrandMatch con iconografía.
- Botón para volver al buscador.
- Tarjeta de nivel de compatibilidad.
- Porcentaje y clasificación del Match.
- Información del influencer.
- Comparativa Big Five mediante RadarChart.
- Botón para generar un correo de colaboración.

### 4.2 RadarChart

El gráfico representa cinco dimensiones:

- Responsabilidad.
- Apertura.
- Neuroticismo.
- Amabilidad.
- Extraversión.

El influencer se representa mediante el color principal cian y la marca mediante un polígono gris.

## 5. Funcionalidad

### 5.1 Implementado

- Configuración de cinco rasgos de personalidad de marca.
- Perfiles simulados de influencers.
- Cálculo determinista del porcentaje de compatibilidad.
- Clasificación del estado de Match.
- Gráfico de radar vectorial.
- Comparación visual de marca e influencer.
- Navegación hacia la generación del pitch.
- Diseño responsivo.
- Animaciones de entrada.
- Componentes reutilizables mediante Atomic Design.

### 5.2 Pendiente de integración

- Conexión de perfiles reales de influencers mediante servicios de extracción.
- Análisis de lenguaje natural para estimar rasgos Big Five.
- Persistencia remota de los perfiles de marca.
- Integración completa con servicios externos de IA.

## 6. Prompts utilizados

### Prompt 1 — Diseño general

Actúa como arquitecto de producto digital y desarrollador móvil. Diseña el flujo de configuración de ADN de marca y análisis de compatibilidad psicográfica de BrandMatch utilizando React Native, Expo Go y arquitectura DDD.

### Prompt 2 — Dominio y compatibilidad

Implementa un modelo de dominio para comparar cinco rasgos de personalidad de una marca con los cinco rasgos Big Five de un influencer. Devuelve un porcentaje y una clasificación de compatibilidad.

### Prompt 3 — Radar SVG

Desarrolla un gráfico de radar pentagonal con cinco dimensiones, malla concéntrica y polígonos de comparación para representar los perfiles de marca e influencer.

## 7. Ejecución

```bash
git clone https://github.com/empulamarin11/BrandMatch-App.git
cd BrandMatch-App
npm install
npx expo start
```

Para ejecutar en Android, inicia un emulador o conecta un dispositivo compatible con Expo Go.

## 8. Migración al sistema de diseño (Inter + Phosphor Icons)

### 8.1 Descripción

Se actualizó la interfaz de `MatchScreen.js` para integrarla con el sistema de diseño de BrandMatch, utilizando el átomo `AppText` y la biblioteca `phosphor-react-native`.

La migración busca mantener la consistencia visual entre las pantallas de autenticación, configuración, análisis de compatibilidad y generación de propuestas.

También se incorporó la tipografía Inter a las etiquetas del gráfico `RadarChart.js` mediante las propiedades de texto SVG.

La lógica de negocio se mantiene desacoplada de la presentación, conservando la llamada a `ejecutarCalculoMatch(marca, influencer)`.

### 8.2 Comparación Antes y Después

| Antes | Después |
| :--- | :--- |
| Componentes Text nativos con estilos individuales | AppText con variantes y tipografía Inter |
| fontWeight para definir pesos tipográficos | fontFamily con familias Inter |
| Colores definidos directamente en los componentes | Tokens centralizados en colors.js |
| Interfaz sin iconografía consistente | Iconos Phosphor |
| Leyenda del radar con un único perfil representado | Comparación visual de influencer y marca |
| Umbral visual de 70% | Umbral de 75%, alineado con MatchCalculator |
| Etiquetas SVG con formato tipográfico independiente | Etiquetas SVG con Inter_500Medium |

### 8.3 Iconos Phosphor utilizados

| Icono | Ubicación | Función |
| :--- | :--- | :--- |
| Heartbeat | Encabezado | Identidad visual de BrandMatch |
| ArrowLeft | Botón volver | Navegación hacia el buscador |
| Target | Tarjeta de compatibilidad | Representa el nivel de Match |
| User | Información del perfil | Identificación del influencer |
| At | Información del perfil | Identificación del usuario |
| UsersThree | Información del perfil | Representación de seguidores |
| MaskHappy | Información del perfil | Representación del arquetipo |
| ChartPolar | Tarjeta del radar | Identificación de la comparativa Big Five |

### 8.4 Cómo probar la migración

Primero, actualizar las dependencias:

```bash
npm install
```

Iniciar el proyecto limpiando la caché:

```bash
npx expo start -c
```

Para realizar las pruebas:

1. Abrir el proyecto desde Expo Go o el emulador Android.
2. Iniciar la aplicación.
3. Recorrer el flujo Welcome → Login → Configuración → Match.
4. Verificar que los textos utilizan la tipografía Inter.
5. Comprobar la visualización de los iconos Phosphor.
6. Revisar los estados de compatibilidad:
   - Mayor a 75%: verde.
   - Mayor a 50% y hasta 75%: amarillo.
   - 50% o menos: rojo.
7. Verificar que el radar represente ambos perfiles.
8. Comprobar la navegación hacia Pitch.
9. Repetir las pruebas en orientación vertical, horizontal y dimensiones cuadradas.

### 8.5 Responsividad

La interfaz utiliza `useWindowDimensions()` para detectar los cambios de ancho y alto disponibles.

Se contemplan tres escenarios:

- 9:16: disposición vertical, tarjetas apiladas y contenido desplazable.
- 16:9: disposición horizontal cuando existe espacio suficiente para dos tarjetas.
- 1:1: adaptación mediante dimensiones disponibles, distribución flexible y límites de ancho.

Los contenedores utilizan `width: '100%'`, `maxWidth` y `alignSelf: 'center'` para mantener una presentación organizada.

El componente `RadarChart` calcula su tamaño en función del ancho disponible y del tamaño máximo configurado.

### 8.6 Consideraciones técnicas

La migración conserva las responsabilidades de las capas DDD.

Los componentes visuales no implementan fórmulas de compatibilidad. Estas continúan centralizadas en el dominio.

El sistema de diseño permite mantener consistencia tipográfica, cromática y visual entre los diferentes módulos de BrandMatch.
