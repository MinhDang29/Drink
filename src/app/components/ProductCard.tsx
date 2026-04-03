import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const categoryStyles: Record<string, { badge: string; emoji: string }> = {
  'Nước ép': { badge: 'bg-orange-100 text-orange-700', emoji: '🍊' },
  'Sinh tố': { badge: 'bg-pink-100 text-pink-700', emoji: '🫐' },
  'Trà trái cây': { badge: 'bg-amber-100 text-amber-700', emoji: '🍵' },
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const style = categoryStyles[product.category] ?? { badge: 'bg-gray-100 text-gray-600', emoji: '🥤' };

  return (
    <div className={`group rounded-2xl overflow-hidden border border-border transition-all duration-300 flex flex-col ${product.isAvailable ? 'bg-white hover:shadow-xl hover:-translate-y-1' : 'bg-secondary/40 opacity-75 grayscale-[0.5]'}`}>
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${product.isAvailable ? 'group-hover:scale-105' : ''}`}
        />
        <span
          className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full ${style.badge}`}
        >
          {style.emoji} {product.category}
        </span>
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-xl font-bold">
              Hết món
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-destructive" style={{ fontWeight: 700 }}>
              {product.price.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <button
            onClick={() => product.isAvailable && onAddToCart(product)}
            disabled={!product.isAvailable}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm ${product.isAvailable ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95' : 'bg-secondary text-muted-foreground cursor-not-allowed'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.isAvailable ? 'Thêm' : 'Đã hết'}
          </button>
        </div>
      </div>
    </div>
  );
}
