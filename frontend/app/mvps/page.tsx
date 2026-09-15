/*


"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBriefcase, FaTools, FaUsers } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ui/scroll-indicator";

// MVP Data
const mvps = [
  {
    id: 1,
    title: "Job Needs MVP",
    description:
      "An AI-driven job-matching platform connecting professionals with opportunities that align with their skills and aspirations.",
    icon: <FaBriefcase size={42} className="text-blue-500" />,
    members: [
      {
        name: "Monika Singh",
        role: "Project Lead (AI & Automation)",
        bio: "Leading AI initiatives and project strategy for BrainTrain MVPs.",
        image: "/team/monika.jpg",
      },
      {
        name: "Shubham",
        role: "Backend & DevOps Engineer",
        bio: "Building robust backend architecture and deployment pipelines.",
        image: "/team/shubham.jpg",
      },
      {
        name: "Priya Sharma",
        role: "UI/UX Designer",
        bio: "Designing intuitive user experiences and responsive interfaces.",
        image: "/team/priya.jpg",
      },
      {
        name: "Arjun Mehta",
        role: "AI Model Integration Specialist",
        bio: "Integrating machine learning models with scalable applications.",
        image: "/team/arjun.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Skill Builder MVP",
    description:
      "A next-gen microlearning system that personalizes skill development based on goals, trends, and industry insights.",
    icon: <FaTools size={42} className="text-green-500" />,
    members: [
      {
        name: "Riya Verma",
        role: "Learning Content Strategist",
        bio: "Curates learning paths aligned with industry trends.",
        image: "/team/riya.jpg",
      },
      {
        name: "Karan Patel",
        role: "Frontend Developer",
        bio: "Develops seamless front-end experiences for users.",
        image: "/team/karan.jpg",
      },
      {
        name: "Sanya Rao",
        role: "AI Recommendation Engineer",
        bio: "Creates personalized skill recommendations using AI.",
        image: "/team/sanya.jpg",
      },
      {
        name: "Vikram Singh",
        role: "Product Manager",
        bio: "Oversees product vision, planning, and execution.",
        image: "/team/vikram.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Intern Connect MVP",
    description:
      "A platform bridging interns and enterprises through real-world projects, mentorship, and growth opportunities.",
    icon: <FaUsers size={42} className="text-pink-500" />,
    members: [
      {
        name: "Ananya Gupta",
        role: "Community & Partnership Lead",
        bio: "Builds strong relationships between interns and companies.",
        image: "/team/ananya.jpg",
      },
      {
        name: "Rohit Sharma",
        role: "Full Stack Developer",
        bio: "Develops end-to-end solutions connecting interns to projects.",
        image: "/team/rohit.jpg",
      },
      {
        name: "Sneha Kapoor",
        role: "Operations Coordinator",
        bio: "Ensures smooth workflow and project tracking.",
        image: "/team/sneha.jpg",
      },
      {
        name: "Tushar Jain",
        role: "Mentorship Program Manager",
        bio: "Matches interns with mentors for maximum growth.",
        image: "/team/tushar.jpg",
      },
    ],
  },
];

const MVPsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      <ScrollIndicator />
      <Header />

     
      <section className="w-full py-20 text-center bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <img
            src="/team/monika.jpg"
            alt="Monika Singh"
            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-400 shadow-lg mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Monika Singh</h2>
          <p className="text-indigo-600 font-medium mb-4">Founder & Project Lead – BrainTrain</p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For me, people are the core of every innovation. At BrainTrain, we build technology that empowers
            learners, innovators, and teams to create real impact. Each project reflects collaboration,
            purpose, and the passion of our contributors.
          </p>
        </div>
      </section>

   
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1
            className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-600 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            BrainTrain MVPs
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto rounded-full mb-10"></div>

          <p
            className="text-gray-700 mb-16 text-lg max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Explore our key Minimum Viable Products — innovation-driven platforms empowering
            enterprises, students, and startups with scalable, AI-first solutions.
          </p>

       
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mvps.map((mvp, index) => (
              <div
                key={mvp.id}
                data-aos="zoom-in"
                data-aos-delay={index * 120}
                className="bg-white border border-gray-300 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{mvp.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    {mvp.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{mvp.description}</p>

                  
                  <div className="grid grid-cols-2 gap-4">
                    {mvp.members.map((member, idx) => (
                      <div key={idx} className="relative group flex flex-col items-center bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition cursor-pointer">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 mb-2"
                        />
                        <h4 className="text-sm font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-xs text-gray-500 text-center">{member.role}</p>

                   
                        <div className="absolute bottom-full mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {member.bio}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="md:hidden w-full mt-10">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={1}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
            >
              {mvps.map((mvp) => (
                <SwiperSlide key={mvp.id}>
                  <div className="bg-white border border-gray-300 rounded-3xl p-8 mb-8 shadow-md">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{mvp.icon}</div>
                      <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                        {mvp.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{mvp.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        {mvp.members.map((member, idx) => (
                          <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-14 h-14 rounded-full object-cover border border-indigo-300 mb-2"
                            />
                            <h4 className="text-sm font-semibold text-gray-800">{member.name}</h4>
                            <p className="text-xs text-gray-500 text-center">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

   
          <div className="mt-16">
            <button
              onClick={() => (window.location.href = "/internships")}
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-md"
            >
              Explore Internship Programs
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MVPsPage;*/

