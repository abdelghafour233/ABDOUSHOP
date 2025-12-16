import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-lg p-10 shadow-sm inline-block max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">سلة المشتريات فارغة</h2>
            <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
            <Link
            to="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition"
            >
            تصفح المنتجات
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">سلة المشتريات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              
              <div className="flex-1 text-center sm:text-right">
                <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                <div className="text-primary font-bold">{item.price.toLocaleString('ar-MA')} درهم</div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">ملخص الطلب</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{total.toLocaleString('ar-MA')} درهم</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>التوصيل</span>
                <span className="text-green-600 font-bold">مجاني</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4 mb-8">
              <span>الإجمالي</span>
              <span>{total.toLocaleString('ar-MA')} درهم</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-secondary hover:bg-gray-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              إتمام الطلب
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;