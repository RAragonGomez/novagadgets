import { useState } from 'react'
import { actualizarDatosPersonales, cambiarClave, cerrarSesion } from '../../services'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import './account.css'
import './accountSettings.css'

const AccountSettingsPage = ({ vista = 'personal', usuario }) => {
    const esSeguridad = vista === 'seguridad'
    const [aviso, setAviso] = useState('')
    const [datosUsuario, setDatosUsuario] = useState(usuario)

    const guardarCambios = async (evento) => {
        evento.preventDefault()
        const formulario = evento.currentTarget
        const datos = new FormData(evento.currentTarget)

        try {
            if (esSeguridad) {
                if (datos.get('nueva-clave') !== datos.get('confirmar-clave')) {
                    throw new Error('La nueva contraseña y su confirmación no coinciden.')
                }
                await cambiarClave(datos.get('clave-actual'), datos.get('nueva-clave'))
                formulario.reset()
                setAviso('Contraseña actualizada correctamente.')
            } else {
                const actualizado = actualizarDatosPersonales({
                    nombres: datos.get('nombres'),
                    apellidos: datos.get('apellidos'),
                    correo: datos.get('correo'),
                    telefono: datos.get('telefono'),
                })
                setDatosUsuario(actualizado)
                setAviso('Tus datos se guardaron correctamente en este navegador.')
            }
        } catch (error) {
            setAviso(error.message)
        }
    }

    return (
        <section className="cuenta perfil" aria-labelledby="perfil-titulo">
            <div className="cuenta__fondo" aria-hidden="true" />
            <div className="cuenta__velo" aria-hidden="true" />

            <div className="perfil__contenido">
                <nav className="perfil__breadcrumb" aria-label="Migas de pan">
                    <a href="/">Inicio</a>
                    <span aria-hidden="true">/</span>
                    <a href="/account/datos-personales">Mi cuenta</a>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{esSeguridad ? 'Seguridad' : 'Datos personales'}</span>
                </nav>

                <div className="perfil__layout">
                    <aside className="perfil__aside" aria-label="Menú de mi cuenta">
                        <div className="perfil__usuario">
                            <span className="perfil__avatar" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="3.5" />
                                    <path d="M5 20c.5-3.6 3.2-5.5 7-5.5s6.5 1.9 7 5.5" />
                                </svg>
                            </span>
                            <span>
                                <strong>{datosUsuario.nombres} {datosUsuario.apellidos}</strong>
                                <small>{datosUsuario.correo}</small>
                            </span>
                        </div>

                        <nav className="perfil__menu" aria-label="Secciones de la cuenta">
                            <a href="/account/datos-personales" aria-current={!esSeguridad ? 'page' : undefined}>
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="8" r="3.5" />
                                    <path d="M5 20c.5-3.6 3.2-5.5 7-5.5s6.5 1.9 7 5.5" />
                                </svg>
                                Datos personales
                            </a>
                            <a href="/account/seguridad" aria-current={esSeguridad ? 'page' : undefined}>
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <rect x="4" y="10" width="16" height="11" rx="2" />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                                </svg>
                                Seguridad
                            </a>
                            <a className="perfil__salir" href="/account" onClick={() => cerrarSesion()}>
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M10 17l5-5-5-5m5 5H3m9-9h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" />
                                </svg>
                                Cerrar sesión
                            </a>
                        </nav>
                    </aside>

                    <div className="perfil__panel">
                        <p className="perfil__eyebrow">Mi cuenta</p>
                        <h1 id="perfil-titulo">{esSeguridad ? 'Seguridad' : 'Datos personales'}</h1>
                        <p className="perfil__descripcion">
                            {esSeguridad
                                ? 'Actualiza tu contraseña para proteger el acceso a tu cuenta.'
                                : 'Revisa y actualiza la información asociada a tu perfil.'}
                        </p>

                        {esSeguridad ? (
                            <form className="perfil__formulario" onSubmit={guardarCambios}>
                                <label htmlFor="clave-actual">Contraseña actual</label>
                                <PasswordInput id="clave-actual" name="clave-actual" autoComplete="current-password" placeholder="Ingresa tu contraseña actual" />

                                <label htmlFor="nueva-clave">Nueva contraseña</label>
                                <PasswordInput id="nueva-clave" name="nueva-clave" autoComplete="new-password" placeholder="Mínimo 8 caracteres" minLength="8" />

                                <label htmlFor="confirmar-clave">Confirmar nueva contraseña</label>
                                <PasswordInput id="confirmar-clave" name="confirmar-clave" autoComplete="new-password" placeholder="Vuelve a escribir la contraseña" minLength="8" />

                                <div className="perfil__acciones">
                                    <button className="perfil__guardar" type="submit">Actualizar contraseña</button>
                                    <p className="perfil__aviso" role="status">{aviso}</p>
                                </div>
                            </form>
                        ) : (
                            <form className="perfil__formulario perfil__formulario--personal" onSubmit={guardarCambios}>
                                <div className="perfil__campo">
                                    <label htmlFor="perfil-nombres">Nombres</label>
                                    <input id="perfil-nombres" name="nombres" type="text" autoComplete="given-name" defaultValue={datosUsuario.nombres} required />
                                </div>
                                <div className="perfil__campo">
                                    <label htmlFor="perfil-apellidos">Apellidos</label>
                                    <input id="perfil-apellidos" name="apellidos" type="text" autoComplete="family-name" defaultValue={datosUsuario.apellidos} required />
                                </div>
                                <div className="perfil__campo perfil__campo--completo">
                                    <label htmlFor="perfil-correo">Correo electrónico</label>
                                    <input id="perfil-correo" name="correo" type="email" autoComplete="email" defaultValue={datosUsuario.correo} required />
                                </div>
                                <div className="perfil__campo perfil__campo--completo">
                                    <label htmlFor="perfil-telefono">Teléfono</label>
                                    <input id="perfil-telefono" name="telefono" type="tel" autoComplete="tel" defaultValue={datosUsuario.telefono} required />
                                </div>
                                <div className="perfil__acciones perfil__campo--completo">
                                    <button className="perfil__guardar" type="submit">Guardar cambios</button>
                                    <p className="perfil__aviso" role="status">{aviso}</p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountSettingsPage
