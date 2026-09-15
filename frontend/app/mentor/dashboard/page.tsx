import Badge from "@/components/Badge";

export default function MentorDashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Assigned Interns</h2>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p><b>Intern</b>. Monika Singh</p>
        <p><b>Project</b>. Facility Locator</p>

        <div className="mt-2">
          <Badge text="ready-for-eval" />
        </div>
      </div>
    </div>
  );
}
