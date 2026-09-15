"use client";

import AcceptAgreement from "@/components/legal/AcceptAgreement";

export default function LegalDocumentPage({ params }: any) {
  const titles: any = {
    cla: "Contributor License Agreement (CLA)",
    nda: "Non-Disclosure Agreement (NDA)",
    mentor: "Mentor Agreement",
  };

  const content: any = {
    cla: (
      <>
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Contributor License Agreement (CLA)
        </h2>
        <p className="mb-4">
          This Contributor License Agreement governs contributions made to
          BrainTrain.
        </p>
      </>
    ),
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {content[params.slug]}

      {/* FIXED PROP NAME */}
      <AcceptAgreement agreementType={params.slug} />
    </div>
  );
}
