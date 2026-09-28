"use client";

import { useState } from "react";

import FileUpload from "../common/FileUpload";
import OTPVerification from "../common/OTPVerification";
import TermsAndPolicies from "../common/TermsAndPolicies";
import SuccessScreen from "../common/SuccessScreen";
import { API_ENDPOINTS } from "@/lib/api";


interface MentorFormProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
}

export default function MentorForm({
  step,
  nextStep,
  previousStep,
}: MentorFormProps) {
 

  const [resume, setResume] =
    useState<File | null>(null);
    const [resumeUrl, setResumeUrl] = useState("");
const [isUploadingResume, setIsUploadingResume] =
  useState(false);

  const [acceptedTerms, setAcceptedTerms] =
  useState(false);

const [acceptedPrivacy, setAcceptedPrivacy] =
  useState(false);

  const [isRegistering, setIsRegistering] = useState(false);
const [registrationError, setRegistrationError] = useState("");
const [brainTrainId, setBrainTrainId] = useState("");

const [
  acceptedCommunication,
  setAcceptedCommunication,
] = useState(false);

 const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",

  expertiseDomain: "",
  yearsOfExperience: "",

  organizationName: "",
  designation: "",

  linkedinProfile: "",
  githubProfile: "",
  portfolioWebsite: "",

   // Mentor capabilities
  skills: [] as string[],
  mentoringCapabilities: [] as string[],

  // Mentoring capacity
  mentoringHoursPerWeek: "",
  maximumStudents: "",
  mentoringMode: "",
  preferredStudentLevels: [] as string[],

  // MVP preferences
  mvpTypes: [] as string[],

  // Availability
  availabilityDays: [] as string[],
  availabilityTime: "",

  // Contribution preferences
  contributionTypes: [] as string[],
  sponsorshipType: "",

  // Additional contribution capabilities
  canReviewProjects: false,
  canDemonstrateProjects: false,
  canProvideIndustryProblem: false,
  canProvideNetworking: false,
});

const handleResumeUpload = async (file: File) => {
  try {
    setIsUploadingResume(true);
    setRegistrationError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      API_ENDPOINTS.UPLOAD_RESUME,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
        data?.error ||
        "Resume upload failed"
      );
    }

    setResumeUrl(
      data.url ||
      data.resumeUrl ||
      data.fileUrl ||
      ""
    );

  } catch (error) {
    console.error(
      "Resume upload error:",
      error
    );

    setRegistrationError(
      error instanceof Error
        ? error.message
        : "Resume upload failed"
    );
  } finally {
    setIsUploadingResume(false);
  }
};

