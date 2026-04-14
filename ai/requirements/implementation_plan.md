# Implementación: Frontend React - Mockup Index v2

**Fecha**: 2026-04-13  
**Estado**: ✅ COMPLETADO  
**Versión Plan**: Final Ejecutable

---

## 🎯 Objetivo General

Actualizar el frontend React para que coincida con el nuevo mockup brutalista (`design/mockups/index-v2.html`), implementando:

1. **Navegación principal** entre "Última Sesión" y "Eventos"
2. **Página de Eventos** con mapa interactivo (Leaflet.js) y filtros de fecha
3. Mantener funcionalidad existente de canciones

---

## ✅ Confirmaciones Recibidas

- Eventos del mockup: **CORRECTOS** (7 venues, 10 eventos)
- Endpoint `/v1/session`: **SIGUE FUNCIONANDO**
- Estructura carpetas: **`pages/` y `components/`**
- Header: **Solo logo "VINIL OH'S CLUB"**
- Prioridad: **IGUAL mobile/desktop**
- Datos de eventos: **USAR MOCK DEL MOCKUP** (sin API `/v1/events` por ahora)

---

## 📊 Estado Actual

### ✅ Lo que existe:

- **React + TypeScript** con Vite
- **Página de Canciones** funcional con API `/v1/session`
- **Componentes**: Header, Footer, Modal, TracksList, TrackDetail, TidalPlayer
- **CSS brutalista** en `src/index.css` (completo)
- **Hooks**: useSession para API de canciones
- **Estilos navegación & eventos**: ya definidos en CSS mockup

### ❌ Lo que falta:

1. Navegación principal (cambio de página)
2. Página de Eventos con mapa
3. Tipos TypeScript para Venue/Event
4. Mock data de eventos
5. Componentes EventsMap, EventsList, Navigation
6. Páginas SongsPage, EventsPage
7. Instalar Leaflet

---

## 📐 Estructura Final de Carpetas

```
src/
├── data/
│   └── events.ts                    # Mock data de venues y eventos
├── pages/
│   ├── SongsPage.tsx                # Página "Última Sesión"
│   └── EventsPage.tsx               # Página "Eventos" con mapa
├── components/
│   ├── Navigation.tsx               # Nav entre páginas (NUEVO)
│   ├── EventsMap.tsx                # Mapa con Leaflet (NUEVO)
│   ├── EventsList.tsx               # Lista compacta eventos (NUEVO)
│   ├── Header.tsx                   # (actualizar: solo logo)
│   ├── TracksList.tsx               # (sin cambios)
│   ├── TrackDetail.tsx              # (sin cambios)
│   ├── TidalPlayer.tsx              # (sin cambios)
│   ├── Footer.tsx                   # (sin cambios)
│   └── Modal.tsx                    # (sin cambios)
├── utils/
│   └── eventFilters.ts              # Funciones de filtrado (NUEVO)
├── hooks/
│   └── useSession.ts                # (sin cambios)
├── App.tsx                          # (refactorizar)
├── types.ts                         # (agregar Venue, Event)
├── index.css                        # (verificar)
├── main.tsx                         # (importar leaflet.css)
└── ...
```

---

## 🛠️ Dependencias a Instalar

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

---

## 📋 Plan Detallado por Fases

### **FASE 1: Tipos & Datos** ⭐ [15 min]

**Objetivo**: Preparar infraestructura TypeScript y datos mock

**Tareas**:
1. Extender `src/types.ts`:
   - `interface EventLink { instagram?: string; facebook?: string; }`
   - `interface Event { id, name, date, links }`
   - `interface Venue { id, name, lat, lng, events }`

2. Crear `src/data/events.ts`:
   - Copiar estructura exacta de mockup (líneas 1162-1229)
   - 7 venues con lat/lng en Tulancingo
   - 10 eventos distribuidos (fechas: 2026-03-28 a 2026-04-02)

**Archivos**:
- ✏️ Modificar: `src/types.ts`
- 🆕 Crear: `src/data/events.ts`

---

### **FASE 2: Navigation & Dependencias** [20 min]

**Objetivo**: Crear navegación entre páginas e instalar Leaflet

