"use client";

import { useState } from "react";


import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";
import FileUpload from "../common/FileUpload";

interface ViewerFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function ViewerForm({
  step,
  nextStep,
  previousStep,
}: ViewerFormProps) {

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

  organizationName: "",
  designation: "",
  purposeOfJoining: "",

  linkedinProfile: "",
  portfolioWebsite: "",
});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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
            px-8
            py-4
            font-semibold
            text-white
            hover:bg-indigo-500
            transition
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
      EMAIL VERIFICATION
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
      INTERESTS
  ============================ */

  if (step === 2) {
    return (
      <>
        <div className="space-y-6">

           <Input
    label="Organization Name"
    name="organizationName"
    value={form.organizationName}
    onChange={handleChange}
  />

           <Input
    label="Designation"
    name="designation"
    value={form.designation}
    onChange={handleChange}
  />

  <Input
    label="Purpose Of Joining"
    name="purposeOfJoining"
    value={form.purposeOfJoining}
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
            px-8
            py-4
            text-white
            "
          >
            Previous
          </button>

          <button
            onClick={nextStep}
            className="
            rounded-2xl
            bg-indigo-600
            px-8
            py-4
            text-white
            "
          >
            Continue
          </button>

        </div>
      </>
    );
  }


  if (step === 3) {
  return (
    <>
      <FileUpload
        label="Identity Verification Upload"
        accept=".pdf,.jpg,.jpeg,.png"
        maxSizeMB={5}
        onFileSelect={setIdentityVerification}
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
      TERMS
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
      SUCCESS
  ============================ */

 if (step === 5) {
  return (
    <SuccessScreen
      fullName={form.fullName}
      role="Viewer"
      brainTrainId="BT-VIEW-2026-0001"
      dashboardUrl="/dashboard/viewer"
    />
  );
}

  /* ============================
      STEP 6
      REDIRECT
  ============================ */

 

  return null;
}

/* ===================================== */

interface InputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function Input({
  label,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>

      <label
        className="
        block
        mb-3
        text-sm
        text-gray-400
        "
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
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

/* ===================================== */

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

function SelectInput({
  label,
  name,
  value,
  options,
  onChange,
}: SelectProps) {
  return (
    <div>

      <label
        className="
        block
        mb-3
        text-sm
        text-gray-400
        "
      >
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
        w-full
        rounded-2xl
        border
        border-white/10
        bg-[#0B1220]
        px-5
        py-4
        text-white
        outline-none
        focus:border-indigo-500
        "
      >
        <option value="">
          Select Preference
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}