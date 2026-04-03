export interface User {
  phone: string;
  password?: string;
  role: 'admin' | 'user';
  orderHistory: Order[];
}

export interface Order {
  id: string;
  date: string;
  items: Array<{ productId: number; name: string; quantity: number; price: number }>;
  total: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isAvailable: boolean; // For "Hết món"
}

export interface BlogPost {
  id?: number;
  title: string;
  excerpt: string;
  content?: string[];
  image: string;
  category?: string;
  readTime?: string;
  date: string;
  emoji?: string;
}
