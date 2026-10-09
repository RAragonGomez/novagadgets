# Datos compartidos del catálogo

`src/data/productos.js` exporta el arreglo `productos` con los 40 productos y sus imágenes WebP. Es la fuente compartida para Inicio y las futuras pantallas de Tienda y Arma tu PC.

Los precios en soles y las descripciones son datos de ejemplo para la demo académica, no precios actuales ni fichas técnicas verificadas. No se modelaron stock, compatibilidad de piezas ni una base de datos. Las imágenes generadas son ilustrativas.

## Campos de un producto

- `id`: identificador único, también útil para relacionar productos con el carrito.
- `nombre` y `descripcion`: textos mostrados en la tarjeta.
- `precio`: número en soles, sin escribir `S/` dentro del dato.
- `imagen`: imagen importada desde assets; Vite resuelve su URL.
- `categoria`: `laptops`, `pc-escritorio`, `componentes` o `perifericos`, igual que los identificadores de Inicio.
- `subcategoria`: permite distinguir procesadores, placas, memorias, almacenamiento, gráficas, fuentes y gabinetes dentro de componentes. Todavía no valida compatibilidad.
- `destacado`: `true` para los cuatro productos que muestra Inicio y `false` para el resto.

`src/data/categorias.js` exporta las cuatro categorías con `id`, `nombre` e `imagen`.

## Cómo usarlos

Desde Inicio:

```jsx
import { productos } from '../../data/productos'
import { categorias } from '../../data/categorias'

const productosDestacados = productos.filter((producto) => producto.destacado)
```

`filter()` devuelve un nuevo arreglo con los productos que cumplen la condición. No modifica el catálogo original. Después usamos `map()` para mostrar una TarjetaProducto por cada objeto.

Para modificar un nombre, precio o imagen, editar el producto en `productos.js`. Para cambiar los destacados, modificar `destacado`. No duplicar los objetos en cada pantalla.

Las futuras pantallas pueden filtrar por `categoria` o `subcategoria`. El carrito podrá guardar el id y la cantidad, y consultar el catálogo para obtener los datos del producto. Los filtros y el carrito aún no están implementados.
