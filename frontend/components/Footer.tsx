"use client";

import React from "react";
import Link from "next/link";
import { FaLinkedin, FaYoutube, FaInstagram, FaBrain } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/brain-train-consultancy-service-llp",
      icon: <FaLinkedin size={16} />,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/brain_train_consultancy/",
      icon: <FaInstagram size={16} />,
      label: "Instagram",
    },
    {
      href: "https://www.youtube.com/@braintrainconsultancyservicesl",
      icon: <FaYoutube size={16} />,
      label: "YouTube",
    },
  ];

  return (
    <footer className="w-full bg-[#05070D] border-t border-slate-800/80 pt-16 pb-12 text-slate-300 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

        {/* Top Section: Brand + Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-6">
            <Link href="/" className="flex items-center mb-4 gap-3">
              <div className="rounded-xl w-10 h-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/30">
                <FaBrain size={20} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  Brain Train
                </h2>
                <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">
                  Consultancy Services LLP
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering businesses and students with AI-driven solutions, 
              MVP development, and professional consulting services.
            </p>
          </div>

          {/* Column 1: What We Do */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              What we do
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services" className="hover:text-indigo-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-indigo-400 transition-colors">
                  Courses & Training
                </Link>
              </li>
              <li>
                <Link href="/mvps" className="hover:text-indigo-400 transition-colors">
                  MVP Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Who We Are */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Who we are
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About BrainTrain
                </Link>
              </li>
              <li>
                <Link href="/ceo-note" className="hover:text-indigo-400 transition-colors">
                  CEO Note
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="hover:text-indigo-400 transition-colors">
                  Transparency
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Careers */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-indigo-400 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-indigo-400 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Social Icons + Legal Links + Copyright */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">

          {/* Social Icons */}
          <div className="flex space-x-3">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-indigo-500/40 shadow-sm transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Footer Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <Link href="/terms-conditions" className="hover:text-indigo-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-notice" className="hover:text-indigo-400 transition-colors">
              Privacy Notice
            </Link>
            <Link href="/cookie-notice" className="hover:text-indigo-400 transition-colors">
              Cookie Notice
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-slate-500 text-xs">
            © {currentYear} Brain Train Consultancy Services LLP. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;