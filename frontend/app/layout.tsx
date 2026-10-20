import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeProvider";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brain Train Consultancy Services LLP",
  description:
    "Brain Train Consultancy Services LLP empowers organizations with AI-driven business consulting, digital transformation, and corporate training solutions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
   <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5XNDPDMWLR"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5XNDPDMWLR');
            `,
          }}
        />

        {/* Razorpay */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />

      <ThemeProvider>
  <AuthProvider>

    <main className="flex-grow">
      {children}
    </main>

    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
    />

  </AuthProvider>
</ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}


