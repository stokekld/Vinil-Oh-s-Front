# Actualización de Mockup principal

El mockup principal del proyecto (design/mockups/index.html) fue generado
con los anteriores requerimientos (ai/requirements/mockup_requirement.md, 
ai/requirements/player_requirement.md). En este momento está perfecto pero
se debe actualizar para que sea multi página. En una página nueva se agregará
un mapa donde se verán varios markers.

# Menu

Se debe agregar un opción de menu para navegación

## Opciones del menu

* La página principal será el listado de canciones que está actualmente
* La nueva página será un mapa con Leaflet

# Nueva página (mapa)

La nueva página será un mapa situado en Tulancingo que mostrará eventos
locales con un filtro de "eventos hoy" y "eventos esta semana". Crea unos
10 eventos para poderlos ver de ejemplo

## Información de eventos (ejemplo)

```
const venues = [
  {
    id: 1,
    name: "Foro Indie",
    lat: 20.08,
    lng: -98.36,
    events: [
      {
        id: 1,
        name: "Banda en vivo",
        date: "2026-03-27T20:00:00",
        links: {
          instagram: "https://instagram.com/p/abc123"
        }
      },
      {
        id: 2,
        name: "DJ Set",
        date: "2026-03-29T22:00:00",
        links: {
          facebook: "https://facebook.com/events/xyz456"
        }
      }
    ]
  }
]
```

## Pop up

En cada marker se debe de ver la información del evento y el link
para ir a ver más información

# Modificacación del Mockup

El archivo design/mockups/index.html deberá de quedar igual pero
se tiene que crear otro con estas modificaciones (mockup nuevo)