# Portafolio Personal

Este es mi portafolio personal desarrollado con React, TypeScript y Tailwind CSS.

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 18 o superior)
- npm o yarn
- Git

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/portafolio.git
cd portafolio
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

## 🛠️ Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Construcción

Para crear una versión de producción:

```bash
npm run build
# o
yarn build
```

Los archivos de producción se generarán en la carpeta `dist/`.

## 📤 Despliegue

### Despliegue en Vercel (Recomendado)

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio del portafolio
4. Vercel detectará automáticamente que es un proyecto de Vite
5. Haz clic en "Deploy"

### Despliegue en Netlify

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Arrastra y suelta la carpeta `dist/` en Netlify
3. O conecta tu repositorio de GitHub y selecciona el repositorio del portafolio

### Despliegue en GitHub Pages

1. Añade la siguiente configuración en tu `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/nombre-del-repositorio/',
  // ... resto de la configuración
})
```

2. Ejecuta el build:
```bash
npm run build
# o
yarn build
```

3. En la configuración de GitHub del repositorio:
   - Ve a "Settings" > "Pages"
   - Selecciona la rama `gh-pages` como fuente
   - Guarda los cambios

## 🔧 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=tu_url_api
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el código

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

