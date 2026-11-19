# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

## [1.1.0] - 2026-11-19

### Añadido

Opción para diestros y zurdos: con direction: rtl en el tablero, la cuadrícula se pinta al revés y el mazo pasa a la derecha. Es una opción con un botón en la esquina inferior derecha, para que cada jugador elija

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
