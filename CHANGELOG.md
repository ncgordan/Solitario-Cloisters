# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

## [1.1.0] - 2026-11-20

### Añadido

- Modo diestro y zurdo: el botón ⇄ refleja el tablero (mazo a la derecha o a la izquierda) y la elección se guarda en el navegador.
- Modo de depuración con `?debug` en la URL: muestra el borde de cada carta y resalta la que se agarraría bajo el puntero.

### Cambiado

- El tablero cambia según la orientación: 4×3 en vertical y 6×2 en horizontal, con `grid-template-areas`; las columnas tienen `id` (`columna-1` … `columna-6`).
- Sprite rehecho en una cuadrícula exacta de 13×4 celdas en proporción 1:2; las posiciones de las cartas son exactas en lugar de ajustadas a mano.
- Escalera de las columnas más separada en pantallas táctiles, para poder agarrar mejor las cartas tapadas.
- Las pilas de palo bajan solo 2px por carta, para que el montón no se salga del hueco.

### Corregido

- La zona de agarre de las cartas no coincidía con el dibujo.
- La carta descubierta quedaba demasiado baja en su hueco.
- La separación de las cartas en las pilas de palo no se aplicaba (se concatenaba texto en lugar de sumar).
- En el diseño horizontal, la sexta columna quedaba con ancho 0 y no se veía.

## [1.0.0] - 2026-11-19

Primera versión publicada.

### Añadido

- Solitario con la baraja *The Cloisters Playing Cards* (s. XV, The Met, dominio público).
- Arrastrar y soltar cartas con ratón y en pantallas táctiles (jQuery 4.1, jQuery UI 1.14.2 a medida y Touch Punch).
- Tablero en cuadrícula de 4×3: 4 pilas de palo, mazo, cartas descubiertas y 6 columnas.
- Mazo con robo aleatorio; al acabarse aparece ↻ y las cartas descubiertas que no se han colocado vuelven bocabajo.
- Pilas de palo del uno al rey y columnas en orden descendente alternando colores.
- Diseño adaptable a escritorio y móvil: la cuadrícula se define con `--cols` y `--rows`, y huecos y cartas se ajustan al ancho y al alto de la pantalla.
- Hueco de cartas descubiertas con tono pergamino para distinguirlo de las columnas.
- Efectos de sonido al coger y soltar cartas (Kenney).
- Imágenes en WebP.
- `build.php` para generar `index.html` estático a partir de `game.php`.
- `README.md` con reglas, instalación y créditos, y `LICENSE.md` (MIT).

[Sin publicar]: https://github.com/ncgordan/Solitario-Cloisters/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ncgordan/Solitario-Cloisters/releases/tag/v1.0.0
