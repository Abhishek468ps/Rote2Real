// Centralized configuration for enterprise-level content management
/*export interface SiteConfig {
  site: {
    name: string;
    description: string;
    url: string;
    ogImage: string;
  };
  company: {
    name: string;
    tagline: string;
    description: string;
    founded: string;
    location: string;
    email: string;
    phone: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    github: string;
    youtube: string;
  };
  navigation: {
    main: Array<{
      name: string;
      href: string;
      external?: boolean;
    }>;
    footer: Array<{
      name: string;
      href: string;
      external?: boolean;
    }>;
  };
}

export const siteConfig: SiteConfig = {
  site: {
    name: "BrainTrain Consultancy Services LLP",
    description: "Empowering organizations with AI-driven business consulting, digital transformation, and corporate training solutions.",
    url: "https://brainzedge.com",
    ogImage: "/assets/images/og-image.png"
  },
  company: {
    name: "BrainTrain Consultancy Services LLP",
    tagline: "Driving Innovation with AI & Professional Expertise",
    description: "Empowering businesses and students with AI-driven solutions and actionable insights.",
    founded: "2010",
    location: "India",
    email: "info@braintrainconsultancy.com",
    phone: "+91-XXXXXXXXXX"
  },

  social: {
    linkedin: "https://www.linkedin.com/company/brain-train-consultancy-service-llp",
    github: "https://github.com/braintrain-consultancy",
    youtube: "https://youtube.com/@braintrainconsultancy"
  },
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Industries", href: "/industries" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" }
    ],
    footer: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" }
    ]
  }
};*/


const config = {
  env :{
    apiEndpoint : process.env.NEXT_PUBLIC_API_ENDPOINT,
  }
};

export default config;


