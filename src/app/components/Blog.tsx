import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  readTime: string;
  date: string;
  emoji: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Bí quyết làm sinh tố thơm ngon, giữ nguyên dưỡng chất',
    excerpt: 'Sinh tố ngon không chỉ phụ thuộc vào nguyên liệu mà còn ở cách xay và tỷ lệ pha trộn. Bột Drinks chia sẻ bí quyết để mỗi ly sinh tố đều mịn, thơm và đầy đủ dưỡng chất.',
    content: [
      '🥤 **Chọn trái cây đúng độ chín**: Trái cây vừa chín tới cho vị ngọt tự nhiên tốt nhất. Tránh dùng trái cây quá xanh hoặc quá chín.',
      '🧊 **Thêm đá đúng thời điểm**: Cho đá vào sau trái cây, không trước, để tránh tạo túi khí làm sinh tố không mịn.',
      '⏱ **Xay từng giai đoạn**: Bắt đầu tốc độ thấp 10 giây, sau đó tốc độ cao 30 giây. Không xay liên tục quá lâu sẽ làm nóng hỗn hợp và giảm vitamin.',
      '🍃 **Tỷ lệ vàng**: 60% trái cây + 30% sữa/nước dừa + 10% đá. Điều chỉnh theo khẩu vị.',
      '🚫 **Không thêm đường trắng**: Độ ngọt từ trái cây chín là đủ. Nếu cần, thêm mật ong nguyên chất thay thế.',
    ],
    image: 'https://images.unsplash.com/photo-1638176311291-36b0eacc6b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'Sinh tố',
    readTime: '4 phút',
    date: '28/03/2026',
    emoji: '🥤',
  },
  {
    id: 2,
    title: 'Cách pha trà trái cây đúng chuẩn – Thơm ngon như quán',
    excerpt: 'Trà trái cây không chỉ đẹp mắt mà còn là thức uống giàu vitamin và chống oxy hóa. Cùng Bột Drinks khám phá quy trình pha chế chuẩn để có ly trà hoàn hảo.',
    content: [
      '🍵 **Chọn loại trà nền**: Trà xanh phù hợp với các loại quả nhẹ nhàng (lê, đào). Trà đen hợp với trái cây nhiệt đới (xoài, chanh dây).',
      '🌡 **Pha trà đúng nhiệt độ**: Trà xanh: 80°C. Trà đen: 95°C. Nhiệt độ sai làm trà bị đắng hoặc nhạt.',
      '🍑 **Hãm trái cây tươi**: Đun nhỏ lửa 5–7 phút với ít đường và nước để ra syrup trái cây tự nhiên.',
      '🧊 **Pha theo tỷ lệ**: 150ml trà pha đặc + 50ml syrup trái cây + đá viên. Khuấy đều trước khi rót.',
      '🌿 **Trang trí để tăng hương**: Thêm vài lá bạc hà hoặc lát chanh tươi vừa đẹp vừa thơm tự nhiên.',
    ],
    image: 'https://images.unsplash.com/photo-1630209684693-cf71c3976e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'Trà trái cây',
    readTime: '5 phút',
    date: '20/03/2026',
    emoji: '🍵',
  },
  {
    id: 3,
    title: 'Lợi ích sức khỏe của nước ép trái cây tươi mỗi ngày',
    excerpt: 'Uống một ly nước ép trái cây tươi mỗi sáng không chỉ cung cấp vitamin mà còn hỗ trợ tiêu hóa, làm sáng da và tăng cường miễn dịch. Hãy cùng tìm hiểu!',
    content: [
      '💊 **Vitamin C dồi dào**: Cam, dứa, chanh dây cung cấp lượng lớn vitamin C giúp tăng đề kháng, sáng da.',
      '🔥 **Hỗ trợ tiêu hóa**: Enzym bromelain trong nước ép dứa giúp phân giải protein, giảm đầy hơi.',
      '🧠 **Cải thiện não bộ**: Nước ép nho đỏ chứa resveratrol – chất chống oxy hóa mạnh, tốt cho trí nhớ.',
      '⚖️ **Hỗ trợ cân nặng**: Nước ép dưa hấu, cần tây ít calo, giàu nước – lý tưởng cho người muốn duy trì vóc dáng.',
      '⏰ **Uống đúng thời điểm**: Uống lúc bụng đói buổi sáng giúp hấp thu dưỡng chất tối đa.',
    ],
    image: 'https://images.unsplash.com/photo-1621878974675-91a5f1809ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'Nước ép',
    readTime: '3 phút',
    date: '12/03/2026',
    emoji: '🍊',
  },
];

const categoryColor: Record<string, string> = {
  'Sinh tố': 'bg-pink-100 text-pink-700',
  'Trà trái cây': 'bg-amber-100 text-amber-700',
  'Nước ép': 'bg-orange-100 text-orange-700',
};

function BlogCard({ post }: { post: BlogPost }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full ${categoryColor[post.category] || 'bg-gray-100 text-gray-700'}`}
        >
          {post.emoji} {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <h3 className="mb-2 leading-snug">{post.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Expandable content */}
        {expanded && (
          <div className="mb-4 space-y-2 border-t border-border pt-4">
            {post.content.map((line, i) => (
              <p key={i} className="text-sm text-foreground leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 text-primary text-sm hover:underline mt-auto"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Thu gọn
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Đọc thêm
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function Blog() {
  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm mb-3">
            Chia sẻ kiến thức
          </span>
          <h2 className="mb-4">Blog Bột Drinks</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Công thức pha chế, mẹo hay về dinh dưỡng và câu chuyện đằng sau những ly nước tươi ngon.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
