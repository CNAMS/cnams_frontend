import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, themeInitScript } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/ui/Toast";

// Ankur's type pairing: Noto Sans Devanagari for Hindi, with Source Sans 3 as
// the Latin companion (clean, highly legible, open-source humanist sans-serif).
// Both are self-hosted by next/font at build time — no render-blocking request
// to fonts.googleapis.com, which matters on low-bandwidth connections.
//
// `latin` is subset on both faces because the UI mixes scripts constantly:
// numerals, SAM/MAM classification codes, ICDS IDs and serial numbers stay
// Latin even in Hindi mode.
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "swap",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `lang` is hardcoded here and corrected on the client by LanguageProvider
  // once the persisted locale is known — see src/context/LanguageContext.tsx.
  return (
    <html lang="hi" data-role="aww" suppressHydrationWarning>
      <head>
        {/* Applies the stored role skin and colour scheme before first paint.
            Without it every navigation flashes the default teal light theme
            before snapping to the user's actual role. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${sourceSans3.variable} ${notoDevanagari.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>{children}</ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
