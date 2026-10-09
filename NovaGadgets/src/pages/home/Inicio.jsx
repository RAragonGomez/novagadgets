import imagenLaptops from '../../assets/images/categories/laptops.webp'
import imagenPc from '../../assets/images/categories/pc-escritorio.webp'
import imagenComponentes from '../../assets/images/categories/componentes.webp'
import imagenPerifericos from '../../assets/images/categories/perifericos.webp'
import TarjetaProducto from '../../components/ProductCard/TarjetaProducto'
import imagenIntel from '../../assets/images/products/intel-core-i7.webp'
import imagenKingston from '../../assets/images/products/kingston-fury-ram.webp'
import imagenGeForce from '../../assets/images/products/geforce-rtx.webp'
import imagenAsus from '../../assets/images/products/asus-prime-placa.webp'
import './Inicio.css'

// Cada objeto contiene los datos de una categoría.
const categorias = [
    { id: 'laptops', nombre: 'Laptops', imagen: imagenLaptops },
    { id: 'pc-escritorio', nombre: 'PC de escritorio', imagen: imagenPc },
    { id: 'componentes', nombre: 'Componentes', imagen: imagenComponentes },
    { id: 'perifericos', nombre: 'Periféricos', imagen: imagenPerifericos },
]

// Productos de ejemplo del wireframe; el precio se guarda como número.
const productosDestacados = [
    {
        id: 'intel-core-i7',
        nombre: 'Intel Core i7-12700F',
        descripcion: 'LGA1700 / 12 núcleos',
        precio: 600,
        imagen: imagenIntel,
    },
    {
        id: 'kingston-fury-ram',
        nombre: 'Kingston Fury Beast',
        descripcion: '16 GB DDR4 / 3200 MHz',
        precio: 240,
        imagen: imagenKingston,
    },
    {
        id: 'geforce-rtx',
        nombre: 'GeForce RTX 5060 Ti',
        descripcion: '8 GB / Tarjeta gráfica',
        precio: 1400,
        imagen: imagenGeForce,
    },
    {
        id: 'asus-prime-placa',
        nombre: 'Asus Prime H610M-K D4',
        descripcion: 'LGA1700 / DDR4',
        precio: 380,
        imagen: imagenAsus,
    },
]

const Inicio = () => {
    return (
        <div className="contenedor inicio">
            <div className="inicio__presentacion">
                <h1>Computadoras y componentes</h1>
                <p>Laptops, PC de escritorio, componentes y periféricos en un solo catálogo.</p>
            </div>

            <section className="inicio__categorias" aria-labelledby="titulo-categorias">
                <h2 id="titulo-categorias">Explora por categoría</h2>
                <div className="inicio__lista-categorias">
                    {categorias.map((categoria) => (
                        <a
                            key={categoria.id}
                            className="inicio__categoria"
                            href={`/tienda?categoria=${categoria.id}`}
                        >
                            <img src={categoria.imagen} alt="" width="240" height="180" />
                            <h3>{categoria.nombre}</h3>
                            <span>Ver catálogo</span>
                        </a>
                    ))}
                </div>
            </section>

            <section className="inicio__productos" aria-labelledby="titulo-productos">
                <div className="inicio__encabezado-productos">
                    <h2 id="titulo-productos">Productos destacados</h2>
                    <a href="/tienda">Ver tienda</a>
                </div>
                <div className="inicio__lista-productos">
                    {productosDestacados.map((producto) => (
                        <TarjetaProducto key={producto.id} producto={producto} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Inicio
