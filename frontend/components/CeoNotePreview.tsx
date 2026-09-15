import Link from "next/link";

export default function CeoNotePreview() {
  return (
    <section className="relative py-28 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <div className="space-y-6">

          <span className="inline-block text-xs tracking-widest uppercase text-neutral-400">
            CEO Note
          </span>

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
            A candid message<br />
            for AI learners
          </h2>

          <p className="text-neutral-300 text-lg leading-relaxed max-w-xl">
            You do not need to master all AI engines to get an AI job.
            You need to know how to use the right engines to build real systems.
          </p>

          <ul className="space-y-3 text-neutral-300">
            <li>✓ Problem understanding matters more than certificates</li>
            <li>✓ Choosing correctly beats knowing everything</li>
            <li>✓ Deployability is the real benchmark</li>
          </ul>

          <Link
            href="/ceo-note"
            className="inline-flex items-center border border-white/30 px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition rounded-md"
          >
            Read full CEO message →
          </Link>

        </div>

        {/* Right Card */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">

          <p className="text-xl font-medium leading-relaxed text-white">
            AI careers are not about knowing everything.
            They are about building usable systems.
          </p>

          <div className="mt-6 text-neutral-400 text-sm">
            Brain Train Consultancy Services LLP
          </div>

        </div>

      </div>
    </section>
  );
}
