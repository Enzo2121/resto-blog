import React from 'react';
import { useCartContext } from '../context/CartContext';
import Button from './Button';

export default function CartModal() {
    const { isModalOpen, setIsModalOpen, cartItems, totalItems, totalPrice, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCartContext();

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity">
            <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col translate-x-0 transition-transform">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Votre Panier ({totalItems})</h2>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            Votre panier est vide.
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded shadow-sm" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">{item.price} € / unité</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => decreaseQuantity(item)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 font-bold transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 font-bold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors ml-2"
                                    title="Retirer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center mb-6 text-lg font-bold">
                        <span className="text-gray-800">Total</span>
                        <span className="text-gray-900">{totalPrice} €</span>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={clearCart} className="flex-1 opacity-70 hover:opacity-100">
                            Vider
                        </Button>
                        <Button variant="primary" className="flex-[2] py-3 text-lg" onClick={() => alert('Paiement non disponible')}>
                            Commander
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
