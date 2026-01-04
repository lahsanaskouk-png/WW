'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Wallet,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Gift,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  // Extract phone from email
  const userPhone = user?.email?.replace('@brixa.com', '') || '';

  const stats = [
    {
      icon: Wallet,
      label: t('totalBalance'),
      value: '$0.00',
      change: '+0%',
      positive: true,
      color: 'amber',
    },
    {
      icon: TrendingUp,
      label: t('activeInvestments'),
      value: '0',
      change: '0 ' + (isRTL ? 'نشط' : 'active'),
      positive: true,
      color: 'emerald',
    },
    {
      icon: Zap,
      label: t('miningPower'),
      value: '0 TH/s',
      change: (isRTL ? 'غير نشط' : 'Inactive'),
      positive: false,
      color: 'blue',
    },
    {
      icon: Gift,
      label: t('totalProfit'),
      value: '$0.00',
      change: '+0%',
      positive: true,
      color: 'purple',
    },
  ];

  const quickActions = [
    { icon: ArrowUpRight, label: isRTL ? 'إيداع' : 'Deposit', color: 'emerald' },
    { icon: ArrowDownRight, label: isRTL ? 'سحب' : 'Withdraw', color: 'red' },
    { icon: TrendingUp, label: isRTL ? 'استثمار' : 'Invest', color: 'amber' },
    { icon: Activity, label: isRTL ? 'السجل' : 'History', color: 'blue' },
  ];

  const recentActivity = [
    { type: 'deposit', amount: '$0', time: isRTL ? 'لا توجد معاملات' : 'No transactions', status: 'none' },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 pb-20 md:pb-6">
          {/* Welcome Section */}
          <div className="animate-fadeIn">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
              {t('welcome')} 👋
            </h1>
            <p className="text-slate-400">
              {isRTL ? 'مرحباً بك في منصة Brixa Mining' : 'Welcome to Brixa Mining Platform'}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              {isRTL ? 'رقم الهاتف:' : 'Phone:'} {userPhone}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-dark group cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl bg-${stat.color}-500/10`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                  </div>
                  <span className={`text-xs font-semibold ${stat.positive ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="card-dark flex flex-col items-center justify-center py-4 hover:border-amber-500/30 active:scale-95 transition-all"
                >
                  <div className={`p-3 rounded-full bg-${action.color}-500/10 mb-2`}>
                    <action.icon className={`w-5 h-5 text-${action.color}-500`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mining Status */}
          <div className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <div className="card-dark">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">
                  {isRTL ? 'حالة التعدين' : 'Mining Status'}
                </h2>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-400">
                  {isRTL ? 'غير نشط' : 'Inactive'}
                </span>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">{isRTL ? 'قوة التعدين' : 'Hashrate'}</span>
                  <span className="text-white font-bold">0 TH/s</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full w-0 transition-all" />
                </div>
              </div>

              <button
                type="button"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>{isRTL ? 'ابدأ التعدين' : 'Start Mining'}</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {isRTL ? 'النشاط الأخير' : 'Recent Activity'}
              </h2>
              <button type="button" className="text-amber-500 text-sm font-semibold hover:text-amber-400 flex items-center gap-1">
                {isRTL ? 'عرض الكل' : 'View All'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="card-dark">
              <div className="flex items-center justify-center py-8 text-slate-500">
                <div className="text-center">
                  <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">{isRTL ? 'لا توجد معاملات بعد' : 'No transactions yet'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Plans Preview */}
          <div className="animate-fadeIn" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {isRTL ? 'خطط الاستثمار' : 'Investment Plans'}
              </h2>
              <button type="button" className="text-amber-500 text-sm font-semibold hover:text-amber-400 flex items-center gap-1">
                {isRTL ? 'استكشف' : 'Explore'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: isRTL ? 'المبتدئ' : 'Starter', min: '$100', roi: '5%', period: isRTL ? 'يومياً' : 'Daily' },
                { name: isRTL ? 'المحترف' : 'Professional', min: '$500', roi: '8%', period: isRTL ? 'يومياً' : 'Daily' },
                { name: isRTL ? 'المتقدم' : 'Advanced', min: '$1000', roi: '12%', period: isRTL ? 'يومياً' : 'Daily' },
              ].map((plan) => (
                <div key={plan.name} className="card-dark hover:border-amber-500/30 cursor-pointer">
                  <h3 className="text-lg font-bold text-amber-500 mb-2">{plan.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isRTL ? 'الحد الأدنى' : 'Minimum'}</span>
                      <span className="text-white font-semibold">{plan.min}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isRTL ? 'العائد' : 'ROI'}</span>
                      <span className="text-emerald-500 font-semibold">{plan.roi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isRTL ? 'الفترة' : 'Period'}</span>
                      <span className="text-white font-semibold">{plan.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
