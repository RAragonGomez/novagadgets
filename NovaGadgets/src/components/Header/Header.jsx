import { useRef, useState } from 'react'
import './Header.css'
import logo from '../../assets/brand/nova-gadgets-horizontal.svg'
import iconoBuscar from '../../assets/icons/Search_Magnifying_Glass.svg'
import iconoCarrito from '../../assets/icons/Shopping_Cart_01.svg'

const enlaces = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/tienda', texto: 'Tienda' },
    { ruta: '/servicios', texto: 'Servicios' },
    { ruta: '/arma-tu-pc', texto: 'Arma tu PC' },
    { ruta: '/nosotros', texto: 'Nosotros' },
    { ruta: '/contacto', texto: 'Contacto' },
]

const Header = ({ cantidadCarrito = 0, onAbrirCarrito, onBuscar }) => {
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const [aviso, setAviso] = useState('')
    const botonMenu = useRef(null)
    const rutaActual = window.location.pathname

    const buscarProductos = (evento) => {
        evento.preventDefault()
        const texto = busqueda.trim()

        if (!texto) {
            setAviso('Escribe el nombre de un producto para buscar.')
            return
        }

        // La tienda recibirá el texto cuando conectemos su función de búsqueda.
        if (onBuscar) {
            setAviso('')
            onBuscar(texto)
        } else {
            setAviso('La búsqueda estará disponible cuando la tienda esté lista.')
        }
    }

    const abrirCarrito = () => {
        if (onAbrirCarrito) {
            setAviso('')
            onAbrirCarrito()
        } else {
            setAviso('El carrito todavía no está disponible.')
        }
    }

    const cerrarConEscape = (evento) => {
        if (evento.key === 'Escape' && menuAbierto) {
            setMenuAbierto(false)
            botonMenu.current.focus()
        }
    }

    return (
        <header className="header" onKeyDown={cerrarConEscape}>
            <div className="contenedor header__contenido">
                <a href="/" className="header__logo">
                    <img src={logo} alt="NovaGadgets - Inicio" width="160" height="36" />
                </a>

                <button
                    ref={botonMenu}
                    type="button"
                    className="header__boton-menu"
                    aria-expanded={menuAbierto}
                    aria-controls="menu-principal"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    {menuAbierto ? 'Cerrar menú' : 'Menú'}
                </button>

                <nav
                    id="menu-principal"
                    className={menuAbierto ? 'header__menu header__menu--abierto' : 'header__menu'}
                    aria-label="Menú principal"
                >
                    {enlaces.map((enlace) => (
                        <a
                            key={enlace.ruta}
                            href={enlace.ruta}
                            aria-current={rutaActual === enlace.ruta ? 'page' : undefined}
                            onClick={() => setMenuAbierto(false)}
                        >
                            {enlace.texto}
                        </a>
                    ))}
                </nav>

                <form className="header__busqueda" role="search" onSubmit={buscarProductos}>
                    <label htmlFor="buscar-productos">Buscar productos</label>
                    <input
                        id="buscar-productos"
                        name="busqueda"
                        type="search"
                        placeholder="Buscar productos"
                        value={busqueda}
                        maxLength={100}
                        onChange={(evento) => {
                            setBusqueda(evento.target.value)
                            setAviso('')
                        }}
                    />
                    <button type="submit" aria-label="Buscar productos">
                        <img src={iconoBuscar} alt="" width="18" height="18" />
                    </button>
                </form>

                <button type="button" className="header__carrito" onClick={abrirCarrito}>
                    <img src={iconoCarrito} alt="" width="18" height="18" />
                    Carrito <span>({cantidadCarrito})</span>
                </button>
            </div>
            <div className="contenedor header__aviso" role="status">{aviso}</div>
        </header>
    )
}

export default Header
