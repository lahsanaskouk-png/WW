'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const { signIn, user, loading } = useAuth();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // إذا كان المستخدم مسجّل من قبل
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await signIn(phone, password);

    if (!result.success) {
      toast.error(result.error || 'فشل تسجيل الدخول');
      setSubmitting(false);
      return;
    }

    toast.success('تم تسجيل الدخول بنجاح');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900 p-6 rounded-xl space-y-4"
      >
        <h1 className="text-center text-xl font-bold text-white">
          تسجيل الدخول
        </h1>

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-500 text-black py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {submitting ? 'جاري الدخول...' : 'دخول'}
        </button>
      </form>
    </div>
  );
}
