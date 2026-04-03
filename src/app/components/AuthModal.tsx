import React, { useState } from 'react';
import { X, Lock, Phone } from 'lucide-react';
import { useAppStore } from '../context/AppContext';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { login, register } = useAppStore();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6 || password.length > 25) {
      setError('Mật khẩu phải từ 6 đến 25 ký tự');
      return;
    }

    if (isLogin) {
      const success = login(phone, password);
      if (success) onClose();
      else setError('Số điện thoại hoặc mật khẩu không đúng');
    } else {
      const success = register(phone, password);
      if (success) onClose();
      else setError('Số điện thoại này đã được đăng ký');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-foreground/50 hover:bg-accent rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <p className="text-muted-foreground text-sm">
              {isLogin ? 'Nhập số điện thoại để tiếp tục' : 'Tạo tài khoản mới'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
                {error}
              </div>
            )}
            
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                placeholder="Mật khẩu (6-25 ký tự)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                maxLength={25}
                className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            </span>
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="ml-2 text-primary font-medium hover:underline"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
