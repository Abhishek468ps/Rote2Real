// API layer for data fetching and management
import { 
  TeamMember, 
  Service, 
  Industry, 
  CaseStudy, 
  Testimonial, 
  BlogPost 
} from './data';

// Simulated API delay for realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API response type
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Error handling wrapper
async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<ApiResponse<T>> {
  try {
    const data = await apiCall();
    return { data, success: true };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null as T,
      success: false,
      error: errorMessage
    };
  }
}

// Team API
export const teamApi = {
  async getAll(): Promise<ApiResponse<TeamMember[]>> {
    return handleApiCall(async () => {
      await delay(300); // Simulate API call
      const { teamMembers } = await import('./data');
      return teamMembers;
    }, 'Failed to fetch team members');
  },

 


  async getById(id: string): Promise<ApiResponse<TeamMember | null>> {
    return handleApiCall(async () => {
      await delay(200);
      const { teamMembers } = await import('./data');
      return teamMembers.find(member => member.id === id) || null;
    }, 'Failed to fetch team member');
  }
};

// Services API
export const servicesApi = {
  async getAll(): Promise<ApiResponse<Service[]>> {
    return handleApiCall(async () => {
      await delay(300);
      const { services } = await import('./data');
      return services;
    }, 'Failed to fetch services');
  },

  async getById(id: string): Promise<ApiResponse<Service | null>> {
    return handleApiCall(async () => {
      await delay(200);
      const { services } = await import('./data');
      return services.find(service => service.id === id) || null;
    }, 'Failed to fetch service');
  }
};

// Industries API
export const industriesApi = {
  async getAll(): Promise<ApiResponse<Industry[]>> {
    return handleApiCall(async () => {
      await delay(300);
      const { industries } = await import('./data');
      return industries;
    }, 'Failed to fetch industries');
  }
};

// Case Studies API
export const caseStudiesApi = {
  async getAll(): Promise<ApiResponse<CaseStudy[]>> {
    return handleApiCall(async () => {
      await delay(400);
      const { caseStudies } = await import('./data');
      return caseStudies;
    }, 'Failed to fetch case studies');
  },

  async getById(id: string): Promise<ApiResponse<CaseStudy | null>> {
    return handleApiCall(async () => {
      await delay(200);
      const { caseStudies } = await import('./data');
      return caseStudies.find(study => study.id === id) || null;
    }, 'Failed to fetch case study');
  },

  async getByIndustry(industry: string): Promise<ApiResponse<CaseStudy[]>> {
    return handleApiCall(async () => {
      await delay(300);
      const { caseStudies } = await import('./data');
      return caseStudies.filter(study => 
        study.industry.toLowerCase() === industry.toLowerCase()
      );
    }, 'Failed to fetch case studies by industry');
  }
};

// Testimonials API
export const testimonialsApi = {
  async getAll(): Promise<ApiResponse<Testimonial[]>> {
    return handleApiCall(async () => {
      await delay(300);
      const { testimonials } = await import('./data');
      return testimonials;
    }, 'Failed to fetch testimonials');
  },

  async getFeatured(): Promise<ApiResponse<Testimonial[]>> {
    return handleApiCall(async () => {
      await delay(200);
      const { testimonials } = await import('./data');
      return testimonials.filter(testimonial => testimonial.rating === 5);
    }, 'Failed to fetch featured testimonials');
  }
};

// src/lib/api.ts

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;


