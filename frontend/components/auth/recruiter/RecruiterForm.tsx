"use client";

import { useState } from "react";


import FileUpload from "../common/FileUpload";
import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";

interface RecruiterFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function RecruiterForm({
  step,
  nextStep,
  previousStep,
}: RecruiterFormProps) {
 

 const [acceptedTerms, setAcceptedTerms] =
  useState(false);

const [acceptedPrivacy, setAcceptedPrivacy] =
  useState(false);

const [
  acceptedCommunication,
  setAcceptedCommunication,
] = useState(false);

  const [resume, setResume] =
  useState<File | null>(null);

const [identityVerification, setIdentityVerification] =
  useState<File | null>(null);

 const [form, setForm] = useState({
  fullName: "",
  companyName: "",
  designation: "",
  companyEmail: "",

  industryType: "",

  hiringDomains: "",
  yearsOfExperience: "",
  hiringVolume: "",

  linkedinProfile: "",
  companyWebsite: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================================
      STEP 1
  ===================================== */

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
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />

          <Input
            label="Designation"
            name="designation"
            value={form.designation}
            onChange={handleChange}
          />

          <Input
            label="Company Email"
            name="companyEmail"
            value={form.companyEmail}
            onChange={handleChange}
          />

        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={nextStep}
            className="
            rounded-2xl
            bg-indigo-600
            px-8
            py-4
            font-semibold
            text-white
            "
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  /* =====================================
      STEP 2
  ===================================== */

  if (step === 1) {
    return (
      <OTPVerification
      type="register"
        email={form.companyEmail}
        onVerify={() => {
          nextStep();
        }}
      />
    );
  }

  /* =====================================
      STEP 3
  ===================================== */

  if (step === 2) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

        <Input
  label="Industry Type"
  name="industryType"
  value={form.industryType}
  onChange={handleChange}
/>

<Input
  label="Hiring Domains"
  name="hiringDomains"
  value={form.hiringDomains}
  onChange={handleChange}
/>

<Input
  label="Years of Experience"
  name="yearsOfExperience"
  value={form.yearsOfExperience}
  onChange={handleChange}
/>

<Input
  label="Annual Hiring Volume"
  name="hiringVolume"
  value={form.hiringVolume}
  onChange={handleChange}
/>

<Input
  label="LinkedIn Profile"
  name="linkedinProfile"
  value={form.linkedinProfile}
  onChange={handleChange}
/>

<Input
  label="Company Website"
  name="companyWebsite"
  value={form.companyWebsite}
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

  /* =====================================
      STEP 4
  ===================================== */

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
      label="Identity Verification Upload"
      accept=".pdf,.jpg,.jpeg,.png"
      maxSizeMB={10}
      onFileSelect={setIdentityVerification}
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

  /* =====================================
      STEP 5
  ===================================== */

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

          if (field === "communication") {
            setAcceptedCommunication(value);
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
          "
        >
          Previous
        </button>

        <button
          disabled={
            !acceptedTerms ||
            !acceptedPrivacy ||
            !acceptedCommunication
          }
          onClick={nextStep}
          className="
          rounded-2xl
          bg-indigo-600
          px-8 py-4
          text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
          "
        >
          Create Recruiter Account
        </button>

      </div>
    </>
  );
}

  /* =====================================
      STEP 6
  ===================================== */
if (step === 5) {
  return (
    <SuccessScreen
      fullName={form.fullName}
      role="Recruiter"
      brainTrainId="BT-REC-2026-0001"
      dashboardUrl="/dashboard/recruiter"
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
        outline-none
        focus:border-indigo-500
        "
      />

    </div>
  );
}