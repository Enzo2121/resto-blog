import React from 'react';
import SidebarBlock from './SidebarBlock';
import { useFilterContext } from '../context/FilterContext';
import { categories, allIngredients } from '../data/products';

export default function Sidebar() {
    const {
        activeCategory, setActiveCategory,
        maxPrice, setMaxPrice,
        selectedIngredients, toggleIngredient,
        searchTerm, setSearchTerm
    } = useFilterContext();

    return (
        <aside className="w-full md:w-64 shrink-0">
            <div className="mb-6 border border-gray-200 rounded-md bg-white shadow-sm p-3">
                <input
                    type="text"
                    className="w-full py-2 px-3 outline-none text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="mb-6 border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                <h3 className="bg-gray-800 text-white px-4 py-3 font-medium text-sm">
                    Catégorie
                </h3>
                <ul className="flex flex-col">
                    {categories.map(cat => (
                        <li
                            key={cat}
                            className={`px-4 py-3 cursor-pointer text-sm border-b last:border-0 hover:bg-gray-50 transition-colors ${activeCategory === cat ? 'font-bold bg-gray-50 text-blue-600' : 'text-gray-700'}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6 border border-gray-200 rounded-md bg-white shadow-sm p-3">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow">
                    <span className="bg-gray-100 text-gray-500 px-3 py-2 text-sm border-r border-gray-300">€</span>
                    <input
                        type="number"
                        className="w-full py-2 px-3 outline-none text-sm"
                        placeholder="Prix max"
                        value={maxPrice || ''}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-6 border border-gray-200 rounded-md bg-white shadow-sm p-3">
                <h3 className="font-medium text-sm text-gray-800 mb-3">Ingrédients</h3>
                <div className="flex flex-wrap gap-2">
                    {allIngredients.map(ing => (
                        <button
                            key={ing}
                            onClick={() => toggleIngredient(ing)}
                            className={`px-2 py-1 text-xs border rounded transition-colors ${selectedIngredients.includes(ing)
                                ? 'bg-blue-500 text-white border-blue-500 scale-105 shadow-sm'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                }`}
                        >
                            {ing}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
