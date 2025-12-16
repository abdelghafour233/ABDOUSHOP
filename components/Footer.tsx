import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">متجر المغرب</h3>
          <p className="text-sm leading-relaxed">
            وجهتك الأولى للتسوق الإلكتروني في المغرب. جودة عالية، أسعار منافسة، وتوصيل سريع إلى جميع المدن.
          </p>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition">الرئيسية</a></li>
            <li><a href="#" className="hover:text-primary transition">اتصل بنا</a></li>
            <li><a href="#" className="hover:text-primary transition">سياسة الخصوصية</a></li>
            <li><a href="#" className="hover:text-primary transition">الشروط والأحكام</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">تواصل معنا</h3>
          <p className="mb-2 text-sm">الدار البيضاء، المغرب</p>
          <p className="mb-2 text-sm" dir="ltr">+212 600 000 000</p>
          <p className="text-sm">support@mystore.ma</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} متجر المغرب. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;