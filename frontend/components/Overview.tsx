export default function Overview() {
  return (
    <section className="px-10 py-16 max-w-6xl">
      <h2 className="text-3xl font-semibold mb-6">
        Program Overview
      </h2>

      <p className="text-gray-300 leading-relaxed">
        This program trains engineers to design, build, deploy, and monitor
        AI-powered automation systems that reduce operational cost, improve
        accuracy, and increase business efficiency.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {[
          "Concept Mastery",
          "Tool Implementation",
          "Industry Application",
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:scale-105 transition"
          >
            <h3 className="text-lg font-medium">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}