import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from '@/components/Services';

// Mock the API
jest.mock('@/lib/api', () => ({
  servicesApi: {
    getAll: jest.fn(),
  },
}));

// Mock the data
const mockServices = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Innovative AI-powered solutions for businesses and research projects.',
    icon: 'FaBrain',
    features: ['Custom AI model development', 'Machine learning implementation'],
    cta: 'Explore AI Solutions',
    href: '/services/ai-solutions'
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'End-to-end software development with modern technologies and best practices.',
    icon: 'FaLaptopCode',
    features: ['Full-stack development', 'Cloud-native applications'],
    cta: 'View Development Services',
    href: '/services/software-development'
  }
];

describe('Services Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    const { servicesApi } = require('@/lib/api');
    servicesApi.getAll.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ data: [], success: true }), 100))
    );

    render(<Services />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    // Loading skeletons should be present
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders services when data is loaded successfully', async () => {
    const { servicesApi } = require('@/lib/api');
    servicesApi.getAll.mockResolvedValue({
      data: mockServices,
      success: true
    });

    render(<Services />);
    
    await waitFor(() => {
      expect(screen.getByText('AI Solutions')).toBeInTheDocument();
      expect(screen.getByText('Software Development')).toBeInTheDocument();
    });
  });

  it('renders error state when API fails', async () => {
    const { servicesApi } = require('@/lib/api');
    servicesApi.getAll.mockResolvedValue({
      data: null,
      success: false,
      error: 'Failed to fetch services'
    });

    render(<Services />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load services. Please try again later.')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
  });

  it('handles network errors gracefully', async () => {
    const { servicesApi } = require('@/lib/api');
    servicesApi.getAll.mockRejectedValue(new Error('Network error'));

    render(<Services />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load services. Please try again later.')).toBeInTheDocument();
    });
  });

  it('displays service features correctly', async () => {
    const { servicesApi } = require('@/lib/api');
    servicesApi.getAll.mockResolvedValue({
      data: mockServices,
      success: true
    });

    render(<Services />);
    
    await waitFor(() => {
      expect(screen.getByText('Custom AI model development')).toBeInTheDocument();
      expect(screen.getByText('Full-stack development')).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', async () => {
    const { servicesApi } = require('@/lib/api');
    servicesApi.getAll.mockResolvedValue({
      data: mockServices,
      success: true
    });

    render(<Services />);
    
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Our Services');
    });
  });
});



