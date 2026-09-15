"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl text-center">
        
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 Registration Submitted!
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Thank you for completing your registration.
          <br />
          Our team will review your details and contact you shortly.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Go to Homepage
          </Link>

          <Link
            href="/register-email"
            className="px-6 py-3 border border-indigo-500 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Register Another
          </Link>
        </div>

      </div>
    </div>
  );
}
