export default function LegalDocuments() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Legal Documents</h1>

      <p className="text-gray-700 mb-4">
        All official BrainTrain platform agreements and policies are listed here.
      </p>

      <ul className="space-y-4">
        <li>
          <a href="/legal-documents/cla" className="text-blue-600 underline">
            Contributor License Agreement (CLA)
          </a>
        </li>

        <li>
          <a href="/legal-documents/nda" className="text-blue-600 underline">
            Non-Disclosure Agreement (NDA)
          </a>
        </li>

        <li>
          <a
            href="/legal-documents/mentor-agreement"
            className="text-blue-600 underline"
          >
            Mentor Agreement
          </a>
        </li>

        <li>
          <a
            href="/legal-documents/subscription-terms"
            className="text-blue-600 underline"
          >
            Student / Contributor Subscription Terms
          </a>
        </li>
      </ul>
    </div>
  );
}
