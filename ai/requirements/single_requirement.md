# Single Page App

Quiero crear una single page app basado en typescript y react, el mockup 
del diseño html es design/mockups/index.html (no modificar) y será llenado
con los datos que vengan del endpoint /v1/session (GET) descrito en
design/api/openapi.yaml

## Llenado del DOM

* En el id `tracksList` se debe de llenar con `id`, `title` y `artist`

* En el id `track-detail` se debe de llenar con el segundo `href` de
`covertArts`, `title`, `artist` y `album`. El player se agrega en `tidal_id`
el `id`
