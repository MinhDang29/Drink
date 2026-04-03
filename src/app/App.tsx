import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard, Product } from './components/ProductCard';
import { Cart, CartItem } from './components/Cart';
import { Origin } from './components/Origin';
import { Blog } from './components/Blog';
import { MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';

const allProducts: Product[] = [
  // Nước ép
  {
    id: 1,
    name: 'Nước ép cam tươi',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1641659735894-45046caad624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Nước ép cam tự nhiên 100%, giàu vitamin C, ngọt thanh',
    category: 'Nước ép',
  },
  {
    id: 2,
    name: 'Nước ép dâu tây',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1568288192047-cf22326a2c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Nước ép dâu tây tươi ngon, giàu chất chống oxy hóa',
    category: 'Nước ép',
  },
  {
    id: 3,
    name: 'Nước ép xoài',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Nước ép xoài thơm ngọt, bổ dưỡng, đậm hương nhiệt đới',
    category: 'Nước ép',
  },
  {
    id: 4,
    name: 'Nước ép dứa',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1665582513044-376da77ebec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Nước ép dứa tươi mát, tốt cho tiêu hóa, giải nhiệt',
    category: 'Nước ép',
  },
  {
    id: 5,
    name: 'Nước ép chanh dây',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1606758037375-a2a76453407a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Nước ép chanh dây chua ngọt, hương thơm đặc trưng',
    category: 'Nước ép',
  },
  {
    id: 6,
    name: 'Nước ép dưa hấu',
    price: 33000,
    image: 'https://images.unsplash.com/photo-1762898841702-244e320da5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Nước ép dưa hấu tươi mát, mát lạnh giải nhiệt ngày hè',
    category: 'Nước ép',
  },
  // Sinh tố
  {
    id: 7,
    name: 'Sinh tố dâu chuối',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1604503036177-6ac038850279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Sinh tố dâu chuối mịn ngon, thơm béo, nhiều vitamin',
    category: 'Sinh tố',
  },
  {
    id: 8,
    name: 'Sinh tố bơ',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1630252595285-3bbcb51378d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Sinh tố bơ béo ngậy, giàu chất béo lành mạnh và kali',
    category: 'Sinh tố',
  },
  {
    id: 9,
    name: 'Sinh tố nhiệt đới',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1530026436513-3d6e27ae5199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Hỗn hợp xoài, dứa, dừa – cảm giác như đang ở biển',
    category: 'Sinh tố',
  },
  {
    id: 10,
    name: 'Sinh tố khoai môn',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1756969953423-2c199c6dbd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Sinh tố khoai môn tím đẹp mắt, vị ngọt béo tự nhiên',
    category: 'Sinh tố',
  },
  // Trà trái cây
  {
    id: 11,
    name: 'Trà đào cam sả',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1676693420436-7fa448f054eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Trà đào kết hợp cam và sả, thanh mát và thơm dịu',
    category: 'Trà trái cây',
  },
  {
    id: 12,
    name: 'Trà chanh dây lạnh',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1757857152069-f1e43f10a856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Trà chanh dây lạnh chua nhẹ, ngọt thanh, sảng khoái',
    category: 'Trà trái cây',
  },
  {
    id: 13,
    name: 'Trà vải thiều',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1630209684693-cf71c3976e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Trà vải hồng thơm ngát, hương vị đặc trưng mùa hè',
    category: 'Trà trái cây',
  },
  {
    id: 14,
    name: 'Trà gừng mật ong',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1766186471216-61060e5ceb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Trà gừng mật ong ấm nồng, tăng sức đề kháng hiệu quả',
    category: 'Trà trái cây',
  },
];

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');

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
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

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
                    {allProducts.filter((p) => p.category === cat).length}
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
                  href="#"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
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
      />
    </div>
  );
}