"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import ViewerForm from "@/components/auth/viewer/ViewerForm";

export default function ViewerRegisterPage() {
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
      title="Viewer Registration"
      subtitle="
      Join the Brain Train ecosystem and
      explore AI content, research,
      internships, industry insights and
      personalized recommendations.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <ViewerForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}