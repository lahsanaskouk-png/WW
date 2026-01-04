'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Copy,
  Check,
  Gift,
  TrendingUp,
  Share2
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ReferralsPage() {
  const { isRTL } = useLanguage();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.id?.slice(0, 8).toUpperCase() || 'BRIXA123';
  const referralLink = `https://brixa-mining.com/ref/${referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(isRTL ? 'تم نسخ الرابط' : 'Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { icon: Users, label: isRTL ? 'إجمالي الإحالات' : 'Total Referrals', value: '0' },
    { icon: TrendingUp, label: isRTL ? 'الإحالات النشطة' : 'Active Referrals', value: '0' },
    { icon: Gift, label: isRTL ? 'أرباح الإحالات' : 'Referral Earnings', value: '$0.00' },
  ];

  const tiers = [
    { level: 1, commission: '10%', desc: isRTL ? 'المستوى الأول' : 'Level 1' },
    { level: 2, commission: '5%', desc: isRTL ? 'المستوى الثاني' : 'Level 2' },
    { level: 3, commission: '2%', desc: isRTL ? 'المستوى الثالث' : 'Level 3' },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="animate-fadeIn">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
              {isRTL ? 'برنامج الإحالات' : 'Referral Program'}
            </h1>
            <p className="text-slate-400">
              {isRTL ? 'ادعُ أصدقاءك واكسب عمولات' : 'Invite friends and earn commissions'}
            </p>
          </div>

          {/* Referral Link */}
          <div className="card-dark glow-amber animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Share2 className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isRTL ? 'رابط الإحالة الخاص بك' : 'Your Referral Link'}
                </h2>
                <p className="text-slate-400 text-sm">
                  {isRTL ? 'شارك هذا الرابط مع أصدقائك' : 'Share this link with your friends'}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-slate-900/50 border border-white/5 rounded-xl p-4 overflow-hidden">
                <p className="text-white font-mono text-sm truncate">{referralLink}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(referralLink)}
                className="px-4 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all active:scale-95"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-slate-400 text-sm">{isRTL ? 'كود الإحالة:' : 'Referral Code:'}</span>
              <span className="text-amber-500 font-bold">{referralCode}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="card-dark text-center">
                <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Commission Tiers */}
          <div className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {isRTL ? 'مستويات العمولات' : 'Commission Tiers'}
            </h2>
            <div className="space-y-3">
              {tiers.map((tier) => (
                <div key={tier.level} className="card-dark flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <span className="text-amber-500 font-bold">{tier.level}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{tier.desc}</p>
                      <p className="text-slate-400 text-sm">
                        {isRTL ? 'من استثمارات المستوى' : 'From level investments'}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-emerald-500">{tier.commission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My Referrals */}
          <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {isRTL ? 'إحالاتي' : 'My Referrals'}
            </h2>
            <div className="card-dark">
              <div className="flex items-center justify-center py-8 text-slate-500">
                <div className="text-center">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">{isRTL ? 'لا توجد إحالات بعد' : 'No referrals yet'}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {isRTL ? 'شارك رابطك لبدء الكسب' : 'Share your link to start earning'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="card-dark bg-amber-500/5 border-amber-500/20 animate-fadeIn" style={{ animationDelay: '500ms' }}>
            <h3 className="text-amber-500 font-bold mb-3">
              {isRTL ? 'كيف يعمل البرنامج؟' : 'How does it work?'}
            </h3>
            <ol className="space-y-2 text-slate-400 text-sm list-decimal list-inside">
              <li>{isRTL ? 'شارك رابط الإحالة الخاص بك مع أصدقائك' : 'Share your referral link with friends'}</li>
              <li>{isRTL ? 'عندما يسجلون ويستثمرون، تكسب عمولة' : 'When they sign up and invest, you earn commission'}</li>
              <li>{isRTL ? 'اكسب من 3 مستويات من الإحالات' : 'Earn from 3 levels of referrals'}</li>
              <li>{isRTL ? 'اسحب أرباحك في أي وقت' : 'Withdraw your earnings anytime'}</li>
            </ol>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
