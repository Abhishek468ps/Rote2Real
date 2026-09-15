"use client";

type Props = {
  unlocked: boolean;
  name: string;
  score: number;
  status: string;
};

export default function CertificatePreview({
  unlocked,
  name,
  score,
  status,
}: Props) {
  return (
    <div className="relative border rounded-lg p-8 bg-white">
      {!unlocked && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur flex items-center justify-center text-lg font-semibold">
          Payment Required
        </div>
      )}

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          Certificate of Assessment Completion
        </h2>

        <p>This certifies that</p>

        <p className="text-xl font-semibold">{name}</p>

        <p>
          has successfully completed the assessment with a final
          score of
        </p>

        <p className="text-3xl font-bold">{score} / 100</p>

        <span
          className={`inline-block px-4 py-1 rounded text-sm font-semibold ${
            status === "Recommended"
              ? "bg-green-100 text-green-700"
              : status === "Borderline"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

        <div className="mt-6 text-xs text-gray-500">
          Certificate generation is handled by the evaluation system
          after payment verification.
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 text-6xl font-bold rotate-[-30deg]">
        BrainTrain
      </div>
    </div>
  );
}
