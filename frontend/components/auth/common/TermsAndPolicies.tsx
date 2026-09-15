"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface TermsAndPoliciesProps {
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  acceptedCommunication: boolean;
  onChange: (
    field:
      | "terms"
      | "privacy"
      | "communication",
    value: boolean
  ) => void;
}

export default function TermsAndPolicies({
  acceptedTerms,
  acceptedPrivacy,
  acceptedCommunication,
  onChange,
}: TermsAndPoliciesProps) {
  const allAccepted =
    acceptedTerms &&
    acceptedPrivacy &&
    acceptedCommunication;

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}

      <div className="text-center">

        <div
          className="
          mx-auto
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-3xl
          bg-gradient-to-br
          from-indigo-600
          to-cyan-600
          shadow-[0_0_60px_rgba(99,102,241,.4)]
          "
        >
          <ShieldCheck
            size={44}
            className="text-white"
          />
        </div>

        <h2
          className="
          mt-8
          text-4xl
          font-black
          text-white
          "
        >
          Terms & Policies
        </h2>

        <p
          className="
          mt-4
          text-lg
          text-gray-400
          "
        >
          Please review and accept the
          policies before creating your
          account.
        </p>

      </div>

      {/* Policy Cards */}

      <div className="mt-12 space-y-6">

        {/* Terms */}

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          "
        >
          <div className="flex gap-5">

            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-indigo-500/10
              flex
              items-center
              justify-center
              shrink-0
              "
            >
              <FileText
                className="text-indigo-400"
                size={28}
              />
            </div>

            <div className="flex-1">

              <h3 className="text-xl font-bold text-white">
                Terms & Conditions
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                I agree to the platform
                terms, acceptable usage
                policies and code of
                conduct of Brain Train
                Consultancy Services LLP.
              </p>

              <Link
                href="/terms"
                className="
                mt-4
                inline-block
                text-indigo-400
                hover:text-indigo-300
                "
              >
                Read Terms →
              </Link>

            </div>

            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) =>
                onChange(
                  "terms",
                  e.target.checked
                )
              }
              className="
              h-6
              w-6
              accent-indigo-600
              "
            />

          </div>

        </div>

        {/* Privacy */}

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          "
        >
          <div className="flex gap-5">

            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-cyan-500/10
              flex
              items-center
              justify-center
              shrink-0
              "
            >
              <Lock
                className="text-cyan-400"
                size={28}
              />
            </div>

            <div className="flex-1">

              <h3 className="text-xl font-bold text-white">
                Privacy Policy
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                I agree that my data may
                be processed according to
                the Brain Train privacy
                policy and data
                protection standards.
              </p>

              <Link
                href="/privacy"
                className="
                mt-4
                inline-block
                text-cyan-400
                hover:text-cyan-300
                "
              >
                Read Privacy Policy →
              </Link>

            </div>

            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(e) =>
                onChange(
                  "privacy",
                  e.target.checked
                )
              }
              className="
              h-6
              w-6
              accent-cyan-600
              "
            />

          </div>

        </div>

        {/* Communication */}

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          "
        >
          <div className="flex gap-5">

            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-emerald-500/10
              flex
              items-center
              justify-center
              shrink-0
              "
            >
              <CheckCircle2
                className="text-emerald-400"
                size={28}
              />
            </div>

            <div className="flex-1">

              <h3 className="text-xl font-bold text-white">
                Communication Consent
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                I agree to receive email
                notifications, evaluation
                reports, internship
                updates and platform
                announcements.
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                acceptedCommunication
              }
              onChange={(e) =>
                onChange(
                  "communication",
                  e.target.checked
                )
              }
              className="
              h-6
              w-6
              accent-emerald-600
              "
            />

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="mt-10">

        {allAccepted ? (
          <div
            className="
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            p-5
            text-emerald-400
            flex
            items-center
            gap-3
            "
          >
            <CheckCircle2 size={24} />

            All policies accepted.
            You can proceed to account
            creation.
          </div>
        ) : (
          <div
            className="
            rounded-2xl
            border
            border-amber-500/20
            bg-amber-500/10
            p-5
            text-amber-400
            flex
            items-center
            gap-3
            "
          >
            <AlertTriangle size={24} />

            Please accept all required
            policies to continue.
          </div>
        )}

      </div>

    </div>
  );
}