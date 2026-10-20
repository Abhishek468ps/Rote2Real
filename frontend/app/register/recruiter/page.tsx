"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import RecruiterForm from "@/components/auth/recruiter/RecruiterForm";

export default function RecruiterRegisterPage() {
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
      title="Recruiter Registration"
      subtitle="
      Join Brain Train AI Ecosystem
      and connect with future-ready
      engineers, AI talent and industry
      professionals.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <RecruiterForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}