"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  Code2,
  Sparkles,
  Users,
  ArrowRight,
  Loader2,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";


import { API_ENDPOINTS } from "@/lib/api";

interface Mvp {
    id: number;
    mvpCode: string;
    title: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    category?: string;
    difficulty?: string;
    estimatedHours?: number;
    minTeamSize?: number;
    maxTeamSize?: number;
    teamAllowed: boolean;
    rewardXp: number;
    certificateEnabled: boolean;
    portfolioEnabled: boolean;
    mentorEnabled: boolean;
    aiMentorEnabled: boolean;
    featured: boolean;
    status: string;
}

interface MvpPlan {
  id: number;
  code: string;
  name: string;
  durationHours: number;
  price: number;
  currency: string;
  free: boolean;
  description?: string;
  maxTeamSize?: number;
  certificateEnabled: boolean;
  portfolioEnabled: boolean;
  mentorEnabled: boolean;
  aiMentorEnabled: boolean;
  active: boolean;
}

export default function StudentMvpsPage() {
  const [mvps, setMvps] = useState<Mvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMvp, setSelectedMvp] = useState<Mvp | null>(null);
  const [plans, setPlans] = useState<MvpPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  useEffect(() => {
    loadMvps();
  }, []);

  async function loadMvps() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
 console.log("MVP API:", API_ENDPOINTS.STUDENT_MVPS);
        console.log("Token exists:", !!token);

      const response = await fetch(API_ENDPOINTS.STUDENT_MVPS, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

       const responseText = await response.text();

        console.log("MVP STATUS:", response.status);
        console.log("MVP RESPONSE:", responseText);

        if (!response.ok) {
            throw new Error(
                `MVP API failed: ${response.status} ${responseText}`
            );
        }

       const data = responseText
            ? JSON.parse(responseText)
            : [];

        console.log("MVP DATA:", data);

        setMvps(Array.isArray(data) ? data : []);

    } catch (error) {
        console.error("LOAD MVP ERROR:", error);

        setError(
            error instanceof Error
                ? error.message
                : "Unable to load MVPs"
        );
    } finally {
        setLoading(false);
    }
}

  async function openMvp(mvp: Mvp) {
    try {
      setSelectedMvp(mvp);
      setPlans([]);
      setLoadingPlans(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        API_ENDPOINTS.STUDENT_MVP_PLANS(mvp.id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load plans");
      }

      const data = await response.json();

      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8">

          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />

            <span className="text-sm font-semibold uppercase tracking-wider text-purple-600">
              Micro MVPs
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Choose Your MVP
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Build a real-world project and demonstrate your execution skills.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* NO MVP */}

        {mvps.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">

            <Sparkles className="mx-auto mb-4 h-12 w-12 text-slate-400" />

            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              No MVPs available yet
            </h2>

            <p className="mt-2 text-slate-500">
              New MVP projects will appear here when they are published by the admin.
            </p>

          </div>
        )}

        {/* MVP GRID */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {mvps.map((mvp) => {

            const title = mvp.title ||  mvp.mvpCode;

            return (
              <div
                key={mvp.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >

                {/* CARD TOP */}

                <div className="p-6">

                  <div className="mb-5 flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                      <Code2 className="h-6 w-6 text-purple-600" />
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      ACTIVE
                    </span>

                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {mvp.description || "Build and complete this real-world MVP project."}
                  </p>

                  {/* INFO */}

                  <div className="mt-5 flex flex-wrap gap-3">

                    {mvp.estimatedHours && (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="h-4 w-4" />
        {mvp.estimatedHours} hours
    </div>
)}

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  onClick={() => openMvp(mvp)}
                  className="flex w-full items-center justify-between border-t border-slate-100 px-6 py-4 text-sm font-semibold text-purple-600 transition hover:bg-purple-50 dark:border-slate-800 dark:hover:bg-purple-900/20"
                >
                  <span>View Plans</span>

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

              </div>
            );
          })}

        </div>

        {/* PLAN MODAL */}

        {selectedMvp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900">

              {/* MODAL HEADER */}

              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedMvp.title ||
                      selectedMvp.mvpCode}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a plan to continue
                  </p>
                </div>

                <button
                  onClick={() => setSelectedMvp(null)}
                  className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>

              </div>

              {/* PLANS */}

              <div className="p-6">

                {loadingPlans ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : plans.length === 0 ? (

                  <div className="py-12 text-center text-slate-500">
                    No plans available for this MVP.
                  </div>

                ) : (

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {plans.map((plan) => (

                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        mvpId={selectedMvp.id}
                      />

                    ))}

                  </div>

                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

/* ============================================================
   PLAN CARD
============================================================ */

function PlanCard({
  plan,
  mvpId,
}: {
  plan: MvpPlan;
  mvpId: number;
}) {

  const [processing, setProcessing] = useState(false);

  async function handleSelectPlan() {

    if (processing) return;

    try {

      setProcessing(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required", {
  description: "Please log in to continue with your MVP enrollment.",
});
        return;
      }

      // ========================================================
      // STEP 1. CREATE ENROLLMENT
      // ========================================================

      const enrollmentResponse = await fetch(
        API_ENDPOINTS.MVP_ENROLL,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mvpId,
            planId: plan.id,
          }),
        }
      );

   if (!enrollmentResponse.ok) {
  const errorText = await enrollmentResponse.text();

  console.error("ENROLLMENT API ERROR:", {
    status: enrollmentResponse.status,
    statusText: enrollmentResponse.statusText,
    response: errorText,
  });

  toast.error("Enrollment failed", {
    description:
      `Server returned ${enrollmentResponse.status}. Please check the console.`,
  });

  throw new Error(
    `Enrollment failed: ${enrollmentResponse.status} ${errorText}`
  );
}

      const enrollment =
        await enrollmentResponse.json();

      // ========================================================
      // FREE PLAN
      // ========================================================

      if (plan.free || Number(plan.price) === 0) {

        toast.success("MVP activated successfully", {
  description: "Your workspace is ready. Redirecting you now...",
});

     window.location.href =
  `/dashboard/student/mvps/${mvpId}/workspace?enrollmentId=${enrollment.id}`;

        return;
      }

      // ========================================================
      // PAID PLAN
      // ========================================================

     await startRazorpayPayment(
  enrollment.id,
  mvpId,
  plan
);

    } catch (error) {

      console.error(error);

      toast.error("Unable to start MVP", {
  description:
    "We couldn't complete your enrollment. Please try again.",
});

    } finally {

      setProcessing(false);

    }
  }

  return (
    <div className="relative rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

      <div className="mb-4">

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {plan.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {plan.description}
        </p>

      </div>

      {/* PRICE */}

      <div className="mb-6">

        {plan.free || Number(plan.price) === 0 ? (

          <span className="text-3xl font-bold text-green-600">
            FREE
          </span>

        ) : (

          <div className="flex items-center gap-1">

            <IndianRupee className="h-6 w-6" />

            <span className="text-3xl font-bold">
              {plan.price}
            </span>

          </div>

        )}

      </div>

      {/* FEATURES */}

      <div className="mb-6 space-y-3 text-sm">

        <Feature
          enabled={true}
          text={`${plan.durationHours} hours`}
        />

        <Feature
          enabled={plan.certificateEnabled}
          text="Certificate"
        />

        <Feature
          enabled={plan.portfolioEnabled}
          text="Portfolio"
        />

        <Feature
          enabled={plan.mentorEnabled}
          text="Mentor Support"
        />

        <Feature
          enabled={plan.aiMentorEnabled}
          text="AI Mentor"
        />

        {plan.maxTeamSize && (
          <Feature
            enabled={true}
            text={`Team size: ${plan.maxTeamSize}`}
          />
        )}

      </div>

      {/* BUTTON */}

      <button
        onClick={handleSelectPlan}
        disabled={processing}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {processing ? (
           <>
    <Loader2 className="h-4 w-4 animate-spin" />
    {plan.free || Number(plan.price) === 0
      ? "Activating..."
      : "Preparing payment..."}
  </>
        ) : (
          <>
            {plan.free || Number(plan.price) === 0
              ? "Start MVP"
              : "Pay & Start MVP"}

            <ArrowRight className="h-4 w-4" />
          </>
        )}

      </button>

    </div>
  );
}

/* ============================================================
   FEATURE
============================================================ */

function Feature({
  enabled,
  text,
}: {
  enabled: boolean;
  text: string;
}) {

  if (!enabled) return null;

  return (
    <div className="flex items-center gap-2">

      <CheckCircle2 className="h-4 w-4 text-green-500" />

      <span>{text}</span>

    </div>
  );
}

/* ============================================================
   RAZORPAY
============================================================ */

async function startRazorpayPayment(
 enrollmentId: number,
  mvpId: number,
  plan: MvpPlan
) {

   try {
    console.log("=================================");
    console.log("RAZORPAY START");
    console.log("Enrollment ID:", enrollmentId);
    console.log("Plan:", plan);
    console.log("=================================");


     // ==========================================================
    // STEP 1. GET TOKEN
    // ==========================================================

    const token = localStorage.getItem("token");

    console.log("Token exists:", !!token);

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

  // ============================================================
  // LOAD RAZORPAY SCRIPT
  // ============================================================

  if (!(window as any).Razorpay) {
      console.log("Loading Razorpay script...");

      await new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );

        if (existingScript) {
          console.log("Razorpay script already exists.");

          existingScript.addEventListener("load", () => resolve());
          existingScript.addEventListener("error", () =>
            reject(new Error("Unable to load Razorpay"))
          );

          return;
        }

            // IMPORTANT: script variable declare karo
    const script = document.createElement("script");

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () => {
          console.log("Razorpay script loaded.");
          resolve();
        };

        script.onerror = () => {
          console.error("Razorpay script failed to load.");
          reject(
            new Error("Unable to load Razorpay checkout script")
          );
        };

        document.body.appendChild(script);
      });
    }

         // ==========================================================
    // STEP 3. CHECK RAZORPAY OBJECT
    // ==========================================================

    if (!(window as any).Razorpay) {
      throw new Error(
        "Razorpay SDK is not available."
      );
    }

    console.log("Razorpay SDK available.");
 // ==========================================================
    // STEP 4. CREATE PAYMENT ORDER
    // ==========================================================

    console.log(
      "Creating Razorpay order..."
    );

    console.log(
      "Order API:",
      API_ENDPOINTS.MVP_PAYMENT_CREATE_ORDER
    );

  const orderResponse = await fetch(
    API_ENDPOINTS.MVP_PAYMENT_CREATE_ORDER,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        enrollmentId,
      }),
    }
  );

  const orderText = await orderResponse.text();

  console.log(
      "Order API status:",
      orderResponse.status
    );

    console.log(
      "Order API response:",
      orderText
    );
  if (!orderResponse.ok) {
      throw new Error(
        orderText ||
          `Unable to create payment order (${orderResponse.status})`
      );
    }

  const order = JSON.parse(orderText);

    console.log(
      "Razorpay order created:",
      order
    );

    // ==========================================================
    // STEP 5. VALIDATE ORDER RESPONSE
    // ==========================================================

    if (!order.razorpayKeyId) {
      throw new Error(
        "Razorpay Key ID is missing from backend response."
      );
    }

    if (!order.razorpayOrderId) {
      throw new Error(
        "Razorpay Order ID is missing from backend response."
      );
    }

    if (!order.amount) {
      throw new Error(
        "Razorpay amount is missing from backend response."
      );
    }

  // ============================================================
  // RAZORPAY OPTIONS
  // ============================================================

  const options = {

    key: order.razorpayKeyId,

    amount: order.amount,

    currency: order.currency,

    name: "Brain Train",

    description: `MVP - ${plan.name}`,

    order_id: order.razorpayOrderId,

    prefill: {
      name: order.fullName || "",
      email: order.email || "",
    },

    theme: {
      color: "#7c3aed",
    },

    handler: async function (
      response: any
    ) {

      try {

        console.log(
            "Razorpay payment response:",
            response
          );


        // ======================================================
        // VERIFY PAYMENT ON BACKEND
        // ======================================================

        const verifyResponse =
          await fetch(
            API_ENDPOINTS.MVP_PAYMENT_VERIFY,
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                enrollmentId,

                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature,

              }),
            }
          );

           const verifyText =
            await verifyResponse.text();

          console.log(
            "Verify status:",
            verifyResponse.status
          );

          console.log(
            "Verify response:",
            verifyText
          );

      
 if (!verifyResponse.ok) {
            throw new Error(
              verifyText ||
                "Payment verification failed"
            );
          }

       toast.success("Payment successful", {
  description:
    "Your MVP has been activated successfully. Redirecting to your workspace...",
});

