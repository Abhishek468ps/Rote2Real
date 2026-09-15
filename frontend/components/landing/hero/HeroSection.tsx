"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  Database,
  Cloud,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import Particles from "@tsparticles/react";
import Tilt from "react-parallax-tilt";

const modules = [
  {
    title: "AI Engineering Studio",
    icon: Brain,
    position: "top-10 left-0 lg:left-8",
  },
  {
    title: "Thin Client Cloud",
    icon: Cloud,
    position: "top-10 right-0 lg:right-8",
  },
  {
    title: "Srishtizia",
    icon: Cpu,
    position: "bottom-10 left-0 lg:left-8",
  },
  {
    title: "Industry Projects",
    icon: Database,
    position: "bottom-10 right-0 lg:right-8",
  },
];

const stats = [
  {
    value: "25+",
    label: "Enterprise Products",
  },
  {
    value: "10K+",
    label: "Future Learners",
  },
  {
    value: "100+",
    label: "Industry Projects",
  },
  {
    value: "AI",
    label: "Powered Ecosystem",
  },
];

const commands = [
  "Initializing AI Infrastructure...",
  "Loading Neural Engine...",
  "Connecting Ecosystem Modules...",
  "Deploying Adaptive Intelligence...",
  "System Ready.",
];

export default function HeroSection() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#05070D] text-white pt-24 pb-16"
      onMouseMove={(e) =>
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
    >
      {/* Mouse Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            600px circle at ${position.x}px ${position.y}px,
            rgba(99, 102, 241, 0.15),
            transparent 40%
          )`,
        }}
      />

      {/* Ambient Grid Overlay */}
      <div className="absolute inset-0 bg-ambient-grid opacity-60 pointer-events-none z-0" />

      {/* Particle Background */}
      <Particles
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        options={{
          particles: {
            number: {
              value: 40,
            },
            move: {
              enable: true,
              speed: 0.8,
            },
            size: {
              value: 2,
            },
            opacity: {
              value: 0.3,
            },
            color: {
              value: "#818cf8",
            },
          },
        }}
      />

      {/* Neural Atmospheric Glow Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute left-1/4 top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-600/30 blur-[160px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[450px] w-[450px] rounded-full bg-purple-600/30 blur-[160px]" />

        <svg className="absolute inset-0 h-full w-full opacity-30">
          <line
            x1="20%"
            y1="30%"
            x2="50%"
            y2="50%"
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.3"
          />
          <line
            x1="80%"
            y1="30%"
            x2="50%"
            y2="50%"
            stroke="#a855f7"
            strokeWidth="1"
            opacity="0.3"
          />
          <line
            x1="20%"
            y1="70%"
            x2="50%"
            y2="50%"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.3"
          />
          <line
            x1="80%"
            y1="70%"
            x2="50%"
            y2="50%"
            stroke="#6366f1"
            strokeWidth="1"
            opacity="0.3"
          />

          <circle cx="20%" cy="30%" r="4" fill="#818cf8" />
          <circle cx="80%" cy="30%" r="4" fill="#a855f7" />
          <circle cx="50%" cy="50%" r="5" fill="#6366f1" />
          <circle cx="20%" cy="70%" r="4" fill="#06b6d4" />
          <circle cx="80%" cy="70%" r="4" fill="#818cf8" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-12">

        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 sm:px-6 sm:py-2.5 backdrop-blur-xl shadow-lg shadow-indigo-500/10">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-indigo-300">
              India's AI Engineering Ecosystem
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="mt-8 text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight">
          Build{" "}
          <TypeAnimation
            sequence={[
              "AI Systems",
              2000,
              "Enterprise Software",
              2000,
              "Intelligent Infrastructure",
              2000,
              "The Future",
              2000,
            ]}
            wrapper="span"
            repeat={Infinity}
            className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          />
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-400 mt-2 sm:mt-4">
            Not Just Applications
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm sm:text-lg text-slate-400 leading-relaxed">
          AI Engineering Studio • Thin Client Infrastructure •
          Srishtizia • Research • Innovation • Industry Programs
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
          <Link
            href="/join"
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 border border-purple-400/30 transition-all duration-200 active:scale-[0.97]"
          >
            <span>Join Ecosystem</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/evaluation"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-7 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-600 backdrop-blur-xl shadow-sm transition-all duration-200 active:scale-[0.97]"
          >
            Free AI Evaluation
          </Link>
        </div>

        {/* Central Neural Orb & Responsive Floating Cards */}
        <div className="relative mx-auto mt-16 sm:mt-24 max-w-5xl">
          
          {/* Central Animated Orb Container */}
          <div className="relative mx-auto flex h-[320px] sm:h-[400px] items-center justify-center">

            <div className="absolute h-60 w-60 sm:h-72 sm:w-72 animate-spin rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 blur-3xl opacity-35" />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full border border-indigo-500/20"
            />

            <motion.div
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full border border-indigo-500/40 bg-slate-950/80 backdrop-blur-2xl shadow-2xl shadow-indigo-600/20"
            >
              <div className="text-center p-3">
                <Brain className="mx-auto mb-2 text-indigo-400" size={40} />
                <p className="text-sm sm:text-base font-bold text-white leading-tight">
                  Brain Train AI
                </p>
              </div>
            </motion.div>

            {/* Desktop Floating Modules (hidden on mobile to prevent overflow) */}
            <div className="hidden md:block">
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <motion.div
                    key={module.title}
                    animate={{
                      y: [-8, 8, -8],
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute ${module.position}
                    rounded-2xl
                    border border-slate-800/80
                    bg-slate-900/80
                    px-5 py-4
                    backdrop-blur-xl
                    hover:scale-105
                    hover:border-indigo-500/50
                    shadow-xl
                    transition-all
                    duration-300`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Icon className="text-indigo-400" size={18} />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">{module.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Mobile Grid Layout for Modules (visible only on mobile) */}
          <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-xl flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Icon className="text-indigo-400" size={16} />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate">{module.title}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Terminal Execution Window */}
        <div className="mx-auto mt-16 sm:mt-20 max-w-3xl rounded-2xl border border-indigo-500/20 bg-slate-950/80 p-5 sm:p-8 font-mono text-emerald-400 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] text-slate-500 ml-2">braintrain-ai-kernel</span>
          </div>

          {commands.map((cmd, index) => (
            <motion.p
              key={cmd}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.6,
                duration: 0.4,
              }}
              className="mb-2 text-xs sm:text-sm font-medium"
            >
              <span className="text-indigo-400 mr-2 font-bold">{">"}</span> {cmd}
            </motion.p>
          ))}
        </div>

        {/* Key Metrics & Stats Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <Tilt
              key={stat.label}
              glareEnable={true}
              glareMaxOpacity={0.15}
              scale={1.03}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
            >
              <div
                className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 shadow-xl"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {typeof stat.value === "number" ? (
                    <CountUp
                      end={stat.value}
                      duration={3}
                    />
                  ) : (
                    stat.value
                  )}
                </h3>

                <p className="mt-2 text-xs sm:text-sm font-medium text-slate-400">
                  {stat.label}
                </p>
              </div>
            </Tilt>
          ))}
        </div>

      </div>
    </section>
  );
}