"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTools } from "react-icons/fa";
import Header from "@/components/layout/Header/Header";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import Footer from "@/components/Footer";

// Single MVP → Aatmanirbhar MVP
const mvp = {
  id: 1,
  title: "Aatmanirbhar MVP",
  description:
    "A self-driven engineering ecosystem where contributors access infra, tools, and project automation to build real portfolios.",
  icon: <FaTools size={42} className="text-indigo-500" />,
  members: [
    {
      name: "Monika Singh",
      role: "Project Leader",
      bio: "Leads AI-first innovation and infra automation for BrainTrain.",
      image: "/assets/images/team5.png",
    },
  ],
};

const MVPsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      <ScrollIndicator />
      <Header />

      {/* Leader Section */}
      <section className="w-full py-20 text-center bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <img
            src="/assets/images/team1.jpeg"
            alt="Rajendran Mariagnanam"
            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-400 shadow-lg mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Rajendran Mariagnanam</h2>
          <p className="text-indigo-600 font-medium mb-4">
            Founder & CEO – Brain Train Consulrancy Services LLP
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At BrainTrain we empower engineers through infrastructure, automation,
            and domain-based project opportunities — entirely self-driven.
          </p>
        </div>
      </section>

      {/* Aatmanirbhar MVP */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1
            className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-600 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            Aatmanirbhar MVP
          </h1>

          <div className="h-1 w-24 bg-indigo-400 mx-auto rounded-full mb-10"></div>

          <div
            data-aos="zoom-in"
            className="bg-white border border-gray-300 rounded-3xl p-10 shadow-lg max-w-3xl mx-auto mt-10"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">{mvp.icon}</div>
              <h3 className="text-3xl font-semibold mb-3 text-gray-800">
                {mvp.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {mvp.description}
              </p>

              {/* Leader */}
              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
                <img
                  src={mvp.members[0].image}
                  alt="Leader"
                  className="w-20 h-20 rounded-full border-2 border-indigo-300 mb-3"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  {mvp.members[0].name}
                </h4>
                <p className="text-sm text-gray-600">{mvp.members[0].role}</p>
              </div>
            </div>
          </div>

          {/* CTA → Access Aatmanirbhar */}
          <div className="mt-16">
            <button
  onClick={() => (window.location.href = "/register")}
  className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 
             hover:from-yellow-300 hover:to-yellow-400 
             text-gray-900 font-semibold py-3 px-8 
             rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-md"
>
  Access Aatmanirbhar MVP
</button>

          </div>
        </div>
      </section>
      <Footer/>
  
    </div>
  );
};

export default MVPsPage;