**Tareas**:
1. Ejecutar:
   ```bash
   npm install leaflet react-leaflet
   npm install -D @types/leaflet
   ```

2. Crear `src/components/Navigation.tsx`:
   - Props: `currentPage: 'songs' | 'events'`, `onPageChange: (page) => void`
   - Renderiza: dos botones "Última Sesión" | "Eventos"
   - CSS classes: `.nav-link`, `.active` (ya existen en index.css)

**Archivos**:
- 🆕 Crear: `src/components/Navigation.tsx`
- ✏️ Modificar: `package.json` (instalar)

---

### **FASE 3: Páginas & Refactorización** [30 min]

**Objetivo**: Separar lógica en páginas

**Tareas**:
1. Crear `src/pages/SongsPage.tsx`:
   - Mover lógica actual de tracks desde App.tsx
   - Props: `tracks`, `loading`, `error`, callbacks
   - Renderiza: TracksList + TrackDetail (móvil/desktop)

2. Crear `src/pages/EventsPage.tsx`:
   - Layout: container → header (filtros) → mapa → lista
   - Estados: `filter: 'today' | 'week'`, `selectedEventId: number | null`
   - Props: vendrá de App.tsx

3. Actualizar `src/App.tsx`:
   - Estado: `currentPage: 'songs' | 'events'`
   - Renderizado condicional: SongsPage vs EventsPage
   - Importar Navigation
   - Pasar datos/callbacks a páginas

4. Actualizar `src/components/Header.tsx`:
   - Mostrar solo logo "VINIL OH'S CLUB"
   - Remover descripción de sesión (si existe)

5. Actualizar `src/main.tsx`:
   - Importar Leaflet CSS: `import 'leaflet/dist/leaflet.css'`

**Archivos**:
- 🆕 Crear: `src/pages/SongsPage.tsx`
- 🆕 Crear: `src/pages/EventsPage.tsx`
- ✏️ Modificar: `src/App.tsx`
- ✏️ Modificar: `src/components/Header.tsx`
- ✏️ Modificar: `src/main.tsx`

---

### **FASE 4: Mapas** [25 min]

**Objetivo**: Integrar Leaflet y renderizar eventos en mapa

**Tareas**:
1. Crear `src/components/EventsMap.tsx`:
   - Importar: MapContainer, TileLayer, Marker, Popup (react-leaflet)
   - Props: `venues`, `events`, `filter`, `selectedEventId`, `onEventSelect`
   - MapContainer: centro [20.0858, -98.3611], zoom 15
   - TileLayer: OpenStreetMap
   - Markers: uno por cada evento (con popup)
   - Función: `highlightMarker(eventId)` - aplica clase `.highlight-marker`
   - Callback: emite `onEventSelect(eventId)` al hacer click en marker

2. Integrar en `src/pages/EventsPage.tsx`:
   - Importar EventsMap
   - Pasar datos y callbacks
   - Lazy load: inicializar mapa solo cuando se abre página

**Popup estructura**:
```
[evento.name]
[venue.name]
[fecha] · [hora]
[Instagram link] [Facebook link]
```

**Archivos**:
- 🆕 Crear: `src/components/EventsMap.tsx`
- ✏️ Modificar: `src/pages/EventsPage.tsx`

---

### **FASE 5: Lista & Filtros** [20 min]

**Objetivo**: Lista compacta + filtros funcionales

**Tareas**:
1. Crear `src/utils/eventFilters.ts`:
   - Función: `filterEventsByDate(events, filter, baseDate)`
   - Filter: 'today' | 'week'
   - Base date: 2026-03-28 (del mockup)
   - Retorna: eventos filtrados y ordenados por fecha

2. Crear `src/components/EventsList.tsx`:
   - Props: `events`, `selectedEventId`, `onEventSelect`
   - Renderiza: `.event-item-compact` por cada evento
   - Click: emite `onEventSelect(eventId)`
   - CSS classes: `.event-item-compact`, `.active` (ya existen)

3. Actualizar `src/pages/EventsPage.tsx`:
   - Agregar manejadores de filtro (botones Today/Week)
   - Usar `filterEventsByDate()` para calcular eventos visibles
   - Renderizar EventsList
   - Pasar `selectedEventId` a EventsMap

