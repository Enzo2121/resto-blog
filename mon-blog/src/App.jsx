import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { categories, allIngredients, productsList } from './data/products';

function App() {
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      // Filter by category
      if (activeCategory !== 'Tout' && product.category !== activeCategory) return false;

      // Filter by max price
      if (maxPrice && product.price > parseFloat(maxPrice)) return false;

      // Filter by selected ingredients (product must have all selected ingredients, or we can do any, let's do includes at least one if selected, or must have all. Let's do must have ALL selected ingredients)
      if (selectedIngredients.length > 0) {
        const hasAllIngredients = selectedIngredients.every(ing =>
          product.ingredients.includes(ing)
        );
        if (!hasAllIngredients) return false;
      }

      return true;
    });
  }, [activeCategory, maxPrice, selectedIngredients]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header cartCount={cart.length} />
      <Nav />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar
          categories={categories}
          allIngredients={allIngredients}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedIngredients={selectedIngredients}
          toggleIngredient={toggleIngredient}
        />

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-start">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm">
              Aucun produit ne correspond à vos filtres.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
