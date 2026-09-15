"use client";

import { useState } from "react";


import FileUpload from "../common/FileUpload";
import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";

interface InstitutionFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function InstitutionForm({
  step,
  nextStep,
  previousStep,
}: InstitutionFormProps) {


  const [institutionLogo, setInstitutionLogo] =
  useState<File | null>(null);

const [
  accreditationCertificate,
  setAccreditationCertificate,
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
  institutionName: "",
  institutionType: "",
  officialEmail: "",
  phone: "",

  affiliation: "",
  accreditation: "",
  website: "",
  headquartersLocation: "",

  contactPersonName: "",
  designation: "",
  linkedinProfile: "",

  totalStudents: "",
  totalFaculty: "",
  establishedYear: "",

  description: "",
  industryCollaborationDetails: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ==========================
      STEP 1
      BASIC DETAILS
  ========================== */

  if (step === 0) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Institution Name"
            name="institutionName"
            value={form.institutionName}
            onChange={handleChange}
          />

          <Input
            label="Institution Type"
            name="institutionType"
            value={form.institutionType}
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

  /* ==========================
      STEP 2
      EMAIL VERIFICATION
  ========================== */

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

  /* ==========================
      STEP 3
      ORGANIZATION DETAILS
  ========================== */

  if (step === 2) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

          <Input
          label="Affiliation"
          name="affiliation"
          value={form.affiliation}
          onChange={handleChange}
        />


           <Input
          label="Accreditation"
          name="accreditation"
          value={form.accreditation}
          onChange={handleChange}
        />

        <Input
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
        />

         <Input
          label="Headquarters Location"
          name="headquartersLocation"
          value={form.headquartersLocation}
          onChange={handleChange}
        />

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
          label="Total Students"
          name="totalStudents"
          value={form.totalStudents}
          onChange={handleChange}
        />

        <Input
          label="Total Faculty"
          name="totalFaculty"
          value={form.totalFaculty}
          onChange={handleChange}
        />

        <Input
          label="Established Year"
          name="establishedYear"
          value={form.establishedYear}
          onChange={handleChange}
        />

         <Input
          label="Institution Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Input
          label="Industry Collaboration Details"
          name="industryCollaborationDetails"
          value={form.industryCollaborationDetails}
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

  /* ==========================
      STEP 4
      DOCUMENTS
  ========================== */

  if (step === 3) {
    return (
      <>
         <div className="space-y-6">

        <FileUpload
          label="Institution Logo"
          accept=".png,.jpg,.jpeg,.svg"
          maxSizeMB={5}
          onFileSelect={setInstitutionLogo}
        />

        <FileUpload
          label="Accreditation Certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={15}
          onFileSelect={
            setAccreditationCertificate
          }
        />

        <FileUpload
          label="Registration Certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={15}
          onFileSelect={
            setRegistrationCertificate
          }
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

  /* ==========================
      STEP 5
      TERMS
  ========================== */
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

  /* ==========================
      STEP 6
      SUCCESS
  ========================== */
if (step === 5) {
  return (
    <SuccessScreen
      fullName={form.institutionName}
      role="Institution"
      brainTrainId="BT-INS-2026-0001"
      dashboardUrl="/dashboard/institution"
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