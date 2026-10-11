import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kanit = localFont({
  src: [
    { path: "../node_modules/@fontsource/kanit/files/kanit-thai-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-thai-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-thai-600-normal.woff2", weight: "600" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-thai-700-normal.woff2", weight: "700" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-thai-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-kanit",
  display: "swap",
});

const kanitLatin = localFont({
  src: [
    { path: "../node_modules/@fontsource/kanit/files/kanit-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-latin-600-normal.woff2", weight: "600" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-latin-700-normal.woff2", weight: "700" },
    { path: "../node_modules/@fontsource/kanit/files/kanit-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: "Lovely Grand | เติมเกมออนไลน์ & บัตรเติมเงิน",
  description: "บริษัท เลิฟลี่ แกรนด์ จำกัด — เติมเกมออนไลน์ บัตรเติมเงินดิจิทัล และโปรโมชั่นสำหรับเกมที่คุณชื่นชอบ",
  applicationName: "Lovely Grand",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Lovely Grand | เติมเกมออนไลน์",
    description: "เติมเกมออนไลน์ บัตรเติมเงินดิจิทัล และโปรโมชั่น",
    locale: "th_TH",
    type: "website",
    images: [{ url: "/images/hero.webp", width: 1738, height: 905, alt: "Lovely Grand เติมเกมออนไลน์" }],
  },
};

export const viewport: Viewport = { themeColor: "#c788f5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th" className={`${kanit.variable} ${kanitLatin.variable}`}><body>{children}</body></html>;
}
