# BrandMatch — Módulo de Login

**Repositorio:** empulamarin11/BrandMatch-App
**Rama:** `login-rediseno`

## 1. Descripción

Rediseño de la pantalla de inicio de sesión de BrandMatch y reorganización de su
lógica con la metodología Domain-Driven Design (DDD). El trabajo se hizo sobre el
proyecto existente, sin crear uno nuevo ni modificar el backend.

El módulo es un prototipo de interfaz funcional: la autenticación está preparada
pero aún no conectada a un servidor.

## 2. Tecnologías y herramientas

| Elemento | Uso |
|---|---|
| React Native + Expo | Framework de la aplicación móvil |
| JavaScript | Lenguaje del proyecto |
| `StyleSheet`, `TextInput`, `SafeAreaView`, `KeyboardAvoidingView`, `ScrollView` | Componentes nativos de la interfaz |
| `@expo-google-fonts/inter` + átomo `AppText` | Tipografía Inter en todos los textos |
| `phosphor-react-native` | Íconos de la pantalla ForgotPassword |
| Visual Studio Code | Editor de código |
| Claude Code (extensión de VS Code) | Asistente de IA que aplicó los cambios a partir de los prompts |
| Android Studio — emulador Pixel 9 (API 37) | Pruebas de la interfaz |
| Git y GitHub | Control de versiones y trabajo colaborativo |

## 3. Metodología: Domain-Driven Design (DDD)

DDD organiza el software alrededor de las reglas del negocio (el dominio) y las
separa de la interfaz y de la tecnología. No se refiere al diseño visual, sino a
la estructura interna del código.

### 3.1 Estructura del proyecto

```
src/
├── domain/auth/                  ← reglas del negocio
│   ├── Email.js                  ← objeto de valor: regla del correo
│   ├── Password.js               ← objeto de valor: regla de la contraseña
│   ├── AuthRepository.js         ← contrato: login() y requestPasswordReset()
│   └── AuthErrors.js             ← ValidationError, NotConfiguredError
├── application/auth/             ← casos de uso
│   ├── loginUser.js              ← "Iniciar sesión"
│   └── requestPasswordReset.js   ← "Recuperar contraseña"
├── infrastructure/auth/          ← conexión con el exterior
│   └── AuthApi.js                ← implementa el contrato (backend pendiente)
├── presentation/                 ← interfaz
│   ├── screens/                  ← loginScreen.js, ForgotPasswordScreen.js, ...
│   ├── components/
│   ├── Navigation/
│   └── theme/
└── container.js                  ← conecta las capas
```

### 3.2 Capas y responsabilidades

| Capa | Responsabilidad | Depende de |
|---|---|---|
| Dominio | Reglas de `Email` y `Password`, contrato de autenticación, errores | Nada |
| Aplicación | Coordina los casos de uso | Dominio |
| Infraestructura | Implementa el contrato contra el backend | Dominio |
| Presentación | Muestra la interfaz y captura datos | Aplicación |

`container.js` es el único archivo que conoce todas las capas: decide que
`loginUser` utiliza `AuthApi`. Para conectar el backend real o usar datos de
prueba solo se modifica ese archivo.

### 3.3 Conceptos DDD aplicados

| Concepto | Aplicación en el login |
|---|---|
| Contexto delimitado | Identidad y Acceso (`auth`): login y recuperación de contraseña |
| Lenguaje ubicuo | `Email`, `Password`, `loginUser`, `AuthRepository` |
| Objetos de valor | `Email` y `Password`, cada uno con su regla de validación |
| Repositorio | `AuthRepository` define el contrato; `AuthApi` lo implementa |
| Casos de uso | `loginUser` y `requestPasswordReset` |
| Errores de dominio | `ValidationError` y `NotConfiguredError` |

### 3.4 Flujo de inicio de sesión

1. El usuario escribe sus credenciales en `loginScreen.js` y presiona Login.
2. La pantalla llama al caso de uso `loginUser`.
3. El caso de uso valida los datos con `Email` y `Password`.
4. Si hay errores, devuelve un `ValidationError` y la pantalla muestra cada
   mensaje debajo de su campo.
5. Si son válidos, llama a `AuthRepository.login()`, implementado por `AuthApi`.

Las pantallas no contienen validaciones: la regla del correo existe únicamente en
`Email.js` y la reutilizan tanto el login como la recuperación de contraseña.

## 4. Diseño de la interfaz

| Elemento | Valor |
|---|---|
| Fondo de pantalla | `#0B0F19` |
| Título "BrandMatch" | Blanco, 28 px, bold, centrado |
| Subtítulo | `#94A3B8`, 14 px |
| Campos de entrada | Fondo `#111827`, borde `#1E293B`, radio 14 px, alto 50 px |
| Botones Login, Apple y Google | Fondo `#FF2855`, radio 14 px, alto 50 px |
| Enlaces (Forgot Password, Register) | `#22D3EE`, subrayado |