setTimeout(() => {
  window.location.href =
    `/dashboard/student/mvps/${mvpId}/workspace?enrollmentId=${enrollmentId}`;
}, 1200);

        } catch (error) {
          console.error(
            "PAYMENT VERIFICATION ERROR:",
            error
          );

        toast.error("Payment verification failed", {
  description:
    "Your payment was received, but we couldn't verify it yet. Please contact support if the amount was deducted.",
});

      }

    },

    modal: {
      ondismiss: function () {
  console.log("Razorpay checkout closed");

  toast.info("Payment cancelled", {
    description:
      "No payment was completed. You can try again whenever you're ready.",
  });
},
    },

  };

   // ==========================================================
    // STEP 7. OPEN RAZORPAY
    // ==========================================================

    console.log(
      "Opening Razorpay checkout..."
    );

  const razorpay =
    new (window as any).Razorpay(
      options
    );

 razorpay.on(
      "payment.failed",
      function (response: any) {
        console.error(
          "Razorpay payment failed:",
          response
        );

       toast.error("Payment unsuccessful", {
  description:
    "We couldn't complete your payment. No access has been activated.",
});
      }
    );

    razorpay.open();

    console.log(
      "Razorpay.open() called."
    );

    } catch (error) {

    console.error(
      "RAZORPAY ERROR:",
      error
    );

    throw error;
  }
}