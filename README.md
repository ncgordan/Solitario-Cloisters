# Solitario

Solitario web con la baraja medieval **The Cloisters Playing Cards** (también conocida como *Flemish Hunting Deck*, s. XV), hecho con jQuery y jQuery UI.

![Banner](docs/banner.webp)

## Dónde jugarlo

[Solitario Medieval](https://solitario-cloisters.wasmer.app/)

## Sobre la baraja

Las cartas son las de **The Cloisters Playing Cards** (Países Bajos meridionales, c. 1475–1480), que se conservan en The Met Cloisters de Nueva York. Es la única baraja completa de naipes comunes iluminados del siglo XV que se conoce (no es de tarot).

- **4 palos** inspirados en el equipo de caza: cuernos, collares de perro, ataduras de sabueso y lazos de caza.
- **13 cartas por palo:** rey, reina, sota y diez cartas numéricas, en las que el valor se indica repitiendo el símbolo del palo.
- **Estilo:** figuras de modelo franco-flamenco, con trajes exagerados que parecen parodiar la moda de la corte de Borgoña.
- **Uso:** apenas presentan desgaste, así que quizá se hicieron como objeto de colección más que para jugar.

## Características

- Arrastrar y soltar cartas (ratón y pantallas táctiles).
- Mazo con robo aleatorio; cuando se acaba, se recicla con las cartas que no se han colocado.
- 4 pilas de palo que se completan del uno al rey.
- 6 columnas en orden descendente y alternando colores (en lugar de las 7 del Klondike).
- Diseño adaptable en cuadrícula de 4×3: el tablero se ajusta al ancho y al alto de la pantalla.
- Efectos de sonido al coger y soltar cartas.

## Reglas

### Tablero

| Fila | Contenido |
|---|---|
| 1 | 4 pilas de palo |
| 2 | Mazo, cartas descubiertas y 2 columnas |
| 3 | 4 columnas |

### Palos y colores

| Palo | Clase CSS | Color |
|---|---|---|
| Lazos de caza | `game-nooses` | Azul |
| Ataduras de sabueso | `hound-tethers` | Azul |
| Cuernos | `horns` | Rojo |
| Collares de perro | `dog-collars` | Rojo |

### Movimientos

- **Mazo:** haz clic para sacar una carta. Si está vacío (↻), haz clic para volver a ponerlo bocabajo con las cartas que quedan.
- **Pilas de palo:** cada una acepta solo su palo, en orden del uno al rey.
- **Columnas:** sobre una carta se puede poner otra de **un número menos y de color contrario**. Una columna vacía acepta cualquier carta.

## Tecnologías

- PHP (solo para generar el HTML de las cartas)
- [jQuery 4.1](https://jquery.com/)
- [jQuery UI 1.14.2](https://jqueryui.com/) (versión a medida: `draggable`, `droppable`, `mouse` y `widget`)
- [jQuery UI Touch Punch 0.2.3](https://github.com/furf/jquery-ui-touch-punch)
- CSS Grid y *container queries* (`cqw`)

## Estructura

```
solitario/
├── game.php             # Tablero y generación de las 52 cartas
├── build.php            # Genera index.html a partir de game.php
├── index.html           # Versión estática generada
├── css/
│   ├── normalize.css
│   ├── tarot.css        # Tablero y diseño
│   └── flemish-hunting-deck.css  # Posiciones de cada carta en el sprite
├── js/
│   ├── jquery-4.1.0.min.js
│   ├── jquery-ui-1.14.2.custom.min.js
│   ├── jquery.ui.touch-punch.min.js
│   └── tarot.js         # Lógica del juego
├── img/
│   ├── oldest-deck.webp       # Sprite con las 52 cartas
│   ├── oldest-deck-back.webp  # Dorso
│   └── a01.webp … d01.webp    # Fondos de las pilas de palo
└── mp3/                 # Sonidos
```

## Instalación

Requiere PHP 7.4 o superior (por ejemplo, con [Laragon](https://laragon.org/), XAMPP o el servidor integrado de PHP).

```bash
git clone <url-del-repositorio>
cd solitario
php -S localhost:8000
```

Abre `http://localhost:8000/game.php` para la versión con PHP, o `http://localhost:8000` para la estática (`index.html`).

## Versión estática

Para publicarlo sin PHP (GitHub Pages, GitLab Pages, Netlify, Wasmer…), genera `index.html` a partir de `game.php`:

```bash
php build.php
```

Para el hosting basta con `index.html` y las carpetas `css/`, `js/`, `img/` y `mp3/`. Repite el comando cada vez que cambies `game.php`, el CSS o el JS.

## Créditos

- **Cartas:** [The Cloisters Playing Cards](https://www.metmuseum.org/art/collection/search/475551), c. 1475–1480. The Metropolitan Museum of Art, The Cloisters Collection, 1983 (n.º 1983.515.1–.52). Imágenes de dominio público del programa Open Access de The Met.
- **Sonidos:** [Kenney](https://kenney.nl/).
- **Fondo:** patrón de [Hero Patterns](https://heropatterns.com/) (CC BY 4.0).

## Licencia

Código bajo licencia [MIT](LICENSE.md).
Imágenes de las cartas: dominio público (The Met Open Access).
