import { useState } from 'react'
import './tarjeta-producto.css'

const TarjetaProducto = ({ producto, onAgregar }) => {
    const [aviso, setAviso] = useState('')

    const precio = producto.precio.toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN',
    })

    const agregarAlCarrito = () => {
        if (onAgregar) {
            setAviso('')
            onAgregar(producto)
        } else {
            setAviso('El carrito todavía no está disponible.')
        }
    }

    return (
        <article className="tarjeta-producto">
            <div className="tarjeta-producto__imagen">
                <img src={producto.imagen} alt={producto.nombre} width="300" height="180" loading="lazy" />
            </div>

            <div className="tarjeta-producto__contenido">
                <h2>{producto.nombre}</h2>
                <p className="tarjeta-producto__descripcion">{producto.descripcion}</p>
                <p className="tarjeta-producto__precio">{precio}</p>

                <button
                    type="button"
                    className="boton boton--secundario"
                    aria-label={'Agregar ' + producto.nombre + ' al carrito'}
                    onClick={agregarAlCarrito}
                >
                    Agregar al carrito
                </button>
                <p className="tarjeta-producto__aviso" role="status">{aviso}</p>
            </div>
        </article>
    )
}

export default TarjetaProducto
