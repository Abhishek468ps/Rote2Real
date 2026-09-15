export default function CourseHero() {
  return (
    <section className="relative px-10 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-900 to-black opacity-60 blur-3xl"></div>

      <div className="relative z-10 max-w-5xl">
        <h1 className="text-6xl font-bold leading-tight">
          AI Business <br /> Automation Specialist
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          Build, deploy, and scale AI-powered automation systems used in real
          enterprises. Designed for industry readiness, not theory.
        </p>

        <div className="flex gap-8 mt-8 text-sm text-gray-300">
          <span>⏳ 8 Weeks</span>
          <span>💻 Hybrid Learning</span>
          <span>🏭 5 Industries</span>
        </div>

        <button className="mt-8 px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition shadow-lg">
          Enroll Now
        </button>
      </div>
    </section>
  );
}