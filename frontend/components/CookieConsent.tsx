"use client";
import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentData = localStorage.getItem("cookie-consent");
    if (consentData) {
      const { acceptedAt } = JSON.parse(consentData);
      const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6; // 6 months in ms
      const isExpired = Date.now() - acceptedAt > sixMonths;

      if (isExpired) {
        localStorage.removeItem("cookie-consent");
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const consentInfo = { acceptedAt: Date.now() };
    localStorage.setItem("cookie-consent", JSON.stringify(consentInfo));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg z-50 border-t border-gray-700 animate-fadeInUp">
      <div className="text-sm md:text-base max-w-3xl text-center md:text-left mb-3 md:mb-0">
        🍪 <strong>BrainTrain</strong> uses cookies to improve your experience, analyze traffic, 
        and enhance our AI-driven services. By continuing, you agree to our{" "}
        <a href="/cookie-notice" className="text-cyan-400 underline hover:text-cyan-300">
          Cookie Notice
        </a>.
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleAccept}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition"
        >
          Accept
        </button>
        <a
          href="/privacy-notice"
          className="border border-gray-400 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-medium px-4 py-2 rounded-lg transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default CookieConsent;
