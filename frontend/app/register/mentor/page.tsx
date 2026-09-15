"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import MentorForm from "@/components/auth/mentor/MentorForm";

export default function MentorRegisterPage() {
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
      title="Mentor Registration"
      subtitle="
      Join Brain Train AI ecosystem
      as a mentor and help build the
      next generation of engineers.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <MentorForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}