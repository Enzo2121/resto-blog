import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import { useFilterContext } from './context/FilterContext';

function App() {
  const { filteredProducts } = useFilterContext();

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <CartModal />
      <Header />
      <Nav />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar />

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-start">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
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
