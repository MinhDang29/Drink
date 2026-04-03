export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-emerald-600 text-primary-foreground"
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <span className="text-sm text-white/90">100% Tươi tự nhiên – Không chất bảo quản</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
            Bột Drinks
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/80">
            Sinh Tố • Nước Ép • Trà Trái Cây
          </p>
          <p className="text-base md:text-lg opacity-80 mb-10 max-w-xl mx-auto">
            Từng ly đồ uống được pha chế tỉ mỉ từ trái cây tươi nguyên chất,
            mang đến nguồn năng lượng thuần khiết mỗi ngày.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              🛒 Đặt hàng ngay
            </a>
            <a
              href="#origin"
              className="bg-transparent border-2 border-white/50 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              🌱 Về Bột Drinks
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/20">
            {[
              { number: '100%', label: 'Trái cây tươi' },
              { number: '3+', label: 'Năm kinh nghiệm' },
              { number: '500+', label: 'Khách hàng yêu thích' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl text-white mb-1" style={{ fontWeight: 700 }}>
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
