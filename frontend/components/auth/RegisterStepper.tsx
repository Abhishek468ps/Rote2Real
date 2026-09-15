const STEPS = [
  "Role",
  "Basic Info",
  "Verification",
  "Profile",
  "Organization",
  "Policies",
  "Complete",
];

export default function RegisterStepper() {
  return (
    <div className="flex flex-wrap gap-4">

      {STEPS.map((step, index) => (
        <div
          key={step}
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            w-10
            h-10
            rounded-full
            bg-indigo-600
            flex
            items-center
            justify-center
            font-bold
            "
          >
            {index + 1}
          </div>

          <span className="text-gray-300">
            {step}
          </span>
        </div>
      ))}

    </div>
  );
}