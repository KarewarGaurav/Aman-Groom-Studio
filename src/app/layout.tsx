import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Bodoni_Moda,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${BRAND.name} | Luxury Groom Fashion`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Shop luxury groom couture — sherwanis, tuxedos, Indo-western, kurta sets, and wedding accessories. Premium fashion ecommerce in New Delhi.",
  keywords: [
    "luxury groom wear shop",
    "wedding sherwani online",
    "groom fashion ecommerce",
    "luxury tuxedo India",
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
    <html
      lang="en"
      className={`${cormorant.variable} ${bodoni.variable} ${manrope.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen pb-20 md:pb-0" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
