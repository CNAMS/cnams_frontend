import type { Metadata, Viewport } from "next";
import {
  Inter,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import { ThemeProvider, themeInitScript } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/ui/Toast";
import { BleProvider } from "@/context/BleDeviceContext";

// Type (docs/DESIGN.md §3): Inter for the UI, Source Serif 4 for page titles
// and the landing hero, each paired with the Noto face for Devanagari. All are
// self-hosted by next/font at build time — no render-blocking request to
// Google, which matters on district-office connections.
//
// `latin` is subset on the Devanagari faces too because the UI mixes scripts
// constantly: numerals, SAM/MAM codes, ICDS IDs and serials stay Latin.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["600"],
  variable: "--font-serif-devanagari",
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
    { media: "(prefers-color-scheme: dark)", color: "#0F1214" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `lang` is hardcoded here and corrected on the client by LocaleProvider
  // once the persisted locale is known — see src/context/LocaleContext.tsx.
  return (
    <html lang="hi" data-role="aww" suppressHydrationWarning>
      <head>
        {/* Applies the stored role skin and colour scheme before first paint.
            Without it every navigation flashes the default teal light theme
            before snapping to the user's actual role. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${notoDevanagari.variable} ${sourceSerif.variable} ${notoSerifDevanagari.variable} antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider>
            <ToastProvider>
              <BleProvider>{children}</BleProvider>
            </ToastProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
