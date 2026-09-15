import {
  Brain,
  Cpu,
  GraduationCap,
  BookOpen,
  Trophy,
  Briefcase,
  Building2,
  Users,
  Newspaper,
  Contact,
  Rocket,
  Code2,
  Cloud,
  Database,
  Bot,
  Server,
  GitBranch,
  Layers,
  Shield,
  Monitor,
  Library,
  FlaskConical,
  Award,
  Star,
  Workflow,
  Laptop,
  Network,
  Globe,
  Sparkles,
  Lightbulb,
  BadgeCheck,
  School,
  FileCode2,
  Terminal,
  Binary,
  Gauge,
  Lock,
  Search,
  Compass,
  ChevronRight,
  CircleHelp,
  BookMarked,
  PlayCircle,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  FolderGit2,
  Package2,
  Boxes,
  UserCheck,
  UserCog,
  GraduationCapIcon,
  MessageSquare,
  LifeBuoy,
  Handshake,
  BadgePlus,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: "NEW" | "BETA" | "POPULAR" | "SOON";
}

export interface MenuSection {
  title: string;
  description: string;
  items: MenuItem[];
}

export interface MenuGroup {
  title: string;
  href: string;
  sections: MenuSection[];
}

export const MENU: MenuGroup[] = [
    {
  title: "Ecosystem",
  href: "/ecosystem",
  sections: [

    {
      title: "Innovation Ecosystem",
      description: "Build the future with Brain Train",

      items: [

        {
          title: "AI Engineering Studio",
          description: "Enterprise AI development platform",
          href: "/ai-engineering-studio",
          icon: Brain,
          badge: "NEW",
        },

        {
          title: "Thin Client Labs",
          description: "Cloud development workspace",
          href: "/thin-client",
          icon: Monitor,
        },

        {
          title: "Brain Train Cloud",
          description: "Private development infrastructure",
          href: "/cloud",
          icon: Cloud,
        },

        {
          title: "Research & Innovation",
          description: "Enterprise R&D initiatives",
          href: "/research",
          icon: FlaskConical,
        },

      ],
    },

    {
      title: "Industry Programs",
      description: "Real Industry Experience",

      items: [

        {
          title: "Software Internship",
          description: "Enterprise Software Engineering",
          href: "/internship/software",
          icon: Code2,
        },

        {
          title: "AI Internship",
          description: "Artificial Intelligence Projects",
          href: "/internship/ai",
          icon: Bot,
        },

        {
          title: "Commercial Product Development",
          description: "Work on real products",
          href: "/commercial-products",
          icon: Rocket,
          badge: "POPULAR",
        },

        {
          title: "Industry Readiness Program",
          description: "Portfolio + Placement",
          href: "/industry-readiness",
          icon: Award,
        },

      ],
    },

  ],
},

{
  title: "Products",
 href: "/products",
  sections: [

    {
      title: "Core Platforms",
      description: "Enterprise Products",

      items: [

        {
          title: "BrainzTalks",
          description: "Learning Management Platform",
          href: "https://brainztalks.com",
          icon: BookOpen,
          badge: "POPULAR",
        },

        {
          title: "Srishtizia Product 1",
          description: "AI Competency Evaluation Platform",
          href: "/products/srishtizia-product-1",
          icon: BadgeCheck,
          badge: "NEW",
        },

        {
          title: "Srishtizia Product 2",
          description: "48 Hour MVP Challenge Platform",
          href: "/products/srishtizia-product-2",
          icon: Rocket,
          badge: "NEW",
        },

        {
          title: "Brain Train LMS",
          description: "Learning & Course Management",
          href: "/products/lms",
          icon: GraduationCap,
        },

      ],

    },

    {
      title: "Developer Tools",
      description: "Engineering Platforms",

      items: [

        {
          title: "Evaluation Engine",
          description: "AI Powered Competency Evaluation",
          href: "/products/evaluation-engine",
          icon: Brain,
        },

        {
          title: "Portfolio Builder",
          description: "Industry Ready Portfolio Generator",
          href: "/products/portfolio-builder",
          icon: Award,
        },

        {
          title: "Hall of Excellence",
          description: "Students & Colleges Recognition",
          href: "/hall-of-excellence",
          icon: Trophy,
        },

        {
          title: "Developer Portal",
          description: "API & SDK Documentation",
          href: "/developers",
          icon: FileCode2,
          badge: "BETA",
        },

      ],

    },

  ],

},

{
  title: "Learning",
  href: "/learning",
  sections: [

    {

      title: "Academies",

      description: "Professional Learning",

      items: [

        {

          title: "AI Academy",

          description: "Artificial Intelligence Roadmap",

          href: "/academy/ai",

          icon: Brain,

        },

        {

          title: "Software Engineering",

          description: "Full Stack Engineering",

          href: "/academy/software",

          icon: Code2,

        },

        {

          title: "DevOps Engineering",

          description: "Docker Kubernetes CI/CD",

          href: "/academy/devops",

          icon: Server,

        },

        {

          title: "Cloud Engineering",

          description: "AWS Azure GCP",

          href: "/academy/cloud",

          icon: Cloud,

        },

      ],

    },

    {

      title: "Special Programs",

      description: "Career Growth",

      items: [

        {

          title: "Weekend MVP",

          description: "48 Hour Product Challenge",

          href: "/weekend-mvp",

          icon: Rocket,

        },

        {

          title: "Micro MVP",

          description: "16 Hour Mini Challenge",

          href: "/micro-mvp",

          icon: Star,

        },

        {

          title: "Industry Readiness",

          description: "Portfolio + Placement",

          href: "/industry-readiness",

          icon: Award,

        },

        {

          title: "Career Accelerator",

          description: "Become Industry Ready",

          href: "/career-accelerator",

          icon: Briefcase,

        },

      ],

    },

  ],

},

{
  title: "Community",
 href: "/community",
  sections: [

    {
      title: "Student Community",
      description: "Collaborate, Learn & Grow",

      items: [

        {
          title: "Internships",
          description: "Live Industry Internship Programs",
          href: "/internships",
          icon: Briefcase,
          badge: "POPULAR",
        },

        {
          title: "Industry Programs",
          description: "Industry Readiness Initiatives",
          href: "/industry-programs",
          icon: Workflow,
        },

        {
          title: "Hackathons",
          description: "Innovation & Coding Challenges",
          href: "/hackathons",
          icon: Rocket,
          badge: "NEW",
        },

        {
          title: "Leaderboards",
          description: "Student Rankings & Achievements",
          href: "/leaderboards",
          icon: Trophy,
        },

      ],
    },

    {
      title: "Academic Partners",
      description: "Universities & Faculty",

      items: [

        {
          title: "College Partners",
          description: "Partner Institutions",
          href: "/college-partners",
          icon: Building2,
        },

        {
          title: "Faculty Portal",
          description: "Faculty Dashboard",
          href: "/faculty",
          icon: Users,
        },

        {
          title: "Hall of Excellence",
          description: "Top Colleges & Students",
          href: "/hall-of-excellence",
          icon: Award,
          badge: "POPULAR",
        },

        {
          title: "Community Events",
          description: "Meetups & Workshops",
          href: "/events",
          icon: CalendarDays,
        },

      ],
    },

  ],

},

{
  title: "Company",
 href: "/company",
  sections: [

    {

      title: "About Brain Train",

      description: "Company Information",

      items: [

        {

          title: "About Us",

          description: "Who We Are",

          href: "/about",

          icon: Building2,

        },

        {

          title: "Our Services",

          description: "Technology Consulting",

          href: "/services",

          icon: Layers,

        },

        {

          title: "Careers",

          description: "Join Our Team",

          href: "/careers",

          icon: Briefcase,

        },

        {

          title: "News & Media",

          description: "Latest Updates",

          href: "/news",

          icon: Newspaper,

        },

      ],

    },

    {

      title: "Resources",

      description: "Support & Documentation",

      items: [

        {

          title: "Blogs",

          description: "Technology Articles",

          href: "/blogs",

          icon: BookMarked,

        },

        {

          title: "Help Center",

          description: "FAQs & Documentation",

          href: "/help",

          icon: CircleHelp,

        },

        {

          title: "Contact",

          description: "Get in Touch",

          href: "/contact",

          icon: Contact,

        },

        {

          title: "Support",

          description: "Customer Success",

          href: "/support",

          icon: LifeBuoy,

        },

      ],

    },

  ],

},
];

export const findMenu = (title: string) =>
  MENU.find((menu) => menu.title === title);

export const getAllMenuItems = () =>
  MENU.flatMap((menu) =>
    menu.sections.flatMap((section) => section.items)
  );

export const getMenuTitles = () =>
  MENU.map((menu) => menu.title);

export const getMenuSection = (
  menuTitle: string,
  sectionTitle: string
) => {
  const menu = MENU.find((m) => m.title === menuTitle);

  return menu?.sections.find(
    (section) => section.title === sectionTitle
  );
};

export const getPopularItems = () =>
  getAllMenuItems().filter(
    (item) => item.badge === "POPULAR"
  );

export const getNewItems = () =>
  getAllMenuItems().filter(
    (item) => item.badge === "NEW"
  );

export const searchMenu = (keyword: string) => {
  const query = keyword.toLowerCase();

  return getAllMenuItems().filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );
};

