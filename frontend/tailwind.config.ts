import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        haai: {
          bg: '#05070D',
          surface: '#0B0F19',
          'surface-hover': '#111726',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-bright': 'rgba(99, 102, 241, 0.3)',
          primary: '#6366F1',
          'primary-hover': '#4F46E5',
          secondary: '#00C6FF',
          growth: '#00A651',
          innovation: '#7B2FF7',
          alert: '#FFB300',
          cyan: '#06B6D4',
          emerald: '#10B981',
          purple: '#A855F7',
          pink: '#EC4899',
        }
      },
      boxShadow: {
        'haai-glow': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'haai-glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'haai-glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.3)',
        'haai-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        'float-slow': "float 6s ease-in-out infinite",
        pulseSlow: "pulse 5s ease-in-out infinite",
        'pulse-slow': "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 8s ease infinite",
        'shimmer': 'shimmer 2.5s infinite linear',
        'glow-pulse': 'glowPulse 3s infinite ease-in-out',
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-10px)",
          },
        },

        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },

          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },

  plugins: [],
};

export default config;

