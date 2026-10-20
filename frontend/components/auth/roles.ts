import {
  GraduationCap,
  Users,
  Briefcase,
  Stethoscope,
  Scale,
  Building2,
  Gavel,
  Eye,
  Shield,
  UserCog,
} from "lucide-react";

export const ROLES = [
  {
    title: "Student",
    description:
      "Courses, internships, AI learning, MVP challenges and placements.",
    icon: "student",
    href: "/register/student",
    gradient: "from-blue-500 to-cyan-500",
  },

  {
    title: "Mentor",
    description:
      "Guide projects, review code and supervise internships.",
    icon: "mentor",
    href: "/register/mentor",
    gradient: "from-violet-500 to-fuchsia-500",
  },

  {
    title: "Trainer",
    description:
      "Deliver courses, conduct live sessions and evaluate learners.",
    icon: "trainer",
    href: "/register/trainer",
    gradient: "from-orange-500 to-red-500",
  },

  {
    title: "Recruiter",
    description:
      "Access verified talent pools and placement pipelines.",
    icon: "recruiter",
    href: "/register/recruiter",
    gradient: "from-emerald-500 to-green-500",
  },

  {
    title: "Doctor",
    description:
      "Telemedicine consultations and AI healthcare tools.",
    icon: "doctor",
    href: "/register/doctor",
    gradient: "from-pink-500 to-rose-500",
  },

  {
    title: "Lawyer",
    description:
      "Legal consultations and document workflows.",
    icon: "lawyer",
    href: "/register/lawyer",
    gradient: "from-yellow-500 to-orange-500",
  },

  {
    title: "Institution",
    description:
      "Universities, colleges and training organizations.",
    icon: "institution",
    href: "/register/institution",
    gradient: "from-indigo-500 to-purple-500",
  },

  {
    title: "Judge",
    description:
      "Competitions, hackathons and challenge evaluations.",
    icon: "judge",
    href: "/register/judge",
    gradient: "from-red-500 to-pink-500",
  },

  {
    title: "Viewer",
    description:
      "Browse content and access public resources.",
    icon: "viewer",
    href: "/register/viewer",
    gradient: "from-slate-500 to-gray-500",
  },

  {
    title: "Administrator",
    description:
      "Manage users, permissions and platform operations.",
    icon: "admin",
    href: "/register/admin",
    gradient: "from-cyan-500 to-blue-500",
  },
];