import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { Car, Smartphone, Home as HomeIcon, Search } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-secondary text-white py-16 px-4 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">أفضل المنتجات بأسعار منافسة</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            تسوق إلكترونيات، مستلزمات المنزل، وإكسسوارات السيارات بجودة عالية وتوصيل سريع.
          </p>
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-6 py-2 rounded-full border transition ${
              selectedCategory === 'ALL'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedCategory(Category.ELECTRONICS)}
            className={`px-6 py-2 rounded-full border flex items-center gap-2 transition ${
              selectedCategory === Category.ELECTRONICS
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            {Category.ELECTRONICS}
          </button>
          <button
            onClick={() => setSelectedCategory(Category.HOME)}
            className={`px-6 py-2 rounded-full border flex items-center gap-2 transition ${
              selectedCategory === Category.HOME
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            <HomeIcon className="h-4 w-4" />
            {Category.HOME}
          </button>
          <button
            onClick={() => setSelectedCategory(Category.CARS)}
            className={`px-6 py-2 rounded-full border flex items-center gap-2 transition ${
              selectedCategory === Category.CARS
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            <Car className="h-4 w-4" />
            {Category.CARS}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">لا توجد منتجات تطابق بحثك.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;