"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ROTE2REAL_COUNTRIES,
  getRote2RealSession,
  rote2realApi,
  saveRote2RealSession,
  type Rote2RealRegistration,
} from "@/lib/rote2real";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Rote2RealRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [universityName, setUniversityName] = useState("");
  const [courseDegree, setCourseDegree] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [track, setTrack] = useState("Generative AI");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [paying, setPaying] = useState(false);
  // A registered-but-unpaid student (e.g. closed the checkout popup) can resume payment.
  const [pendingStudent, setPendingStudent] = useState<{
    studentId: number;
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const session = getRote2RealSession();
    if (session?.studentId && !session.enrolled) {
      setPendingStudent({
        studentId: session.studentId,
        name: session.name,
        email: session.email,
      });
    }
  }, []);

  const persistSession = (registration: Rote2RealRegistration) => {
    saveRote2RealSession({
      studentId: registration.studentId,
      name: registration.name,
      email: registration.email,
      paymentStatus: registration.paymentStatus || "PENDING",
      enrolled: false,
    });
  };

  const startPayment = async (student: {
    studentId: number;
    name: string;
    email: string;
    phone?: string;
  }) => {
    setPaying(true);
    try {
      if (typeof window === "undefined" || !window.Razorpay) {
        throw new Error("Payment gateway is still loading. Please try again in a moment.");
      }

      // Amount / currency always come from the server, never from the browser.
      const order = await rote2realApi.createOrder(student.studentId);
      if (!order.razorpayOrderId || !order.razorpayKeyId) {
        throw new Error("Could not create the payment order. Please try again.");
      }

      const checkout = new window.Razorpay({
        key: order.razorpayKeyId,
        order_id: order.razorpayOrderId,
        amount: order.paymentAmountMinor,
        currency: order.paymentCurrency,
        name: "Brain Train",
        description: "Rote2Real 20-Day Sprint",
        prefill: {
          name: student.name,
          email: student.email,
          contact: student.phone || "",
        },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: () => {
            setPaying(false);
            toast.info("Payment not completed. You can resume it anytime.");
          },
        },
        handler: async (result: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verification = await rote2realApi.verifyPayment({
              studentId: student.studentId,
              razorpayOrderId: result.razorpay_order_id,
              razorpayPaymentId: result.razorpay_payment_id,
              razorpaySignature: result.razorpay_signature,
            });
            saveRote2RealSession({
              studentId: student.studentId,
              name: student.name,
              email: student.email,
              paymentStatus: verification.paymentStatus,
              enrolled: verification.enrolled,
            });
            toast.success(verification.message || "Payment successful. Welcome!");
            router.push("/rote2real/dashboard");
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Payment verification failed. If money was deducted, contact support."
            );
            setPaying(false);
          }
        },
      });

      checkout.on("payment.failed", (response: any) => {
        toast.error(response?.error?.description || "Payment failed. Please try again.");
        setPaying(false);
      });

      checkout.open();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to start payment.");
      setPaying(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    try {
      const registration = await rote2realApi.register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country,
        universityName: universityName.trim(),
        courseDegree: courseDegree.trim(),
        yearOfStudy: yearOfStudy.trim(),
        track,
      });

      persistSession(registration);
      setSuccessMessage(
        registration.message ||
          "Registration successful. Your Rote2Real profile has been saved."
      );
      toast.success(
        registration.message ||
          "Registration successful. Your Rote2Real profile has been saved."
      );
      setPendingStudent({
        studentId: registration.studentId,
        name: registration.name,
        email: registration.email,
      });
      setSubmitting(false);
      await startPayment({
        studentId: registration.studentId,
        name: registration.name,
        email: registration.email,
        phone: registration.phone || undefined,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Register for Rote2Real</CardTitle>
          <CardDescription>
            Register and complete the secure Razorpay payment to unlock your 20-day sprint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingStudent && (
            <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-700">
              <div className="font-semibold">Payment pending</div>
              <p className="mt-1">
                {pendingStudent.email} is registered but payment is not complete.
              </p>
              <Button
                type="button"
                className="mt-3"
                disabled={paying}
                onClick={() => startPayment(pendingStudent)}
              >
                {paying ? "Opening payment…" : "Complete payment"}
              </Button>
            </div>
          )}
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                maxLength={150}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                maxLength={150}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                maxLength={20}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-slate-800/80 bg-slate-900/80 px-3.5 text-sm text-slate-100 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              >
                {ROTE2REAL_COUNTRIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityName">University / College Name</Label>
              <Input
                id="universityName"
                required
                maxLength={200}
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                placeholder="Your university or college"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseDegree">Course / Degree</Label>
              <Input
                id="courseDegree"
                required
                maxLength={200}
                value={courseDegree}
                onChange={(e) => setCourseDegree(e.target.value)}
                placeholder="B.Tech Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearOfStudy">Year of Study</Label>
              <Input
                id="yearOfStudy"
                required
                maxLength={50}
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                placeholder="2nd Year"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="track">Track</Label>
              <Input
                id="track"
                required
                maxLength={100}
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                placeholder="Generative AI"
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting || paying}>
              {submitting
                ? "Saving registration…"
                : paying
                ? "Opening payment…"
                : "Register & Pay"}
            </Button>
          </form>

          {successMessage && (
            <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-700">
              <div className="font-semibold">Registration successful</div>
              <p className="mt-1">{successMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
