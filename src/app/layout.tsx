import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AdminProvider } from "@/components/AdminProvider";
import { AdminLoginButton } from "@/components/AdminLoginButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Case Study",
  description: "투자 사례 분석 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
              Case Study
            </Link>
            <nav className="flex gap-6 text-sm text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                전체
              </Link>
            </nav>
          </div>
        </header>
        <AdminProvider>
          <AdminLoginButton />
          <main className="flex-1">{children}</main>
        </AdminProvider>
        <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-400">
          Case Study &copy; 2026
        </footer>
      </body>
    </html>
  );
}
