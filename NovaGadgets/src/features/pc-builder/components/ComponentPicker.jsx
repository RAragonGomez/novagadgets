import { useEffect, useRef } from 'react'

const ComponentPicker = ({ categoria, productos, productoSeleccionado, onSeleccionar, onCerrar }) => {
    const cerrarRef = useRef(null)

    useEffect(() => {
        cerrarRef.current?.focus()
        const escape = (evento) => evento.key === 'Escape' && onCerrar()
        window.addEventListener('keydown', escape)
        return () => window.removeEventListener('keydown', escape)
    }, [onCerrar])

    return (
        <div className="builder-picker-overlay" onMouseDown={(evento) => evento.target === evento.currentTarget && onCerrar()}>
            <section className="builder-picker" role="dialog" aria-modal="true" aria-labelledby="builder-picker-titulo">
                <header className="builder-picker__encabezado">
                    <div>
                        <p className="builder-picker__eyebrow">Configura tu equipo</p>
                        <h2 id="builder-picker-titulo">Elegir {categoria.nombre.toLowerCase()}</h2>
                    </div>
                    <button ref={cerrarRef} className="builder-picker__cerrar" type="button" onClick={onCerrar} aria-label="Cerrar selector">×</button>
                </header>
                <p className="builder-picker__nota">Las opciones se filtran según la compatibilidad básica de procesador, placa madre y memoria.</p>
                <div className="builder-picker__lista">
                    {productos.length ? productos.map((producto) => (
                        <button
                            className={`builder-picker__producto${producto.id === productoSeleccionado ? ' builder-picker__producto--activo' : ''}`}
                            type="button"
                            key={producto.id}
                            onClick={() => onSeleccionar(producto)}
                        >
                            <img src={producto.imagen} alt="" />
                            <span><strong>{producto.nombre}</strong><small>{producto.descripcion}</small></span>
                            <b>S/ {producto.precio.toLocaleString('es-PE')}</b>
                        </button>
                    )) : <p className="builder-picker__vacio">No hay opciones compatibles en el catálogo.</p>}
                </div>
            </section>
        </div>
    )
}

export default ComponentPicker
