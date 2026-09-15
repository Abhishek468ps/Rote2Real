"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/common/AuthLayout";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import DoctorForm from "@/components/auth/doctor/DoctorForm";

export default function DoctorRegisterPage() {
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
      title="Doctor Registration"
      subtitle="
      Join Brain Train Healthcare
      Ecosystem and collaborate with
      AI driven healthcare innovation.
      "
    >
      <ProgressStepper
        currentStep={step}
      />

      <div className="mt-12">
        <DoctorForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}