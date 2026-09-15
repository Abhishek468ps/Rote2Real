"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import InstitutionForm from "@/components/auth/institution/InstitutionForm";

export default function InstitutionRegisterPage() {
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
      title="Institution Registration"
      subtitle="
      Join the Brain Train ecosystem and
      unlock internships, evaluations,
      hiring pipelines and industry
      collaboration opportunities.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <InstitutionForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}