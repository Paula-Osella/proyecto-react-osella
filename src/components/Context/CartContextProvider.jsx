import { useState } from "react";
import CartContext from "../Context/CartContext";

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, q) => {
        const productIndex = cart.findIndex(product => product.id === item.id);

        if (productIndex !== -1) {
            const updatedCart = cart.map((product, index) =>
                index === productIndex
                    ? { ...product, quantity: product.quantity + q }
                    : product
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [
                ...prevCart,
                {
                    ...item,
                    quantity: q,
                },
            ]);
        }
    };

    const removeItem = (id) => {
        setCart(cart.filter(el => el.id !== id));
    };

    const clear = () => {
        setCart([]);
    };


    const calculateTotal = () => {
        return cart.reduce((acc, el) => acc + el.price * el.quantity, 0);
    };

    const values = {
        cart,
        addItem,
        removeItem,
        clear,
        calculateTotal 
    };

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
