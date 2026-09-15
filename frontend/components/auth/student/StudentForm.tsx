"use client";

import { useEffect, useState } from "react";
import FileUpload from "../common/FileUpload";
import OTPVerification from "@/components/auth/common/OTPVerification"
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_ENDPOINTS }
from "@/lib/api";

import { toast } from "sonner";

interface StudentFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function StudentForm({
  step,
  nextStep,
  previousStep,
}: StudentFormProps) {
 const [resume, setResume] =
  useState<File | null>(null);

  const router = useRouter();

const [acceptedTerms, setAcceptedTerms] = useState(false);
const [brainTrainId, setBrainTrainId] =
useState("");

const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

const [acceptedCommunication, setAcceptedCommunication] = useState(false);

interface MvpDomain {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  active: boolean;
  displayOrder: number;
}

const [domains, setDomains] = useState<MvpDomain[]>([]);
const [loadingDomains, setLoadingDomains] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    department: "",
    graduationYear: "",
    skills: "",
    mvpDomainId:  "",
  });

  useEffect(() => {
  const loadDomains = async () => {
    try {
      setLoadingDomains(true);

      const response = await fetch(
        API_ENDPOINTS.MVP_DOMAINS
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load domains: ${response.status}`
        );
      }

         const data: MvpDomain[] = await response.json();

          setDomains(data);
    } catch (error) {
      console.error("Failed to load MVP domains:", error);
      toast.error("Unable to load MVP domains.");
    } finally {
      setLoadingDomains(false);
    }
  };

  loadDomains();
}, []);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = () => {

  // Step 0
  if (step === 0) {

    if (!form.fullName.trim()) {
toast.error("Please enter your full name.");
      return false;
    }

    if (!form.email.trim()) {
toast.error("Please enter your email address.");
      return false;
    }

    if (!form.phone.trim()) {
toast.error("Please enter your phone number.");
      return false;
    }

    return true;
  }

  // Step 2
  if (step === 2) {

    if (!form.college.trim()) {
      toast.error("Please enter your college name.");
      return false;
    }

    if (!form.degree.trim()) {
toast.error("Please enter your degree.");
      return false;
    }

    if (!form.department.trim()) {
toast.error("Please enter your department.");
      return false;
    }

    if (!form.graduationYear.trim()) {
toast.error("Please enter your graduation year.");
      return false;
    }

     if (!form.mvpDomainId) {
  toast.error("Please select an MVP domain.");
  return false;
}

    return true;
  }

  // Step 3
  if (step === 3) {

    if (!form.skills.trim()) {
      toast.error("Please enter your skills.");
      return false;
    }

    if (!resume) {
     toast.error("Please upload your resume.");
      return false;
    }

    return true;
  }

  return true;
};


  const registerStudent = async () => {

  try {
    // Upload Resume First
const formData = new FormData();

formData.append(
  "file",
  resume!
);

const uploadResponse =
await fetch(
  API_ENDPOINTS.UPLOAD_RESUME,
  {
    method: "POST",
    body: formData,
  }
);

if (!uploadResponse.ok) {
toast.error("Unable to upload your resume. Please try again.");
  return;
}

const resumeUrl =
await uploadResponse.text();

    const response = await fetch(
      API_ENDPOINTS.REGISTER,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          fullName: form.fullName,

          email: form.email,

          password: "123456",

          phone: form.phone,

          role: "STUDENT",

          profile: {

            college: form.college,

            degree: form.degree,

            department: form.department,

            graduationYear:
              Number(form.graduationYear),

            skills: form.skills,
            resumeUrl: resumeUrl,
            mvpDomainId: Number(form.mvpDomainId) 

          }

        })

      }

    );

    if (!response.ok) {

toast.error("Registration could not be completed. Please try again.");

      return;

    }

    const data =
      await response.json();

    console.log(data);

    setBrainTrainId(
      data.braintrainId
    );

    toast.success(
  "Your account has been created successfully."
);

    nextStep();

  }

  catch (error) {

    console.log(error);

    toast.error("Registration could not be completed. Please try again.");

  }

};

  if (step === 0) {
  return (
    <>
    <div className="grid md:grid-cols-2 gap-6">

      <Input
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
         required
        
      />

      <Input
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
         required
       
      />

      <Input
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
         required
      />

       </div>
        <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={() => {

  if (validateStep()) {

    nextStep();

  }

}}
          className="
          rounded-2xl
          bg-indigo-600
          px-8
          py-4
          text-white
          "
        >
          Next
        </button>
      </div>

      <div className="mt-6 text-center">
 <p className="mt-6 text-center text-gray-400">
  Already have an account?{" "}
  <Link
    href="/login"
    className="font-semibold text-indigo-400 hover:text-indigo-300"
  >
    Login
  </Link>
</p>
</div>
    </>
  );
}

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

     if (step === 2) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">

        <Input
          label="College"
          name="college"
          value={form.college}
          onChange={handleChange}
           required
        />

        <Input
          label="Degree"
          name="degree"
          value={form.degree}
          onChange={handleChange}
           required
        />

        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
           required
        />

        <Input
          label="Graduation Year"
          name="graduationYear"
          value={form.graduationYear}
          onChange={handleChange}
           required
        />

        {/* MVP DOMAIN */}
  <div>
    <label
      className="
        block
        text-sm
        text-gray-400
        mb-3
      "
    >
      MVP Domain
      <span className="text-red-500 ml-1">*</span>
    </label>

    <select
    name="mvpDomainId"
    value={form.mvpDomainId}
    onChange={(e) =>
      setForm({
        ...form,
        mvpDomainId: e.target.value,
      })
    }
      disabled={loadingDomains}
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
        text-white
      "
    >
      <option value="" className="bg-gray-900">
        {loadingDomains
          ? "Loading domains..."
          : "Select MVP Domain"}
      </option>

      {domains.map((domain) => (
  <option
    key={domain.id}
    value={domain.id}
    className="bg-gray-900"
  >
    {domain.name}
  </option>
))}
    </select>
  </div>

      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={previousStep}
          className="
          rounded-2xl
          border border-white/10
          px-8
          py-4
          "
        >
          Previous
        </button>

        <button
          type="button"
         onClick={() => {

  if (validateStep()) {

    nextStep();

  }

}}
          className="
          rounded-2xl
          bg-indigo-600
          px-8
          py-4
          text-white
          "
        >
          Next
        </button>
      </div>
    </>
  );
}

  if (step === 3) {
  return (
    <>
      <Input
        label="Skills"
        name="skills"
        value={form.skills}
        onChange={handleChange}
         required
      />

      <div className="mt-6">
        <FileUpload
          label="Resume Upload"
          accept=".pdf,.doc,.docx"
          maxSizeMB={5}
          onFileSelect={setResume}
        />
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={previousStep}
        >
          Previous
        </button>

        <button
          type="button"
         onClick={() => {

  if (validateStep()) {

    nextStep();

  }

}}
        >
          Next
        </button>
      </div>
    </>
  );
}

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
          type="button"
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
          type="button"
          disabled={
            !acceptedTerms ||
            !acceptedPrivacy ||
            !acceptedCommunication
          }
         onClick={registerStudent}
          className="
          rounded-2xl
          bg-indigo-600
          px-8
          py-4
          text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
          "
        >
          Create Account
        </button>

      </div>
    </>
  );
}

if (step === 5) {
  return (
    <SuccessScreen
      fullName={form.fullName}
      role="Student"
      brainTrainId={brainTrainId}
      dashboardUrl="/dashboard/student"
    />
  );
}



  return null;
} // <- StudentForm yahan close hota hai


interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}

function Input({
  label,
  name,
  value,
  onChange,
  required = false,
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
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
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





