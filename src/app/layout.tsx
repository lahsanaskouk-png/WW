import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Brixa Mining - Professional Mining Platform",
  description: "منصة التعدين الاحترافية - استثمر بذكاء، اربح باستمرار",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-center"
              richColors
              closeButton
              theme="dark"
              toastOptions={{
                style: {
                  background: '#0a0f1e',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                },
              }}
            />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
