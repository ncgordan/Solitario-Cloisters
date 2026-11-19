# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido

- Variables CSS `--cols` y `--rows` para definir la cuadrícula; el tamaño de los huecos y de las cartas se calcula a partir de ellas.
- Créditos de los sonidos (Kenney) en el README.

### Cambiado

- Tablero en cuadrícula de 4×3: arriba las 4 pilas de palo; en medio el mazo, las cartas descubiertas y 2 columnas; abajo 4 columnas.
- Las columnas pasan de 7 a 6, así que las cartas se ven más grandes, sobre todo en móvil vertical.
- El hueco de las cartas descubiertas tiene un tono pergamino y un borde discontinuo para distinguirlo de las columnas.
- `index.php` pasa a llamarse `game.php`; `build.php` genera `index.html` a partir de él, y `index.html` se incluye en el repositorio.
- README actualizado: tablero, número de columnas, estructura e instalación.

### Corregido

- Las cartas ya no se salen de sus huecos al cambiar el número de columnas o de filas.
- Las sombras de los dorsos del mazo ya no se acumulan formando un halo oscuro.

### Eliminado

- La sección oculta que se usaba como hueco en la fila superior.
- `.htaccess`: el despliegue en Wasmer no usa Apache.

## [1.0.0] - 2026-11-19

Primera versión publicada.

### Añadido

- Al acabarse el mazo aparece ↻; al pulsarlo, las cartas descubiertas que no se han colocado vuelven al mazo bocabajo.
- Diseño adaptable: los huecos se ajustan al ancho y al alto de la pantalla (*container queries* y `dvh`).
- La escalera de cartas en las columnas es proporcional al alto de la carta.
- `.htaccess` con compresión gzip y caché en el navegador.
- `build.php` para generar un `index.html` estático.
- `README.md` con reglas, instalación y créditos (cartas de The Met, dominio público).
- `LICENSE.md` (MIT).

### Cambiado

- jQuery 3.5.1 → 4.1.0.
- jQuery UI 1.12.1 → 1.14.2, en versión a medida (solo `draggable`, `droppable`, `mouse` y `widget`).
- Imágenes de PNG a WebP.

### Corregido

- La última carta del array nunca salía al azar hasta quedar sola.
- Una carta que volvía a su sitio tras un arrastre fallido tapaba las nuevas que se sacaban del mazo (`z-index`).
- En pantallas estrechas los huecos se alargaban y obligaban a hacer scroll.
- En móvil horizontal la segunda fila quedaba cortada.
- En móvil vertical las cartas se salían de su columna (`min-width: 64px`).
- Las sombras de las cartas descubiertas se acumulaban formando un halo negro.
- Los fondos de las pilas de palo daban 404 (ruta `img/flemish-hunting-deck/`).

[Sin publicar]: https://github.com/ncgordan/Solitario-Cloisters/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ncgordan/Solitario-Cloisters/releases/tag/v1.0.0
