import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, BlogPost, Order } from '../types';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  login: (phone: string, pass: string) => boolean;
  register: (phone: string, pass: string) => boolean;
  logout: () => void;

  products: Product[];
  toggleProductAvailable: (id: number) => void;

  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;

  isStoreOpen: boolean;
  toggleStoreOpen: () => void;

  addOrder: (order: Order) => void;
}

const defaultProducts: Product[] = [
  { id: 1, name: 'Nước ép cam tươi', price: 35000, image: 'https://images.unsplash.com/photo-1641659735894-45046caad624?w=400', description: 'Nước ép cam tự nhiên 100%', category: 'Nước ép', isAvailable: true },
  { id: 2, name: 'Nước ép dâu tây', price: 45000, image: 'https://images.unsplash.com/photo-1568288192047-cf22326a2c3d?w=400', description: 'Nước ép dâu tươi ngon', category: 'Nước ép', isAvailable: true },
  { id: 3, name: 'Nước ép xoài', price: 40000, image: 'https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?w=400', description: 'Ngọt thơm', category: 'Nước ép', isAvailable: true },
  { id: 4, name: 'Nước ép dứa', price: 38000, image: 'https://images.unsplash.com/photo-1665582513044-376da77ebec0?w=400', description: 'Giải nhiệt', category: 'Nước ép', isAvailable: true },
  { id: 5, name: 'Nước ép chanh dây', price: 42000, image: 'https://images.unsplash.com/photo-1606758037375-a2a76453407a?w=400', description: 'Chua ngọt', category: 'Nước ép', isAvailable: true },
  { id: 6, name: 'Nước ép dưa hấu', price: 33000, image: 'https://images.unsplash.com/photo-1762898841702-244e320da5b1?w=400', description: 'Tươi mát', category: 'Nước ép', isAvailable: true },
  { id: 7, name: 'Sinh tố dâu chuối', price: 45000, image: 'https://images.unsplash.com/photo-1604503036177-6ac038850279?w=400', description: 'Mịn màng', category: 'Sinh tố', isAvailable: true },
  { id: 8, name: 'Sinh tố bơ', price: 50000, image: 'https://images.unsplash.com/photo-1630252595285-3bbcb51378d8?w=400', description: 'Béo ngậy', category: 'Sinh tố', isAvailable: true },
  { id: 9, name: 'Sinh tố nhiệt đới', price: 48000, image: 'https://images.unsplash.com/photo-1530026436513-3d6e27ae5199?w=400', description: 'Nhiệt đới', category: 'Sinh tố', isAvailable: true },
  { id: 10, name: 'Sinh tố khoai môn', price: 52000, image: 'https://images.unsplash.com/photo-1756969953423-2c199c6dbd79?w=400', description: 'Tím thơm', category: 'Sinh tố', isAvailable: true },
  { id: 11, name: 'Trà đào cam sả', price: 40000, image: 'https://images.unsplash.com/photo-1676693420436-7fa448f054eb?w=400', description: 'Thơm sả', category: 'Trà trái cây', isAvailable: true },
  { id: 12, name: 'Trà chanh dây lạnh', price: 38000, image: 'https://images.unsplash.com/photo-1757857152069-f1e43f10a856?w=400', description: 'Lạnh ngon', category: 'Trà trái cây', isAvailable: true },
  { id: 13, name: 'Trà vải thiều', price: 42000, image: 'https://images.unsplash.com/photo-1630209684693-cf71c3976e62?w=400', description: 'Vải thiều', category: 'Trà trái cây', isAvailable: true },
  { id: 14, name: 'Trà gừng mật ong', price: 35000, image: 'https://images.unsplash.com/photo-1766186471216-61060e5ceb53?w=400', description: 'Ấm bụng', category: 'Trà trái cây', isAvailable: true },
];

const defaultBlogs: BlogPost[] = [
  {
    title: '5 Lợi ích tuyệt vời của nước ép cam tươi mỗi ngày',
    excerpt: 'Nước ép cam không chỉ giúp giải khát mà còn cung cấp lượng lớn Vitamin C, tăng cường sức đề kháng và làm đẹp da tự nhiên.',
    date: '20/11/2023',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400'
  },
  {
    title: 'Bí quyết chọn trái cây tươi ngon cho món sinh tố',
    excerpt: 'Làm sao để chọn được những quả bơ, dâu tây hay xoài chín tới, ngọt tự nhiên mà không bị dập nát? Hãy cùng tìm hiểu...',
    date: '15/11/2023',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400'
  },
  {
    title: 'Vì sao Trà trái cây lại là xu hướng giải nhiệt mới?',
    excerpt: 'Sự kết hợp hoàn hảo giữa vị chát nhẹ của trà và vị ngọt mát của trái cây tươi tạo nên một thức uống không thể cưỡng lại.',
    date: '10/11/2023',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'
  }
];

const defaultUsers: User[] = [
  { phone: '0393690452', password: '04012005', role: 'admin', orderHistory: [] },
  { phone: '0357422081', password: '29111999', role: 'user', orderHistory: [] },
];

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Load from LocalStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('drink_users');
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else localStorage.setItem('drink_users', JSON.stringify(defaultUsers));

    const savedProds = localStorage.getItem('drink_products');
    if (savedProds) setProducts(JSON.parse(savedProds));
    
    const savedBlogs = localStorage.getItem('drink_blogs');
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    
    const savedStore = localStorage.getItem('drink_store_open');
    if (savedStore) setIsStoreOpen(JSON.parse(savedStore));

    const savedUserPhone = localStorage.getItem('drink_current_user');
    if (savedUserPhone) {
      const uId = savedUsers ? JSON.parse(savedUsers).find((u: User) => u.phone === savedUserPhone) : defaultUsers.find((u: User) => u.phone === savedUserPhone);
      if (uId) setCurrentUser(uId);
    }
  }, []);

  // Save changes to localstorage automatically
  useEffect(() => { localStorage.setItem('drink_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('drink_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('drink_blogs', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem('drink_store_open', JSON.stringify(isStoreOpen)); }, [isStoreOpen]);
  useEffect(() => { 
    if (currentUser) localStorage.setItem('drink_current_user', currentUser.phone);
    else localStorage.removeItem('drink_current_user');
  }, [currentUser]);

  const login = (phone: string, pass: string) => {
    const u = users.find(u => u.phone === phone && u.password === pass);
    if (u) {
      setCurrentUser(u);
      return true;
    }
    return false;
  };

  const register = (phone: string, pass: string) => {
    if (users.find(u => u.phone === phone)) return false;
    const newUser: User = { phone, password: pass, role: 'user', orderHistory: [] };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const toggleProductAvailable = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p));
  };

  const addBlog = (blog: BlogPost) => {
    setBlogs([blog, ...blogs]);
  };

  const toggleStoreOpen = () => setIsStoreOpen(!isStoreOpen);

  const addOrder = (order: Order) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, orderHistory: [order, ...currentUser.orderHistory] };
    setUsers(users.map(u => u.phone === updatedUser.phone ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  return (
    <AppContext.Provider value={{
      users, currentUser, login, register, logout,
      products, toggleProductAvailable,
      blogs, addBlog,
      isStoreOpen, toggleStoreOpen,
      addOrder
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
};
