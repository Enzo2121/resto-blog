import React from 'react';
import Button from './Button';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800 text-lg leading-tight">{product.name}</h3>
                    <span className="font-bold text-gray-900 whitespace-nowrap ml-2">{product.price} €</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {product.ingredients.map(ing => (
                        <span
                            key={ing}
                            className="px-2 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded"
                        >
                            {ing}
                        </span>
                    ))}
                </div>

                <div className="mt-auto">
                    <Button onClick={() => onAddToCart(product)} variant="primary">
                        Ajouter au panier
                    </Button>
                </div>
            </div>
        </div>
    );
}
