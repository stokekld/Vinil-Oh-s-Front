# Plan de Integración - Pestaña "Próxima Sesión"

## Resumen

Integrar la nueva pestaña "Próxima Sesión" del mockup (`design/mockups/index-v2.html`) en el proyecto React, consumiendo datos del endpoint `/v1/session/next`.

## Estructura del Endpoint

**GET** `/v1/session/next`

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Next session retrieved successfully",
  "data": [
    {
      "id": "83ebc562-6c28-4f98-8d4e-ff7cb9844c06",
      "title": "Album Title",
      "artists": "Artist Name",
      "coverArts": [
        { "href": "https://example.com/cover.jpg" }
      ]
    }
  ],
  "itemsCount": 1
}
```

## Archivos a Modificar/Crear

### 1. Tipos (`src/types.ts`)
**Acción:** Agregar nuevas interfaces

```typescript
export interface Album {
  id: string;
  title: string;
  artists: string;
  coverArts: CoverArt[];
}

export interface NextSessionResponse {
  success: boolean;
  message: string;
  data: Album[];
  itemsCount: number;
}
```

### 2. Hook - `src/hooks/useNextSession.ts` (NUEVO)
**Acción:** Crear hook similar a useSession.ts

**Responsabilidades:**
- Llamar al endpoint `/v1/session/next`
- Manejar estados de loading, error y datos
- Retornar `{ albums, loading, error }`

**Referencia:** Copiar estructura de `src/hooks/useSession.ts`

### 3. Navegación (`src/components/Navigation.tsx`)
**Acción:** Agregar tercera pestaña "Próxima Sesión"

**Cambios:**
- Actualizar tipo `currentPage` para incluir `'session'`
- Agregar tercer link en el nav con data-page="session"
- Manejar orden: Última Sesión | Próxima Sesión | Eventos

### 4. App Principal (`src/App.tsx`)
**Acción:** Integrar nueva página y estado

**Cambios:**
- Importar useNextSession
- Agregar estado para la nueva página: `currentPage: 'songs' | 'session' | 'events'`
- Renderizar SessionPage cuando currentPage === 'session'
- Pasar datos de albums al SessionPage

### 5. Página de Sesión - `src/pages/SessionPage.tsx` (NUEVO)
**Acción:** Crear página principal para "Próxima Sesión"

**Funcionalidades (basado en mockup):**
- Layout de dos paneles (lista izquierda, detalle derecha) en desktop
- Vista de cards en mobile
- Lista de álbumes con selección
- Detalle del álbum seleccionado con:
  - Cover art
  - Título y artista
  - Player de Tidal (embed de álbum)

**Estructura similar a:** `src/pages/SongsPage.tsx`

### 6. Componente de Lista de Álbumes - `src/components/AlbumsList.tsx` (NUEVO)
**Acción:** Crear componente para listar álbumes

**Props:**
```typescript
interface AlbumsListProps {
  albums: Album[];
  selectedAlbumId: string | null;
  onSelectAlbum: (albumId: string) => void;
}
```

**Comportamiento:**
- Desktop: Lista vertical con items seleccionables
- Mobile: Grid de cards (similar a tracks-list en mobile)

### 7. Componente de Detalle de Álbum - `src/components/AlbumDetail.tsx` (NUEVO)
**Acción:** Crear componente para mostrar detalle de álbum

**Props:**
```typescript
interface AlbumDetailProps {
  album: Album | null;
}
```

**Contenido:**
- Imagen del álbum (coverArts[2] o coverArts[0])
- Título del álbum
- Nombre del artista
- TidalPlayer con el album.id

### 8. Actualizar CSS (`src/index.css`)
**Acción:** Agregar estilos específicos de la página de sesión

**Basado en el mockup (líneas 1041-1202 de index-v2.html):**

```css
/* Session Page Layout */
#session-main {
  overflow-y: auto;
}

@media (min-width: 768px) {
  #session-main {
    overflow-y: hidden;
    grid-template-columns: 300px 1fr;
    gap: var(--border-width);
    background: var(--primary);
  }
}

/* Session List Panel */
.session-list-panel {
  display: none;
}

