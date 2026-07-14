import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "UNIFORM — Профессиональная форма для медиков и поваров",
  description:
    "Премиальная медицинская и поварская форма в Кыргызстане. Быстрый заказ через WhatsApp, доставка по всей стране, цена от 1700 сом.",
  keywords: [
    "медицинская форма",
    "поварская форма",
    "униформа Бишкек",
    "медицинская одежда Кыргызстан",
    "купить медицинскую форму",
  ],
  openGraph: {
    title: "UNIFORM — Medical Wear",
    description: "Профессиональная униформа для медиков и поваров. Заказ за 3 нажатия через WhatsApp.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B1E3D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-white text-graphite">{children}</body>
    </html>
  );
}
