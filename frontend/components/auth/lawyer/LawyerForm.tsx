"use client";

import { useState } from "react";


import FileUpload from "../common/FileUpload";
import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";

interface LawyerFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function LawyerForm({
  step,
  nextStep,
  previousStep,
}: LawyerFormProps) {
 

 const [resume, setResume] =
  useState<File | null>(null);

const [barLicense, setBarLicense] =
  useState<File | null>(null);

const [identityVerification, setIdentityVerification] =
  useState<File | null>(null);

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

  specialization: "",
  yearsOfExperience: "",
  lawFirmName: "",
  designation: "",

  barCouncilRegistrationNumber: "",
  barCouncilName: "",

  linkedinProfile: "",
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
            px-8
            py-4
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
  ============================ */

  if (step === 2) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
  label="Legal Specialization"
  name="specialization"
  value={form.specialization}
  onChange={handleChange}
/>

<Input
  label="Years of Experience"
  name="yearsOfExperience"
  value={form.yearsOfExperience}
  onChange={handleChange}
/>

<Input
  label="Law Firm Name"
  name="lawFirmName"
  value={form.lawFirmName}
  onChange={handleChange}
/>

          <Input
  label="Designation"
  name="designation"
  value={form.designation}
  onChange={handleChange}
/>

<Input
  label="Bar Council Registration Number"
  name="barCouncilRegistrationNumber"
  value={form.barCouncilRegistrationNumber}
  onChange={handleChange}
/>

<Input
  label="Bar Council Name"
  name="barCouncilName"
  value={form.barCouncilName}
  onChange={handleChange}
/>

<Input
  label="LinkedIn Profile"
  name="linkedinProfile"
  value={form.linkedinProfile}
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
    label="Bar License Upload"
    accept=".pdf,.jpg,.jpeg,.png"
    maxSizeMB={10}
    onFileSelect={setBarLicense}
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

  /* ============================
      STEP 5
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
          Create Lawyer Account
        </button>

      </div>
    </>
  );
}

  /* ============================
      STEP 6
  ============================ */

if (step === 5) {
  return (
    <SuccessScreen
      fullName={form.fullName}
      role="Lawyer"
      brainTrainId="BT-LAW-2026-0001"
      dashboardUrl="/dashboard/lawyer"
    />
  );
}


  return null;
}

/* ====================================== */

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