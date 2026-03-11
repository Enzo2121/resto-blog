import React from 'react';
import Cart from './Cart';
import { useCartContext } from '../context/CartContext';

export default function Header() {
    const { totalItems, setIsModalOpen } = useCartContext();

    return (
        <header className="relative w-full h-[400px] bg-gray-900 txt-white">
            <img
                src="/bg_header.jpg"
                alt="Restaurant background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />

            <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center items-center">
                <div className="absolute top-6 right-4 sm:right-4 z-30">
                    <Cart count={totalItems} onClick={() => setIsModalOpen(true)} />
                </div>
                <h1 className="text-4xl md:text-6xl font-serif tracking-wide drop-shadow-lg text-white font-bold">
                    Mon Restaurant
                </h1>
            </div>
        </header>
    );
}
