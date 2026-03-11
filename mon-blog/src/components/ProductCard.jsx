import React from 'react';
import Button from './Button';
import { useCartContext } from '../context/CartContext';
import { useFilterContext } from '../context/FilterContext';

export default function ProductCard({ product }) {
    const { addToCart, decreaseQuantity, getProductQuantity } = useCartContext();
    const { toggleIngredient, selectedIngredients } = useFilterContext();

    const quantity = getProductQuantity(product.id);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">
            <div className="h-48 overflow-hidden bg-gray-100 relative group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{product.name}</h3>
                    <span className="font-bold text-gray-900 whitespace-nowrap ml-2 border-b-2 border-green-500">{product.price} €</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {product.ingredients.map(ing => (
                        <button
                            key={ing}
                            onClick={() => toggleIngredient(ing)}
                            className={`px-2 py-1 text-xs font-medium border rounded transition-colors ${selectedIngredients.includes(ing)
                                    ? 'bg-blue-100 text-blue-700 border-blue-200 shadow-inner'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {ing}
                        </button>
                    ))}
                </div>

                <div className="mt-auto">
                    {quantity > 0 ? (
                        <div className="flex items-center justify-between border border-gray-200 rounded p-1 bg-gray-50 shadow-inner">
                            <button
                                onClick={() => decreaseQuantity(product)}
                                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded text-gray-800 font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
                            >
                                -
                            </button>
                            <span className="font-bold text-gray-800 w-10 text-center select-none tracking-wide text-lg">
                                {quantity}
                            </span>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded text-gray-800 font-bold hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors shadow-sm"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <Button onClick={() => addToCart(product)} variant="primary" className="w-full font-semibold shadow-sm hover:shadow">
                            Ajouter au panier
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
