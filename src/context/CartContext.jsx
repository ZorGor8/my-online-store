import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('pixelPulseCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
const clearCart = () => {
    setCartItems([]);
};
  
    useEffect(() => {
        localStorage.setItem('pixelPulseCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };


const removeFromCart = (productId) => {
  setCartItems((prev) => {
    const existingItem = prev.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      return prev.filter(item => item.id !== productId);
    }
    return prev.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  });
};

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};