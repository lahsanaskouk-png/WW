'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Auth
  login: { ar: 'دخول', en: 'Login' },
  register: { ar: 'تسجيل', en: 'Register' },
  phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
  password: { ar: 'كلمة السر', en: 'Password' },
  confirmPassword: { ar: 'تأكيد كلمة السر', en: 'Confirm Password' },
  loginButton: { ar: 'دخول الحساب', en: 'Sign In' },
  registerButton: { ar: 'إنشاء حساب', en: 'Create Account' },
  phonePlaceholder: { ar: '7XXXXXXXX', en: '7XXXXXXXX' },

  // Dashboard
  dashboard: { ar: 'لوحة التحكم', en: 'Dashboard' },
  welcome: { ar: 'مرحباً بك', en: 'Welcome' },
  totalBalance: { ar: 'الرصيد الكلي', en: 'Total Balance' },
  activeInvestments: { ar: 'الاستثمارات النشطة', en: 'Active Investments' },
  totalProfit: { ar: 'إجمالي الأرباح', en: 'Total Profit' },
  miningPower: { ar: 'قوة التعدين', en: 'Mining Power' },

  // Profile
  profile: { ar: 'الملف الشخصي', en: 'Profile' },
  editProfile: { ar: 'تعديل الملف', en: 'Edit Profile' },
  logout: { ar: 'تسجيل الخروج', en: 'Logout' },
  settings: { ar: 'الإعدادات', en: 'Settings' },

  // Navigation
  home: { ar: 'الرئيسية', en: 'Home' },
  investments: { ar: 'الاستثمارات', en: 'Investments' },
  wallet: { ar: 'المحفظة', en: 'Wallet' },
  referrals: { ar: 'الإحالات', en: 'Referrals' },

  // Messages
  loginSuccess: { ar: 'تم تسجيل الدخول بنجاح', en: 'Login successful' },
  loginError: { ar: 'خطأ في البيانات', en: 'Invalid credentials' },
  registerSuccess: { ar: 'تم إنشاء الحساب بنجاح', en: 'Account created successfully' },
  registerError: { ar: 'حدث خطأ أثناء التسجيل', en: 'Registration error' },

  // Captcha
  captchaQuestion: { ar: 'أجب على السؤال التالي', en: 'Answer the following' },
  captchaError: { ar: 'الإجابة غير صحيحة', en: 'Incorrect answer' },

  // Common
  loading: { ar: 'جاري التحميل...', en: 'Loading...' },
  error: { ar: 'حدث خطأ', en: 'An error occurred' },
  success: { ar: 'تمت العملية بنجاح', en: 'Operation successful' },

  // Branding
  tagline: { ar: 'منصة التعدين الاحترافية', en: 'Professional Mining Platform' },
  slogan: { ar: 'استثمر بذكاء، اربح باستمرار', en: 'Invest Smart, Earn Consistently' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('brixa-language') as Language;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('brixa-language', language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
