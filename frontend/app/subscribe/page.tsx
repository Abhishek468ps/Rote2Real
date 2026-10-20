"use client";
import { useState } from "react";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);

  async function startSubscription() {
    setLoading(true);

    const res = await fetch("/api/create-subscription/", {
      method: "POST",
    });

    const data = await res.json();
    setLoading(false);

    if (!data || !data.order_id || !data.key) {
      alert("Payment init failed");
      return;
    }

    const options = {
      key: data.key,
      subscription_id: data.subscription_id,
      name: "BrainTrain Infrastructure Access",
      description: "5-Day Free Trial → Then ₹100/month",
      theme: { color: "#2563eb" },
      handler: async function (response: any) {
        const verifyRes = await fetch("/api/verify-payment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verify = await verifyRes.json();

        if (verify.success) {
          alert("🎉 Trial Activated! Check your email.");
        } else {
          alert("❌ Payment verification failed");
        }
      },
      modal: {
        ondismiss: () => alert("Payment window closed."),
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={startSubscription}
        disabled={loading}
        className="bg-blue-600 text-white py-3 px-6 rounded-md"
      >
        {loading ? "Processing..." : "Start Free Trial (₹0 for 5 Days)"}
      </button>
      <p className="mt-3 text-gray-600 text-sm">
        After 5 days → Auto 499/month
      </p>
    </div>
  );
}
