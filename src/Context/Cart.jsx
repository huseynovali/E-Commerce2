import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext([]);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [])
    const addCart = (params) => {
        let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
        let haveProduct = cartProducts.find(item => item.id === params.id);
        if (haveProduct) {
            haveProduct.count += 1;
            localStorage.setItem("cart", JSON.stringify(cartProducts));
            setCart(cartProducts)
        } else {
            const newProduct = { ...params, count: 1 };
            localStorage.setItem("cart", JSON.stringify([...cartProducts, newProduct]));
            setCart([...cartProducts, newProduct])
        }
    }

    return (
        <CartContext.Provider value={{ addCart, cart }}>
            {children}
        </CartContext.Provider>
    );
}
