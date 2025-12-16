import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, ArrowRight, Truck, ShieldCheck } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <button
          onClick={() => navigate('/')}
          className="text-primary hover:underline flex items-center justify-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-96 md:h-auto bg-gray-100 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-lg shadow-md"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-sm font-semibold text-primary mb-2">{product.category}</span>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-primary mb-6">{product.price.toLocaleString('ar-MA')} درهم</div>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="text-primary h-6 w-6" />
                <span className="text-sm text-gray-700">توصيل سريع لكل المغرب</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ShieldCheck className="text-primary h-6 w-6" />
                <span className="text-sm text-gray-700">ضمان الجودة</span>
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-primary hover:bg-emerald-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 text-lg shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="h-6 w-6" />
              أضف إلى السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;