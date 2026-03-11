import { useReducer } from 'react';

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
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
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

export function useCart() {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
    const removeFromCart = (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    const decreaseQuantity = (product) => dispatch({ type: 'DECREASE_QUANTITY', payload: product });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
        cartItems: state.items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart
    };
}
