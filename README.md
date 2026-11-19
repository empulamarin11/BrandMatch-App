# BrandMatch 🤝 - Plataforma SaaS B2B de Emparejamiento Marca–Creador

**BrandMatch** es una aplicación móvil SaaS B2B que utiliza Inteligencia Artificial y el modelo psicológico **Big Five (OCEAN)** para emparejar marcas con creadores de contenido ideales, midiendo la afinidad real de personalidad y valores por encima de métricas superficiales.

El proyecto está desarrollado en **React Native con Expo Go** bajo una **Arquitectura en Capas orientada al Dominio (DDD)** con principios de **Clean Architecture**, **Inyección de Dependencias** y **Atomic Design**, trasladando el sistema de diseño construido en **Figma** y alimentándose del pipeline de extracción y análisis psicométrico **PractScrapyTtk**.

---

## 🔗 Enlaces Oficiales y Entregables del Proyecto

| Recurso / Entregable | Enlace Directo | Descripción |
| :--- | :--- | :--- |
| **🎨 Prototipo Interactivo (Figma)** | [Ver Prototipo en Figma](https://www.figma.com/proto/hZZLmnQJlWEa1W4fg9ImRf/BrandMatch-Prototipo?node-id=1-2&starting-point-node-id=1%3A2&t=7Y00eWz3GUwOEqPF-1) | Diseño UI/UX completo en Dark Mode (`8px` grid), Atomic Design y vistas responsivas (`9:16`, `16:9`, `1:1`). |
| **📄 Informe Técnico Final** | [Ver Informe Final (`Reporte_Final_BrandMatch.pdf`)](./docs/Reporte_Final_BrandMatch.pdf) | Documento académico completo con fundamentos DDD, arquitectura, pruebas y trazabilidad *(actualizar enlace si se aloja en Drive/OneDrive)*. |
| **📊 Presentación Ejecutiva (Diapositivas)** | [Ver Diapositivas de Sustentación](https://docs.google.com/presentation/d/1fKVn0Se_fRhxd-1JM1vqYXem5NBWvXEQ/edit?usp=sharing&ouid=115547854198529635935&rtpof=true&sd=true) | Presentación del problema, origen de datos, arquitectura `src/` y demostración responsiva *(reemplazar con el enlace final de la presentación)*. |
| **🕷️ Repositorio del Scraper (`PractScrapyTtk`)** | [Ir al repositorio](https://github.com/empulamarin11/PractScrapyTtk.git) | Módulo Extractor TikTok + Groq LLM | Scraper en Python/Playwright que extrae métricas públicas y estima perfiles Big Five. |

---

## 📋 Tabla de Contenido

1. [Presentación, Objetivos y Alcance](#-1-presentación-objetivos-y-alcance)
2. [Problema del Negocio y Pipeline de Datos](#-2-problema-del-negocio-y-pipeline-de-datos)
3. [Modelo de Negocio](#-3-modelo-de-negocio)
4. [Prototipo en Figma, Capturas de Pantalla y Responsividad](#-4-prototipo-en-figma-capturas-de-pantalla-y-responsividad)
5. [Arquitectura de Software y Metodología DDD](#-5-arquitectura-de-software-y-metodología-ddd)
6. [Estructura Real del Repositorio (`src/`)](#-6-estructura-real-del-repositorio-src)
7. [Estado Real del Proyecto](#-7-estado-real-del-proyecto)
8. [Inteligencia Artificial y Prompts Empleados](#-8-inteligencia-artificial-y-prompts-empleados)
9. [Limitaciones Técnicas y Consideraciones Éticas](#-9-limitaciones-técnicas-y-consideraciones-éticas)
10. [Flujo de Trabajo en Git y Responsables](#-10-flujo-de-trabajo-en-git-y-responsables)
11. [Ejecución Local](#-11-ejecución-local)

---

## 🎯 1. Presentación, Objetivos y Alcance

### Objetivo General
Desarrollar un prototipo funcional de aplicación móvil bajo **Domain-Driven Design (DDD)** que permita a las marcas calibrar su identidad psicológica (**ADN Digital**), calcular su nivel de compatibilidad con creadores de contenido perfilados mediante el modelo **Big Five** y generar propuestas comerciales personalizadas (**Pitch**).

### Objetivos Específicos
- Estructurar el código móvil en cuatro capas desacopladas (`domain`, `application`, `infrastructure`, `presentation`) con inversión de dependencias mediante un *Composition Root* (`src/container.js`).
- Integrar perfiles psicográficos obtenidos desde el scraper de TikTok y análisis con LLM (**Groq**) en el dominio de emparejamiento (`src/domain/match/`).
- Implementar reglas de validación inmutables (*Objetos de Valor*) para el flujo de autenticación y registro de marcas.
- Adaptar la interfaz móvil en modo oscuro a relaciones de aspecto **`9:16`**, **`16:9`** y **`1:1`**, manteniendo legibilidad y proporción en distintas resoluciones y densidades de píxeles.

### Delimitación del Alcance

| Incluye (Implementado en el Prototipo) | No Incluye (Fases Posteriores) |
| :--- | :--- |
| Flujo completo de 7 pantallas navegables en Expo Go (`Welcome`, `Login`, `Registro`, `ForgotPassword`, `Configuracion`, `Match`, `Pitch`). | Conexión en tiempo real a un servidor backend o base de datos relacional en la nube. |
| Validaciones de dominio puras e inmutables (`Email`, `FullName`, `Password`, `NewPassword`) y manejo tipado de errores (`ValidationError`, `NotConfiguredError`). | Autenticación OAuth real con proveedores externos (Apple / Google Sign-In) ni envío real de correos de recuperación. |
| Calibración interactiva de 5 rasgos de marca (`0%–100%`), catálogo de creadores perfilados con Big Five y cálculo matemático de compatibilidad. | Diagnóstico psicológico clínico validado (los puntajes Big Five son estimaciones comerciales orientativas). |
| Visualización vectorial pentagonal (`RadarChart.js` en SVG) y generación dinámica de *Pitch* con copiado al portapapeles. | Envío automatizado de correos B2B desde la app ni extracción en vivo desde TikTok dentro del dispositivo móvil. |

---

