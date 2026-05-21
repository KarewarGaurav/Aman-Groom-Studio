import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Premium Indian groom couture — bespoke sherwanis, luxury tuxedos, Indo-western ensembles, and personalized wedding styling in New Delhi.",
  keywords: [
    "luxury groom wear",
    "wedding sherwani",
    "bespoke tailoring Delhi",
    "groom couture India",
  ],
  openGraph: {
    title: BRAND.name,
    description: BRAND.tagline,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: BRAND.name }],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen pb-20 md:pb-0" suppressHydrationWarning>
        <MotionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileBottomNav />
          <CartDrawer />
        </MotionProvider>
      </body>
    </html>
  );
}