@media (min-width: 768px) {
  .session-list-panel {
    display: flex;
    flex-direction: column;
    border-right: var(--border-width) solid var(--primary);
    background: var(--bg);
    overflow-y: auto;
    overflow-x: hidden;
  }
}

@media (max-width: 767px) {
  #session-main .session-list-panel {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 0;
    background: var(--bg);
  }
}

.session-header {
  padding: calc(var(--spacing-unit) * 2);
  border-bottom: var(--border-width) solid var(--primary);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-header h3 {
  margin: 0;
  color: var(--dark);
}

.session-list {
  padding: var(--border-width);
}

@media (min-width: 768px) {
  .session-list {
    padding: 0;
  }
}

/* Album Items */
.session-album-item {
  padding: calc(var(--spacing-unit) * 1.5);
  border-bottom: var(--border-width) solid var(--surface);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  display: flex;
  gap: var(--spacing-unit);
  align-items: center;
}

.session-album-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--dark);
  transform: scaleY(0);
  transition: transform 0.2s;
  transform-origin: top;
}

.session-album-item:hover {
  background: var(--surface);
}

.session-album-item:hover::before {
  transform: scaleY(1);
}

.session-album-item.active {
  background: var(--surface);
}

.session-album-item.active::before {
  transform: scaleY(1);
}

/* Mobile Album Cards */
.session-album-card {
  background: var(--bg);
  border: var(--border-width) solid var(--primary);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.session-album-card .cover-art-container {
  max-width: 100%;
  margin: 0;
  border-bottom: var(--border-width) solid var(--primary);
}

.session-album-card .cover-art {
  border: none;
  display: block;
  width: 100%;
}

.session-album-card .session-card-body {
  padding: calc(var(--spacing-unit) * 1.5);
}

.session-album-card .track-meta {
  margin-bottom: 0;
}

.session-album-card .track-meta h2 {
  font-size: 1.1rem;
}

.session-album-card .session-card-player {
  border-top: var(--border-width) solid var(--primary);
  padding: calc(var(--spacing-unit) * 1.5);
}

.session-album-card .tidal-embed-wrapper iframe {
  height: 120px;
}

/* Session Detail Panel */
.session-detail-panel {
  display: none;
}

@media (min-width: 768px) {
  .session-detail-panel {
    display: flex;
    flex-direction: column;
    background: var(--bg);
    padding: calc(var(--spacing-unit) * 2);
    overflow-y: auto;
    padding-right: calc(var(--spacing-unit) * 3);
  }
}
```

### 9. Actualizar Player de Tidal (`src/components/TidalPlayer.tsx`)
**Acción:** Modificar para soportar tracks y álbumes

**Cambio:** Agregar prop `type: 'track' | 'album'` con default 'track'

**URL embed:**
- Tracks: `https://embed.tidal.com/tracks/{id}`
- Albums: `https://embed.tidal.com/albums/{id}`

## Orden de Implementación Sugerido

1. **Tipos** - Actualizar `src/types.ts`
2. **Hook** - Crear `src/hooks/useNextSession.ts`
3. **Player** - Actualizar `src/components/TidalPlayer.tsx` para soportar albums
4. **Navegación** - Actualizar `src/components/Navigation.tsx`
5. **App** - Actualizar `src/App.tsx`
6. **Componentes** - Crear `src/components/AlbumsList.tsx`
7. **Componentes** - Crear `src/components/AlbumDetail.tsx`
8. **Página** - Crear `src/pages/SessionPage.tsx`
9. **Estilos** - Actualizar `src/index.css`

## Consideraciones

- **Diseño responsivo:** Mismo patrón que SongsPage (lista/detalle en desktop, cards en mobile)
- **Estados vacíos:** Mostrar mensaje "No hay álbumes disponibles" cuando data esté vacío
- **Errores:** Manejar errores de API similar a SongsPage
- **Loading:** Mostrar spinner o mensaje de carga
- **Tidal Embed:** Usar URL de albums en lugar de tracks

## Referencias Visuales del Mockup

- Líneas 1041-1202: Estilos CSS de la página de sesión
- Líneas 1783-1920: Funcionalidad JavaScript de la sesión
- Estructura: Panel izquierdo con lista, panel derecho con detalle
- Mobile: Cards con imagen, info y player integrado
