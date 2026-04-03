import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart, CartItem } from './components/Cart';
import { Origin } from './components/Origin';
import { Blog } from './components/Blog';
import { MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';
import { useAppStore } from './context/AppContext';
import { AuthModal } from './components/AuthModal';
import { UserModal } from './components/UserModal';
import { Product } from './types';

const categories = ['Tất cả', 'Nước ép', 'Sinh tố', 'Trà trái cây'];

const categoryIcons: Record<string, string> = {
  'Tất cả': '🥤',
  'Nước ép': '🍊',
  'Sinh tố': '🫐',
  'Trà trái cây': '🍵',
};

const features = [
  {
    icon: '🚚',
    title: 'Giao hàng nhanh',
    desc: 'Miễn phí vận chuyển cho đơn hàng trên 200.000₫ trong khu vực',
  },
  {
    icon: '🌱',
    title: '100% tự nhiên',
    desc: 'Không chất bảo quản, không hương liệu tổng hợp, không đường hóa học',
  },
  {
    icon: '✨',
    title: 'Chất lượng cao',
    desc: 'Nguồn gốc trái cây rõ ràng, quy trình an toàn vệ sinh thực phẩm',
  },
  {
    icon: '📞',
    title: 'Hỗ trợ 24/7',
    desc: 'Liên hệ ngay qua Zalo/Facebook để được tư vấn và đặt hàng nhanh',
  },
];

export default function App() {
  const { products, currentUser, isStoreOpen, addOrder } = useAppStore();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts =
    activeCategory === 'Tất cả'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onUserClick={() => { currentUser ? setIsUserModalOpen(true) : setIsAuthModalOpen(true) }}
      />

      <Hero />

      {/* Features Bar */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="mb-0.5">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm mb-3">
              Thực đơn Bột Drinks
            </span>
            <h2 className="mb-4">Sản phẩm của chúng tôi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tất cả đều được làm từ trái cây tươi 100%, pha chế trong ngày — không tồn đọng, không đông lạnh.
            </p>
            {!isStoreOpen && (
              <div className="mt-6 inline-block bg-destructive/10 text-destructive px-6 py-2 rounded-xl font-medium">
                Cửa hàng hiện đang đóng cửa. Vui lòng quay lại sau!
              </div>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-white text-foreground border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {categoryIcons[cat]} {cat}
                {cat !== 'Tất cả' && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === cat ? 'bg-white/20' : 'bg-secondary'
                    }`}
                  >
                    {products.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Origin */}
      <Origin />

      {/* Blog */}
      <Blog />

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-emerald-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">Đặt ngay – Tươi ngon trong 30 phút!</h2>
          <p className="mb-8 text-white/80">
            Liên hệ qua Zalo hoặc Facebook để đặt hàng và nhận ưu đãi đặc biệt.
            Giao hàng nhanh trong khu vực Mộng Tiên và các phường lân cận.
          </p>
          <a
            href="tel:0393690452"
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-3 rounded-xl hover:bg-white/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Gọi ngay: 0393 690 452
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm mb-3">
              Tìm chúng tôi
            </span>
            <h2 className="mb-4">Liên hệ & Địa chỉ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-secondary/20 rounded-2xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h4 className="mb-2">Địa chỉ</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                566/72/17 Đường Nguyễn Thái Sơn<br />
                TP. Hồ Chí Minh
              </p>
            </div>
            <div className="bg-secondary/20 rounded-2xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h4 className="mb-2">Điện thoại / Zalo</h4>
              <a
                href="tel:0393690452"
                className="text-primary hover:underline"
              >
                0393 690 452
              </a>
              <p className="text-xs text-muted-foreground mt-1">Nhắn Zalo để đặt hàng nhanh</p>
            </div>
            <div className="bg-secondary/20 rounded-2xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h4 className="mb-2">Giờ mở cửa</h4>
              <p className="text-sm text-muted-foreground">
                Thứ 2 – Chủ nhật<br />
                <span className="text-foreground">6:00 – 21:00</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🥤</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Bột Drinks</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Sinh tố · Nước ép · Trà trái cây<br />
                Tươi ngon mỗi ngày — từ thiên nhiên đến tay bạn.
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://www.facebook.com/thmtin.05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/thmtin05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {['Nước ép trái cây', 'Sinh tố', 'Trà trái cây', 'Combo tiết kiệm'].map((item) => (
                  <li key={item}>
                    <a href="#products" className="hover:opacity-100 transition-opacity">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Thông tin</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {[
                  { label: 'Về chúng tôi', href: '#origin' },
                  { label: 'Blog & Công thức', href: '#blog' },
                  { label: 'Chính sách đổi trả', href: '#' },
                  { label: 'Hướng dẫn đặt hàng', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:opacity-100 transition-opacity">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Liên hệ</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>566/72/17 Nguyễn Thái Sơn, TP. HCM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:0393690452" className="hover:opacity-100">0393 690 452</a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>6:00 – 21:00 hàng ngày</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-70">
            © 2026 Bột Drinks — 566/72/17 Nguyễn Thái Sơn. All rights reserved.
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={() => {
          if (!currentUser) {
            setIsCartOpen(false);
            setIsAuthModalOpen(true);
            return false;
          }
          if (!isStoreOpen) {
            alert('Cửa hàng hiện đang đóng cửa!');
            return false;
          }
          const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
          addOrder({
            id: 'DH' + Math.random().toString(36).substr(2, 5).toUpperCase(),
            date: new Date().toLocaleDateString('vi-VN'),
            items: cartItems.map(i => ({ productId: i.id, name: i.name, quantity: i.quantity, price: i.price })),
            total
          });
          setCartItems([]);
          alert('Đặt hàng thành công! Xem trong hồ sơ của bạn.');
          setIsCartOpen(false);
          return true;
        }}
      />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />
    </div>
  );
}