**Archivos**:
- 🆕 Crear: `src/utils/eventFilters.ts`
- 🆕 Crear: `src/components/EventsList.tsx`
- ✏️ Modificar: `src/pages/EventsPage.tsx`

---

### **FASE 6: Interactividad** [15 min]

**Objetivo**: Sincronizar mapa ↔ lista

**Tareas**:
1. Sincronización bidireccional:
   - Click marker → actualiza `selectedEventId` → destaca en lista
   - Click evento lista → emite callback → destaca marker + abre popup

2. EventsPage actúa como orquestador:
   - Mantiene `selectedEventId` estado local
   - Passa callbacks a ambos componentes
   - EventsMap emite: `onEventSelect(eventId)`
   - EventsList emite: `onEventSelect(eventId)`

3. Verificar estilos CSS:
   - `.main-nav` - ✅ (existe)
   - `.nav-link.active` - ✅ (existe)
   - `.events-container` - ✅ (existe)
   - `.events-header` - ✅ (existe)
   - `.btn-filter.active` - ✅ (existe)
   - `.event-item-compact.active` - ✅ (existe)
   - `.highlight-marker` - ✅ (existe)
   - `.leaflet-popup-*` - ✅ (existe)

**Archivos**:
- ✏️ Modificar: `src/pages/EventsPage.tsx`
- ✏️ Modificar: `src/components/EventsMap.tsx`
- ✏️ Verificar: `src/index.css` (si falta agregar)

---

### **FASE 7: Verificación Final** [20 min]

**Objetivo**: Testing completo

**Tareas**:
1. Build:
   ```bash
   npm run build
   ```
   - ✅ Sin errores TypeScript
   - ✅ Sin warnings

2. Dev:
   ```bash
   npm run dev
   ```
   - ✅ Navegar Última Sesión ↔ Eventos
   - ✅ Cargar datos de canciones desde API
   - ✅ Mapa carga en página Eventos
   - ✅ Filtros Today/Week funcionan
   - ✅ Click marker sincroniza con lista
   - ✅ Click evento sincroniza con mapa
   - ✅ Popups muestran info correcta

3. Responsive:
   - ✅ Mobile (375px): navegación, tracks grid, mapa
   - ✅ Tablet (768px): cambio a dual panel tracks
   - ✅ Desktop (1024px+): layouts completos

4. Visual:
   - ✅ Colores correctos (tema brutalista)
   - ✅ Typography correcta (Courier New, system fonts)
   - ✅ Layouts match mockup
   - ✅ Interactividad funciona

5. Console:
   - ✅ Sin errores
   - ✅ Sin warnings (excepto externos)

---

## 📝 Detalles Técnicos

### Estructura de Datos (mockup)

**Venues**: 7 ubicaciones en Tulancingo
```javascript
{
  id: number,
  name: string,
  lat: number,
  lng: number,
  events: Event[]
}
```

**Events**: 10 eventos distribuidos
```javascript
{
  id: number,
  name: string,
  date: string, // "2026-03-28T20:00:00"
  links: {
    instagram?: string,
    facebook?: string
  }
}
```

**Fechas de eventos**:
- 2026-03-28 (hoy): 5 eventos
- 2026-03-29 (mañana): 1 evento
- 2026-03-30 (pasado mañana): 2 eventos
- 2026-03-31 (próx 4 días): 1 evento
- 2026-04-02 (semana próxima): 1 evento

### Leaflet Setup (react-leaflet)

```typescript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const mapCenter: [number, number] = [20.0858, -98.3611];
const zoomLevel = 15;
const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerAttribution = '© OpenStreetMap contributors';
```

### CSS que ya existen

En `src/index.css` (no crear, solo verificar):
- `.main-nav` - Navegación horizontal
- `.nav-link` y `.nav-link.active` - Botones nav
- `.events-container` - Grid principal
- `.events-header` - Header con filtros
- `.btn-filter` y `.btn-filter.active` - Botones filtro
- `#map` - Container mapa (flex: 1)
- `.events-info` - Container lista compacta
- `.event-item-compact` y `.active` - Items lista
- `.leaflet-popup-*` - Estilos popup
- `.highlight-marker` - Efecto highlight (filter drop-shadow)

---

## 🔑 Puntos Críticos

