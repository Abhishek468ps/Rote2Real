// Centralized data management for all content

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
  linkedin?: string;
}

export interface Service {
  id: string;
  title: string;
  slug:string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
  href: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  solutions: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  tags: string[];
  slug: string;
}

export interface PastTeamMember {
  id: string;
  name: string;
  alumni: string;
  placedAt: string;
}

export const pastTeamSuccess: PastTeamMember[] = [
  {
    id: "1",
    name: "Pawan Uikey",
    alumni: "NIT Jalandhar",
    placedAt: "TCS",
  },
  {
    id: "2",
    name: "Ankit Gopi Gahnoliya",
    alumni: "LPU",
    placedAt: "Infosys",
  },
  {
    id: "3",
    name: "Rohit Lodhi",
    alumni: "DTU",
    placedAt: "Accenture",
  },
   {
    id: "4",
    name: "Shubham Kumar",
    alumni: "DTU",
    placedAt: "Accenture",
  },
];

// Team data
export const teamMembers: TeamMember[] = [
  {
    id: "rajendran",
    name: "Major Rajendran Mariagnanam Retd",
    position: "CEO & Founder",
    image: "/assets/images/team1.jpeg",
    bio: "Visionary leader with 15+ years in AI and business consulting.",
    linkedin: "https://linkedin.com/in/rajendranm"
  },
  {
  id: "monika",
  name: "Monika Singh",
  position: "Software Developer",
  image: "/assets/images/team2.jpeg",
  bio: "B.Tech Biotechnology graduate from NIT Jalandhar with strong interest in AI, ML, and web development. Contributes to software development and project execution at Brain Train Consultancy Services LLP.",
  linkedin: "https://linkedin.com/in/monikasinghtech"
},
/*
    {
    id: "manoj",
    name: "Manoj Kumar Tadekoru",
    position: "Backend Developer",
    image: "/assets/images/team3.jpeg",
    bio: "Expert in backend development, and client relations.",
    linkedin: "https://www.linkedin.com/in/manoj-kumar-tadekoru-5a7958216/"
  },*/
];

// Services data
export const services: Service[] = [
  {
    id: "ai-solutions",
    title: "AI Solutions",
    slug: "ai-solutions",
    description: "Innovative AI-powered solutions for businesses and research projects.",
    icon: "FaBrain",
    features: [
      "Custom AI model development",
      "Machine learning implementation",
      "Natural language processing",
      "Computer vision solutions"
    ],
    cta: "Explore AI Solutions",
    href: "/services/ai-solutions"
  },
  {
    id: "software-development",
    title: "Software Development",
    slug: "software-development",
    description: "End-to-end software development with modern technologies and best practices.",
    icon: "FaLaptopCode",
    features: [
      "Full-stack development",
      "Cloud-native applications",
      "API development",
      "DevOps implementation"
    ],
    cta: "View Development Services",
    href: "/services/software-development"
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    slug: "data-analytics",
    description: "Actionable insights using advanced analytics and machine learning.",
    icon: "FaChartLine",
    features: [
      "Business intelligence dashboards",
      "Predictive analytics",
      "Data visualization",
      "Statistical analysis"
    ],
    cta: "Learn About Analytics",
    href: "/services/data-analytics"
  },
  {
    id: "automation",
    title: "Automation",
    slug: "automation",
    description: "Streamlined processes and automation solutions for efficiency.",
    icon: "FaCogs",
    features: [
      "Process automation",
      "Workflow optimization",
      "RPA implementation",
      "System integration"
    ],
    cta: "Discover Automation",
    href: "/services/automation"
  }
];

