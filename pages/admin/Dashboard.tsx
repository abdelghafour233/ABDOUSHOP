import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Settings, 
  ShoppingBag, 
  Package, 
  Code, 
  Globe, 
  BarChart2, 
  Save, 
  Trash, 
  PlusCircle, 
  Share2,
  Lock,
  Download,
  Copy,
  FileText
} from 'lucide-react';
import { Category, Product } from '../../types';

type Tab = 'overview' | 'orders' | 'products' | 'integrations' | 'settings' | 'export';

const Dashboard: React.FC = () => {
  const { orders, products, settings, updateSettings, addProduct, deleteProduct } = useStore();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400',
  });

  const readmeContent = `# ${settings.domainName || 'متجر المغرب الإلكتروني'}

## 🛍️ عن المشروع
منصة تجارة إلكترونية متكاملة مخصصة للسوق المغربي، تدعم الدفع عند الاستلام (COD).
تم بناء الموقع باستخدام React و Tailwind CSS مع لوحة تحكم متكاملة.

## ✨ المميزات
- 📱 تصميم متجاوب (Mobile Responsive)
- 🛒 سلة مشتريات ودفع سلس
- 📊 لوحة تحكم للإدارة (Dashboard)
- 🔗 ربط مع Google Sheets للطلبات
- 📈 دعم Facebook Pixel و Google Analytics
- 🇲🇦 العملة: الدرهم المغربي (MAD)

## 🚀 طريقة التشغيل

1. **تثبيت الحزم:**
\`\`\`bash
npm install
\`\`\`

2. **تشغيل السيرفر المحلي:**
\`\`\`bash
npm start
\`\`\`

3. **بناء النسخة النهائية:**
\`\`\`bash
npm run build
\`\`\`

## ⚙️ الإعدادات
يمكنك تغيير إعدادات البيكسل واسم الدومين مباشرة من لوحة التحكم في صفحة \`/admin\`.
كلمة المرور الافتراضية للوحة التحكم: \`admin123\`

## 📝 حقوق الملكية
تم تطوير هذا الموقع لغرض التجارة الإلكترونية.
`;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password check
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('كلمة المرور غير صحيحة');
    }
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call.
    alert('تم حفظ الإعدادات بنجاح');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      addProduct({
        id: Date.now().toString(),
        ...newProduct as Product
      });
      setNewProduct({
        name: '',
        price: 0,
        description: '',
        category: Category.ELECTRONICS,
        image: 'https://picsum.photos/400',
      });
      alert('تم إضافة المنتج');
    }
  };

  const copyReadme = () => {
    navigator.clipboard.writeText(readmeContent);
    alert('تم نسخ محتوى README بنجاح!');
  };

  const handleDownloadCode = () => {
      alert('سيتم تجميع ملفات المشروع (src, public, package.json) في ملف ZIP وتنزيلها.\n(هذه ميزة محاكاة في هذا العرض).');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Lock className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">لوحة التحكم</h2>
          <p className="text-center text-gray-500 mb-8">يرجى تسجيل الدخول للمتابعة</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">كلمة المرور</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition"
                placeholder="أدخل كلمة المرور"
                autoFocus
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
            >
              دخول
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-400">
            كلمة المرور للتجربة: admin123
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">لوحة الإدارة</h2>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
          >
            <BarChart2 className="h-5 w-5" />
            <span>نظرة عامة</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>الطلبات</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'products' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
          >
            <Package className="h-5 w-5" />
            <span>المنتجات</span>
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'integrations' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
          >
            <Code className="h-5 w-5" />
            <span>الربط والتتبع</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
          >
            <Settings className="h-5 w-5" />
            <span>الإعدادات العامة</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'export' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
          >
            <Download className="h-5 w-5" />
            <span>تصدير وتحميل</span>
          </button>
          
          <div className="pt-8 mt-8 border-t border-gray-700">
             <button
                onClick={() => setIsAuthenticated(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded text-red-300 hover:bg-gray-700 hover:text-red-200 transition"
              >
                <Lock className="h-5 w-5" />
                <span>تسجيل الخروج</span>
              </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">لوحة المعلومات</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-500 mb-2">إجمالي المبيعات</div>
                <div className="text-3xl font-bold text-primary">
                  {orders.reduce((acc, order) => acc + order.total, 0).toLocaleString('ar-MA')} درهم
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-500 mb-2">عدد الطلبات</div>
                <div className="text-3xl font-bold text-gray-800">{orders.length}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-500 mb-2">المنتجات النشطة</div>
                <div className="text-3xl font-bold text-gray-800">{products.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">إدارة الطلبات</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="p-4">رقم الطلب</th>
                    <th className="p-4">العميل</th>
                    <th className="p-4">المدينة</th>
                    <th className="p-4">الهاتف</th>
                    <th className="p-4">المجموع</th>
                    <th className="p-4">التاريخ</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">لا توجد طلبات حتى الآن</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">#{order.id.slice(-6)}</td>
                        <td className="p-4 font-medium">{order.customerName}</td>
                        <td className="p-4">{order.city}</td>
                        <td className="p-4" dir="ltr">{order.phone}</td>
                        <td className="p-4 font-bold text-primary">{order.total.toLocaleString('ar-MA')}</td>
                        <td className="p-4 text-sm text-gray-500">{order.date}</td>
                        <td className="p-4">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">قيد الانتظار</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">المنتجات</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                إضافة منتج جديد
              </h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="اسم المنتج" 
                  className="border p-2 rounded" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  required 
                />
                <input 
                  type="number" 
                  placeholder="السعر (MAD)" 
                  className="border p-2 rounded" 
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  required 
                />
                <select 
                  className="border p-2 rounded"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                >
                  {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="رابط الصورة" 
                  className="border p-2 rounded" 
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
                <textarea 
                  placeholder="وصف المنتج" 
                  className="border p-2 rounded md:col-span-2"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
                <button type="submit" className="bg-primary text-white py-2 rounded hover:bg-emerald-700 transition md:col-span-2">حفظ المنتج</button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white border p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.price} MAD</div>
                    </div>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700">
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTEGRATIONS TAB */}
        {activeTab === 'integrations' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">أكواد التتبع والربط</h1>
            <form onSubmit={handleSettingsSave} className="space-y-6 max-w-2xl">
              
              {/* Pixels */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-blue-600" />
                  منصات الإعلانات (Pixels)
                </h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Facebook Pixel ID</label>
                  <input
                    type="text"
                    className="w-full border p-3 rounded bg-gray-50 ltr-text"
                    dir="ltr"
                    placeholder="Ex: 1234567890"
                    value={settings.fbPixelId}
                    onChange={(e) => updateSettings({ fbPixelId: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Google Analytics / Tag Manager ID</label>
                  <input
                    type="text"
                    className="w-full border p-3 rounded bg-gray-50 ltr-text"
                    dir="ltr"
                    placeholder="Ex: G-XXXXXXXX"
                    value={settings.googlePixelId}
                    onChange={(e) => updateSettings({ googlePixelId: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">TikTok Pixel ID</label>
                  <input
                    type="text"
                    className="w-full border p-3 rounded bg-gray-50 ltr-text"
                    dir="ltr"
                    placeholder="Ex: CXXXXXXXXX"
                    value={settings.tiktokPixelId}
                    onChange={(e) => updateSettings({ tiktokPixelId: e.target.value })}
                  />
                </div>
              </div>

              {/* Google Sheets */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2 text-green-700">
                   Google Sheets ربط الطلبات
                </h3>
                <div className="mb-2">
                  <label className="block text-gray-700 font-medium mb-1">Webhook URL</label>
                  <input
                    type="text"
                    className="w-full border p-3 rounded bg-gray-50"
                    dir="ltr"
                    placeholder="https://script.google.com/macros/s/..."
                    value={settings.googleSheetUrl}
                    onChange={(e) => updateSettings({ googleSheetUrl: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">يستخدم هذا الرابط لإرسال بيانات الطلب تلقائياً عند الشراء.</p>
                </div>
              </div>

              {/* Custom JS */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2 text-yellow-600">
                  <Code className="h-5 w-5" />
                  أكواد JavaScript مخصصة
                </h3>
                <textarea
                  className="w-full border p-3 rounded bg-gray-900 text-green-400 font-mono text-sm h-32"
                  dir="ltr"
                  placeholder="<!-- Add custom scripts here -->"
                  value={settings.customJs}
                  onChange={(e) => updateSettings({ customJs: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="bg-primary text-white px-8 py-3 rounded hover:bg-emerald-700 transition flex items-center gap-2">
                <Save className="h-5 w-5" />
                حفظ التغييرات
              </button>
            </form>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div>
             <h1 className="text-3xl font-bold mb-8 text-gray-800">إعدادات الموقع والدومين</h1>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl">
                <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-gray-600" />
                        اسم النطاق (Domain)
                    </h3>
                    <input
                        type="text"
                        className="w-full border p-3 rounded bg-gray-50"
                        dir="ltr"
                        value={settings.domainName}
                        onChange={(e) => updateSettings({ domainName: e.target.value })}
                    />
                </div>
                
                <div className="bg-blue-50 p-4 rounded border border-blue-100 mb-6">
                    <h4 className="font-bold text-blue-800 mb-2">إعدادات DNS (Name Server)</h4>
                    <p className="text-sm text-blue-700 mb-2">لربط الدومين الخاص بك، يرجى توجيه الـ Nameservers إلى:</p>
                    <div className="bg-white p-3 rounded border border-blue-200 font-mono text-sm" dir="ltr">
                        ns1.hostingprovider.com<br/>
                        ns2.hostingprovider.com
                    </div>
                </div>

                <button onClick={handleSettingsSave} className="bg-primary text-white px-6 py-2 rounded hover:bg-emerald-700 transition">
                    تحديث الإعدادات
                </button>
             </div>
          </div>
        )}

        {/* EXPORT TAB */}
        {activeTab === 'export' && (
            <div>
                <h1 className="text-3xl font-bold mb-8 text-gray-800">تصدير وتحميل المشروع</h1>
                
                <div className="grid grid-cols-1 gap-6 max-w-4xl">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Download className="h-5 w-5 text-primary" />
                            تحميل الكود المصدري
                        </h3>
                        <p className="text-gray-600 mb-4">
                            يمكنك تحميل الكود المصدري للموقع بالكامل لاستخدامه على سيرفر خارجي أو رفعه على GitHub.
                        </p>
                        <button 
                            onClick={handleDownloadCode}
                            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                        >
                            <Download className="h-5 w-5" />
                            تحميل الملفات (ZIP)
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-700" />
                            مولد ملف README.md
                        </h3>
                        <p className="text-gray-600 mb-4">
                            هذا هو المحتوى الذي يجب وضعه في ملف <code>README.md</code> عند رفع الموقع على GitHub:
                        </p>
                        <div className="relative">
                            <textarea 
                                className="w-full h-64 bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm border-0 focus:ring-2 focus:ring-primary"
                                dir="ltr"
                                readOnly
                                value={readmeContent}
                            ></textarea>
                            <button 
                                onClick={copyReadme}
                                className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded transition"
                                title="نسخ النص"
                            >
                                <Copy className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;