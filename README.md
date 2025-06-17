

# Documentación de Despliegue - Modtech

## Requisitos del Sistema

### Requisitos Mínimos
- Node.js (versión recomendada: 18.x o superior)
- npm (incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Dependencias Principales
- React 18.2.0
- Material-UI (MUI) 5.15.10
- Bootstrap 5.3.2
- React Router DOM 6.22.1
- Axios 1.6.7
- PayPal React SDK 8.1.3

## Pasos para el Despliegue

### 1. Preparación del Entorno
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Navegar al directorio del proyecto
cd modtech

# Instalar dependencias
npm install
```

### 2. Configuración del Entorno de Desarrollo
```bash
# Iniciar el servidor de desarrollo
npm run dev
```

### 3. Construcción para Producción
```bash
# Crear build de producción
npm run build
```

### 4. Vista Previa de Producción
```bash
# Previsualizar la versión de producción
npm run preview
```

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Estructura del Proyecto
- `/src`: Código fuente principal
- `/public`: Archivos estáticos
- `/node_modules`: Dependencias instaladas
- `vite.config.js`: Configuración de Vite
- `package.json`: Configuración del proyecto y dependencias

## Notas Importantes
1. Asegúrese de tener todas las variables de entorno necesarias configuradas
2. El proyecto utiliza Vite como bundler
3. Se recomienda usar Node.js LTS para mejor compatibilidad
4. El proyecto incluye soporte para PayPal y generación de PDFs

## Solución de Problemas Comunes
1. Si hay problemas con las dependencias:
   ```bash
   npm clean-install
   ```
2. Si hay problemas con el cache:
   ```bash
   npm cache clean --force
   ```
