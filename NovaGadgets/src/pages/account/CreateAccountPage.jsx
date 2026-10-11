import { useState } from 'react'
import { crearCuenta as registrarCuenta } from '../../services'
import './account.css'
import './createAccount.css'

const CreateAccountPage = () => {
    const [aviso, setAviso] = useState('')

    const crearCuenta = async (evento) => {
        evento.preventDefault()
        const datos = new FormData(evento.currentTarget)

        if (datos.get('clave') !== datos.get('confirmar-clave')) {
            setAviso('Las contraseñas no coinciden. Revísalas e inténtalo de nuevo.')
            return
        }

        try {
            await registrarCuenta({
                nombres: datos.get('nombres'),
                apellidos: datos.get('apellidos'),
                correo: datos.get('correo'),
                clave: datos.get('clave'),
            })
            window.location.assign('/account/datos-personales')
        } catch (error) {
            setAviso(error.message)
        }
    }

    return (
        <section className="cuenta cuenta--registro" aria-labelledby="registro-titulo">
            <div className="cuenta__fondo" aria-hidden="true" />
            <div className="cuenta__velo" aria-hidden="true" />

            <div className="cuenta__tarjeta cuenta__tarjeta--registro">
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

                <p className="cuenta__eyebrow">Únete a NovaGadgets</p>
                <h1 id="registro-titulo">Crear cuenta</h1>
                <p className="cuenta__descripcion">Completa tus datos para crear tu perfil.</p>

                <form className="cuenta__formulario cuenta__formulario--registro" onSubmit={crearCuenta}>
                    <div className="cuenta__grupo">
                        <label htmlFor="registro-nombres">Nombres</label>
                        <div className="cuenta__campo">
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                <circle cx="12" cy="8" r="3.5" />
                                <path d="M5 20c.5-3.6 3.2-5.5 7-5.5s6.5 1.9 7 5.5" />
                            </svg>
                            <input id="registro-nombres" name="nombres" type="text" placeholder="Tus nombres" autoComplete="given-name" required />
                        </div>
                    </div>

                    <div className="cuenta__grupo">
                        <label htmlFor="registro-apellidos">Apellidos</label>
                        <div className="cuenta__campo">
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                <circle cx="12" cy="8" r="3.5" />
                                <path d="M5 20c.5-3.6 3.2-5.5 7-5.5s6.5 1.9 7 5.5" />
                            </svg>
                            <input id="registro-apellidos" name="apellidos" type="text" placeholder="Tus apellidos" autoComplete="family-name" required />
                        </div>
                    </div>

                    <div className="cuenta__grupo cuenta__grupo--completo">
                        <label htmlFor="registro-correo">Correo electrónico</label>
                        <div className="cuenta__campo">
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                <rect x="3.5" y="5" width="17" height="14" rx="2" />
                                <path d="m4.5 7 7.5 5.5L19.5 7" />
                            </svg>
                            <input id="registro-correo" name="correo" type="email" placeholder="tu@correo.com" autoComplete="email" required />
                        </div>
                    </div>

                    <div className="cuenta__grupo">
                        <label htmlFor="registro-clave">Contraseña</label>
                        <div className="cuenta__campo">
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                <rect x="4" y="10" width="16" height="11" rx="2" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                            </svg>
                            <input id="registro-clave" name="clave" type="password" placeholder="Mínimo 8 caracteres" autoComplete="new-password" minLength="8" required />
                        </div>
                    </div>

                    <div className="cuenta__grupo">
                        <label htmlFor="registro-confirmar-clave">Confirmar contraseña</label>
                        <div className="cuenta__campo">
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                <rect x="4" y="10" width="16" height="11" rx="2" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                            </svg>
                            <input id="registro-confirmar-clave" name="confirmar-clave" type="password" placeholder="Repite tu contraseña" autoComplete="new-password" minLength="8" required />
                        </div>
                    </div>

                    <button className="cuenta__boton" type="submit">Crear mi cuenta</button>
                    <p className="cuenta__aviso" role="status">{aviso}</p>
                </form>

                <div className="cuenta__separador"><span>¿Ya tienes cuenta?</span></div>
                <a className="cuenta__explorar" href="/account">Iniciar sesión <span aria-hidden="true">→</span></a>
            </div>
        </section>
    )
}

export default CreateAccountPage
