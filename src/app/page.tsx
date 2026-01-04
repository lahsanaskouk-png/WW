'use client';

import LanguageToggle from '@/components/LanguageToggle';
import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050810] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/3 blur-[100px] rounded-full pointer-events-none" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(230, 179, 22, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(230, 179, 22, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 z-50">
        <LanguageToggle />
      </div>

      {/* Auth Form */}
      <div className="relative z-10 w-full flex justify-center">
        <AuthForm />
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-slate-600 text-xs">
          © 2024 Brixa Mining. All rights reserved.
        </p>
      </div>
    </main>
  );
}
