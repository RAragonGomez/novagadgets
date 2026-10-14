import { useEffect, useState } from 'react'
import TarjetaProducto from '../../components/ProductCard/TarjetaProducto'
import { productos } from '../../data/productos'
import { categorias } from '../../data/categorias'
import './Tienda.css'

const tiposComponente = [
    { id: 'procesadores', nombre: 'Procesadores' },
    { id: 'placas-madre', nombre: 'Placas madre' },
    { id: 'memorias-ram', nombre: 'Memorias RAM' },
    { id: 'tarjetas-video', nombre: 'Tarjetas gráficas' },
    { id: 'almacenamiento', nombre: 'Almacenamiento' },
    { id: 'fuentes-poder', nombre: 'Fuentes de poder' },
    { id: 'gabinetes', nombre: 'Gabinetes' },
]

// Así también encuentra "gráfica" cuando se escribe "grafica".
const normalizarTexto = (texto) => texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const Tienda = ({ onAgregar }) => {
    const parametros = new URLSearchParams(window.location.search)
    const [busqueda, setBusqueda] = useState(() => parametros.get('busqueda') || '')
    const [categoria, setCategoria] = useState(() =>
        categorias.some((item) => item.id === parametros.get('categoria')) ? parametros.get('categoria') : ''
    )
    const [tipo, setTipo] = useState(() =>
        parametros.get('categoria') === 'componentes' && tiposComponente.some((item) => item.id === parametros.get('tipo'))
            ? parametros.get('tipo') : ''
    )
    const [orden, setOrden] = useState(() =>
        ['precio-asc', 'precio-desc'].includes(parametros.get('orden')) ? parametros.get('orden') : ''
    )

    // Los filtros quedan en el enlace para conservarlos al recargar o compartirlo.
    useEffect(() => {
        const filtros = new URLSearchParams()
        if (busqueda.trim()) filtros.set('busqueda', busqueda.trim())
        if (categoria) filtros.set('categoria', categoria)
        if (tipo) filtros.set('tipo', tipo)
        if (orden) filtros.set('orden', orden)
        const consulta = filtros.toString()
        window.history.replaceState(null, '', consulta ? `/tienda?${consulta}` : '/tienda')
    }, [busqueda, categoria, tipo, orden])

    const palabras = normalizarTexto(busqueda).trim().split(/\s+/).filter(Boolean)
    const productosFiltrados = productos.filter((producto) => {
        const texto = normalizarTexto(`${producto.nombre} ${producto.descripcion}`)
        return (!categoria || producto.categoria === categoria)
            && (!tipo || producto.subcategoria === tipo)
            && palabras.every((palabra) => texto.includes(palabra))
    })

    if (orden === 'precio-asc') productosFiltrados.sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') productosFiltrados.sort((a, b) => b.precio - a.precio)

    const limpiarFiltros = () => {
        setBusqueda('')
        setCategoria('')
        setTipo('')
        setOrden('')
    }

    return (
        <div className="contenedor tienda">
            <div className="tienda__presentacion">
                <h1>Tienda</h1>
                <p>Computadoras, componentes y periféricos para tu equipo.</p>
            </div>

            <section className="tienda__filtros" aria-label="Buscar y filtrar productos">
                <label className="tienda__campo tienda__campo--buscar" htmlFor="tienda-busqueda">
                    Buscar en el catálogo
                    <input id="tienda-busqueda" type="search" value={busqueda} maxLength={100}
                        placeholder="Nombre, marca o modelo" onChange={(evento) => setBusqueda(evento.target.value)} />
                </label>
                <label className="tienda__campo" htmlFor="tienda-categoria">
                    Categoría
                    <select id="tienda-categoria" value={categoria} onChange={(evento) => {
                        setCategoria(evento.target.value)
                        setTipo('')
                    }}>
                        <option value="">Todas las categorías</option>
                        {categorias.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                    </select>
                </label>
                {categoria === 'componentes' && (
                    <label className="tienda__campo" htmlFor="tienda-tipo">
                        Tipo de componente
                        <select id="tienda-tipo" value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
                            <option value="">Todos los componentes</option>
                            {tiposComponente.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                        </select>
                    </label>
                )}
                <label className="tienda__campo" htmlFor="tienda-orden">
                    Ordenar por
                    <select id="tienda-orden" value={orden} onChange={(evento) => setOrden(evento.target.value)}>
                        <option value="">Orden del catálogo</option>
                        <option value="precio-asc">Menor precio</option>
                        <option value="precio-desc">Mayor precio</option>
                    </select>
                </label>
            </section>

            <div className="tienda__resumen">
                <p role="status">{productosFiltrados.length} de {productos.length} productos</p>
                {(busqueda || categoria || tipo || orden) && (
                    <button className="tienda__limpiar" type="button" onClick={limpiarFiltros}>Limpiar filtros</button>
                )}
                <p>Precios de ejemplo para la demo.</p>
            </div>

            {productosFiltrados.length > 0 ? (
                <section className="tienda__productos" aria-label="Catálogo de productos">
                    {productosFiltrados.map((producto) => (
                        <TarjetaProducto key={producto.id} producto={producto} onAgregar={onAgregar} />
                    ))}
                </section>
            ) : (
                <div className="tienda__vacio">
                    <h2>No encontramos productos</h2>
                    <p>Prueba con otro nombre o cambia los filtros.</p>
                    <button className="boton boton--secundario" type="button" onClick={limpiarFiltros}>Ver todo el catálogo</button>
                </div>
            )}
        </div>
    )
}

export default Tienda
