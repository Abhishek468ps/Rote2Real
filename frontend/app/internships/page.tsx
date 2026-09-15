"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "aos/dist/aos.css";
import Header from "@/components/layout/Header/Header";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import { toast } from "sonner";
import Footer from "@/components/Footer";

// Lazy load icons
const FaLaptopCode = dynamic(() => import("react-icons/fa").then((mod) => mod.FaLaptopCode));
const FaBrain = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBrain));
const FaChartLine = dynamic(() => import("react-icons/fa").then((mod) => mod.FaChartLine));
const FaUsers = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUsers));

// Lazy load AOS
const AOS = dynamic(() => import("aos"), { ssr: false });

const internships = [
  {
    id: 1,
    title: "AI Solutions Internship",
    company: "BrainTrain Labs",
    duration: "3 Months",
    skills: ["Machine Learning", "Python", "Data Analysis"],
    iconColor: "text-indigo-500",
  },
  {
    id: 2,
    title: "Software Development Internship",
    company: "BrainTrain Tech",
    duration: "6 Months",
    skills: ["React.js", "Node.js", "API Integration"],
    iconColor: "text-green-500",
  },
  {
    id: 3,
    title: "Data Analytics Internship",
    company: "BrainTrain Analytics",
    duration: "4 Months",
    skills: ["SQL", "Tableau", "Power BI"],
    iconColor: "text-yellow-500",
  },
  {
    id: 4,
    title: "Automation & RPA Internship",
    company: "BrainTrain Automation",
    duration: "5 Months",
    skills: ["Python", "UiPath", "Workflow Automation"],
    iconColor: "text-pink-500",
  },
];

const InternshipsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    internship: "",
    resume: null as File | null,
  });

  useEffect(() => {
    (async () => {
      const aos = (await import("aos")).default;
      aos.init({ duration: 800, once: true, easing: "ease-in-out" });
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFormData({ ...formData, resume: e.target.files[0] });
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formToSend = new FormData();
    formToSend.append("name", formData.name);
    formToSend.append("email", formData.email);
    formToSend.append("mobile", formData.mobile);
    formToSend.append("internship", formData.internship);

    if (formData.resume) {
      formToSend.append("resume", formData.resume);
    }

    const response = await fetch("http://127.0.0.1:8000/internship", {
      method: "POST",
      body: formToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Backend Response:", errorData);
      toast.error("Submission failed. Please check your details.");
      return;
    }


     toast.success("🎉 Internship Application Submitted Successfully!");

    setIsFormOpen(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      internship: "",
      resume: null,
    });

  } catch (error) {
    console.error(error);
    toast.error("⚠️ Unable to connect to server. Try again later.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      <ScrollIndicator />
      <Header />

      <section className="relative w-full py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">
            Internships at Brain Train Consultancy Services LLP
          </h1>
          <p
            className="text-gray-700 mb-16 text-lg md:text-xl max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Gain real-world experience across AI, Software Development, Data Analytics, and Automation. Work with our expert teams and accelerate your career growth.
          </p>

       
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {internships.map((intern) => (
    <div
      key={intern.id}
      data-aos="zoom-in"
      className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg p-8 transform transition duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
    >
      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-yellow-400/20 via-pink-400/20 to-indigo-400/20 opacity-0 hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

      <div className="mb-4 mx-auto relative z-10">
        {intern.id === 1 && <FaBrain size={36} className={intern.iconColor} />}
        {intern.id === 2 && <FaLaptopCode size={36} className={intern.iconColor} />}
        {intern.id === 3 && <FaChartLine size={36} className={intern.iconColor} />}
        {intern.id === 4 && <FaUsers size={36} className={intern.iconColor} />}
      </div>
      <h3 className="text-xl font-semibold mb-2 relative z-10">{intern.title}</h3>
      <p className="text-gray-700 mb-1 relative z-10">{intern.company}</p>
      <p className="text-gray-500 mb-4 relative z-10">Duration: {intern.duration}</p>
      <div className="flex flex-wrap gap-2 justify-center mb-4 relative z-10">
        {intern.skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>


        
          <div className="mt-16">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Apply for Internships
            </button>
          </div>
        </div>

   
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center">Internship Registration</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
                <select
                  name="internship"
                  value={formData.internship}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Internship</option>
                  {internships.map((i) => (
                    <option key={i.id} value={i.title}>{i.title}</option>
                  ))}
                </select>

                <label className="w-full flex flex-col items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-700">
                  {formData.resume ? formData.resume.name : "Upload Resume"}
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>

               <button
  type="submit"
  disabled={isSubmitting}
  className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 flex justify-center ${
    isSubmitting
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-yellow-400 hover:bg-yellow-300 text-gray-900"
  }`}
>
  {isSubmitting ? (
    <span className="animate-spin border-2 border-gray-700 border-t-transparent rounded-full w-5 h-5"></span>
  ) : (
    "Submit Application"
  )}
</button>

              </form>
            </div>
          </div>
        )}
      </section>
      <Footer/>
    
    </div>
  );
};

export default InternshipsPage;
