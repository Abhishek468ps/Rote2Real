"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import LawyerForm from "@/components/auth/lawyer/LawyerForm";

export default function LawyerRegisterPage() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <AuthLayout
      title="Lawyer Registration"
      subtitle="
      Join Brain Train Legal Ecosystem
      and collaborate with legal,
      compliance and AI innovation
      initiatives.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <LawyerForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}