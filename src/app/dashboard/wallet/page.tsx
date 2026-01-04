'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CreditCard,
  Bitcoin,
  Landmark
} from 'lucide-react';

export default function WalletPage() {
  const { isRTL } = useLanguage();

  const paymentMethods = [
    { icon: Bitcoin, name: 'USDT (TRC20)', available: true },
    { icon: Bitcoin, name: 'Bitcoin', available: true },
    { icon: CreditCard, name: isRTL ? 'بطاقة ائتمان' : 'Credit Card', available: false },
    { icon: Landmark, name: isRTL ? 'تحويل بنكي' : 'Bank Transfer', available: false },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="animate-fadeIn">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
              {isRTL ? 'المحفظة' : 'Wallet'}
            </h1>
            <p className="text-slate-400">
              {isRTL ? 'إدارة رصيدك والمعاملات' : 'Manage your balance and transactions'}
            </p>
          </div>

          {/* Balance Card */}
          <div className="card-dark glow-amber animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Wallet className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{isRTL ? 'الرصيد المتاح' : 'Available Balance'}</p>
                <h2 className="text-3xl font-black text-white">$0.00</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all active:scale-95"
              >
                <ArrowDownRight className="w-5 h-5" />
                <span>{isRTL ? 'إيداع' : 'Deposit'}</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all active:scale-95"
              >
                <ArrowUpRight className="w-5 h-5" />
                <span>{isRTL ? 'سحب' : 'Withdraw'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="card-dark">
              <p className="text-slate-400 text-sm mb-1">{isRTL ? 'إجمالي الإيداعات' : 'Total Deposits'}</p>
              <p className="text-xl font-bold text-white">$0.00</p>
            </div>
            <div className="card-dark">
              <p className="text-slate-400 text-sm mb-1">{isRTL ? 'إجمالي السحوبات' : 'Total Withdrawals'}</p>
              <p className="text-xl font-bold text-white">$0.00</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {isRTL ? 'طرق الدفع' : 'Payment Methods'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className={`card-dark flex items-center gap-3 ${
                    !method.available ? 'opacity-50' : 'hover:border-amber-500/30 cursor-pointer'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-800">
                    <method.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{method.name}</p>
                    {!method.available && (
                      <p className="text-slate-500 text-xs">{isRTL ? 'قريباً' : 'Coming Soon'}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <h2 className="text-lg font-bold text-white mb-4">
              {isRTL ? 'سجل المعاملات' : 'Transaction History'}
            </h2>
            <div className="card-dark">
              <div className="flex items-center justify-center py-8 text-slate-500">
                <div className="text-center">
                  <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">{isRTL ? 'لا توجد معاملات' : 'No transactions'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
