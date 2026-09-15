"use client";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    inquiryType: "",
    message: "",
    agree: false,
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  const checked =
    type === "checkbox" && "checked" in e.target
      ? (e.target as HTMLInputElement).checked
      : false;

  if (name === "phone") {
    if (!/^\d*$/.test(value)) return;
  }

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (formData.phone && formData.phone.length !== 10) {
      alert("📞 Please enter a valid 10-digit phone number.");
      return;
    }

    // ✅ CHECKBOX VALIDATION
    if (!formData.agree) {
      alert("⚠️ Please check the agreement checkbox before submitting.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Thank you for contacting us!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          state: "",
          inquiryType: "",
          message: "",
          agree: false,
        });
      } else {
        alert("❌ Something went wrong!");
      }
    } catch (error) {
      alert("❌ Cannot connect to server!");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
          Take the First Step
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Contact us to learn how Brain Train Consultancy Services LLP can help
          deliver enterprise-grade AI & digital solutions that accelerate your progress.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 text-gray-900"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 text-gray-900"
          />

          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 text-gray-900"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 text-gray-900"
          />

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">State *</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Tamilnadu">Tamilnadu</option>
            <option value="Delhi">Delhi</option>
            <option value="Bihar">Bihar</option>
          </select>

          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Inquiry Type *</option>
            <option value="Consulting">Consulting</option>
            <option value="Training">Training</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 md:col-span-2 text-gray-900"
          />

          <div className="flex items-start space-x-3 md:col-span-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <label className="text-sm text-gray-600">
              * I would like Brain Train Consultancy Services LLP to contact me based on
              the information provided above. For details, please see our{" "}
              <a href="/privacy" className="text-blue-700 underline">
                Privacy Policy
              </a>.
            </label>
          </div>

          <div className="flex justify-between items-center md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Submit
            </button>

            <a
              href="#top"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-2 rounded-lg font-medium transition"
            >
              Back to Top
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
