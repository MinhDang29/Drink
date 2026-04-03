import React, { useState } from 'react';
import { X, LogOut, PackageSearch, ShieldAlert, Check, ToggleLeft, ToggleRight, Plus } from 'lucide-react';
import { useAppStore } from '../context/AppContext';

export function UserModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { currentUser, logout, products, toggleProductAvailable, isStoreOpen, toggleStoreOpen, addBlog } = useAppStore();
  const [activeTab, setActiveTab] = useState<'history' | 'admin'>('history');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

  if (!isOpen || !currentUser) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlogTitle && newBlogContent) {
      addBlog({
        title: newBlogTitle,
        excerpt: newBlogContent,
        date: new Date().toLocaleDateString('vi-VN'),
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'
      });
      setNewBlogTitle('');
      setNewBlogContent('');
      alert('Đã thêm bài viết mới!');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
        <div className="p-6 border-b border-border flex items-center justify-between shrink-0 mb-0">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Xin chào, {currentUser.phone}
              {currentUser.role === 'admin' && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">Admin</span>
              )}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border px-6 shrink-0">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Lịch sử đơn hàng
          </button>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'admin' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Quản trị viên
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'history' && (
            <div className="space-y-6">
              {currentUser.orderHistory.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground space-y-3">
                  <PackageSearch className="w-12 h-12 mx-auto opacity-20" />
                  <p>Bạn chưa có đơn hàng nào.</p>
                </div>
              ) : (
                currentUser.orderHistory.map(order => (
                  <div key={order.id} className="border rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-border">
                      <span className="text-sm font-bold text-muted-foreground">Mã ĐH: {order.id}</span>
                      <span className="text-sm border px-2 py-1 rounded-full">{order.date}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-medium text-primary">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border font-bold">
                      <span>Tổng tiền:</span>
                      <span className="text-primary text-lg">{order.total.toLocaleString('vi-VN')}₫</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'admin' && currentUser.role === 'admin' && (
            <div className="space-y-8">
              {/* Toggle Store */}
              <div className="border rounded-xl p-5 flex items-center justify-between bg-secondary/10">
                <div>
                  <h3 className="font-bold mb-1">Trạng thái cửa hàng</h3>
                  <p className="text-sm text-muted-foreground">Bật/tắt chế độ nhận đơn (Mở cửa/Đóng cửa)</p>
                </div>
                <button 
                  onClick={toggleStoreOpen}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    isStoreOpen ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'
                  }`}
                >
                  {isStoreOpen ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  {isStoreOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
                </button>
              </div>

              {/* Manage Products */}
              <div className="border rounded-xl p-5">
                <h3 className="font-bold mb-4">Quản lý món ăn (Hết món)</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                        <span className="text-sm font-medium">{p.name}</span>
                      </div>
                      <button
                        onClick={() => toggleProductAvailable(p.id)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${
                          p.isAvailable 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        }`}
                      >
                        {p.isAvailable ? 'Còn món' : 'Hết món'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Blog */}
              <div className="border rounded-xl p-5">
                <h3 className="font-bold mb-4">Thêm bài viết Blog</h3>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Tiêu đề bài viết"
                    value={newBlogTitle}
                    onChange={e => setNewBlogTitle(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-lg outline-none focus:border-primary"
                  />
                  <textarea
                    required
                    placeholder="Nội dung/mô tả ngắn..."
                    value={newBlogContent}
                    onChange={e => setNewBlogContent(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 text-sm border rounded-lg outline-none focus:border-primary"
                  />
                  <button type="submit" className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium">
                    <Plus className="w-4 h-4" /> Đăng bài viết
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border shrink-0 bg-secondary/20 flex justify-end">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-destructive hover:bg-destructive/10 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
