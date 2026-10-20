"use client";
import React from "react";

export default function CookieNotice() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Cookie Notice</h1>
      <p className="text-lg text-gray-600 mb-8">
        BrainTrain Consultancy Services LLP uses cookies to enhance your browsing experience and analyze traffic on our website.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">1. What Are Cookies?</h2>
      <p className="text-gray-600">
        Cookies are small text files stored on your device that help remember your preferences and improve website functionality.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">2. Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li><strong>Essential Cookies:</strong> Required for the website to operate properly.</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
        <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">3. Managing Cookies</h2>
      <p className="text-gray-600">
        You can choose to disable cookies through your browser settings. However, some parts of the site may not function properly if you do so.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-10 mb-4">4. Contact Us</h2>
      <p className="text-gray-600">
        If you have questions about our Cookie Policy, please contact us at:
        <br />
        📧 <a href="mailto:info@braintrainconsultancy.com" className="text-indigo-500 underline">info@braintrainconsultancy.com</a>
      </p>
    </div>
  );
}
