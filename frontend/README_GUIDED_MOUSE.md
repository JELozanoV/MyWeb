# Guided Mouse Tour

El componente `GuidedMouse` proporciona un tour interactivo que guía a los usuarios a través de los elementos clave de la interfaz.

## Características

- **Tour automático**: Se ejecuta automáticamente para usuarios nuevos
- **Animaciones suaves**: Usa Framer Motion para transiciones fluidas
- **Accesibilidad**: Respeta `prefers-reduced-motion` y no interfiere con la navegación
- **Persistencia**: Usa localStorage para recordar si el usuario ya vio el tour
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## Cómo funciona

1. **Aparición**: El mouse aparece con fade-in + bounce después de 2 segundos
2. **Paso 1**: Se mueve al selector de idioma con halo primary
3. **Paso 2**: Se mueve al toggle de tema con halo accent
4. **Parking**: Se posiciona discretamente en la esquina inferior derecha

## API

```typescript
// Métodos estáticos disponibles
GuidedMouse.startTour()    // Inicia el tour manualmente
GuidedMouse.park()         // Aparca el mouse
GuidedMouse.hide()         // Oculta el mouse
GuidedMouse.show()         // Muestra el mouse
GuidedMouse.resetTour()    // Resetea el tour (elimina localStorage)
```

## Reset del Tour

Para reactivar el tour en el navegador:

```javascript
// En la consola del navegador
window.__resetTour()
```

Esto eliminará la marca `onboardingSeen` del localStorage y recargará la página.

## Eventos Custom

El componente dispara eventos personalizados para analítica:

```javascript
window.addEventListener('tour:start', () => console.log('Tour started'));
window.addEventListener('tour:step', (e) => console.log('Step:', e.detail.step));
window.addEventListener('tour:end', () => console.log('Tour completed'));
```

## Configuración

```tsx
<GuidedMouse enabled={true} /> // Habilita el tour
<GuidedMouse enabled={false} /> // Deshabilita el tour
```

## Dependencias

- `framer-motion`: Para animaciones
- `react-icons`: Para el ícono del mouse