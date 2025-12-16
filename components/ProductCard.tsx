import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <Link to={`/product/${product.id}`} className="bg-white p-2 rounded-full hover:bg-gray-100 text-gray-800 transition">
                <Eye className="h-6 w-6" />
            </Link>
            <button 
                onClick={() => addToCart(product)}
                className="bg-primary p-2 rounded-full hover:bg-emerald-700 text-white transition"
            >
                <ShoppingCart className="h-6 w-6" />
            </button>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-primary truncate">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{product.price.toLocaleString('ar-MA')} درهم</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;