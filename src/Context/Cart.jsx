import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext([]);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart"))
    )
    const addCart = (params, proscess) => {
        let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
        let haveProduct = cartProducts.find(item => item.id === params.id);


        if (haveProduct) {
            proscess == "incriment" ?
                haveProduct.count += 1 :
                haveProduct.count -= 1;
            if (haveProduct.count == 0) {
                localStorage.setItem("cart", JSON.stringify(cartProducts.filter(item => item.id !== haveProduct.id)));
                setCart(cartProducts.filter(item => item.id !== haveProduct.id))
            } else {
                localStorage.setItem("cart", JSON.stringify(cartProducts));
                setCart(cartProducts)
            }
           
        } else {
            const newProduct = { ...params, count: 1 };
            localStorage.setItem("cart", JSON.stringify([...cartProducts, newProduct]));
            setCart([...cartProducts, newProduct])
        }
    }

    return (
        <CartContext.Provider value={{ addCart, cart,setCart }}>
            {children}
        </CartContext.Provider>
    );
}
