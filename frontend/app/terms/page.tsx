"use client";

import { useEffect, useRef, useState } from "react";
import {
  TOS_TITLE,
  TOS_TEXT,
  TOS_VERSION,
  TOS_META,
} from "@/legal/tos/tos-2026-02-02";



export default function TermsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 10;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
        setHasScrolledToBottom(true);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

 const handleAccept = () => {
    const consentPayload = {
      tosVersion: TOS_VERSION,
      acceptedAt: new Date().toISOString(),
    };

    localStorage.setItem("tosAccepted", "true");
    localStorage.setItem("tosMeta", JSON.stringify(consentPayload));

    setAccepted(true);
     // optional UX
  setTimeout(() => {
    window.close(); // if opened in new tab
  }, 500);
  };

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF("p", "pt", "a4");

    const text = `
${TOS_TITLE}
Version. ${TOS_VERSION}
Company. ${TOS_META.company}

${TOS_TEXT}
`;

    pdf.text(text, 40, 40, { maxWidth: 515 });
    pdf.save(`BrainTrain-TOS-${TOS_VERSION}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow border border-gray-200">

        {/* Header */}
        <div className="px-8 py-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-900">
            {TOS_TITLE}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {TOS_META.company}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Version. {TOS_VERSION} · Governing Law. {TOS_META.governingLaw} ·
            Jurisdiction. {TOS_META.jurisdiction}
          </p>
        </div>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          className="h-[60vh] overflow-y-auto px-8 py-6 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap"
        >
          {TOS_TEXT}
        </div>

        {/* Action area */}
        <div className="px-8 py-6 border-t bg-gray-50 rounded-b-xl space-y-4">

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              disabled={!hasScrolledToBottom}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 h-4 w-4"
            />

            <label className="text-sm text-gray-700">
              I have read, understood, and agree to the Master Terms of Service,
              including Internship, Contributor, Trainer, Mentor & Developer
              Agreement, Revenue Share, Code of Conduct, NDA, Intellectual
              Property, Taxation, Termination, and Disclaimer clauses.
            </label>
          </div>

          {!hasScrolledToBottom && (
            <p className="text-xs text-gray-500">
              Please scroll to the bottom to enable acceptance.
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAccept}
              disabled={!checked || accepted}
              className={`px-6 py-2 rounded-md text-sm font-medium transition
                ${
                  checked && !accepted
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              I Accept & Continue
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={!accepted}
              className={`px-6 py-2 rounded-md text-sm font-medium border transition
                ${
                  accepted
                    ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Download Accepted PDF
            </button>
          </div>

          {/* Legal note */}
          <p className="text-xs text-gray-500 pt-2">
            Acceptance is recorded electronically and is legally binding under
            the Information Technology Act, 2000.
          </p>
        </div>
      </div>
    </div>
  );
}
