import TarjetaProducto from '../../components/ProductCard/TarjetaProducto'
import { productos } from '../../data/productos'
import { categorias } from '../../data/categorias'
import './Inicio.css'

// Tomamos los destacados del catálogo compartido.
const productosDestacados = productos.filter((producto) => producto.destacado)

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
            <div className="inicio__accesos">
                <section className="inicio__acceso" aria-labelledby="titulo-arma-pc">
                    <h2 id="titulo-arma-pc">Arma tu PC</h2>
                    <p>Elige las piezas y revisa el total de tu configuración.</p>
                    <a href="/arma-tu-pc" className="boton boton--principal">Arma tu PC</a>
                </section>

                <section className="inicio__acceso" aria-labelledby="titulo-servicios">
                    <h2 id="titulo-servicios">Servicios técnicos</h2>
                    <p>Mantenimiento, instalación de software y diagnóstico.</p>
                    <a href="/servicios" className="boton boton--secundario">Ver servicios</a>
                </section>
            </div>
        </div>
    )
}

export default Inicio
