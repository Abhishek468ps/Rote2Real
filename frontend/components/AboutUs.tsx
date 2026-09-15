/*
"use client";

import { teamApi } from "@/lib/api";
import { TeamMember } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { LoadingSkeleton } from "./ui/loading";
import { ErrorBoundary } from "./ui/error-boundary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

// -------------------- TEAM MEMBER CARD --------------------
interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-lg hover:scale-105 transition transform"
  >
    <div className="relative w-16 h-16 flex-shrink-0">
      <Image
        src={member.image} 
        alt={member.name}
        fill
        className="object-cover rounded-full border border-gray-300"
      />
    </div>

    <div className="flex-1">
      <h3 className="text-gray-800 font-semibold flex items-center gap-2">
        {member.name}

        
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={18} />
          </a>
        )}
      </h3>

      <p className="text-gray-600 text-sm">{member.position}</p>
      {member.bio && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{member.bio}</p>}
    </div>
  </motion.div>
);

// -------------------- ABOUT US PAGE --------------------
const AboutUs: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await teamApi.getAll();

        if (response.success && Array.isArray(response.data)) {
          setTeamMembers(response.data);
        } else {
          throw new Error(response.error || "Failed to load team members");
        }
      } catch (err: any) {
        console.error("Error fetching team:", err);
        setError(err.message || "An unexpected error occurred");

        // Fallback data
        const fallbackData: TeamMember[] = [];
        setTeamMembers(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <ErrorBoundary>
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16"
          >
            About Us
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white p-8 rounded-3xl shadow border border-gray-200 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    To build an ecosystem where AI augments society by creating more opportunities and jobs, rather than replacing them.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white p-6 rounded-3xl shadow border border-gray-200 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Meet Our Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4">
                          <LoadingSkeleton className="w-16 h-16 rounded-full" />
                          <div className="flex-1">
                            <LoadingSkeleton className="h-4 w-3/4 mb-2" />
                            <LoadingSkeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {teamMembers.map((member) => (
                        <TeamMemberCard key={member.id} member={member} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white p-8 rounded-3xl shadow border border-gray-200  h-full flex flex-col" >
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    To create a SaaS-based ecosystem that guides young talent through learning and developing MVPs in AI/ML, core engineering, biotechnology, and beyond. We aim to enhance the skills of engineers, nurture world-class professionals, and contribute to India’s self-reliance under the Atmanirbhar Bharat initiative.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default AboutUs;


*/
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { ErrorBoundary } from "./ui/error-boundary";
import { motion } from "framer-motion";

// -------------------- ABOUT US PAGE --------------------
const AboutUs: React.FC = () => {
  return (
    <ErrorBoundary>
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16"
          >
            About Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white p-8 rounded-3xl shadow border border-gray-200 h-full">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                    Our Vision
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    To build an ecosystem where AI augments society by creating more opportunities and jobs, rather than replacing them.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white p-8 rounded-3xl shadow border border-gray-200 h-full">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                    Our Mission
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    To create a SaaS-based ecosystem that guides young talent through learning and developing MVPs in AI/ML, core engineering, biotechnology, and beyond. We aim to enhance the skills of engineers, nurture world-class professionals, and contribute to India’s self-reliance under the Atmanirbhar Bharat initiative.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default AboutUs;


