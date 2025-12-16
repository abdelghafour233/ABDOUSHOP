import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem, Order, SiteSettings, Category } from '../types';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  settings: SiteSettings;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerDetails: { name: string; city: string; phone: string }) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'هاتف ذكي برو ماكس',
    price: 8500,
    category: Category.ELECTRONICS,
    description: 'أحدث هاتف ذكي بكاميرا عالية الدقة وبطارية تدوم طويلاً.',
    image: 'https://picsum.photos/id/1/400/400',
  },
  {
    id: '2',
    name: 'مكنسة كهربائية روبوت',
    price: 3200,
    category: Category.HOME,
    description: 'تنظيف تلقائي للمنزل بذكاء اصطناعي.',
    image: 'https://picsum.photos/id/201/400/400',
  },
  {
    id: '3',
    name: 'إكسسوار سيارة فاخر',
    price: 450,
    category: Category.CARS,
    description: 'غطاء مقاعد جلد عالي الجودة يناسب جميع السيارات.',
    image: 'https://picsum.photos/id/111/400/400',
  },
  {
    id: '4',
    name: 'سماعات بلوتوث عازلة',
    price: 1200,
    category: Category.ELECTRONICS,
    description: 'تجربة صوتية غامرة مع عزل ضجيج نشط.',
    image: 'https://picsum.photos/id/4/400/400',
  },
  {
    id: '5',
    name: 'طقم أواني طهي',
    price: 1800,
    category: Category.HOME,
    description: 'طقم جرانيت غير لاصق مكون من 12 قطعة.',
    image: 'https://picsum.photos/id/43/400/400',
  },
  {
    id: '6',
    name: 'شاحن سيارة سريع',
    price: 150,
    category: Category.CARS,
    description: 'شاحن مزدوج يدعم الشحن السريع.',
    image: 'https://picsum.photos/id/6/400/400',
  },
];

const INITIAL_SETTINGS: SiteSettings = {
  fbPixelId: '',
  googlePixelId: '',
  tiktokPixelId: '',
  googleSheetUrl: '',
  domainName: 'www.mystore.ma',
  customJs: '',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerDetails: { name: string; city: string; phone: string }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: customerDetails.name,
      city: customerDetails.city,
      phone: customerDetails.phone,
      items: [...cart],
      total,
      date: new Date().toLocaleDateString('ar-MA'),
      status: 'pending',
    };
    
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Simulation of Google Sheets Integration
    if (settings.googleSheetUrl) {
      console.log(`Sending order to Google Sheet Webhook (${settings.googleSheetUrl}):`, newOrder);
      // In a real app: fetch(settings.googleSheetUrl, { method: 'POST', body: JSON.stringify(newOrder) });
    }
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Effect to simulate injecting scripts based on settings
  useEffect(() => {
    if (settings.customJs) {
      try {
        // Warning: Executing arbitrary JS is dangerous in production, strictly for demo here.
        // const script = document.createElement('script');
        // script.text = settings.customJs;
        // document.body.appendChild(script);
        console.log('Custom JS settings updated');
      } catch (e) {
        console.error('Error injecting custom JS', e);
      }
    }
  }, [settings.customJs]);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        settings,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        updateSettings,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};