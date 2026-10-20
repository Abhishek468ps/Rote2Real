
"use client";

import AuthLayout from "@/components/auth/common/AuthLayout";
import StudentForm from "@/components/auth/student/StudentForm";
import ProgressStepper from "@/components/auth/common/ProgressStepper";
import { useState } from "react";

export default function StudentRegisterPage() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <AuthLayout
      title="Student Registration"
      subtitle="Join Brain Train AI ecosystem and unlock internships, evaluations and opportunities."
    >
       <ProgressStepper
          currentStep={step}
        />

      <div className="mt-12">
        <StudentForm
          step={step}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </AuthLayout>
  );
}