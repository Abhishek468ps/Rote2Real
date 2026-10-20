"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import TrainerForm from "@/components/auth/trainer/TrainerForm";

export default function TrainerRegisterPage() {
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
      title="Trainer Registration"
      subtitle="
      Join Brain Train as a trainer and
      help professionals and students
      build industry ready skills.
      "
    >
      <ProgressStepper currentStep={step} />

      <div className="mt-12">
        <TrainerForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}