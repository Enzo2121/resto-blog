import React from 'react';
import SidebarBlock from './SidebarBlock';

export default function Sidebar({ categories, allIngredients, activeCategory, setActiveCategory, maxPrice, setMaxPrice, selectedIngredients, toggleIngredient }) {
    return (
        <aside className="w-full md:w-64 shrink-0">
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
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <span className="bg-gray-100 text-gray-500 px-3 py-2 text-sm">€</span>
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
                <div className="flex flex-wrap gap-2">
                    {allIngredients.map(ing => (
                        <button
                            key={ing}
                            onClick={() => toggleIngredient(ing)}
                            className={`px-2 py-1 text-xs border rounded transition-colors ${selectedIngredients.includes(ing)
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
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