export const API_ENDPOINTS = {
  SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGIN_SEND_OTP: `${API_BASE_URL}/auth/login/send-otp`,
  LOGIN_VERIFY_OTP: `${API_BASE_URL}/auth/login/verify-otp`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  UPLOAD_RESUME: `${API_BASE_URL}/files/resume`,
  STUDENT_ME: `${API_BASE_URL}/student/me`,
  ADMIN_ME: `${API_BASE_URL}/admin/me`,
  MENTOR_ME: `${API_BASE_URL}/api/mentors/me`,
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
ADMIN_USER_COUNT: `${API_BASE_URL}/admin/users/count`,
ADMIN_PROFILE: `${API_BASE_URL}/admin/profile`,
// Welcome Kit
  DOWNLOAD_WELCOME_KIT: (brainTrainId: string) =>
    `${API_BASE_URL}/downloads/welcome-kit/${brainTrainId}`,

  // ============================================================
  // MVP ADMIN
  // ============================================================

  MVP_DOMAINS: `${API_BASE_URL}/mvp-domains/active`,

  MVP_SKILLS: `${API_BASE_URL}/admin/skills`,

  MVP_TECHNOLOGIES: `${API_BASE_URL}/admin/technologies`,

  MVPS: `${API_BASE_URL}/admin/mvps`,

   // ============================================================
  // MVP SPECIFIC ACTIONS
  // ============================================================

  MVP_BY_ID: (mvpId: number | string) =>
    `${API_BASE_URL}/admin/mvps/${mvpId}`,

  MVP_SKILLS_BY_ID: (
  mvpId: number | string,
  skillId: number | string
) =>
  `${API_BASE_URL}/admin/mvps/${mvpId}/skills/${skillId}`,

MVP_TECHNOLOGIES_BY_ID: (
  mvpId: number | string,
  technologyId: number | string
) =>
  `${API_BASE_URL}/admin/mvps/${mvpId}/technologies/${technologyId}`,

  MVP_PLANS_BY_ID: (mvpId: number | string) =>
    `${API_BASE_URL}/admin/mvps/${mvpId}/plans`,

  MVP_MODULES: (mvpId: number | string) =>
  `${API_BASE_URL}/admin/mvps/${mvpId}/modules`,

MVP_MODULE_BY_ID: (moduleId: number | string) =>
  `${API_BASE_URL}/admin/mvps/modules/${moduleId}`,

MVP_TASKS: (moduleId: number | string) =>
  `${API_BASE_URL}/admin/mvp-modules/${moduleId}/tasks`,

MVP_TASK_BY_ID: (taskId: number | string) =>
  `${API_BASE_URL}/admin/mvp-modules/tasks/${taskId}`,

// ============================================================
// STUDENT MVP
// ============================================================

STUDENT_MVPS: `${API_BASE_URL}/mvps`,

STUDENT_MVP_BY_ID: (mvpId: number | string) =>
  `${API_BASE_URL}/mvps/${mvpId}`,

STUDENT_MVP_PLANS: (mvpId: number | string) =>
  `${API_BASE_URL}/mvps/${mvpId}/plans`,

STUDENT_MVPS_BY_DOMAIN: (domainId: number | string) =>
  `${API_BASE_URL}/student/domain/${domainId}`,

// ============================================================
// MVP ENROLLMENT
// ============================================================

MVP_ENROLL: `${API_BASE_URL}/mvp/enrollments`,

MVP_MY_ENROLLMENTS: `${API_BASE_URL}/mvp/enrollments/my`,

MVP_MY_ENROLLMENT: (enrollmentId: number | string) =>
  `${API_BASE_URL}/mvp/enrollments/${enrollmentId}`,

MVP_START: (enrollmentId: number | string) =>
  `${API_BASE_URL}/mvp/enrollments/${enrollmentId}/start`,

// ============================================================
// MVP PAYMENT
// ============================================================

MVP_PAYMENT_CREATE_ORDER: `${API_BASE_URL}/mvp/payments/create-order`,

MVP_PAYMENT_VERIFY: `${API_BASE_URL}/mvp/payments/verify`,

// ============================================================
// ADMIN MVP PAYMENT / STUDENTS
// ============================================================

ADMIN_MVP_PAID_STUDENTS: (mvpId: number | string) =>
  `${API_BASE_URL}/admin/mvps/${mvpId}/paid-students`,

// STUDENT MVP WORKSPACE

STUDENT_MVP_WORKSPACE_MODULES: (
  mvpId: number | string,
  enrollmentId: number | string
) =>
  `${API_BASE_URL}/mvp/workspace/${mvpId}/modules?enrollmentId=${enrollmentId}`,

STUDENT_MVP_WORKSPACE_TASKS: (
  moduleId: number | string,
  enrollmentId: number | string
) =>
  `${API_BASE_URL}/mvp/workspace/modules/${moduleId}/tasks?enrollmentId=${enrollmentId}`,
};  

// Blog API
export const blogApi = {
  async getAll(): Promise<ApiResponse<BlogPost[]>> {
    return handleApiCall(async () => {
      await delay(400);
      const { blogPosts } = await import('./data');
      return blogPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }, 'Failed to fetch blog posts');
  },

  async getById(id: string): Promise<ApiResponse<BlogPost | null>> {
    return handleApiCall(async () => {
      await delay(200);
      const { blogPosts } = await import('./data');
      return blogPosts.find(post => post.id === id) || null;
    }, 'Failed to fetch blog post');
  },

  async getBySlug(slug: string): Promise<ApiResponse<BlogPost | null>> {
    return handleApiCall(async () => {
      await delay(200);
      const { blogPosts } = await import('./data');
      return blogPosts.find(post => post.slug === slug) || null;
    }, 'Failed to fetch blog post by slug');
  },

  async getByTag(tag: string): Promise<ApiResponse<BlogPost[]>> {
    return handleApiCall(async () => {
      await delay(300);
      const { blogPosts } = await import('./data');
      return blogPosts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }, 'Failed to fetch blog posts by tag');
  },

  async getRecent(limit: number = 3): Promise<ApiResponse<BlogPost[]>> {
    return handleApiCall(async () => {
      await delay(300);
      const { blogPosts } = await import('./data');
      return blogPosts
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    }, 'Failed to fetch recent blog posts');
  }
};

// Contact form API
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
}

export const contactApi = {
  async submit(data: ContactFormData): Promise<ApiResponse<{ message: string }>> {
    return handleApiCall(async () => {
      await delay(1000); // Simulate form submission
      
      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        throw new Error('All required fields must be filled');
      }

      // Simulate successful submission
      return { message: 'Thank you for your message. We will get back to you soon!' };
    }, 'Failed to submit contact form');
  }
};

// Newsletter API
export interface NewsletterData {
  email: string;
  name?: string;
}

export const newsletterApi = {
  async subscribe(data: NewsletterData): Promise<ApiResponse<{ message: string }>> {
    return handleApiCall(async () => {
      await delay(500);
      
      if (!data.email) {
        throw new Error('Email is required');
      }

      return { message: 'Successfully subscribed to our newsletter!' };
    }, 'Failed to subscribe to newsletter');
  }
};


