"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import CompanyForm from "@/components/auth/company/CompanyForm";

export default function CompanyRegisterPage() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 7) {
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
      title="Company Registration"
      subtitle="
      Join the Brain Train ecosystem and
      connect with skilled talent,
      industry projects, internships,
      and hiring opportunities.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <CompanyForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}