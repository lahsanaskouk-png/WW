'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Phone,
  Mail,
  Shield,
  Bell,
  Moon,
  Globe,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { t, isRTL, language } = useLanguage();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Extract phone from email
  const userPhone = user?.email?.replace('@brixa.com', '') || '';
  const userEmail = user?.email || '';
  const userId = user?.id?.slice(0, 8) || '';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(isRTL ? 'تم النسخ' : 'Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const settingsItems = [
    { icon: Shield, label: isRTL ? 'الأمان' : 'Security', value: isRTL ? 'مفعّل' : 'Enabled' },
    { icon: Bell, label: isRTL ? 'الإشعارات' : 'Notifications', value: isRTL ? 'مفعّل' : 'Enabled' },
    { icon: Globe, label: isRTL ? 'اللغة' : 'Language', value: language === 'ar' ? 'العربية' : 'English' },
    { icon: Moon, label: isRTL ? 'المظهر' : 'Theme', value: isRTL ? 'داكن' : 'Dark' },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="animate-fadeIn">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
              {t('profile')}
            </h1>
            <p className="text-slate-400">
              {isRTL ? 'إدارة حسابك وإعداداتك' : 'Manage your account and settings'}
            </p>
          </div>

          {/* Profile Card */}
          <div className="card-dark animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <User className="w-12 h-12 text-slate-950" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#0a0f1e] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-start">
                <h2 className="text-xl font-bold text-white mb-1">
                  {isRTL ? 'مستخدم Brixa' : 'Brixa User'}
                </h2>
                <p className="text-slate-400 text-sm mb-3">
                  {isRTL ? 'عضو منذ' : 'Member since'} {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long' })}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-semibold">
                    {isRTL ? 'حساب مفعّل' : 'Verified Account'}
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-semibold">
                    {isRTL ? 'مستوى: مبتدئ' : 'Level: Starter'}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                type="button"
                className="btn-primary px-6 py-3 text-sm"
              >
                {t('editProfile')}
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {isRTL ? 'تفاصيل الحساب' : 'Account Details'}
            </h2>
            <div className="card-dark space-y-4">
              {/* User ID */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <User className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">{isRTL ? 'معرف المستخدم' : 'User ID'}</p>
                    <p className="text-white font-semibold">{userId}...</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(user?.id || '')}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</p>
                    <p className="text-white font-semibold">+966 {userPhone}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Mail className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                    <p className="text-white font-semibold">{userEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {t('settings')}
            </h2>
            <div className="card-dark divide-y divide-white/5">
              {settingsItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors first:rounded-t-3xl last:rounded-b-3xl"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-slate-400" />
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{item.value}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-500 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <div className="card-dark border-red-500/20">
              <h3 className="text-red-500 font-bold mb-2">
                {isRTL ? 'منطقة الخطر' : 'Danger Zone'}
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                {isRTL ? 'الإجراءات هنا لا يمكن التراجع عنها' : 'Actions here cannot be undone'}
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors"
              >
                {isRTL ? 'حذف الحساب' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
