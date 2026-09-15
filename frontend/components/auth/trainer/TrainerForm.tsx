"use client";

import { useState } from "react";


import FileUpload from "../common/FileUpload";
import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";

interface TrainerFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function TrainerForm({
  step,
  nextStep,
  previousStep,
}: TrainerFormProps) {
 

  const [resume, setResume] =
    useState<File | null>(null);

  const [
    certifications,
    setCertifications,
  ] = useState<File | null>(null);

const [acceptedTerms, setAcceptedTerms] =
  useState(false);

const [acceptedPrivacy, setAcceptedPrivacy] =
  useState(false);

const [
  acceptedCommunication,
  setAcceptedCommunication,
] = useState(false);

 const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",

  expertiseDomains: "",
  yearsOfExperience: "",
  trainingExperience: "",

  linkedinProfile: "",
  githubProfile: "",
  portfolioWebsite: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ============================
      STEP 1
      BASIC DETAILS
  ============================ */

  if (step === 0) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={nextStep}
            className="
            rounded-2xl
            bg-indigo-600
            px-8 py-4
            text-white
            font-semibold
            "
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  /* ============================
      STEP 2
      OTP VERIFICATION
  ============================ */

  if (step === 1) {
    return (
      <OTPVerification
      type="register"
        email={form.email}
        onVerify={() => {
          nextStep();
        }}
      />
    );
  }

  /* ============================
      STEP 3
      PROFESSIONAL DETAILS
  ============================ */

  if (step === 2) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Expertise Domains"
            name="expertiseDomains"
            value={form.expertiseDomains}
            onChange={handleChange}
          />

          <Input
  label="Years of Experience"
  name="yearsOfExperience"
  value={form.yearsOfExperience}
  onChange={handleChange}
/>

          <Input
            label="Training Experience"
            name="trainingExperience"
            value={form.trainingExperience}
            onChange={handleChange}
          />

         <Input
  label="LinkedIn Profile"
  name="linkedinProfile"
  value={form.linkedinProfile}
  onChange={handleChange}
/>

          <Input
  label="GitHub Profile"
  name="githubProfile"
  value={form.githubProfile}
  onChange={handleChange}
/>

         <Input
  label="Portfolio Website"
  name="portfolioWebsite"
  value={form.portfolioWebsite}
  onChange={handleChange}
/>

        </div>

        <div className="mt-10 flex justify-between">

          <button
            onClick={previousStep}
            className="
            rounded-2xl
            border border-white/10
            px-8 py-4
            "
          >
            Previous
          </button>

          <button
            onClick={nextStep}
            className="
            rounded-2xl
            bg-indigo-600
            px-8 py-4
            text-white
            "
          >
            Continue
          </button>

        </div>
      </>
    );
  }

  /* ============================
      STEP 4
      DOCUMENT UPLOAD
  ============================ */

  if (step === 3) {
    return (
      <>
        <div className="space-y-6">

          <FileUpload
            label="Resume Upload"
            accept=".pdf,.doc,.docx"
            maxSizeMB={10}
            onFileSelect={setResume}
          />

          <FileUpload
            label="Certifications Upload"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSizeMB={10}
            onFileSelect={setCertifications}
          />

        </div>

        <div className="mt-10 flex justify-between">

          <button
            onClick={previousStep}
            className="
            rounded-2xl
            border border-white/10
            px-8 py-4
            "
          >
            Previous
          </button>

          <button
            onClick={nextStep}
            className="
            rounded-2xl
            bg-indigo-600
            px-8 py-4
            text-white
            "
          >
            Continue
          </button>

        </div>
      </>
    );
  }

  /* ============================
      STEP 5
      TERMS & POLICIES
  ============================ */

 if (step === 4) {
  return (
    <>
      <TermsAndPolicies
        acceptedTerms={acceptedTerms}
        acceptedPrivacy={acceptedPrivacy}
        acceptedCommunication={
          acceptedCommunication
        }
        onChange={(field, value) => {
          if (field === "terms") {
            setAcceptedTerms(value);
          }

          if (field === "privacy") {
            setAcceptedPrivacy(value);
          }

          if (
            field === "communication"
          ) {
            setAcceptedCommunication(
              value
            );
          }
        }}
      />

      <div className="mt-10 flex justify-between">

        <button
          onClick={previousStep}
          className="
          rounded-2xl
          border border-white/10
          px-8 py-4
          text-white
          "
        >
          Previous
        </button>

        <button
          onClick={() => {
            if (
              !acceptedTerms ||
              !acceptedPrivacy ||
              !acceptedCommunication
            ) {
              return;
            }

            nextStep();
          }}
          className="
          rounded-2xl
          bg-indigo-600
          px-8 py-4
          text-white
          "
        >
          Continue
        </button>

      </div>
    </>
  );
}

  /* ============================
      STEP 6
      SUCCESS SCREEN
  ============================ */

 if (step === 5) {
  return (
    <SuccessScreen
      fullName={form.fullName}
      role="Trainer"
      brainTrainId="BT-VIEW-2026-0001"
      dashboardUrl="/dashboard/trainer"
    />
  );
}



  return null;
}

/* ===================================== */

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function Input({
  label,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <div>

      <label
        className="
        block
        text-sm
        text-gray-400
        mb-3
        "
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        px-5
        py-4
        text-white
        outline-none
        focus:border-indigo-500
        "
      />

    </div>
  );
}