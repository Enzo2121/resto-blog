import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
    const baseStyle = "w-full py-2 px-4 rounded transition-colors text-sm font-medium";
    const variants = {
        primary: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
