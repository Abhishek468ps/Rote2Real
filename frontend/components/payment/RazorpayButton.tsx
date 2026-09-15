"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayButton({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_xxxxxxxx", // test key
      amount: amount * 100,
      currency: "INR",
      name: "Assessment Platform",
      description: "Evaluation Report Access",
      handler: function () {
        // 👇 FAKE SUCCESS (frontend only)
        onSuccess();
      },
      theme: {
        color: "#4f46e5",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 text-white px-6 py-3 rounded"
    >
      Pay ₹{amount}
    </button>
  );
}