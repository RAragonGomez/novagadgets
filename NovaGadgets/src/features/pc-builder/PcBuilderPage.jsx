import { useEffect, useMemo, useState } from 'react'
import { productos } from '../../data/productos'
import ComponentRow from './components/ComponentRow'
import ComponentPicker from './components/ComponentPicker'
import BuildSummary from './components/BuildSummary'
import './pc-builder.css'

const categorias = [
    { id: 'procesador', nombre: 'Procesador', detalle: 'Base del equipo', subcategoria: 'procesadores' },
    { id: 'placas-madre', nombre: 'Placa madre', detalle: 'Base del equipo', subcategoria: 'placas-madre' },
    { id: 'memorias-ram', nombre: 'Memoria RAM', detalle: 'Base del equipo', subcategoria: 'memorias-ram' },
    { id: 'tarjetas-video', nombre: 'Tarjeta gráfica', detalle: 'Imagen y almacenamiento', subcategoria: 'tarjetas-video' },
    { id: 'almacenamiento', nombre: 'Almacenamiento', detalle: 'Imagen y almacenamiento', subcategoria: 'almacenamiento' },
    { id: 'fuentes-poder', nombre: 'Fuente de poder', detalle: 'Energía y gabinete', subcategoria: 'fuentes-poder' },
    { id: 'gabinetes', nombre: 'Gabinete', detalle: 'Energía y gabinete', subcategoria: 'gabinetes' },
]

const valoresIniciales = {
    procesador: 'intel-core-i7',
    'placas-madre': 'asus-prime-placa',
    'memorias-ram': 'kingston-fury-ram',
    'tarjetas-video': 'geforce-rtx',
    almacenamiento: 'kingston-nv3-ssd',
    'fuentes-poder': 'cooler-master-mwe750',
    gabinetes: 'cooler-master-gabinete',
}

const plataformaCpu = {
    'intel-core-i7': 'LGA1700',
    'intel-core-i5-12400f': 'LGA1700',
    'intel-core-i3-12100f': 'LGA1700',
    'amd-ryzen-5-5600': 'AM4',
    'amd-ryzen-7-5700g': 'AM4',
}

const plataformaPlaca = {
    'asus-prime-placa': { socket: 'LGA1700', memoria: 'DDR4' },
    'msi-pro-b760m-p': { socket: 'LGA1700', memoria: 'DDR4' },
    'gigabyte-b550m-ds3h': { socket: 'AM4', memoria: 'DDR4' },
    'asus-tuf-b650-plus': { socket: 'AM5', memoria: 'DDR5' },
}

const tipoMemoria = {
    'kingston-fury-ram': 'DDR4',
    'corsair-vengeance-lpx': 'DDR4',
    'kingston-fury-ddr5': 'DDR5',
    'corsair-vengeance-rgb': 'DDR5',
}

const productById = (id) => productos.find((producto) => producto.id === id)

const leerSeleccion = () => {
    try {
        const guardado = JSON.parse(localStorage.getItem('novagadgets:pc-builder') || 'null')
        return guardado ? { ...valoresIniciales, ...guardado } : valoresIniciales
    } catch {
        return valoresIniciales
    }
}

