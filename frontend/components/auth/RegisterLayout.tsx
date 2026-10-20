"use client";

import RegisterStepper from "./RegisterStepper";

interface Props {
  role: string;
  config: any;
}

export default function RegisterLayout({
  role,
  config,
}: Props) {
  return (
    <main
      className="
      min-h-screen
      bg-[#050816]
      text-white
      relative
      overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#4338ca_0%,transparent_45%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <RegisterStepper />

        <div
          className="
          mt-12
          grid
          lg:grid-cols-[420px_1fr]
          gap-12
          "
        >
          {/* LEFT SIDE */}

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
            "
          >
            <h1 className="text-4xl font-black">
              {config.title}
            </h1>

            <p className="mt-4 text-gray-400">
              Complete your registration
              to join Brain Train
              ecosystem.
            </p>
          </div>

          {/* RIGHT SIDE */}

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
            "
          >
            FORM GOES HERE
          </div>

        </div>

      </div>
    </main>
  );
}