"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FileUpload from "../common/FileUpload";
import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";

interface CompanyFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function CompanyForm({
  step,
  nextStep,
  previousStep,
}: CompanyFormProps) {
  const router = useRouter();

  const [companyLogo, setCompanyLogo] =
    useState<File | null>(null);

    const [
  identityVerification,
  setIdentityVerification,
] = useState<File | null>(null);

  const [
    registrationCertificate,
    setRegistrationCertificate,
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
  companyName: "",
  officialEmail: "",
  phoneNumber: "",

  website: "",
  industryType: "",
  companySize: "",
  headquartersLocation: "",
  gstNumber: "",

  contactPersonName: "",
  designation: "",
  linkedinProfile: "",

  establishedYear: "",
  description: "",
  hiringDomains: "",
  totalEmployees: "",
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
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />

          <Input
            label="Official Email"
            name="officialEmail"
            value={form.officialEmail}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
value={form.phoneNumber}
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
        email={form.officialEmail}
        onVerify={() => {
          nextStep();
        }}
      />
    );
  }

  /* ============================
      STEP 3
      COMPANY DETAILS
  ============================ */

  if (step === 2) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />

          <Input
            label="Industry Type"
            name="industryType"
            value={form.industryType}
            onChange={handleChange}
          />

          <Input
            label="Company Size"
            name="companySize"
            value={form.companySize}
            onChange={handleChange}
          />

          <Input
            label="Headquarters Location"
            name="headquartersLocation"
value={form.headquartersLocation}
            onChange={handleChange}
          />

          <Input
            label="GST Number"
            name="gstNumber"
            value={form.gstNumber}
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
      CONTACT PERSON
  ============================ */

  if (step === 3) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
  label="Contact Person Name"
  name="contactPersonName"
  value={form.contactPersonName}
  onChange={handleChange}
/>

<Input
  label="Designation"
  name="designation"
  value={form.designation}
  onChange={handleChange}
/>

          <Input
  label="LinkedIn Profile"
  name="linkedinProfile"
  value={form.linkedinProfile}
  onChange={handleChange}
/>

<Input
  label="Established Year"
  name="establishedYear"
  value={form.establishedYear}
  onChange={handleChange}
/>

<Input
  label="Total Employees"
  name="totalEmployees"
  value={form.totalEmployees}
  onChange={handleChange}
/>

<Input
  label="Hiring Domains"
  name="hiringDomains"
  value={form.hiringDomains}
  onChange={handleChange}
/>

<Input
  label="Company Description"
  name="description"
  value={form.description}
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
      STEP 5
      DOCUMENT UPLOAD
  ============================ */

  if (step === 4) {
    return (
      <>
        <div className="space-y-6">

          <FileUpload
            label="Company Logo Upload"
            accept=".png,.jpg,.jpeg,.svg"
            maxSizeMB={5}
            onFileSelect={setCompanyLogo}
          />

          <FileUpload
            label="Registration Certificate Upload"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSizeMB={10}
            onFileSelect={
              setRegistrationCertificate
            }
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
      STEP 6
      TERMS & POLICIES
  ============================ */

  if (step === 5) {
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
      STEP 7
      SUCCESS SCREEN
  ============================ */

  if (step === 6) {
    return (
      <SuccessScreen
        fullName={form.companyName}
        role="Company"
        brainTrainId="BT-COMP-2026-0001"
        dashboardUrl="/dashboard/company"
      />
    );
  }

  /* ============================
      STEP 8
      REDIRECT
  ============================ */

  if (step === 7) {
    router.push("/dashboard/company");

    return null;
  }

  return null;
}

/* ===================================== */

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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