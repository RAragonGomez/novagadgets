import { useState } from 'react'
import { iniciarSesion } from '../../services'
import './account.css'

const AccountPage = () => {
    const [aviso, setAviso] = useState('')

    const enviarInicioSesion = async (evento) => {
        evento.preventDefault()
        const datos = new FormData(evento.currentTarget)
        try {
            await iniciarSesion(datos.get('correo'), datos.get('clave'))
            window.location.assign('/account/datos-personales')
        } catch (error) {
            setAviso(error.message)
        }
    }

    return (
        <section className="cuenta" aria-labelledby="cuenta-titulo">
            <div className="cuenta__fondo" aria-hidden="true" />
            <div className="cuenta__velo" aria-hidden="true" />

            <div className="cuenta__tarjeta">
                <a className="cuenta__marca" href="/" aria-label="NovaGadgets, ir al inicio">
                    <span className="cuenta__marca-icono"><img src="/favicon.svg" alt="" width="28" height="28" /></span>
                    <span>NOVA<span>GADGETS</span></span>
                </a>

                <div className="cuenta__icono-perfil" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M5 20c.5-3.6 3.2-5.5 7-5.5s6.5 1.9 7 5.5" />
                    </svg>
                </div>

                <p className="cuenta__eyebrow">Tu espacio NovaGadgets</p>
                <h1 id="cuenta-titulo">Iniciar sesión</h1>
                <p className="cuenta__descripcion">Ingresa a tu cuenta para continuar.</p>

                <form className="cuenta__formulario" onSubmit={enviarInicioSesion}>
                    <label htmlFor="cuenta-correo">Correo electrónico</label>
                    <div className="cuenta__campo">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                            <rect x="3.5" y="5" width="17" height="14" rx="2" />
                            <path d="m4.5 7 7.5 5.5L19.5 7" />
                        </svg>
                        <input id="cuenta-correo" name="correo" type="email" placeholder="tu@correo.com" autoComplete="email" required />
                    </div>

                    <div className="cuenta__etiqueta-con-enlace">
                        <label htmlFor="cuenta-clave">Contraseña</label>
                        <button type="button" onClick={() => setAviso('La recuperación de contraseña estará disponible próximamente.')}>
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                    <div className="cuenta__campo">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                            <rect x="4" y="10" width="16" height="11" rx="2" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                        </svg>
                        <input id="cuenta-clave" name="clave" type="password" placeholder="Ingresa tu contraseña" autoComplete="current-password" required />
                    </div>

                    <button className="cuenta__boton" type="submit">Entrar a mi cuenta</button>
                    <p className="cuenta__aviso" role="status">{aviso}</p>
                </form>

                <div className="cuenta__separador"><span>¿Aún no tienes cuenta?</span></div>
                <a className="cuenta__explorar" href="/account/crear-cuenta">Crear cuenta <span aria-hidden="true">→</span></a>
            </div>
        </section>
    )
}

export default AccountPage
