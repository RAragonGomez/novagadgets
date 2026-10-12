const BuildSummary = ({ categorias, seleccionados, total, onCotizar, onAgregar, completo }) => (
    <aside className="builder-summary" aria-labelledby="builder-summary-titulo">
        <h2 id="builder-summary-titulo">Resumen de tu PC</h2>
        <p className="builder-summary__contador">{seleccionados.length} de {categorias.length} componentes seleccionados</p>
        <ul className="builder-summary__lista">
            {categorias.map((categoria) => {
                const producto = seleccionados.find((item) => item.categoriaId === categoria.id)?.producto
                return (
                    <li key={categoria.id}>
                        <span>{categoria.nombre}</span>
                        <strong>{producto ? `S/ ${producto.precio.toLocaleString('es-PE')}` : '—'}</strong>
                    </li>
                )
            })}
        </ul>
        <div className="builder-summary__total"><span>Total estimado</span><strong>S/ {total.toLocaleString('es-PE')}</strong></div>
        <button className="builder-summary__cotizar" type="button" onClick={onCotizar} disabled={!completo}>Solicitar cotización</button>
        <button className="builder-summary__agregar" type="button" onClick={onAgregar} disabled={!completo}>Agregar configuración al carrito</button>
        <div className="builder-summary__nota">
            <strong><span aria-hidden="true">△</span> Revisión de compatibilidad pendiente</strong>
            <p>El asesor confirma compatibilidad y stock.</p>
            <p>Precios de ejemplo para el proyecto.</p>
        </div>
    </aside>
)

export default BuildSummary
