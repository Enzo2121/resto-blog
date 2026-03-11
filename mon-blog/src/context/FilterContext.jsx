import React, { createContext, useContext, useState, useMemo } from 'react';
import { productsList } from '../data/products';

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [activeCategory, setActiveCategory] = useState('Tout');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleIngredient = (ingredient) => {
        setSelectedIngredients(prev =>
            prev.includes(ingredient)
                ? prev.filter(i => i !== ingredient)
                : [...prev, ingredient]
        );
    };

    const filteredProducts = useMemo(() => {
        return productsList.filter(product => {
            if (searchTerm) {
                const lowerSearch = searchTerm.toLowerCase();
                const matchTitle = product.name.toLowerCase().includes(lowerSearch);
                const matchCategory = product.category.toLowerCase().includes(lowerSearch);
                const matchIngredient = product.ingredients.some(ing => ing.toLowerCase().includes(lowerSearch));
                if (!matchTitle && !matchCategory && !matchIngredient) return false;
            }

            if (activeCategory !== 'Tout' && product.category !== activeCategory) return false;

            if (maxPrice && product.price > parseFloat(maxPrice)) return false;
            if (selectedIngredients.length > 0) {
                const hasAllIngredients = selectedIngredients.every(ing =>
                    product.ingredients.includes(ing)
                );
                if (!hasAllIngredients) return false;
            }

            return true;
        });
    }, [activeCategory, maxPrice, selectedIngredients, searchTerm]);

    return (
        <FilterContext.Provider value={{
            activeCategory, setActiveCategory,
            maxPrice, setMaxPrice,
            selectedIngredients, toggleIngredient,
            searchTerm, setSearchTerm,
            filteredProducts
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilterContext() {
    return useContext(FilterContext);
}
