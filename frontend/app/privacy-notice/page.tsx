"use client";
import React from "react";

export default function PrivacyNotice() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Privacy Notice</h1>
      <p className="text-lg text-gray-600 mb-8">
        At <strong>BrainTrain Consultancy Services LLP</strong>, we value your trust. 
        This Privacy Notice explains how we collect, use, and protect your personal data when you interact with our website, products, and services.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">1. Information We Collect</h2>
      <p className="text-gray-600">
        We may collect information such as your name, email address, contact details, company name, and communication preferences. 
        Additionally, we collect analytics data through tools like Google Analytics to improve our services.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">2. How We Use Your Data</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>To provide and enhance our AI and consulting services.</li>
        <li>To communicate updates, offers, or internship opportunities.</li>
        <li>To analyze usage patterns and improve user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">3. Data Protection</h2>
      <p className="text-gray-600">
        We implement security controls and encryption to ensure your personal information is protected from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">4. Contact Us</h2>
      <p className="text-gray-600">
        For privacy-related concerns, you can contact us at:
        <br />
        📧 <a href="mailto:info@braintrainconsultancy.com" className="text-indigo-500 underline">info@braintrainconsultancy.com</a>
      </p>
    </div>
  );
}
