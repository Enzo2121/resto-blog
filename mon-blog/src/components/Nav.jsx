import React from 'react';

export default function Nav() {
    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center">
                <div className="font-semibold text-lg mr-8 transition-colors hover:text-gray-300 cursor-pointer">
                    Mon Restaurant
                </div>
                <div className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                    Menu
                </div>
            </div>
        </nav>
    );
}