// Industries data
export const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "AI-powered solutions for medical diagnosis and patient care.",
    icon: "FaHeartbeat",
    solutions: [
      "Medical image analysis",
      "Predictive health analytics",
      "Drug discovery optimization",
      "Patient monitoring systems"
    ]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Advanced analytics for risk management and fraud detection.",
    icon: "FaDollarSign",
    solutions: [
      "Fraud detection systems",
      "Algorithmic trading",
      "Credit risk assessment",
      "Regulatory compliance"
    ]
  },
  {
    id: "education",
    name: "Education",
    description: "Personalized learning and educational technology solutions.",
    icon: "FaGraduationCap",
    solutions: [
      "Adaptive learning platforms",
      "Student performance analytics",
      "Automated assessment tools",
      "Learning management systems"
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Smart manufacturing and quality control solutions.",
    icon: "FaIndustry",
    solutions: [
      "Predictive maintenance",
      "Quality control automation",
      "Supply chain optimization",
      "Production planning"
    ]
  }
];

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    id: "healthcare-ai",
    title: "AI-Powered Medical Diagnosis System",
    client: "Regional Medical Center",
    industry: "Healthcare",
    challenge: "Reducing diagnosis time and improving accuracy in medical imaging.",
    solution: "Implemented deep learning models for automated medical image analysis with 95% accuracy.",
    results: [
      "50% reduction in diagnosis time",
      "95% accuracy in image classification",
      "30% improvement in patient outcomes",
      "40% cost savings in diagnostic processes"
    ],
    image: "/case-studies/healthcare-ai.jpg",
    testimonial: {
      quote: "The AI system has revolutionized our diagnostic capabilities and improved patient care significantly.",
      author: "Dr. Sarah Johnson",
      position: "Chief Medical Officer"
    }
  },
  {
    id: "finance-fraud",
    title: "Advanced Fraud Detection System",
    client: "National Bank",
    industry: "Finance",
    challenge: "Detecting fraudulent transactions in real-time with high accuracy.",
    solution: "Developed machine learning models that analyze transaction patterns and detect anomalies.",
    results: [
      "99.5% fraud detection accuracy",
      "Real-time transaction monitoring",
      "60% reduction in false positives",
      "$2M saved in prevented fraud"
    ],
    image: "/case-studies/finance-fraud.jpg"
  }
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Dr. Sarah Johnson",
    position: "Chief Medical Officer",
    company: "Regional Medical Center",
    quote: "BrainTrain's AI solutions have transformed our diagnostic capabilities and improved patient outcomes significantly.",
    image: "/testimonials/sarah-johnson.jpg",
    rating: 5
  },
  {
    id: "testimonial-2",
    name: "Michael Chen",
    position: "CTO",
    company: "TechStart Inc.",
    quote: "The automation solutions provided by BrainTrain have streamlined our operations and increased efficiency by 40%.",
    image: "/testimonials/michael-chen.jpg",
    rating: 5
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    position: "Data Science Director",
    company: "Analytics Corp",
    quote: "Their data analytics expertise helped us uncover insights that drove a 25% increase in revenue.",
    image: "/testimonials/emily-rodriguez.jpg",
    rating: 5
  }
];

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "ai-trends-2024",
    title: "AI Trends to Watch in 2024",
    excerpt: "Explore the latest artificial intelligence trends that are shaping the future of business and technology.",
    content: "Full blog post content here...",
    author: "Rajendran Mariagnam",
    publishedAt: "2024-01-15",
    image: "/blog/ai-trends-2024.jpg",
    tags: ["AI", "Technology", "Trends", "Innovation"],
    slug: "ai-trends-2024"
  },
  {
    id: "machine-learning-basics",
    title: "Getting Started with Machine Learning",
    excerpt: "A comprehensive guide for beginners who want to understand machine learning fundamentals.",
    content: "Full blog post content here...",
    author: "Shubham Kumar",
    publishedAt: "2024-01-10",
    image: "/blog/machine-learning-basics.jpg",
    tags: ["Machine Learning", "Tutorial", "AI", "Education"],
    slug: "machine-learning-basics"
  }
];



export const courses = [
  {
    slug: "ai-engineer-bootcamp",
    title: "AI Engineer Bootcamp 2026",
    instructor: "Brain Train Faculty",
    price: 3999,
    originalPrice: 7999,
    rating: 4.7,
    students: 32951,
    duration: "8 Weeks",
    level: "Intermediate",
    updated: "February 2026",
    bestseller: true,
    premium: true,
    shortDescription:
      "Become a production-ready AI Engineer with real enterprise projects.",
    description:
      "Master enterprise AI systems including LLMs, RAG, AI Agents and MCP integrations.",
    image: "/assets/images/course1.jpg",
  },
  {
    slug: "agentic-ai-track",
    title: "AI Engineer Agentic Track",
    instructor: "Brain Train Faculty",
    price: 4499,
    originalPrice: 8999,
    rating: 4.8,
    students: 21000,
    duration: "10 Weeks",
    level: "Advanced",
    updated: "March 2026",
    bestseller: true,
    premium: true,
    shortDescription:
      "Build AI Agents using OpenAI SDK, CrewAI, LangGraph and AutoGen.",
    description:
      "Hands-on projects to build real world multi-agent enterprise systems.",
    image: "/assets/images/course2.jpg",
  },
  {
    slug: "llm-engineering-core",
    title: "LLM Engineering Core Track",
    instructor: "Brain Train Faculty",
    price: 3499,
    originalPrice: 6999,
    rating: 4.6,
    students: 18000,
    duration: "6 Weeks",
    level: "Intermediate",
    updated: "January 2026",
    bestseller: false,
    premium: true,
    shortDescription:
      "Deep dive into RAG pipelines, fine-tuning and LLM deployment.",
    description:
      "Complete system design for scalable AI applications.",
    image: "/assets/images/course3.jpg",
  },
];