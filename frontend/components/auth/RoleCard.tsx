"use client";

import Link from "next/link";

import {
  ArrowRight,
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

const ICONS = {
  student: GraduationCap,
  mentor: Users,
  trainer: UserCog,
  recruiter: Briefcase,
  doctor: Stethoscope,
  lawyer: Scale,
  institution: Building2,
  judge: Gavel,
  viewer: Eye,
  admin: Shield,
};

interface Props {
  role: {
    title: string;
    description: string;
    icon: keyof typeof ICONS;
    href: string;
    gradient: string;
  };
}

export default function RoleCard({ role }: Props) {
  const Icon = ICONS[role.icon];

  return (
    <Link
      href={role.href}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-7
      transition-all
      duration-500
      hover:-translate-y-3
      hover:border-indigo-500/40
      hover:bg-white/[0.05]
      "
    >
      <div
        className={`
        absolute
        inset-0
        opacity-0
        group-hover:opacity-10
        transition
        bg-gradient-to-br
        ${role.gradient}
        `}
      />

      <div
        className={`
        w-16
        h-16
        rounded-2xl
        bg-gradient-to-br
        ${role.gradient}
        flex
        items-center
        justify-center
        shadow-xl
        `}
      >
        <Icon className="text-white" size={30} />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-white">
        {role.title}
      </h3>

      <p className="mt-4 text-gray-400 leading-7 text-sm">
        {role.description}
      </p>

      <div
        className="
        mt-6
        flex
        items-center
        gap-2
        text-indigo-400
        group-hover:gap-4
        transition-all
        "
      >
        Continue
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}