const PcBuilderPage = ({ onAgregar }) => {
    const [seleccion, setSeleccion] = useState(leerSeleccion)
    const [categoriaActiva, setCategoriaActiva] = useState(null)

    useEffect(() => {
        localStorage.setItem('novagadgets:pc-builder', JSON.stringify(seleccion))
    }, [seleccion])

    const categoriaPicker = categorias.find((categoria) => categoria.id === categoriaActiva)
    const motherboard = productById(seleccion['placas-madre'])
    const cpu = productById(seleccion.procesador)
    const ram = productById(seleccion['memorias-ram'])

    const opciones = useMemo(() => {
        if (!categoriaPicker) return []
        let disponibles = productos.filter((producto) => producto.subcategoria === categoriaPicker.subcategoria)

        if (categoriaPicker.id === 'procesador' && motherboard) {
            disponibles = disponibles.filter((producto) => plataformaCpu[producto.id] === plataformaPlaca[motherboard.id]?.socket)
        }
        if (categoriaPicker.id === 'placas-madre' && cpu) {
            disponibles = disponibles.filter((producto) => plataformaPlaca[producto.id]?.socket === plataformaCpu[cpu.id])
        }
        if (categoriaPicker.id === 'memorias-ram' && motherboard) {
            disponibles = disponibles.filter((producto) => tipoMemoria[producto.id] === plataformaPlaca[motherboard.id]?.memoria)
        }
        return disponibles
    }, [categoriaPicker, motherboard, cpu])

    const seleccionados = categorias
        .map((categoria) => ({ categoriaId: categoria.id, producto: productById(seleccion[categoria.id]) }))
        .filter((item) => item.producto)
    const total = seleccionados.reduce((suma, item) => suma + item.producto.precio, 0)
    const completo = seleccionados.length === categorias.length

    const seleccionarProducto = (categoria, producto) => {
        const nueva = { ...seleccion, [categoria.id]: producto.id }

        if (categoria.id === 'procesador') {
            const placaActual = plataformaPlaca[nueva['placas-madre']]
            if (plataformaCpu[producto.id] !== placaActual?.socket) {
                const placaCompatible = productos.find((item) => item.subcategoria === 'placas-madre' && plataformaPlaca[item.id]?.socket === plataformaCpu[producto.id])
                nueva['placas-madre'] = placaCompatible?.id || ''
            }
        }

        if (categoria.id === 'placas-madre') {
            const socket = plataformaPlaca[producto.id]?.socket
            if (plataformaCpu[nueva.procesador] !== socket) {
                const cpuCompatible = productos.find((item) => item.subcategoria === 'procesadores' && plataformaCpu[item.id] === socket)
                nueva.procesador = cpuCompatible?.id || ''
            }
        }

        const placaElegida = plataformaPlaca[nueva['placas-madre']]
        if (tipoMemoria[nueva['memorias-ram']] !== placaElegida?.memoria) {
            const ramCompatible = productos.find((item) => item.subcategoria === 'memorias-ram' && tipoMemoria[item.id] === placaElegida?.memoria)
            nueva['memorias-ram'] = ramCompatible?.id || ''
        }

        setSeleccion(nueva)
        setCategoriaActiva(null)
    }

    const solicitarCotizacion = () => {
        const mensaje = [
            'Hola, NovaGadgets. Quisiera cotizar esta configuración de PC:',
            ...categorias.map((categoria) => `${categoria.nombre}: ${productById(seleccion[categoria.id])?.nombre || 'Pendiente'}`),
            `Total estimado: S/ ${total.toLocaleString('es-PE')}`,
        ].join('\n')
        window.open(`https://wa.me/51902127933?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer')
    }

    const agregarConfiguracion = () => {
        if (!completo || !onAgregar) return
        categorias.forEach((categoria) => onAgregar(productById(seleccion[categoria.id])))
    }

    return (
        <section className="pc-builder contenedor" aria-labelledby="pc-builder-titulo">
            <nav className="pc-builder__breadcrumb" aria-label="Migas de pan">
                <a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Arma tu PC</span>
            </nav>

            <header className="pc-builder__encabezado">
                <p className="pc-builder__eyebrow">Configurador NovaGadgets</p>
                <h1 id="pc-builder-titulo">Arma tu PC</h1>
                <p>Empieza por el procesador. La placa madre y la memoria deben ser compatibles con tu elección.</p>
            </header>

            <div className="pc-builder__columnas">
                <section className="pc-builder__lista" aria-label="Componentes de la computadora">
                    <div className="pc-builder__cabecera-tabla"><span>Componente</span><span>Modelo</span><span>Precio</span></div>
                    {categorias.map((categoria) => (
                        <ComponentRow
                            key={categoria.id}
                            categoria={categoria}
                            producto={productById(seleccion[categoria.id])}
                            onCambiar={() => setCategoriaActiva(categoria.id)}
                        />
                    ))}
                    <div className="pc-builder__pie">
                        <p>¿Necesitas ayuda para elegir? Consulta con un asesor.</p>
                        <button type="button" onClick={() => setSeleccion(Object.fromEntries(categorias.map((categoria) => [categoria.id, ''])))}>
                            <span aria-hidden="true">⌫</span> Limpiar selección
                        </button>
                    </div>
                </section>

                <BuildSummary
                    categorias={categorias}
                    seleccionados={seleccionados}
                    total={total}
                    completo={completo}
                    onCotizar={solicitarCotizacion}
                    onAgregar={agregarConfiguracion}
                />
            </div>

            {categoriaPicker && (
                <ComponentPicker
                    categoria={categoriaPicker}
                    productos={opciones}
                    productoSeleccionado={seleccion[categoriaPicker.id]}
                    onSeleccionar={(producto) => seleccionarProducto(categoriaPicker, producto)}
                    onCerrar={() => setCategoriaActiva(null)}
                />
            )}
        </section>
    )
}

export default PcBuilderPage
