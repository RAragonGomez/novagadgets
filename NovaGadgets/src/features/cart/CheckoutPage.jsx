import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { obtenerUsuarioActual } from '../../services'
import './checkout.css'

const pasos = [
    { id: 1, titulo: 'Datos y entrega' },
    { id: 2, titulo: 'Pago' },
    { id: 3, titulo: 'Confirmación' },
]

const opcionesEntrega = [
    { id: 'recojo', titulo: 'Recoger en tienda', detalle: 'Pasaje Velarde 188, Cercado de Lima', precio: 0 },
    { id: 'envio', titulo: 'Envío a domicilio', detalle: 'El costo se confirmará según tu dirección.', precio: null },
]

const metodosPago = [
    { id: 'tarjeta', titulo: 'Tarjeta de débito o crédito', detalle: 'Pago con tarjeta al conectar una pasarela segura.' },
    { id: 'yape', titulo: 'Yape', detalle: 'Te mostraremos las instrucciones de pago al confirmar.' },
    { id: 'plin', titulo: 'Plin', detalle: 'Te mostraremos las instrucciones de pago al confirmar.' },
]

const formatoPrecio = (precio) => precio.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
})

const CheckoutPage = () => {
    const { items, subtotal } = useCart()
    const usuario = obtenerUsuarioActual()
    const [pasoActual, setPasoActual] = useState(1)
    const [entrega, setEntrega] = useState('recojo')
    const [metodoPago, setMetodoPago] = useState('')
    const [aviso, setAviso] = useState('')
    const [pedidoDemo, setPedidoDemo] = useState(false)
    const [contacto, setContacto] = useState({
        nombre: usuario ? `${usuario.nombres} ${usuario.apellidos}` : '',
        correo: usuario?.correo || '',
        telefono: usuario?.telefono || '',
        direccion: '',
    })

    const siguientePaso = (evento) => {
        evento.preventDefault()
        setAviso('')
        setPasoActual(2)
    }

    const continuarDesdePago = () => {
        if (!metodoPago) {
            setAviso('Elige un método de pago para continuar.')
            return
        }
        setAviso('')
        setPasoActual(3)
    }

    const confirmarPedidoDemo = () => {
        setPedidoDemo(true)
        setAviso('Esta es una confirmación de demostración. No se procesó ningún pago.')
    }

    return (
        <section className="checkout contenedor" aria-labelledby="checkout-titulo">
            <nav className="checkout__breadcrumb" aria-label="Migas de pan">
                <a href="/">Inicio</a><span aria-hidden="true">/</span>
                <button type="button" onClick={() => window.history.back()}>Carrito</button><span aria-hidden="true">/</span>
                <span aria-current="page">Finalizar compra</span>
            </nav>

            <div className="checkout__titulo">
                <div>
                    <p className="checkout__eyebrow">NovaGadgets · Compra segura</p>
                    <h1 id="checkout-titulo">Finalizar compra</h1>
                </div>
            </div>

            {items.length > 0 && <nav className="checkout-pasos" aria-label="Pasos de compra">
                {pasos.map((paso) => (
                    <button
                        className={`checkout-pasos__paso${pasoActual === paso.id ? ' checkout-pasos__paso--activo' : ''}${pasoActual > paso.id ? ' checkout-pasos__paso--completado' : ''}`}
                        key={paso.id}
                        type="button"
                        aria-current={pasoActual === paso.id ? 'step' : undefined}
                        disabled={paso.id > pasoActual}
                        onClick={() => { setAviso(''); setPasoActual(paso.id) }}
                    >
                        <span className="checkout-pasos__numero">{pasoActual > paso.id ? '✓' : `0${paso.id}`}</span>
                        <span>{paso.titulo}</span>
                    </button>
                ))}
            </nav>}

            <div className="checkout__columnas">
                <div className="checkout__principal">
                    {items.length === 0 && (
                        <section className="checkout-card checkout__vacio">
                            <h2>Tu carrito está vacío</h2>
                            <p>Agrega productos antes de continuar con la compra.</p>
                            <a className="checkout__boton-principal checkout__boton-principal--link" href="/tienda">Explorar la tienda</a>
                        </section>
                    )}
                    {items.length > 0 && pasoActual === 1 && (
                        <form className="checkout-card checkout-card--form" onSubmit={siguientePaso}>
                            <h2>Datos de contacto</h2>
                            <div className="checkout__campos">
                                <label className="checkout__campo checkout__campo--completo">
                                    <span>Nombre y apellidos</span>
                                    <input required autoComplete="name" value={contacto.nombre} placeholder="Escribe tu nombre completo" onChange={(evento) => setContacto({ ...contacto, nombre: evento.target.value })} />
                                </label>
                                <label className="checkout__campo checkout__campo--completo">
                                    <span>Correo electrónico</span>
                                    <input required type="email" autoComplete="email" value={contacto.correo} placeholder="nombre@correo.com" onChange={(evento) => setContacto({ ...contacto, correo: evento.target.value })} />
                                </label>
                                <label className="checkout__campo checkout__campo--completo">
                                    <span>Teléfono</span>
                                    <input required type="tel" autoComplete="tel" value={contacto.telefono} placeholder="Tu número de contacto" onChange={(evento) => setContacto({ ...contacto, telefono: evento.target.value })} />
                                </label>
                            </div>

                            <div className="checkout__seccion-entrega">
                                <div className="checkout__seccion-titulo">
                                    <div><p>Elige cómo recibir tu pedido</p><h2>Entrega</h2></div>
                                </div>
                                <div className="checkout__opciones">
                                    {opcionesEntrega.map((opcion) => (
                                        <label className={`checkout-opcion${entrega === opcion.id ? ' checkout-opcion--activa' : ''}`} key={opcion.id}>
                                            <input type="radio" name="entrega" value={opcion.id} checked={entrega === opcion.id} onChange={() => setEntrega(opcion.id)} />
                                            <span className="checkout-opcion__contenido">
                                                <strong>{opcion.titulo}{opcion.precio === 0 ? ' · Sin costo' : opcion.precio === null ? ' · Costo por confirmar' : ''}</strong>
                                                <small>{opcion.detalle}</small>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {entrega === 'envio' && (
                                    <label className="checkout__campo checkout__campo--direccion">
                                        <span>Dirección de envío</span>
                                        <input required autoComplete="street-address" value={contacto.direccion} placeholder="Dirección, distrito y referencia" onChange={(evento) => setContacto({ ...contacto, direccion: evento.target.value })} />
                                    </label>
                                )}
                                <p className="checkout__ayuda">El costo de envío se confirmará antes de finalizar tu pedido.</p>
                            </div>

                            <button className="checkout__boton-principal" type="submit">Continuar a pago <span aria-hidden="true">→</span></button>
                        </form>
                    )}

                    {items.length > 0 && pasoActual === 2 && (
                        <section className="checkout-card checkout-card--pago" aria-labelledby="pago-titulo">
                            <p className="checkout-card__eyebrow">Paso 2 de 3</p>
                            <h2 id="pago-titulo">Método de pago</h2>
                            <p className="checkout-card__descripcion">Selecciona cómo deseas pagar tu pedido.</p>
                            <div className="checkout__metodos">
                                {metodosPago.map((metodo) => (
                                    <button
                                        type="button"
                                        key={metodo.id}
                                        className={`checkout-metodo${metodoPago === metodo.id ? ' checkout-metodo--activo' : ''}`}
                                        aria-pressed={metodoPago === metodo.id}
                                        onClick={() => { setMetodoPago(metodo.id); setAviso('') }}
                                    >
                                        <span className="checkout-metodo__radio" aria-hidden="true">{metodoPago === metodo.id ? '●' : '○'}</span>
                                        <span className="checkout-metodo__texto"><strong>{metodo.titulo}</strong><small>{metodo.detalle}</small></span>
                                    </button>
                                ))}
                            </div>
                            {(metodoPago === 'yape' || metodoPago === 'plin') && (
                                <div className="checkout__pago-nota">
                                    <strong>Pago con {metodoPago === 'yape' ? 'Yape' : 'Plin'}</strong>
                                    <p>En una tienda conectada, aquí aparecerían el QR o los datos de pago. Esta versión de demostración no procesa transferencias.</p>
                                </div>
                            )}
                            {metodoPago === 'tarjeta' && (
                                <div className="checkout__pago-nota">
                                    <strong>Pago con tarjeta</strong>
                                    <p>La pasarela de pago aún no está conectada. No ingreses datos reales de tarjeta en esta demo.</p>
                                </div>
                            )}
                            {aviso && <p className="checkout__aviso" role="status">{aviso}</p>}
                            <div className="checkout__acciones">
                                <button className="checkout__boton-secundario" type="button" onClick={() => { setAviso(''); setPasoActual(1) }}>Volver</button>
                                <button className="checkout__boton-principal" type="button" onClick={continuarDesdePago}>Revisar pedido <span aria-hidden="true">→</span></button>
                            </div>
                        </section>
                    )}

                    {items.length > 0 && pasoActual === 3 && (
                        <section className="checkout-card checkout-card--confirmacion" aria-labelledby="confirmacion-titulo">
                            <p className="checkout-card__eyebrow">Paso 3 de 3</p>
                            <h2 id="confirmacion-titulo">Confirma tus datos</h2>
                            <p className="checkout-card__descripcion">Revisa la información antes de finalizar esta demostración.</p>
                            <dl className="checkout-confirmacion__datos">
                                <div><dt>Cliente</dt><dd>{contacto.nombre}</dd></div>
                                <div><dt>Correo</dt><dd>{contacto.correo}</dd></div>
                                <div><dt>Teléfono</dt><dd>{contacto.telefono}</dd></div>
                                <div><dt>Entrega</dt><dd>{entrega === 'recojo' ? 'Recojo en tienda' : `Envío a ${contacto.direccion}`}</dd></div>
                                <div><dt>Método de pago</dt><dd>{metodosPago.find((metodo) => metodo.id === metodoPago)?.titulo}</dd></div>
                            </dl>
                            {aviso && <p className="checkout__aviso" role="status">{aviso}</p>}
                            {!pedidoDemo ? (
                                <div className="checkout__acciones">
                                    <button className="checkout__boton-secundario" type="button" onClick={() => { setAviso(''); setPasoActual(2) }}>Volver al pago</button>
                                    <button className="checkout__boton-principal" type="button" onClick={confirmarPedidoDemo}>Confirmar pedido de prueba</button>
                                </div>
                            ) : (
                                <a className="checkout__boton-principal checkout__boton-principal--link" href="/">Volver al inicio</a>
                            )}
                        </section>
                    )}
                </div>

                <aside className="checkout-card checkout-resumen" aria-labelledby="resumen-titulo">
                    <h2 id="resumen-titulo">Resumen del pedido</h2>
                    {items.length ? (
                        <ul className="checkout-resumen__lista">
                            {items.map((item) => (
                                <li key={item.id}>
                                    <span>{item.nombre} <small>× {item.cantidad}</small></span>
                                    <strong>{formatoPrecio(item.precio * item.cantidad)}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="checkout-resumen__vacio">No hay productos en el carrito.</p>
                    )}
                    <div className="checkout-resumen__entrega">
                        <span>{entrega === 'recojo' ? 'Recojo en tienda' : 'Envío a domicilio'}</span>
                        <strong>{entrega === 'recojo' ? formatoPrecio(0) : 'Por confirmar'}</strong>
                    </div>
                    <div className="checkout-resumen__total"><span>Total de productos</span><strong>{formatoPrecio(subtotal)}</strong></div>
                    <p className="checkout-resumen__nota">Elige cómo recibir tu pedido en el siguiente paso. El envío se cotiza según tu dirección.</p>
                    {metodoPago && <p className="checkout-resumen__metodo">Pago elegido: <strong>{metodosPago.find((metodo) => metodo.id === metodoPago)?.titulo}</strong></p>}
                    {pedidoDemo && <p className="checkout-resumen__demo">Pedido de prueba confirmado. No se realizó ningún cobro.</p>}
                </aside>
            </div>
        </section>
    )
}

export default CheckoutPage
