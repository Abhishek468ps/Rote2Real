"use client";

import {
  Check,
  Mail,
  User,
  FileText,
  ShieldCheck,
  PartyPopper,
} from "lucide-react";


interface ProgressStepperProps {
  currentStep: number;
}

const steps = [
  {
    title: "Basic Details",
    icon: User,
  },

  {
    title: "Email Verification",
    icon: Mail,
  },

  {
    title: "Profile Information",
    icon: User,
  },

  {
    title: "Documents Upload",
    icon: FileText,
  },

  {
    title: "Terms & Policies",
    icon: ShieldCheck,
  },

  {
    title: "Complete",
    icon: PartyPopper,
  },
];

export default function ProgressStepper({
  currentStep,
}: ProgressStepperProps) {
 
  return (
    <div className="w-full">

      {/* Desktop */}

      <div className="hidden lg:flex items-center justify-between">

        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed =
            index < currentStep;

          const active =
            index === currentStep;

          return (
            <div
              key={step.title}
              className="flex items-center flex-1"
            >
              <div className="flex flex-col items-center">

                <div
                  className={`
                  relative
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  transition-all
                  duration-300

                  ${
                    completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : active
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-[0_0_40px_rgba(99,102,241,.5)]"
                      : "bg-white/[0.03] border-white/10 text-gray-500"
                  }
                  `}
                >
                  {completed ? (
                    <Check size={28} />
                  ) : (
                    <Icon size={28} />
                  )}
                </div>

                <p
                  className={`
                  mt-4
                  text-sm
                  font-medium
                  text-center
                  max-w-[120px]

                  ${
                    completed || active
                      ? "text-white"
                      : "text-gray-500"
                  }
                  `}
                >
                  {step.title}
                </p>

              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`
                  h-[2px]
                  flex-1
                  mx-4
                  rounded-full
                  transition-all
                  duration-500

                  ${
                    completed
                      ? "bg-emerald-500"
                      : "bg-white/10"
                  }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile */}

      <div className="lg:hidden">

        <div className="flex items-center gap-3">

          <div
            className="
            h-14
            w-14
            rounded-2xl
            bg-indigo-600
            flex
            items-center
            justify-center
            text-white
            "
          >
            {(() => {
              const Icon =
                steps[currentStep].icon;

              return <Icon size={24} />;
            })()}
          </div>

          <div>

            <p className="text-gray-400 text-sm">
              Step {currentStep + 1} of {steps.length}
            </p>

            <h3 className="text-lg font-bold text-white">
              {steps[currentStep].title}
            </h3>

          </div>

        </div>

        <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">

          <div
            className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            to-cyan-500
            transition-all
            duration-500
            "
            style={{
              width: `${
                ((currentStep + 1) /
                  steps.length) *
                100
              }%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}