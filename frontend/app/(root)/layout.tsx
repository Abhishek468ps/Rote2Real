


import CookieConsent from "@/components/CookieConsent";
import { ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
<ThemeProvider>
      <AuthProvider>
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />
      </AuthProvider>
      </ThemeProvider>

      <CookieConsent />

      <Footer />
    </main>
  );
};

export default Layout;