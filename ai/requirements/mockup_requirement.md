# Mockup design website

Necesito el mockup de una single page app para mostrar cierta información
de mi club de vinilos. Por ahora solo quiero el mockup pero más tarde
va a ser llenado con información desde una API.

## Club

Mi club se llama Vinil Oh's Club y nos dedicamos a hacer listening
session presenciales donde los asistentes van poniendo canciones. Esas
canciones son las que quiero en la página

### Descripción del club

La descripción es la siguiente: Vinil Oh's Club un espacio para amantes
de la música y coleccionistas, en físico y digital, donde lo más 
importante es la tolerancia y el descubrimiento. En esta última sesión
nuestros asistentes nos recomendaron la siguientes canciones, porque
la buena música siempre viene de la personas adecuadas.

### Redes

* https://www.instagram.com/vinilohsclub/
* También me gustaría agregar un link de Patreon para donaciones pero
aún no tengo la cuenta

## Diseño

Me gustaría que la página pudiera verse bien en una pc y en un smartphone

* App Shell Layout
* Independent Scroll Containers
* Viewport-locked layout
* Dashboard
* Web brutalism
* Indie web aesthetic
* small web
* Paleta monocromática con un solo color de acento, inspirada en la web clásica y optimizada para legibilidad. Se puede tomar inspiracion de la siguiente paleta
    * Background: #F1EAD8
    * Surface: #DBC091
    * Primary / text: #5C3E28
    * Accent / dark: #27221C

### PC

Doble panel para ver la informacion de las canciones, panel izquierdo (navegacion) para el
listado de las canciones y panel derecho para mostrar la informacion de la
cancion seleccionada. Pop up para mostrar la informacion del club. Scroll separado para
cada panel. feet siempre visible. 

### Smarthphone

Card Overlay para ver la info de cada cancion


### Infomación de las canciones

Usualmente es una lista de más de 50 cancionesen cada sesión y la página solo
mostrará una sesión a la vez (la última).

* Por ahora solo voy a mostrar la información básica

UserPlaylist {
  title: string;
  artist: string;
  album: string;
  covertArts: PlaylistItemCoverArt[];
}

* Aqui viene los links de la portada del album en varios tamaños

PlaylistItemCoverArt {
  href: string;
}

## Stack de tecnología (más adelante)

* typescript
* React

## Visión al futuro

Por ahora solo quiero el mockup con la información de las canciones
pero en un futuro me gustaría crear algo como ROVR o KEXP