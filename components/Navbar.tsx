import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { cart } = useStore();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Store className="h-8 w-8" />
          <span>متجر المغرب</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/admin" className="text-gray-600 hover:text-primary flex items-center gap-1 text-sm font-medium transition">
            <LayoutDashboard className="h-5 w-5" />
            <span className="hidden md:inline">لوحة التحكم</span>
          </Link>
          
          <Link to="/cart" className="relative text-gray-600 hover:text-primary transition">
            <ShoppingCart className="h-7 w-7" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;