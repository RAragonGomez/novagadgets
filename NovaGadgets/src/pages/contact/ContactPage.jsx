import { useState } from 'react'
import './contact.css'

const motivosConsulta = [
    'Consulta sobre productos',
    'Armado de PC',
    'Servicio técnico',
    'Pedido o garantía',
    'Otro motivo',
]

const tiposAtencion = [
    'Asesoría por WhatsApp',
    'Atención en tienda',
]

const ContactPage = () => {
    const [aviso, setAviso] = useState('')

    const enviarPorWhatsApp = (evento) => {
        evento.preventDefault()
        const datos = new FormData(evento.currentTarget)
        const mensaje = [
            'Hola, NovaGadgets. Quisiera hacer una consulta:',
            `Nombre: ${datos.get('nombre')}`,
            `Correo: ${datos.get('correo')}`,
            `Teléfono: ${datos.get('telefono')}`,
            `Motivo: ${datos.get('motivo')}`,
            `Tipo de atención: ${datos.get('atencion')}`,
            `Mensaje: ${datos.get('mensaje')}`,
        ].join('\n')

        const enlace = `https://wa.me/51902127933?text=${encodeURIComponent(mensaje)}`
        window.open(enlace, '_blank', 'noopener,noreferrer')
        setAviso('WhatsApp abrirá tu mensaje para que lo revises antes de enviarlo.')
    }

    return (
        <section className="contacto contenedor" aria-labelledby="contacto-titulo">
            <nav className="contacto__breadcrumb" aria-label="Migas de pan">
                <a href="/">Inicio</a>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Contacto</span>
            </nav>

            <header className="contacto__encabezado">
                <p className="contacto__eyebrow">Estamos para ayudarte</p>
                <h1 id="contacto-titulo">Contacto</h1>
                <p>¿Tienes consultas sobre productos, armado de PC o servicio técnico? Cuéntanos qué necesitas y te orientaremos.</p>
            </header>

            <div className="contacto__columnas">
                <form className="contacto-formulario" onSubmit={enviarPorWhatsApp}>
                    <div className="contacto-formulario__encabezado">
                        <div className="contacto__icono contacto__icono--formulario" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5h16v11H9l-5 3v-14Z" /><path d="M8 9h8M8 13h5" /></svg>
                        </div>
                        <div>
                            <h2>Envíanos tu consulta</h2>
                            <p>Revisa tus datos antes de abrir WhatsApp.</p>
                        </div>
                    </div>

                    <div className="contacto-formulario__campos">
                        <label className="contacto__campo">
                            <span>Nombre</span>
                            <input name="nombre" type="text" placeholder="Tu nombre completo" autoComplete="name" required />
                        </label>
                        <label className="contacto__campo">
                            <span>Correo electrónico</span>
                            <input name="correo" type="email" placeholder="nombre@correo.com" autoComplete="email" required />
                        </label>
                        <label className="contacto__campo">
                            <span>Teléfono</span>
                            <input name="telefono" type="tel" placeholder="Tu número de contacto" autoComplete="tel" required />
                        </label>
                        <label className="contacto__campo">
                            <span>Motivo de consulta</span>
                            <select name="motivo" defaultValue="" required>
                                <option value="" disabled>Selecciona un motivo</option>
                                {motivosConsulta.map((motivo) => <option key={motivo} value={motivo}>{motivo}</option>)}
                            </select>
                        </label>
                        <label className="contacto__campo contacto__campo--completo">
                            <span>Tipo de atención</span>
                            <select name="atencion" defaultValue="" required>
                                <option value="" disabled>Selecciona cómo prefieres la atención</option>
                                {tiposAtencion.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
                            </select>
                        </label>
                        <label className="contacto__campo contacto__campo--completo">
                            <span>Mensaje</span>
                            <textarea name="mensaje" rows="5" placeholder="Cuéntanos qué necesitas" required />
                        </label>
                    </div>

                    <button className="contacto-formulario__boton" type="submit">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8.5 8.5c.4 2.3 2.7 4.6 5 5l1.2-1.2 2 .8c-.2 1-1 1.8-2 1.9-3.5-.1-7.1-3.7-7.2-7.2.1-1 .9-1.8 1.9-2l.8 2-1.7.7Z" /></svg>
                        Consultar por WhatsApp
                    </button>
                    <p className="contacto-formulario__aviso" role="status">{aviso || 'WhatsApp abrirá el mensaje para que lo revises antes de enviarlo.'}</p>
                </form>

                <aside className="contacto__aside" aria-label="Canales de atención y servicios">
                    <section className="contacto-card">
                        <p className="contacto__eyebrow">Hablemos</p>
                        <h2>Canales de atención</h2>
                        <div className="contacto-canal">
                            <span className="contacto__icono" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8.5 8.5c.4 2.3 2.7 4.6 5 5l1.2-1.2 2 .8" /></svg>
                            </span>
                            <div><span>WhatsApp</span><a href="https://wa.me/51902127933" target="_blank" rel="noreferrer">902 127 933</a></div>
                        </div>
                        <div className="contacto-canal">
                            <span className="contacto__icono" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.3" /></svg>
                            </span>
                            <div><span>Dirección de la tienda</span><p>Pasaje Velarde 188, Cercado de Lima</p></div>
                        </div>
                        <p className="contacto-card__horario">Confirma el horario con un asesor.</p>
                    </section>

                    <section className="contacto-card contacto-servicios">
                        <p className="contacto__eyebrow">Soporte técnico</p>
                        <h2>¿Buscas un servicio?</h2>
                        <p>Mantenimiento, instalación de software y diagnóstico para tu equipo.</p>
                        <a className="contacto-servicios__boton" href="/servicios">Ver servicios <span aria-hidden="true">→</span></a>
                    </section>
                </aside>
            </div>
        </section>
    )
}

export default ContactPage
