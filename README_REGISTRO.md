# 📝 Pantalla de Registro – BrandMatch

Pantalla donde un usuario nuevo crea su cuenta en BrandMatch. Fue rediseñada para quedar igual al prototipo de Figma del proyecto.

- **Archivo:** `src/screens/RegistroScreen.js`
- **Pantalla del sorteo:** P3 – Registro

---

## 📱 Vista previa

| Antes | Después (diseño de Figma) |
| :---: | :---: |
| ![Registro antes](./assets/screenshots/registro.jpeg) | ![Registro rediseñado](./assets/screenshots/registro-rediseno.png) |

---

## 🚀 Funcionalidades

- **Formulario completo:** campos *Full Name*, *Email*, *Password* y *Repeat Password*, cada uno con su etiqueta encima.
- **Mostrar u ocultar contraseña:** cada campo de contraseña tiene su propio ícono de ojo (dibujado con `react-native-svg`).
- **Validación de datos:** antes de crear la cuenta se revisan los datos y, si algo está mal, aparece un mensaje en rojo.
- **Estado de carga:** al tocar *Register* aparece un circulito de carga (simula la respuesta del servidor), luego el botón cambia a **"✓ Account Created!"** y se pasa a la pantalla de Configuración.
- **Teclado que no tapa el formulario:** con `KeyboardAvoidingView` y `ScrollView` la pantalla se acomoda y se puede desplazar cuando aparece el teclado.
- **Animaciones de entrada:** el título, el formulario y el botón aparecen uno tras otro con la API `Animated`.

---

## ✅ Validaciones

Se revisan en este orden y se detiene en la primera que falla:

| # | Regla | Mensaje que se muestra |
| :-: | --- | --- |
| 1 | Ningún campo puede estar vacío | `Please fill in all fields` |
| 2 | El correo debe tener formato `texto@texto.texto` | `Please enter a valid email` |
| 3 | La contraseña debe tener al menos 6 caracteres | `Password must be at least 6 characters` |
| 4 | *Password* y *Repeat Password* deben ser iguales | `Passwords do not match` |

---

## 🧠 Estados de la pantalla (`useState`)

| Estado | Para qué sirve |
| --- | --- |
| `nombre`, `correo`, `password`, `repetirPassword` | Guardan lo que escribe el usuario en cada campo |
| `verPassword`, `verRepetir` | Indican si cada contraseña se muestra u oculta |
| `error` | Guarda el mensaje de error que se muestra en rojo |
| `isLoading` | Muestra el circulito de carga mientras se "crea" la cuenta |
| `isSuccess` | Cambia el botón a "✓ Account Created!" |

---

## 🧭 Navegación

```text
Login ──("Crear una cuenta nueva")──▶ Registro ──(Register)──▶ Configuración
                                         │
                                         └──("Log in")──▶ Login
```

---

## 🛠️ Componentes y librerías usadas

- `CustomButton` (`src/components/CustomButton.js`): botón con animación al presionar.
- `COLORS` (`src/theme/colors.js`): colores del Design System del proyecto.
- `react-native-svg`: ícono del ojo (ya estaba instalado en el proyecto, no se agregaron dependencias).
- `react-native-safe-area-context`: respeta los bordes y la muesca del celular.

---

## ▶️ Cómo probarla

1. Ejecutar el proyecto:
   ```bash
   npx expo start -c
   ```
2. Abrir la app (tecla `a` para el emulador, `w` para el navegador o escanear el QR con Expo Go).
3. Tocar **"Empezar ahora"** y luego **"Crear una cuenta nueva"**.

### Casos de prueba

| Acción | Resultado esperado |
| --- | --- |
| Tocar *Register* con todo vacío | Aparece `Please fill in all fields` |
| Escribir un correo como `kevin@gmail` | Aparece `Please enter a valid email` |
| Usar una contraseña de 3 caracteres | Aparece `Password must be at least 6 characters` |
| Escribir dos contraseñas distintas | Aparece `Passwords do not match` |
| Tocar el ícono del ojo | La contraseña se muestra; al tocarlo otra vez se oculta |
| Llenar todo correctamente y tocar *Register* | Circulito de carga → "✓ Account Created!" → pantalla de Configuración |
| Tocar *Log in* | Va a la pantalla de Login |
