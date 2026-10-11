const CUENTAS_KEY = 'novagadgets:cuentas'
const SESION_KEY = 'novagadgets:sesion'

const leerCuentas = () => {
    try {
        return JSON.parse(localStorage.getItem(CUENTAS_KEY) || '[]')
    } catch {
        return []
    }
}

const guardarCuentas = (cuentas) => localStorage.setItem(CUENTAS_KEY, JSON.stringify(cuentas))
const normalizarCorreo = (correo) => correo.trim().toLowerCase()

const hashClave = async (clave, sal) => {
    const bytes = new TextEncoder().encode(`${sal}:${clave}`)
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const crearSal = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('')

export const crearCuenta = async ({ nombres, apellidos, correo, telefono = '', clave }) => {
    const cuentas = leerCuentas()
    const email = normalizarCorreo(correo)

    if (cuentas.some((cuenta) => cuenta.correo === email)) {
        throw new Error('Ya existe una cuenta con ese correo electrónico.')
    }

    const sal = crearSal()
    const cuenta = {
        id: crypto.randomUUID(),
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        correo: email,
        telefono: telefono.trim(),
        sal,
        claveHash: await hashClave(clave, sal),
    }

    guardarCuentas([...cuentas, cuenta])
    localStorage.setItem(SESION_KEY, cuenta.id)
    return { id: cuenta.id, nombres: cuenta.nombres, apellidos: cuenta.apellidos, correo: cuenta.correo, telefono: cuenta.telefono }
}

export const iniciarSesion = async (correo, clave) => {
    const email = normalizarCorreo(correo)
    const cuenta = leerCuentas().find((item) => item.correo === email)

    if (!cuenta || await hashClave(clave, cuenta.sal) !== cuenta.claveHash) {
        throw new Error('Correo o contraseña incorrectos.')
    }

    localStorage.setItem(SESION_KEY, cuenta.id)
    return { id: cuenta.id, nombres: cuenta.nombres, apellidos: cuenta.apellidos, correo: cuenta.correo, telefono: cuenta.telefono }
}

export const obtenerUsuarioActual = () => {
    const id = localStorage.getItem(SESION_KEY)
    if (!id) return null

    const cuenta = leerCuentas().find((item) => item.id === id)
    if (!cuenta) {
        localStorage.removeItem(SESION_KEY)
        return null
    }

    return { id: cuenta.id, nombres: cuenta.nombres, apellidos: cuenta.apellidos, correo: cuenta.correo, telefono: cuenta.telefono }
}

export const actualizarDatosPersonales = ({ nombres, apellidos, correo, telefono }) => {
    const usuario = obtenerUsuarioActual()
    if (!usuario) throw new Error('Inicia sesión para editar tus datos.')

    const cuentas = leerCuentas()
    const email = normalizarCorreo(correo)
    if (cuentas.some((cuenta) => cuenta.correo === email && cuenta.id !== usuario.id)) {
        throw new Error('Ese correo ya está asociado a otra cuenta.')
    }

    const actualizadas = cuentas.map((cuenta) => cuenta.id === usuario.id
        ? { ...cuenta, nombres: nombres.trim(), apellidos: apellidos.trim(), correo: email, telefono: telefono.trim() }
        : cuenta)
    guardarCuentas(actualizadas)
    return obtenerUsuarioActual()
}

export const cambiarClave = async (actual, nueva) => {
    const usuario = obtenerUsuarioActual()
    if (!usuario) throw new Error('Inicia sesión para cambiar tu contraseña.')

    const cuentas = leerCuentas()
    const cuenta = cuentas.find((item) => item.id === usuario.id)
    if (await hashClave(actual, cuenta.sal) !== cuenta.claveHash) {
        throw new Error('La contraseña actual no es correcta.')
    }

    const sal = crearSal()
    const claveHash = await hashClave(nueva, sal)
    guardarCuentas(cuentas.map((item) => item.id === usuario.id ? { ...item, sal, claveHash } : item))
}

export const cerrarSesion = () => localStorage.removeItem(SESION_KEY)
