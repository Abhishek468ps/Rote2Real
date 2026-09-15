"use client";

import { PDFViewer, pdf } from "@react-pdf/renderer";
import { EvaluationPDF } from "./EvaluationPDF";

export default function PDFPreview({
  data,
  unlocked
}: {
  data: any;
  unlocked: boolean;
}) {
  async function downloadPDF() {
    if (!unlocked) return;

    const blob = await pdf(
      <EvaluationPDF data={data} locked={false} />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "evaluation-report.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="border rounded overflow-hidden">
      <PDFViewer width="100%" height={500}>
        <EvaluationPDF
          data={data}
          locked={!unlocked}
        />
      </PDFViewer>

      <div className="p-4 border-t flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {unlocked
            ? "Report Unlocked"
            : "Preview Only . Payment Required"}
        </span>

        <button
          onClick={downloadPDF}
          disabled={!unlocked}
          className={`px-4 py-2 rounded text-white ${
            unlocked
              ? "bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
