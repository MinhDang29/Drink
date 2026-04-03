import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

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
    <div className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full ${style.badge}`}
        >
          {style.emoji} {product.category}
        </span>
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
            onClick={() => onAddToCart(product)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
