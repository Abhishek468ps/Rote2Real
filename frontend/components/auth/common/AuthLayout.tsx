"use client";

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: Props) {
  return (
    <main
      className="
      min-h-screen
      bg-[#040816]
      text-white
      relative
      overflow-hidden
      "
    >
      {/* Background */}

      <div
        className="
        absolute
        top-[-300px]
        left-[-300px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-indigo-600/20
        blur-[180px]
        "
      />

      <div
        className="
        absolute
        bottom-[-250px]
        right-[-250px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-cyan-500/20
        blur-[180px]
        "
      />

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        py-24
        "
      >
        <div className="max-w-4xl mx-auto text-center">

          <h1
            className="
            text-5xl
            font-black
            "
          >
            {title}
          </h1>

          <p
            className="
            mt-6
            text-gray-400
            text-lg
            "
          >
            {subtitle}
          </p>

        </div>

        <div
          className="
          mt-16
          rounded-[40px]
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-3xl
          p-10
          "
        >
          {children}
        </div>
      </div>
    </main>
  );
}