**Orden de los elementos:** título, subtítulo, Email, Password, Forgot Password,
botón Login, separador "Or login with", botones Apple y Google, enlace Register.

## 5. Funcionalidad

**Implementado**

- Ingreso de correo y contraseña, con opción de mostrar u ocultar la contraseña.
- Validación de correo (obligatorio y con formato válido) y contraseña (obligatoria).
- Mensajes de error por campo.
- Navegación a recuperación de contraseña y a registro.
- Pantalla de recuperación de contraseña migrada a `AppText` (Inter) y Phosphor
  Icons (ver sección 8).

**Pendiente (requiere backend)**

- `AuthApi.login()` no verifica credenciales: con datos válidos continúa a la
  pantalla `Configuracion` como demostración.
- La recuperación de contraseña informa que aún no está configurada.
- El acceso con Apple y Google no tiene integración OAuth.

Cada método de `AuthApi.js` incluye un `TODO` que indica dónde va la llamada real.

## 6. Prompts utilizados

**Prompt 1 — Rediseño visual** (acompañado de dos imágenes: diseño de referencia
e implementación actual)

> Actúa como un desarrollador Senior especializado en React Native y diseño UI/UX.
> Modifica el código existente de la pantalla Login de BrandMatch para que sea
> visualmente lo más idéntica posible a la imagen de referencia: fondo `#0B0F19`,
> título y subtítulo centrados, campos Email y Password con fondo `#111827`, ícono
> para mostrar la contraseña, enlace "Forgot Password", botón Login `#FF2855`,
> separador "Or login with", botones Apple y Google, y enlace Register. Valida los
> campos y muestra errores. No crees un proyecto nuevo, no modifiques el backend,
> no cambies la navegación, no instales dependencias innecesarias y no simules
> inicios de sesión exitosos.

**Prompt 2 — Arquitectura DDD**

> Aplica Domain-Driven Design al login sin cambiar su apariencia. Crea
> `src/domain/auth/` con los objetos de valor Email y Password y
> `src/application/auth/loginUser.js` como caso de uso. Extrae las validaciones de
> `loginScreen.js` hacia el dominio y haz que la pantalla use el caso de uso. No
> inventes backend: deja el repositorio de autenticación como contrato pendiente.
> Mantén JavaScript y no instales dependencias.

## 7. Ejecución

```bash
git clone https://github.com/empulamarin11/BrandMatch-App.git
cd BrandMatch-App
git checkout login-rediseno
npm install
npx expo start
```

Con el emulador de Android encendido, presionar `a` en la terminal.

## 8. Pantalla de recuperación de contraseña (ForgotPassword)

**Archivo:** `src/presentation/screens/ForgotPasswordScreen.js`
**Rama:** `feature/forgot-password` · **Tarjeta Jira:** BM-6 (épica BM-1)

### 8.1 Descripción

Permite que el usuario solicite un enlace para restablecer su contraseña. Se abre
desde el enlace "Forgot Password" del login y recibe el correo ya escrito por
parámetro de navegación (`route.params.email`). La pantalla no valida nada: llama
al caso de uso `requestPasswordReset`, y este usa el objeto de valor `Email` del
dominio, la misma regla que el login.

### 8.2 Migración al sistema de diseño (Inter + Phosphor Icons)

| Antes | Después |
|---|---|
| `Text` de React Native con `fontWeight` manual | Átomo `AppText` (fuente Inter) con variantes `title`, `subtitle`, `body` y `caption` |
| Colores escritos a mano en los textos | Prop `color` de `AppText` con tokens de `colors.js` (`textMuted`, `accent`, `error`) |
| Sin íconos | Íconos de `phosphor-react-native` |
| `TextInput` con la fuente del sistema | `TextInput` con `TYPOGRAPHY.family.regular` (Inter 400) |

**Íconos Phosphor utilizados**

| Ícono | Ubicación |
|---|---|
| `LockKey` | Encabezado, dentro de un círculo |
| `EnvelopeSimple` | Dentro del campo Email |
| `PaperPlaneTilt` | Botón "Send reset link" |
| `ArrowLeft` | Enlace "Back to Login" |

La lógica (estado, validación por `ValidationError`, llamada al caso de uso y
navegación) y el diseño responsivo no cambiaron.

### 8.3 Cómo probarla

1. `npm install` y `npx expo start`.
2. Abrir la app en el celular con Expo Go (escanear el QR) o presionar `a` para
   abrir el emulador de Android.
3. En el login, tocar **Forgot Password**.
4. Enviar el formulario vacío o con un correo inválido: aparece el mensaje de error
   debajo del campo.
5. Enviar un correo válido: aparece una alerta que indica que la recuperación aún
   no está configurada, porque el backend está pendiente (`AuthApi.js`).