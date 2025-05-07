# 📘 PRAE: Plataforma de Registro Académico Estudiantil (Frontend)

Bienvenido al repositorio del **frontend** de **PRAE**, una aplicación web creada para optimizar y modernizar la gestión académica en instituciones educativas, especialmente colegios.

---

## 🚀 ¿Qué es PRAE?

**PRAE** es una plataforma integral que facilita la administración académica para rectores, docentes y estudiantes. Permite gestionar cursos, calificaciones, observaciones, estadísticas académicas y mucho más, todo en tiempo real y desde una interfaz moderna y accesible.

Este repositorio contiene el **frontend** de la aplicación, desarrollado con tecnologías modernas para ofrecer una experiencia ágil, intuitiva y responsiva.

---

## 🌟 Características del Frontend

- 🎓 **Gestión Académica**: Visualización y administración de estudiantes, docentes, cursos y materias.
- 🧑‍🏫 **Roles Personalizados**: Interfaces adaptadas según el rol (rector, docente, estudiante).
- 📝 **Registro de Calificaciones y Observaciones**: Herramientas para docentes y visualización por parte de los estudiantes.
- 📊 **Estadísticas Académicas**: Módulo de reportes visuales con análisis por curso, grado y materia.
- 💬 **Chat de Ayuda con IA**: Asistente académico inteligente para resolver dudas de los estudiantes.
- 🔔 **Notificaciones**: Alertas y recordatorios académicos importantes.
- 🎨 **Diseño responsivo y moderno**: Estilos dinámicos adaptados a todo tipo de dispositivos.


---

## 🛠️ Tecnologías Utilizadas

| Categoría                       | Tecnologías / Librerías                                 |
| ------------------------------- | ------------------------------------------------------- |
| ⚛️ Framework principal         | **React 19** (`react`, `react-dom`)                     |
| 🚦 Ruteo                        | `react-router-dom@7` (manejo de rutas y navegación SPA) |
| 🎨 Estilos                     | `sass`, `sass-loader`, `global.scss`, `variables.scss`  |
| 📦 Plantilla base              | `cra-template` (Create React App)                       |
| 💬 Notificaciones              | `react-hot-toast` (notificaciones toast personalizadas) |
| 🎭 Animaciones                 | `framer-motion`                                         |
| 🎨 Íconos                      | `react-icons`                                           |
| 🧱 Diseño tipo Pinterest       | `react-masonry-css`                                     |
| 🔍 Selects personalizables     | `react-select`                                          |
| 📊 Gráficas                    | `recharts` (gráficos interactivos y estadísticos)       |
| 🔐 Decodificación JWT          | `jwt-decode` (lectura del payload de tokens)            |
| 🌐 Comunicación en tiempo real | `socket.io-client`                                      |
| 🧪 Testing                     | `react-scripts test`, `App.test.js`, `setupTests.js`    |
| 🚀 Desempeño y métricas        | `web-vitals`, `@vercel/speed-insights`                  |
| 🔧 Linter                      | `eslint`, `eslintConfig`                                |
| ⚙️ Babel Plugin                | `@babel/plugin-proposal-private-property-in-object`     |

---

## 📁 Estructura del Proyecto
```bash
📦 praefrontend
 ┣ 📂 public                # Archivos estáticos públicos
 ┣ 📂 src                   # Código fuente principal
 ┃ ┣ 📂 assets              # Recursos multimedia como imágenes y logos
 ┃ ┣ 📂 componentes         # Componentes reutilizables (botones, tarjetas, etc.)
 ┃ ┣ 📂 Contexts            # Manejo global de estado (Auth, Temas, etc.)
 ┃ ┣ 📂 paginas             # Páginas principales según rutas
 ┃ ┣ 📂 routes              # Definición de rutas y navegación
 ┃ ┣ 📜 App.jsx             # Componente raíz de la aplicación
 ┃ ┣ 📜 App.test.js         # Tests de la App
 ┃ ┣ 📜 index.js            # Punto de entrada de React
 ┃ ┣ 📜 global.scss         # Estilos generales
 ┃ ┣ 📜 variables.scss      # Variables y configuración de estilos
 ┃ ┣ 📜 reportWebVitals.js  # Métricas de rendimiento
 ┃ ┗ 📜 setupTests.js       # Configuración inicial para pruebas
 ┣ 📜 .env                  # Variables de entorno del frontend
 ┣ 📜 package.json          # Dependencias y scripts
 ┣ 📜 .gitignore            # Archivos ignorados por Git
 ┗ 📜 README.md             # Documentación del proyecto (este archivo)
```
---

## 🚀 Despliegue

El frontend puede ser desplegado fácilmente en servicios como:
```bash
Vercel:
https://praeapp.vercel.app/login
```
```bash
Netlify
https://praeweb.netlify.app/login
```

---

## 📦 Instalación y Ejecución Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/prae-frontend.git

# Entra al directorio
cd prae-frontend

# Instala dependencias
npm install

# Corre el proyecto en desarrollo
npm start
```
---

## 👥 Autores

- Juan Camilo Henao  
- Jean Carlo Londoño Neira  
- Isabella Rebellon Medina

---

🤝 Contribuciones
Las contribuciones son bienvenidas. Si deseas aportar mejoras, arreglar errores o proponer nuevas funcionalidades, por favor crea un fork y abre un Pull Request.

