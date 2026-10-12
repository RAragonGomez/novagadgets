import { useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import './cart-drawer.css'

const formatoPrecio = (precio) => precio.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
})

const CartDrawer = () => {
    const { items, cantidadTotal, subtotal, abierto, cerrar, cambiarCantidad, quitar } = useCart()
    const botonCerrar = useRef(null)

    useEffect(() => {
        if (!abierto) return undefined

        const alPresionarEscape = (evento) => {
            if (evento.key === 'Escape') cerrar()
        }
        const overflowAnterior = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', alPresionarEscape)
        botonCerrar.current?.focus()

        return () => {
            document.body.style.overflow = overflowAnterior
            window.removeEventListener('keydown', alPresionarEscape)
        }
    }, [abierto, cerrar])

    if (!abierto) return null

    return (
        <div className="carrito-overlay" onMouseDown={(evento) => evento.target === evento.currentTarget && cerrar()}>
            <aside className="carrito-panel" role="dialog" aria-modal="true" aria-labelledby="carrito-titulo">
                <header className="carrito-panel__encabezado">
                    <div>
                        <p className="carrito-panel__eyebrow">NovaGadgets</p>
                        <h2 id="carrito-titulo">Tu carrito <span>{cantidadTotal}</span></h2>
                    </div>
                    <button ref={botonCerrar} className="carrito-panel__cerrar" type="button" onClick={cerrar} aria-label="Cerrar carrito">×</button>
                </header>

                <div className="carrito-panel__cuerpo">
                    {items.length === 0 ? (
                        <div className="carrito-vacio">
                            <span aria-hidden="true">🛒</span>
                            <h3>Tu carrito está vacío</h3>
                            <p>Agrega productos de la tienda y aparecerán aquí.</p>
                            <button type="button" className="carrito-panel__seguir carrito-panel__seguir--boton" onClick={cerrar}>Seguir comprando</button>
                        </div>
                    ) : (
                        <>
                            <section className="carrito-items" aria-label="Productos elegidos">
                                {items.map((item) => (
                                    <article className="carrito-item" key={item.id}>
                                        <img className="carrito-item__imagen" src={item.imagen} alt={item.nombre} />
                                        <div className="carrito-item__contenido">
                                            <div className="carrito-item__titulo">
                                                <h3>{item.nombre}</h3>
                                                <button type="button" onClick={() => quitar(item.id)} aria-label={`Quitar ${item.nombre}`} title="Quitar producto">×</button>
                                            </div>
                                            <p className="carrito-item__descripcion">{item.descripcion}</p>
                                            <strong className="carrito-item__precio">{formatoPrecio(item.precio)}</strong>
                                            <div className="carrito-item__cantidad" aria-label={`Cantidad de ${item.nombre}`}>
                                                <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} aria-label={`Restar una unidad de ${item.nombre}`}>−</button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.cantidad}
                                                    aria-label={`Unidades de ${item.nombre}`}
                                                    onChange={(evento) => {
                                                        const cantidad = Number(evento.target.value)
                                                        if (Number.isInteger(cantidad) && cantidad > 0) cambiarCantidad(item.id, cantidad)
                                                    }}
                                                />
                                                <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} aria-label={`Añadir una unidad de ${item.nombre}`}>+</button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </section>

                            <section className="carrito-entrega" aria-labelledby="carrito-entrega-titulo">
                                <h3 id="carrito-entrega-titulo">¿Cómo recibir tu pedido?</h3>
                                <div className="carrito-entrega__opciones">
                                    <span><b aria-hidden="true">⌂</b> Recojo en tienda</span>
                                    <span><b aria-hidden="true">➜</b> Envío a domicilio</span>
                                </div>
                                <p>Elige cómo recibir tu pedido en el siguiente paso.</p>
                            </section>

                            <section className="carrito-resumen" aria-label="Resumen del pedido">
                                <div className="carrito-resumen__subtotal"><span>Subtotal general</span><strong>{formatoPrecio(subtotal)}</strong></div>
                                <p className="carrito-resumen__nota">Recojo o envío se define en el siguiente paso.</p>
                                <div className="carrito-resumen__total"><span>Total de productos</span><strong>{formatoPrecio(subtotal)}</strong></div>
                                <button className="carrito-resumen__pagar" type="button" onClick={() => window.location.assign('/checkout')}>Continuar al pago</button>
                                <button className="carrito-panel__seguir" type="button" onClick={cerrar}>Seguir comprando</button>
                            </section>
                        </>
                    )}
                </div>
            </aside>
        </div>
    )
}

export default CartDrawer
