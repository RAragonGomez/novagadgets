# Imágenes del catálogo

Las 40 imágenes del catálogo están generadas y guardadas en `src/assets/images/products/`, en formato WebP con transparencia real. Cada producto tiene su propio archivo. La lista de recursos está en `catalogo-imagenes.json`; todavía no es un catálogo conectado a React.

- `generada`: el archivo ya existe en assets. Los 40 registros tienen este estado.
- `archivo`: nombre exacto del WebP que se debe importar.
- `prompt`: instrucciones usadas para generar cada imagen.
- `transparencia`: confirma que se verificó el canal alpha.

Son imágenes ilustrativas generadas para la demo académica, no fotografías oficiales. Los detalles físicos y textos de marca pueden variar respecto de los modelos reales. Los nombres son modelos propuestos; no representan stock real. No se añadieron precios ni especificaciones sin validar.

Se usó la herramienta integrada `image_gen`, con una generación individual por producto y fondo transparente. Para Acer Aspire 5 y NZXT H5 Flow se hizo una corrección adicional del borde. No se utilizaron créditos de Higgsfield en esta generación final.

La tarjeta usa el fondo oscuro de la paleta y `object-fit: contain`, mostrando el producto completo sin el recuadro blanco. El import temporal de Intel Core i7 en App.jsx apunta ahora a `intel-core-i7.webp`.

Las imágenes JPG anteriores están respaldadas fuera del proyecto, en `tmp/novagadgets-productos-antes-transparencia`, dentro de la carpeta de trabajo EFSR. Los PNG originales de las nuevas generaciones se conservan en el directorio de imágenes generadas de Codex. No hace falta subir esos respaldos para que funcione la web.

Ejemplo de import:

```jsx
import imagenIntel from '../assets/images/products/intel-core-i7.webp'
```

La cantidad de `../` depende de la ubicación del archivo que realiza el import.
