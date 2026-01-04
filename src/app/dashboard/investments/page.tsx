'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Clock, Zap, Star } from 'lucide-react';

export default function InvestmentsPage() {
  const { isRTL } = useLanguage();

  const plans = [
    {
      name: isRTL ? 'خطة المبتدئ' : 'Starter Plan',
      icon: Zap,
      min: 100,
      max: 499,
      roi: '5%',
      period: isRTL ? '30 يوم' : '30 Days',
      color: 'amber',
      popular: false,
    },
    {
      name: isRTL ? 'خطة المحترف' : 'Professional Plan',
      icon: TrendingUp,
      min: 500,
      max: 999,
      roi: '8%',
      period: isRTL ? '30 يوم' : '30 Days',
      color: 'emerald',
      popular: true,
    },
    {
      name: isRTL ? 'خطة المتقدم' : 'Advanced Plan',
      icon: Star,
      min: 1000,
      max: 4999,
      roi: '12%',
      period: isRTL ? '30 يوم' : '30 Days',
      color: 'purple',
      popular: false,
    },
    {
      name: isRTL ? 'خطة VIP' : 'VIP Plan',
      icon: Star,
      min: 5000,
      max: 50000,
      roi: '15%',
      period: isRTL ? '30 يوم' : '30 Days',
      color: 'blue',
      popular: false,
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="animate-fadeIn">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
              {isRTL ? 'خطط الاستثمار' : 'Investment Plans'}
            </h1>
            <p className="text-slate-400">
              {isRTL ? 'اختر الخطة المناسبة لك وابدأ الربح' : 'Choose the right plan and start earning'}
            </p>
          </div>

          {/* Active Investments */}
          <div className="card-dark animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {isRTL ? 'استثماراتي النشطة' : 'My Active Investments'}
              </h2>
            </div>
            <div className="flex items-center justify-center py-8 text-slate-500">
              <div className="text-center">
                <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">{isRTL ? 'لا توجد استثمارات نشطة' : 'No active investments'}</p>
                <p className="text-xs text-slate-600 mt-1">
                  {isRTL ? 'اختر خطة أدناه للبدء' : 'Choose a plan below to get started'}
                </p>
              </div>
            </div>
          </div>

          {/* Investment Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`card-dark relative overflow-hidden animate-fadeIn ${
                  plan.popular ? 'border-amber-500/30' : ''
                }`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-xl">
                    {isRTL ? 'الأكثر شعبية' : 'Most Popular'}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-${plan.color}-500/10`}>
                    <plan.icon className={`w-6 h-6 text-${plan.color}-500`} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isRTL ? 'الحد الأدنى' : 'Minimum'}</span>
                    <span className="text-white font-bold">${plan.min}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isRTL ? 'الحد الأقصى' : 'Maximum'}</span>
                    <span className="text-white font-bold">${plan.max.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isRTL ? 'العائد اليومي' : 'Daily ROI'}</span>
                    <span className="text-emerald-500 font-bold">{plan.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isRTL ? 'المدة' : 'Duration'}</span>
                    <span className="text-white font-bold">{plan.period}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.popular
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {isRTL ? 'استثمر الآن' : 'Invest Now'}
                </button>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="card-dark bg-amber-500/5 border-amber-500/20 animate-fadeIn" style={{ animationDelay: '600ms' }}>
            <h3 className="text-amber-500 font-bold mb-2">
              {isRTL ? 'ملاحظة هامة' : 'Important Note'}
            </h3>
            <p className="text-slate-400 text-sm">
              {isRTL
                ? 'جميع الاستثمارات تحمل مخاطر. يرجى الاستثمار بحكمة وفقط بما يمكنك تحمل خسارته.'
                : 'All investments carry risks. Please invest wisely and only what you can afford to lose.'}
            </p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
