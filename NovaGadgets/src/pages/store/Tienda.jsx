import TarjetaProducto from '../../components/ProductCard/TarjetaProducto'
import { productos } from '../../data/productos'
import './Tienda.css'

const Tienda = () => {
    return (
        <div className="contenedor tienda">
            <div className="tienda__presentacion">
                <h1>Tienda</h1>
                <p>Computadoras, componentes y periféricos para tu equipo.</p>
            </div>

            <div className="tienda__resumen">
                <p>{productos.length} productos</p>
                <p>Precios de ejemplo para la demo.</p>
            </div>

            <section className="tienda__productos" aria-label="Catálogo de productos">
                {productos.map((producto) => (
                    <TarjetaProducto key={producto.id} producto={producto} />
                ))}
            </section>
        </div>
    )
}

export default Tienda