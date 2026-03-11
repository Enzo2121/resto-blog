import React, { createContext, useContext, useReducer, useState } from 'react';

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            };
        }
        case 'REMOVE_FROM_CART': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        }
        case 'DECREASE_QUANTITY': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (!existingItem) return state;

            if (existingItem.quantity === 1) {
                // Remove if quantity is 1
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id)
                };
            }
            // Otherwise decrease
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            };
        }
        case 'CLEAR_CART':
            return { ...state, items: [] };
        default:
            return state;
    }
};

const CartContext = createContext();

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
    const removeFromCart = (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    const decreaseQuantity = (product) => dispatch({ type: 'DECREASE_QUANTITY', payload: product });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const getProductQuantity = (productId) => {
        const item = state.items.find(i => i.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <CartContext.Provider value={{
            cartItems: state.items,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            clearCart,
            isModalOpen,
            setIsModalOpen,
            getProductQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    return useContext(CartContext);
}
