import './Header.css';
import logo from '../../assets/brand/nova-gadgets-horizontal.svg'

const Header = () => {  
    return (
        <header className="header">
            <div className="contenedor header__contenido">
                <a href="/" className="header__logo">
                    <img src={logo} alt="NovaGadgets - Inicio" />
                </a>

                <nav className="header__menu" aria-label="Menú principal">
                    <a href="/">Inicio</a>
                    <a href="/tienda">Tienda</a>
                    <a href="/servicios">Servicios</a>
                    <a href="/arma-tu-pc">Arma tu PC</a>
                    <a href="/nosotros">Nosotros</a>
                    <a href="/contacto">Contacto</a>
                </nav>

                <form className="header__busqueda" role="search">
                    <label htmlFor="buscar-productos">Buscar productos</label>
                    <input 
                        id="buscar-productos"
                        name="busqueda"
                        type="text"
                        placeholder="¿Qué estás buscando?"
                    />
                    <button type="submit">Buscar</button>
                </form>

                <button type="button" className="header__carrito" aria-label="Carrito de compras">
                    Carrito (0)
                </button>
            </div>
        </header>   
    )
}

export default Header;