import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, placeOrder } = useStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(formData);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">شكراً لطلبك!</h1>
        <p className="text-gray-600 mb-8 max-w-md">تم استلام طلبك بنجاح. سنتصل بك قريباً لتأكيد الطلب وتفاصيل الشحن.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition font-bold"
        >
          متابعة التسوق
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">إتمام الطلب</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-800">طلبك</h2>
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                    <span className="bg-white border rounded px-2 py-1 text-xs font-bold">{item.quantity}x</span>
                    <span>{item.name}</span>
                </div>
                <span className="font-semibold">{(item.price * item.quantity).toLocaleString('ar-MA')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between items-center text-xl font-bold text-primary">
            <span>المبلغ الإجمالي</span>
            <span>{total.toLocaleString('ar-MA')} درهم</span>
          </div>
          <div className="mt-4 text-xs text-gray-500 bg-white p-3 rounded border border-gray-200">
            * الدفع نقداً عند الاستلام
          </div>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800">معلومات التوصيل</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">المدينة</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="مدينتك"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
              <input
                required
                type="tel"
                dir="ltr"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-right"
                placeholder="06XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-emerald-700 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-lg"
            >
              تأكيد الطلب
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Checkout;