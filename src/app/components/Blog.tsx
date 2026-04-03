import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../context/AppContext';
import { BlogPost } from '../types';



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
        {expanded && post.content && (
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
  const { blogs } = useAppStore();
  
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
          {blogs.map((post, idx) => (
            <BlogCard key={post.id || idx} post={{...post, emoji: post.emoji || '📰', category: post.category || 'Tin tức', readTime: post.readTime || '3 phút'}} />
          ))}
        </div>
      </div>
    </section>
  );
}
