const ComponentRow = ({ categoria, producto, onCambiar }) => (
    <article className="builder-row">
        <div className="builder-row__categoria">
            <strong>{categoria.nombre}</strong>
            <small>{categoria.detalle}</small>
        </div>
        {producto ? (
            <>
                <img className="builder-row__imagen" src={producto.imagen} alt={producto.nombre} />
                <div className="builder-row__producto">
                    <strong>{producto.nombre}</strong>
                    <small>{producto.descripcion}</small>
                </div>
                <button className="builder-row__cambiar" type="button" onClick={onCambiar}>
                    <span aria-hidden="true">⟳</span> Cambiar
                </button>
                <strong className="builder-row__precio">S/ {producto.precio.toLocaleString('es-PE')}</strong>
            </>
        ) : (
            <button className="builder-row__seleccionar" type="button" onClick={onCambiar}>Seleccionar componente</button>
        )}
    </article>
)

export default ComponentRow
