"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import JudgeForm from "@/components/auth/judge/JudgeForm";

export default function JudgeRegisterPage() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 6) {
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
      title="Judge Registration"
      subtitle="
      Join Brain Train as an industry
      judge and contribute to talent
      evaluation, innovation challenges,
      hackathons and adaptive intelligence
      programs.
      "
    >
      <ProgressStepper currentStep={step} />

      <div className="mt-12">
        <JudgeForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}