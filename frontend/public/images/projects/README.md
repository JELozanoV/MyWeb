# 📁 Imágenes de Proyectos

Esta carpeta es para almacenar las imágenes de tus proyectos. Aquí puedes subir tus capturas de pantalla, mockups, o cualquier imagen relacionada con tus proyectos.

## 🚀 Opciones para Almacenar Imágenes:

### 1. **Archivos Locales** (Recomendado para desarrollo)
- **Ubicación**: `portfolio/frontend/public/images/projects/`
- **Cómo usar**: `/images/projects/tu-imagen.jpg`
- **Ventajas**: Rápido, sin dependencias externas, funciona sin internet
- **Ejemplo**:
  ```typescript
  images: [
    '/images/projects/proyecto1-screenshot1.jpg',
    '/images/projects/proyecto1-screenshot2.jpg'
  ]
  ```

### 2. **URLs Externas** (Unsplash, tu servidor, etc.)
- **Ejemplos**:
  - Unsplash: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop`
  - Tu servidor: `https://tu-dominio.com/images/proyecto1.jpg`
- **Ventajas**: No ocupa espacio en tu repo, fácil compartir
- **Desventajas**: Dependiente de internet, posibles cambios en URLs

### 3. **Cloud Storage** (Futuro)
- AWS S3, Cloudinary, Vercel Blob, etc.
- Ideal para producción con muchas imágenes

## 📝 Instrucciones:

1. **Sube tus imágenes** aquí: `portfolio/frontend/public/images/projects/`
2. **Nombra los archivos** descriptivamente: `proyecto1-dashboard.jpg`, `app-movil-login.jpg`
3. **Optimiza las imágenes**:
   - **Resolución**: 800x600px mínimo, 1200x800px recomendado
   - **Formato**: JPG/WebP para fotos, PNG para gráficos
   - **Tamaño**: Menos de 500KB por imagen
4. **Actualiza** `portfolio/frontend/src/data/projectsData.ts` con las rutas

## 🎯 Ejemplo de Proyecto:

```typescript
{
  id: 1,
  title: 'Mi App Web',
  description: 'Aplicación web moderna...',
  tags: ['React', 'Node.js'],
  images: [
    '/images/projects/app-dashboard.jpg',
    '/images/projects/app-mobile.jpg',
    '/images/projects/app-login.jpg'
  ]
}
```

## 📁 Archivos de Ejemplo:

He creado un archivo de ejemplo:
- `ejemplo-proyecto1.jpg` - Reemplázalo con tu imagen real

## 🔄 Próximos Pasos:

1. **Sube tus imágenes** reemplazando los archivos de ejemplo
2. **Actualiza** `portfolio/frontend/src/data/projectsData.ts` con las rutas correctas
3. **Nombra los archivos** descriptivamente (dashboard.jpg, mobile.jpg, etc.)
4. **Optimiza** las imágenes antes de subirlas

## � Estructura Recomendada:
```
portfolio/frontend/public/images/projects/
├── proyecto1/
│   ├── dashboard.jpg
│   ├── mobile.jpg
│   └── login.jpg
├── proyecto2/
│   ├── homepage.jpg
│   └── features.jpg
└── README.md (este archivo)
```

¡Sube tus imágenes aquí y actualiza el archivo `projectsData.ts`!