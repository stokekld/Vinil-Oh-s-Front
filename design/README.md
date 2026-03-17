# Vinil Oh's Club - Listening Session Mockup

Un mockup de single-page app para Vinil Oh's Club con aesthetic de **Web Brutalism** e **Indie Web**.

## Características

### Layout Responsivo
- **Desktop (≥768px)**: Dual-panel layout con scroll independiente
  - Panel izquierdo: Listado de canciones
  - Panel derecho: Detalles de la canción seleccionada
  - Footer siempre visible
  
- **Mobile (<768px)**: Grid layout + card overlay
  - Grid de canciones como tarjetas
  - Overlay modal con detalles al seleccionar
  - Footer visible

### Diseño Visual
**Paleta Monocromática** (según requerimientos):
- Background: `#F1EAD8` (beige claro)
- Surface: `#DBC091` (beige oscuro)
- Primary/Text: `#5C3E28` (marrón)
- Dark/Accent: `#27221C` (casi negro)

**Tipografía**:
- Display: Courier New (monoespaciada, brutalista)
- Body: System fonts (legibilidad optimizada)

### Características de Interacción

1. **Header**: 
   - Logo con branding del club
   - Información de la sesión (fecha actual)
   - Descripción del club

2. **Playlist Panel**:
   - Listado scrolleable de canciones
   - Hover states con animaciones sutiles
   - Indicador visual de canción seleccionada (barra lateral)

3. **Detail Panel**:
    - **Desktop**: Layout de grid con portada a la izquierda e info + player a la derecha
    - **Mobile**: Layout vertical con portada arriba e info + player abajo
    - Portada del álbum
    - Información de la canción (título, artista, álbum, posición)
    - Player de Tidal embedido (sin sección de contexto)
    - Transiciones suaves al cambiar

4. **Modal de Club Info**:
   - Popup con descripción completa
   - Links a redes sociales (Instagram)
   - Placeholder para Patreon

5. **Footer**:
   - Links navegables
   - Información de copyright

### Elementos de Diseño Brutalist

- Bordes crudos de 2px
- Typography bold y audaz
- Espacios asimétricos
- Dividers visuales claros
- Hover states pronounced
- Paleta monocromática restrictiva

## Estructura de Archivos

```
index.html          # Archivo único con HTML, CSS y JavaScript
```

## Mock Data

Actualmente incluye 30 canciones de ejemplo. La estructura esperada de la API es:

```typescript
interface UserPlaylist {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverArts: PlaylistItemCoverArt[];
}

interface PlaylistItemCoverArt {
  href: string;
}
```

## Próximas Etapas

- [ ] Integración con API real
- [ ] Cargar datos dinámicamente
- [ ] Agregar funcionalidad de Patreon
- [ ] Optimización de imágenes
- [ ] Analytics y tracking
- [ ] Implementación en React/TypeScript (según stack definido)

## Notas de Desarrollo

- El mockup es completamente responsive
- 30 canciones incluidas con Tidal IDs reales
- Layout dual-panel en desktop (300px + 1fr) con grid de cover/info/player
- Las transiciones son CSS-only para mejor performance
- El scrollbar es customizado para mantener la aesthetic
- Player de Tidal integrado sin "Session Context"
- Keyboard navigation puede ser mejorada en versiones futuras

## Actualizaciones Recientes (v1.1)

- ✅ Layout de grid en detail panel (desktop): cover + info/player lado a lado
- ✅ Player de Tidal mejorado y simplificado (sin contexto)
- ✅ 30 canciones en lugar de 8
- ✅ Responsividad completamente optimizada

## Inspiración & Aesthetic

Esta página celebra el **indie web aesthetic** y **web brutalism**:
- Reminiscencia de webs clásicas de los 90s/2000s
- Diseño directo y sin artifices
- Enfoque en legibilidad y funcionalidad
- Monocromía para elegancia contenida
- Espacios respeto a los contenidos

---

**Vinil Oh's Club** — Un espacio para amantes de la música y coleccionistas