const handleMentorRegistration = async () => {
  try {
    setIsRegistering(true);
    setRegistrationError("");

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: "", // IMPORTANT: see note below
      role: "MENTOR",

      profile: {
        expertiseDomain: form.expertiseDomain,
        yearsOfExperience: form.yearsOfExperience,

        organizationName: form.organizationName,
        designation: form.designation,

        linkedinProfile: form.linkedinProfile,
        githubProfile: form.githubProfile,
        portfolioWebsite: form.portfolioWebsite,

        skills: form.skills,
        mentoringCapabilities:
          form.mentoringCapabilities,

        mentoringHoursPerWeek:
          form.mentoringHoursPerWeek,

        maximumStudents:
          form.maximumStudents,

        mentoringMode:
          form.mentoringMode,

        preferredStudentLevels:
          form.preferredStudentLevels,

        mvpTypes:
          form.mvpTypes,

        availabilityDays:
          form.availabilityDays,

        availabilityTime:
          form.availabilityTime,

        contributionTypes:
          form.contributionTypes,

        sponsorshipType:
          form.sponsorshipType,

        canReviewProjects:
          form.canReviewProjects,

        canDemonstrateProjects:
          form.canDemonstrateProjects,

        canProvideIndustryProblem:
          form.canProvideIndustryProblem,

        canProvideNetworking:
          form.canProvideNetworking,

       resumeUrl: resumeUrl || null,
      },
    };

    const response = await fetch(
      API_ENDPOINTS.REGISTER,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
        data?.error ||
        "Mentor registration failed"
      );
    }

    setBrainTrainId(data.brainTrainId);

    nextStep();

  } catch (error) {
    console.error(
      "Mentor registration error:",
      error
    );

    setRegistrationError(
      error instanceof Error
        ? error.message
        : "Registration failed"
    );
  } finally {
    setIsRegistering(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleArrayValue = (
  field:
    | "skills"
    | "mentoringCapabilities"
    | "preferredStudentLevels"
    | "mvpTypes"
    | "availabilityDays"
    | "contributionTypes",
  value: string
) => {
  setForm((prev) => {
    const currentValues = prev[field];

    return {
      ...prev,
      [field]: currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    };
  });
};

  /* -------------------------------- */
  /* STEP 1 */
  /* -------------------------------- */

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

          <Input
  label="Years of Experience"
  name="yearsOfExperience"
  value={form.yearsOfExperience}
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

  /* -------------------------------- */
  /* STEP 2 */
  /* -------------------------------- */

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

  /* -------------------------------- */
  /* STEP 3 */
  /* -------------------------------- */

  if (step === 2) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-6">

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

<div>
  <label className="block text-sm text-gray-400 mb-3">
    Primary Domain
  </label>

  <select
    name="expertiseDomain"
    value={form.expertiseDomain}
    onChange={(e) =>
      setForm({
        ...form,
        expertiseDomain: e.target.value,
      })
    }
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
  >
    <option value="">Select your primary domain</option>
    <option value="Software Development">
      Software Development
    </option>
    <option value="AI / ML">
      AI / ML
    </option>
    <option value="Data Science">
      Data Science
    </option>
    <option value="UI / UX">
      UI / UX
    </option>
    <option value="Product">
      Product
    </option>
    <option value="Cybersecurity">
      Cybersecurity
    </option>
    <option value="Cloud / DevOps">
      Cloud / DevOps
    </option>
    <option value="Biotechnology">
      Biotechnology
    </option>
    <option value="Business / Marketing">
      Business / Marketing
    </option>
    <option value="Other">
      Other
    </option>
  </select>
</div>

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

    /* -------------------------------- */
/* STEP 4 - SKILLS & CAPABILITIES */
/* -------------------------------- */

if (step === 3) {
  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Next.js",
    "Spring Boot",
    "Django",
    "Machine Learning",
    "NLP",
    "Data Analytics",
    "SQL",
    "UI/UX",
    "Product Management",
    "Marketing",
    "Business",
    "Biotechnology",
    "Other",
  ];

  const capabilities = [
    "Technical mentoring",
    "Code review",
    "Project review",
    "Debugging guidance",
    "Architecture guidance",
    "UI/UX feedback",
    "Product feedback",
    "Industry problem statement",
    "MVP demonstration",
    "Career guidance",
    "Interview guidance",
    "Networking / introduction",
  ];

   const studentLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const mvpTypes = [
    "Software Development",
    "AI / ML",
    "Data Analytics",
    "Product / Startup",
    "UI / UX",
    "Other",
  ];

  return (
    <>
      <div className="space-y-10">

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Your Skills
          </h3>

          <p className="text-sm text-gray-400 mb-5">
            Select the skills you can use to support students.
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <CheckboxOption
                key={skill}
                label={skill}
                checked={form.skills.includes(skill)}
                onChange={() =>
                  toggleArrayValue("skills", skill)
                }
              />
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            How can you contribute to a student's MVP journey?
          </h3>

          <p className="text-sm text-gray-400 mb-5">
            Select all the areas where you can provide support.
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {capabilities.map((capability) => (
              <CheckboxOption
                key={capability}
                label={capability}
                checked={form.mentoringCapabilities.includes(
                  capability
                )}
                onChange={() =>
                  toggleArrayValue(
                    "mentoringCapabilities",
                    capability
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* MVP Types */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Which MVP types can you support?
          </h3>

          <div className="grid md:grid-cols-2 gap-3 mt-5">
            {mvpTypes.map((type) => (
              <CheckboxOption
                key={type}
                label={type}
                checked={form.mvpTypes.includes(type)}
                onChange={() =>
                  toggleArrayValue("mvpTypes", type)
                }
              />
            ))}
          </div>
        </div>

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
            font-semibold
          "
        >
          Continue
        </button>

      </div>
    </>
  );
}

  /* -------------------------------- */
/* STEP 5 - MENTORING CAPACITY */
/* -------------------------------- */

if (step === 4) {
  const studentLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const availabilityDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <div className="space-y-10">

        {/* Hours */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            How much mentoring time can you contribute?
          </label>

          <select
            value={form.mentoringHoursPerWeek}
            onChange={(e) =>
              setForm({
                ...form,
                mentoringHoursPerWeek: e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-5 py-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          >
            <option value="">
              Select weekly availability
            </option>

            <option value="1">
              1 hour/week
            </option>

            <option value="2">
              2 hours/week
            </option>

            <option value="4">
              4 hours/week
            </option>

            <option value="6">
              6 hours/week
            </option>

            <option value="8+">
              8+ hours/week
            </option>
          </select>
        </div>

        {/* Maximum Students */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            How many students can you mentor at a time?
          </label>

          <select
            value={form.maximumStudents}
            onChange={(e) =>
              setForm({
                ...form,
                maximumStudents: e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-5 py-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          >
            <option value="">
              Select maximum students
            </option>

            <option value="1">1 student</option>
            <option value="2">2 students</option>
            <option value="3">3 students</option>
            <option value="5">5 students</option>
            <option value="5+">5+ students</option>
          </select>
        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            Preferred mentoring mode
          </label>

          <select
            value={form.mentoringMode}
            onChange={(e) =>
              setForm({
                ...form,
                mentoringMode: e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-5 py-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          >
            <option value="">
              Select mentoring mode
            </option>

            <option value="Video Call">
              Video Call
            </option>

            <option value="Chat">
              Chat
            </option>

            <option value="Email">
              Email
            </option>

            <option value="Code Review">
              Code Review
            </option>

            <option value="Hybrid">
              Hybrid
            </option>
          </select>
        </div>

        {/* Student Level */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Which students would you like to mentor?
          </h3>

          <div className="grid md:grid-cols-3 gap-3 mt-5">
            {studentLevels.map((level) => (
              <CheckboxOption
                key={level}
                label={level}
                checked={form.preferredStudentLevels.includes(
                  level
                )}
                onChange={() =>
                  toggleArrayValue(
                    "preferredStudentLevels",
                    level
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Availability Days */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            When are you generally available?
          </h3>

          <div className="grid md:grid-cols-2 gap-3 mt-5">
            {availabilityDays.map((day) => (
              <CheckboxOption
                key={day}
                label={day}
                checked={form.availabilityDays.includes(day)}
                onChange={() =>
                  toggleArrayValue(
                    "availabilityDays",
                    day
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Availability Time */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            Preferred time
          </label>

          <select
            value={form.availabilityTime}
            onChange={(e) =>
              setForm({
                ...form,
                availabilityTime: e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-5 py-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          >
            <option value="">
              Select preferred time
            </option>

            <option value="Morning">
              Morning
            </option>

            <option value="Afternoon">
              Afternoon
            </option>

            <option value="Evening">
              Evening
            </option>

            <option value="Flexible">
              Flexible
            </option>
          </select>
        </div>

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
            font-semibold
          "
        >
          Continue
        </button>

      </div>
    </>
  );
}

  /* -------------------------------- */
/* STEP 6 - CONTRIBUTION */
/* -------------------------------- */

if (step === 5) {
  const contributionTypes = [
    "Mentoring time",
    "Technical review",
    "Industry problem",
    "Project guidance",
    "Networking / introduction",
    "MVP sponsorship",
    "Equipment / software support",
    "Team participation",
  ];

  return (
    <>
      <div className="space-y-10">

        {/* Contribution Types */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            How would you like to contribute?
          </h3>

          <p className="text-sm text-gray-400 mb-5">
            Select all the ways you would be comfortable
            contributing to student opportunities.
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {contributionTypes.map((type) => (
              <CheckboxOption
                key={type}
                label={type}
                checked={form.contributionTypes.includes(type)}
                onChange={() =>
                  toggleArrayValue(
                    "contributionTypes",
                    type
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Sponsorship */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            Would you like to support students financially?
          </label>

          <select
            value={form.sponsorshipType}
            onChange={(e) =>
              setForm({
                ...form,
                sponsorshipType: e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-5 py-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          >
            <option value="">
              Select an option
            </option>

            <option value="No">
              No
            </option>

            <option value="MVP Sponsorship">
              Yes, MVP sponsorship
            </option>

            <option value="Mentoring + MVP Sponsorship">
              Yes, mentoring + MVP sponsorship
            </option>
          </select>
        </div>

        {/* Capabilities */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Additional contribution capabilities
          </h3>

          <div className="space-y-3">

            <CheckboxOption
              label="Can review student projects"
              checked={form.canReviewProjects}
              onChange={() =>
                setForm({
                  ...form,
                  canReviewProjects:
                    !form.canReviewProjects,
                })
              }
            />

            <CheckboxOption
              label="Can demonstrate projects or industry practices"
              checked={form.canDemonstrateProjects}
              onChange={() =>
                setForm({
                  ...form,
                  canDemonstrateProjects:
                    !form.canDemonstrateProjects,
                })
              }
            />

            <CheckboxOption
              label="Can provide real-world industry problems"
              checked={form.canProvideIndustryProblem}
              onChange={() =>
                setForm({
                  ...form,
                  canProvideIndustryProblem:
                    !form.canProvideIndustryProblem,
                })
              }
            />

            <CheckboxOption
              label="Can provide networking or professional introductions"
              checked={form.canProvideNetworking}
              onChange={() =>
                setForm({
                  ...form,
                  canProvideNetworking:
                    !form.canProvideNetworking,
                })
              }
            />

          </div>
        </div>

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
            font-semibold
          "
        >
          Continue
        </button>

      </div>
    </>
  );
}

  /* -------------------------------- */
  /* STEP 7 */
  /* -------------------------------- */

  if (step === 6) {
    return (
      <>
   <FileUpload
  label="Upload Resume / Portfolio"
  accept=".pdf,.doc,.docx"
  maxSizeMB={10}
  onFileSelect={(file) => {
    if (!file) {
      setResume(null);
      setResumeUrl("");
      return;
    }

    setResume(file);
    handleResumeUpload(file);
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

  /* -------------------------------- */
  /* STEP 8 */
  /* -------------------------------- */

 if (step === 7) {
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
          onClick={handleMentorRegistration}
  className="
    rounded-2xl
    bg-indigo-600
    px-8 py-4
    text-white
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {isRegistering
    ? "Creating Account..."
    : "Create Account"}
</button>

      </div>
    </>
  );
}

  /* -------------------------------- */
  /* STEP 9 */
  /* -------------------------------- */

  if (step === 8) {
  return (
<SuccessScreen
  fullName={form.fullName}
  role="Mentor"
  brainTrainId={brainTrainId}
  dashboardUrl="/dashboard/mentor"
/>
  );
}

 

  return null;
}

/* ================================================= */

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

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: CheckboxOptionProps) {
  return (
    <label
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        px-4
        py-3
        cursor-pointer
        hover:bg-white/[0.06]
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4"
      />

      <span className="text-sm text-gray-300">
        {label}
      </span>
    </label>
  );
}
