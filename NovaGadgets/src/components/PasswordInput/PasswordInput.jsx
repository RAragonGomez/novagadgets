import { useState } from 'react'
import './PasswordInput.css'

function PasswordInput({ id, name, placeholder, autoComplete, minLength, required = true }) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="password-input">
            <input
                id={id}
                name={name}
                type={visible ? 'text' : 'password'}
                placeholder={placeholder}
                autoComplete={autoComplete}
                minLength={minLength}
                required={required}
            />
            <button
                className="password-input__toggle"
                type="button"
                onClick={() => setVisible((estado) => !estado)}
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={visible}
            >
                {visible ? (
                <span aria-hidden="true">🙈</span>
                ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                </svg>
                )}
            </button>
        </div>
    )
}

export default PasswordInput
