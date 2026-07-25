import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "अंकुर Ankur — बाल विकास प्रबंधन प्रणाली",
    template: "%s · अंकुर Ankur",
  },
  description:
    "अंकुर — आंगनवाड़ी केंद्रों के लिए बाल विकास निगरानी, रेफरल ट्रैकिंग और उपकरण निदान। " +
    "Ankur — child growth monitoring, referral tracking and device diagnostics for Anganwadi centres.",
  applicationName: "Ankur",
  icons: { icon: "/favicon.ico" },
};

// Field devices are phones held outdoors; keep the layout viewport-width and
// allow zoom to 5x rather than locking it — outdoor legibility beats pixel
// control (ANKUR_EXPERIENCE_ROADMAP §2, PRODUCTION_ROADMAP "Localisation &
// Accessibility": honour system scaling).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F1" },
    { media: "(prefers-color-scheme: dark)", color: "#12100C" },
  ],
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
