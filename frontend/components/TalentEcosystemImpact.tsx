import { CheckCircle } from "lucide-react";

const alumni = [
  {
    name: "Pawan Uikey",
    university: "Alumni · NIT Jalandhar",
    company: "TCS",
  },
  {
    name: "Ankit Gopi Gahnoliya",
    university: "Alumni · LPU",
    company: "Infosys",
  },
  {
    name: "Rohit Lodhi",
    university: "Alumni · DTU",
    company: "Accenture",
  },
  {
    name: "Shubham Kumar",
    university: "Alumni · DTU",
    company: "Accenture",
  },
];

export default function TalentEcosystemImpact() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Talent Ecosystem Impact
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
            Through our innovation programs, hackathons, and mentoring
            initiatives, we help emerging talent grow into professional
            roles across leading technology organizations.
          </p>
        </div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {alumni.map((person, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >

              {/* subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition"></div>

              {/* avatar */}
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg mb-5 shadow-md">
                {person.name.charAt(0)}
              </div>

              {/* name */}
              <h3 className="text-xl font-semibold text-gray-900">
                {person.name}
              </h3>

              {/* university */}
              <p className="text-sm text-gray-500 mt-1">
                {person.university}
              </p>

              {/* company badge */}
              <div className="mt-3 inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                Placed at {person.company}
              </div>

              {/* verified */}
              <div className="flex items-center text-green-600 mt-4 text-sm font-medium">
                <CheckCircle size={16} className="mr-2" />
                Verified Success
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}