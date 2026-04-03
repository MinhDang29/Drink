import originPhoto from '../../assets/18c26906dccea54f128a8550feb6b787d70075f8.png';

const steps = [
  {
    icon: '🌿',
    title: 'Nguồn nguyên liệu sạch',
    desc: 'Trái cây được tuyển chọn từ các vườn nông nghiệp sạch tại Đà Lạt, miền Tây và các tỉnh thành uy tín. Mỗi mẻ nhập đều có kiểm định nguồn gốc rõ ràng.',
  },
  {
    icon: '🔪',
    title: 'Chế biến tươi mỗi ngày',
    desc: 'Mọi sản phẩm đều được ép, xay và pha chế trong ngày. Không tồn đọng qua đêm, không đông lạnh – đảm bảo hương vị tươi ngon nhất đến tay bạn.',
  },
  {
    icon: '🚫',
    title: 'Không phụ gia – Không đường hóa học',
    desc: 'Bột Drinks cam kết KHÔNG dùng hương liệu tổng hợp, chất bảo quản hay đường hóa học. Vị ngọt đến từ trái cây chín tự nhiên.',
  },
  {
    icon: '🧊',
    title: 'Đóng gói & Giao nhanh',
    desc: 'Sản phẩm được đóng gói trong bình thủy tinh & hộp giữ lạnh chuyên dụng, giao tận nơi đảm bảo nhiệt độ bảo quản tối ưu.',
  },
];

const values = [
  { icon: '🌱', label: 'Thuần tự nhiên', color: 'bg-green-50 border-green-200' },
  { icon: '💚', label: 'Lành mạnh', color: 'bg-emerald-50 border-emerald-200' },
  { icon: '🤝', label: 'Tin cậy', color: 'bg-teal-50 border-teal-200' },
  { icon: '⚡', label: 'Tươi mới mỗi ngày', color: 'bg-lime-50 border-lime-200' },
];

export function Origin() {
  return (
    <section id="origin" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm mb-3">
            Câu chuyện của chúng tôi
          </span>
          <h2 className="mb-4">Nguồn gốc Bột Drinks</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Xuất phát từ tình yêu với những ly nước trái cây tươi ngon tại Nguyễn Thái Sơn,
            Bột Drinks được tạo ra với một sứ mệnh đơn giản: <strong>mang hương vị thiên nhiên thuần khiết đến mọi người.</strong>
          </p>
        </div>

        {/* Image + Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-2xl overflow-hidden shadow-lg h-auto">
            <img
              src={originPhoto}
              alt="Mộng Tiên – Người sáng lập Bột Drinks"
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="mb-4">Tại sao chọn Bột Drinks?</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Chúng tôi tin rằng mỗi người đều xứng đáng được uống những thức uống lành mạnh, không chỉ là nước ép công nghiệp pha sẵn từ túi hộp.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Tại <strong>566/72/17 Nguyễn Thái Sơn</strong>, chúng tôi bắt đầu từ việc pha chế những ly sinh tố, nước ép và trà trái cây cho gia đình, bạn bè – và dần dần trở thành địa chỉ yêu thích của cả khu phố.
            </p>
            {/* Values pills */}
            <div className="flex flex-wrap gap-3">
              {values.map((v) => (
                <span
                  key={v.label}
                  className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm ${v.color}`}
                >
                  {v.icon} {v.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-secondary/20 rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <div className="text-xs text-primary mb-1">Bước {i + 1}</div>
              <h4 className="mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}