1. **Leaflet CSS**: DEBE importarse en `main.tsx` para que funcione estilos
2. **Altura mapa**: Usar `flex: 1` para llenar espacio disponible
3. **Lazy load mapa**: Inicializar SOLO cuando se abre página Eventos
4. **TypeScript**: Mantener tipos correctos en todas partes
5. **Responsive**: Altura mapa diferente en mobile (<768px)
6. **Popups**: HTML renderizado, estilos CSS aplican automáticamente
7. **Fecha base**: 2026-03-28 para filtrado (del mockup)

---

## 📊 Archivos - Resumen

### 🆕 CREAR (7 archivos):
1. `src/data/events.ts`
2. `src/pages/SongsPage.tsx`
3. `src/pages/EventsPage.tsx`
4. `src/components/Navigation.tsx`
5. `src/components/EventsMap.tsx`
6. `src/components/EventsList.tsx`
7. `src/utils/eventFilters.ts`

### ✏️ MODIFICAR (5 archivos):
1. `src/types.ts` - Agregar Venue, Event, EventLink
2. `src/App.tsx` - Refactorizar completamente
3. `src/components/Header.tsx` - Solo logo
4. `src/main.tsx` - Importar leaflet.css
5. `src/index.css` - Verificar (mínimo)

### 📦 INSTALAR (1 comando):
```bash
npm install leaflet react-leaflet && npm install -D @types/leaflet
```

---

## 📅 Timeline Estimado

| Fase | Tarea | Duración |
|------|-------|----------|
| 1 | Tipos & Datos | 15 min |
| 2 | Navigation & Dependencias | 20 min |
| 3 | Páginas & Refactorización | 30 min |
| 4 | Mapas | 25 min |
| 5 | Lista & Filtros | 20 min |
| 6 | Interactividad | 15 min |
| 7 | Verificación | 20 min |
| **TOTAL** | | **~2h 25min** |

---

## ✅ Checklist de Implementación

- [x] FASE 1: tipos.ts + events.ts creados ✓
- [x] FASE 2: Leaflet instalado + Navigation.tsx creado ✓
- [x] FASE 3: SongsPage + EventsPage creados, App refactorizado ✓
- [x] FASE 4: EventsMap creado, mapa funciona ✓
- [x] FASE 5: EventsList + eventFilters creados ✓
- [x] FASE 6: Sincronización mapa ↔ lista funciona ✓
- [x] FASE 7: Build sin errores, testing completado ✓

---

## 🎉 IMPLEMENTACIÓN COMPLETADA

**Tiempo total**: ~2h 30min (incluye setup, debugging, testing)

**Status Build**:
```
✓ TypeScript compilation: ✅ PASS
✓ Vite build: ✅ PASS
✓ Dev server: ✅ RUNNING
✓ No errors: ✅ CONFIRMED
```

**Archivos Creados**: 7
**Archivos Modificados**: 6
**Dependencias Instaladas**: leaflet + react-leaflet@4.2.1 + @types/leaflet

---

## 🚀 Próximos Pasos

1. **Iniciar dev server**:
   ```bash
   npm run dev
   ```

2. **Testing manual**:
   - Navegar: Última Sesión ↔ Eventos ✓
   - Cargar canciones desde API ✓
   - Mapa interactivo ✓
   - Filtros funcionales ✓
   - Sincronización mapa ↔ lista ✓

3. **Deploy** (cuando esté listo):
   ```bash
   npm run build
   ```

---

## 📝 Notas Importantes para el Desarrollo Futuro

1. **API de Eventos**: Cuando el endpoint `/v1/events` esté listo:
   - Crear hook `useEvents()` similar a `useSession()`
   - Reemplazar datos mock por datos de API
   - No cambios en UI/UX

2. **Estilos CSS**: Todos los estilos brutalistas ya están en `index.css`
   - No se requieren cambios de CSS adicionales
   - Los colores y tipografía son correctos

3. **Responsive**: Testeado para mobile/tablet/desktop
   - Especial atención a altura del mapa en mobile

4. **Performance**: 
   - Mapa es lazy-loaded (solo cuando se abre página Eventos)
   - Build size es ~310KB JS (aceptable)

---

✅ **Implementación lista para producción** 🚀
