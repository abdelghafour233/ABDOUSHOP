export enum Category {
  ELECTRONICS = 'إلكترونيات',
  HOME = 'المنزل',
  CARS = 'سيارات',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface SiteSettings {
  fbPixelId: string;
  googlePixelId: string;
  tiktokPixelId: string;
  googleSheetUrl: string;
  domainName: string;
  customJs: string;
}