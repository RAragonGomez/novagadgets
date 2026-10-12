import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CartDrawer from '../features/cart/CartDrawer'

const CartContext = createContext(null)
const CART_KEY = 'novagadgets:carrito'

const leerCarrito = () => {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    } catch {
        return []
    }
}

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(leerCarrito)
    const [abierto, setAbierto] = useState(false)
    const abrir = useCallback(() => setAbierto(true), [])
    const cerrar = useCallback(() => setAbierto(false), [])

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items))
    }, [items])

    const agregar = useCallback((producto) => {
        setItems((actuales) => {
            const existente = actuales.find((item) => item.id === producto.id)
            return existente
                ? actuales.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
                : [...actuales, { ...producto, cantidad: 1 }]
        })
        setAbierto(true)
    }, [])

    const cambiarCantidad = useCallback((id, cantidad) => {
        if (cantidad <= 0) {
            setItems((actuales) => actuales.filter((item) => item.id !== id))
            return
        }
        setItems((actuales) => actuales.map((item) => item.id === id ? { ...item, cantidad } : item))
    }, [])

    const quitar = useCallback((id) => setItems((actuales) => actuales.filter((item) => item.id !== id)), [])
    const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0)
    const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0)

    const valor = useMemo(() => ({
        items,
        cantidadTotal,
        subtotal,
        abierto,
        agregar,
        cambiarCantidad,
        quitar,
        abrir,
        cerrar,
    }), [items, cantidadTotal, subtotal, abierto, agregar, cambiarCantidad, quitar, abrir, cerrar])

    return (
        <CartContext.Provider value={valor}>
            {children}
            <CartDrawer />
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const contexto = useContext(CartContext)
    if (!contexto) throw new Error('useCart debe usarse dentro de CartProvider.')
    return contexto
}
