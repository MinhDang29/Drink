import { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onUserClick: () => void;
}

export function Header({ cartItemCount, onCartClick, onUserClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Trang chủ', href: '#home' },
    { label: 'Sản phẩm', href: '#products' },
    { label: 'Nguồn gốc', href: '#origin' },
    { label: 'Blog', href: '#blog' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🥤</span>
            <span className="text-primary" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Bột Drinks
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={onUserClick}
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Tài khoản"
            >
              <User className="w-6 h-6" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
