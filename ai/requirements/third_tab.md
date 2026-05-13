# Tercera pestaña que muestre la próxima sesión

Necesito que revises el mockup base en design/mockups/index-v2.html
donde se encuentra el diseño de mi sitio web. Se una modificación, 
agregando una pestaña entre Última sesión y eventos que contendrá los albums
que escucharemos la siguiente sesión

## Datos

Los datos los obtendré de una api y tendrán la siguiente estructura:

```
{
    "success": true,
    "message": "Next session retrieved successfully",
    "data": [
        {
            "_id": "6a0394ccd4451e095af19325",
            "id": "55391797",
            "title": "Wish You Were Here",
            "artists": "Pink Floyd",
            "coverArts": [
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/1280x1280.jpg",
                    "_id": "6a0394ccd4451e095af19326"
                },
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/1080x1080.jpg",
                    "_id": "6a0394ccd4451e095af19327"
                },
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/750x750.jpg",
                    "_id": "6a0394ccd4451e095af19328"
                },
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/640x640.jpg",
                    "_id": "6a0394ccd4451e095af19329"
                },
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/320x320.jpg",
                    "_id": "6a0394ccd4451e095af1932a"
                },
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/160x160.jpg",
                    "_id": "6a0394ccd4451e095af1932b"
                },
                {
                    "href": "https://resources.tidal.com/images/2a1de2b6/01d7/4dee/8ded/f1b5a934ab5d/80x80.jpg",
                    "_id": "6a0394ccd4451e095af1932c"
                }
            ],
            "__v": 0,
            "createdAt": "2026-05-12T20:59:56.066Z",
            "updatedAt": "2026-05-12T20:59:56.066Z"
        },
        {
            "_id": "6a0394ccd4451e095af1932d",
            "id": "247701424",
            "title": "Animals (2018 Remix)",
            "artists": "Pink Floyd",
            "coverArts": [
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/1280x1280.jpg",
                    "_id": "6a0394ccd4451e095af1932e"
                },
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/1080x1080.jpg",
                    "_id": "6a0394ccd4451e095af1932f"
                },
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/750x750.jpg",
                    "_id": "6a0394ccd4451e095af19330"
                },
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/640x640.jpg",
                    "_id": "6a0394ccd4451e095af19331"
                },
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/320x320.jpg",
                    "_id": "6a0394ccd4451e095af19332"
                },
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/160x160.jpg",
                    "_id": "6a0394ccd4451e095af19333"
                },
                {
                    "href": "https://resources.tidal.com/images/86484870/6ffb/41ac/83b3/9ba029e540fe/80x80.jpg",
                    "_id": "6a0394ccd4451e095af19334"
                }
            ],
            "__v": 0,
            "createdAt": "2026-05-12T20:59:56.066Z",
            "updatedAt": "2026-05-12T20:59:56.066Z"
        }
    ],
    "itemsCount": 2
}
```

No es necesario ver por el momento la petición, puedes usar la estructura anterior como mockup de datos

## UX

El diseño es pensado para mobile primero y también para PC, lo puedes observar en el archivo html

### Mobile

Quiero que el usuario vea cada albúm y vaya scrolleando para ver el siguiente.

### PC

Quiero que los albums se enlisten como en la pestaña de última sesión en modo PC

## Información

Se debe ver la información del albúm como en track-detail

* nombre del album
* artista
* el tercer cover art
* Agregar el reproductor de tidal con el id que viene en la estructura. Te dejo el embed code:
```
<iframe src="https://embed.tidal.com/albums/37099301" width="500" height="275" allow="encrypted-media; fullscreen; clipboard-write https://embed.tidal.com; web-share" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox" style="color-scheme: light dark" title="TIDAL Embed Player" />
```

## Musts

* No hagas commits, dejame ver primero el resultado
* solo puedes modificar design/mockups/index-v2.html
* las pestañas actuales deben quedar tal y como están