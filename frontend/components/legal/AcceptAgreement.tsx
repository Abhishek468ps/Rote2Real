"use client";
import React, { useEffect, useState } from "react";

const AcceptAgreement = ({ agreementType }: any) => {
  const version = "v1"; // REQUIRED because Django expects version in URL

  const [loading, setLoading] = useState(true);
  const [alreadyAccepted, setAlreadyAccepted] = useState(false);
  const [checked, setChecked] = useState(false);

  // Check if accepted
  useEffect(() => {
    const check = async () => {
      const res = await fetch(
        `/api/agreements/check/${agreementType}/${version}/`
      );

      const data = await res.json();
      setAlreadyAccepted(data.accepted);
      setLoading(false);
    };

    check();
  }, [agreementType]);

  const handleAccept = async () => {
    if (!checked) {
      alert("Please check the box to accept.");
      return;
    }

    const res = await fetch(`/api/agreements/accept/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agreement_type: agreementType,
        version: version,
      }),
    });

    if (res.ok) {
      alert("Agreement accepted successfully.");
      setAlreadyAccepted(true);
    } else {
      alert("Error accepting agreement.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (alreadyAccepted)
    return (
      <p className="text-green-600 font-bold text-lg">
        ✔ You have already accepted this agreement.
      </p>
    );

  return (
    <div className="space-y-4 mt-6">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span>I agree to the terms of this agreement</span>
      </label>

      <button
        onClick={handleAccept}
        disabled={!checked}
        className={`px-4 py-2 rounded-lg text-white ${
          checked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
        }`}
      >
        Accept Agreement
      </button>
    </div>
  );
};

export default AcceptAgreement;

