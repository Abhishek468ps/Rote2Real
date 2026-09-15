import {
  LayoutDashboard,
  Target,
  Users,
  FolderKanban,
  Trophy,
  CreditCard,
  Wallet,
  FileText,
  Bell,
  Settings,
  Shield,
  GraduationCap,
  Building2,
  Briefcase,
   UserRound,
  UserCheck,
  ClipboardList,
  ScrollText,
  Database,
  PlusCircle,
  Clock,
  CheckCircle2,
  FileEdit,
  BarChart3,
  Zap,
  UserCog
} from "lucide-react";

export interface MenuItem {
  title: string;
  href: string;
  icon: any;
  badge?: number;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const MENU_CONFIG: Record<string, MenuSection[]> = {
   /* =====================================================
     STUDENT
  ===================================================== */

  STUDENT: [
    {
      title: "MAIN",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard/student",
          icon: LayoutDashboard,
        },
        {
          title: "Community",
          href: "/dashboard/community",
          icon: Users,
        },
        {
          title: "My MVPs",
          href: "/dashboard/student/mvps",
          icon: Target,
        },
      ],
    },

    {
      title: "WORKSPACE",
      items: [
        {
          title: "Team",
          href: "/dashboard/student/team",
          icon: Users,
        },
        {
          title: "Projects",
          href: "/dashboard/student/projects",
          icon: FolderKanban,
        },
        {
          title: "Achievements",
          href: "/dashboard/student/achievements",
          icon: Trophy,
        },
      ],
    },

    {
      title: "ACCOUNT",
      items: [
        {
          title: "Wallet",
          href: "/dashboard/student/wallet",
          icon: Wallet,
        },
        {
          title: "Payments",
          href: "/dashboard/student/payments",
          icon: CreditCard,
        },
        {
          title: "Reports",
          href: "/dashboard/student/reports",
          icon: FileText,
        },
        {
          title: "Notifications",
          href: "/dashboard/student/notifications",
          icon: Bell,
          badge: 3,
        },
        {
          title: "Settings",
          href: "/dashboard/student/settings",
          icon: Settings,
        },
      ],
    },
  ],

  ADMIN: [
  {
     title: "PLATFORM OVERVIEW",
      items: [
      {
        title: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Total Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        title: "Students",
        href: "/dashboard/admin/students",
        icon: GraduationCap,
      },
      {
        title: "Mentors",
        href: "/dashboard/admin/mentors",
        icon: UserCheck,
      },
      {
        title: "Revenue",
        href: "/dashboard/admin/revenue",
        icon: BarChart3,
      },
    ],
  },

  {
    title: "ADMINISTRATION",
    items: [
      {
        title: "Admin Profile",
        href: "/dashboard/admin/profile",
        icon: UserRound,
      },
      {
        title: "Admin Settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
      },
      {
        title: "User Management",
        href: "/dashboard/admin/users",
        icon: UserCog,
      },
      {
        title: "Student Management",
        href: "/dashboard/admin/students",
        icon: GraduationCap,
      },
      {
        title: "Mentor Management",
        href: "/dashboard/admin/mentors",
        icon: UserCheck,
      },
      {
        title: "Reports",
        href: "/dashboard/admin/reports",
        icon: FileText,
      },
      {
        title: "System Settings",
        href: "/dashboard/admin/system-settings",
        icon: Database,
      },
      {
        title: "Audit Logs",
        href: "/dashboard/admin/audit-logs",
        icon: ScrollText,
      },
    ],
  },

  {
    title: "MVP MANAGEMENT",
    items: [
      {
        title: "Active MVPs",
        href: "/dashboard/admin/mvps/active",
        icon: Zap,
      },
      {
        title: "Draft MVPs",
        href: "/dashboard/admin/mvps/drafts",
        icon: FileEdit,
      },
      {
        title: "Completed MVPs",
        href: "/dashboard/admin/mvps/completed",
        icon: CheckCircle2,
      },
    ],
  },

  {
    title: "CREATE NEW MVP",
    items: [
      {
        title: "Create New MVP",
        href: "/dashboard/admin/mvps/create",
        icon: PlusCircle,
      },
      {
        title: "48 Hours",
        href: "/dashboard/admin/mvps/create?duration=48-hours",
        icon: Clock,
      },
      {
        title: "7 Days",
        href: "/dashboard/admin/mvps/create?duration=7-days",
        icon: Clock,
      },
      {
        title: "14 Days",
        href: "/dashboard/admin/mvps/create?duration=14-days",
        icon: Clock,
      },
      {
        title: "21 Days",
        href: "/dashboard/admin/mvps/create?duration=21-days",
        icon: Clock,
      },
      {
        title: "30 Days",
        href: "/dashboard/admin/mvps/create?duration=30-days",
        icon: Clock,
      },
      {
        title: "60 Days",
        href: "/dashboard/admin/mvps/create?duration=60-days",
        icon: Clock,
      },
      {
        title: "Custom",
        href: "/dashboard/admin/mvps/create?duration=custom",
        icon: Target,
      },
    ],
  },

  {
    title: "QUICK ACTIONS",
    items: [
      {
        title: "Manage Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        title: "Create MVP",
        href: "/dashboard/admin/mvps/create",
        icon: PlusCircle,
      },
      {
        title: "Generate Report",
        href: "/dashboard/admin/reports",
        icon: FileText,
      },
      {
        title: "Audit Logs",
        href: "/dashboard/admin/audit-logs",
        icon: Shield,
      },
    ],
  },
],


  /* =====================================================
     MENTOR
  ===================================================== */

  MENTOR: [
    {
      title: "MAIN",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard/mentor",
          icon: LayoutDashboard,
        },
        {
          title: "Assigned MVPs",
          href: "/dashboard/mentor/mvps",
          icon: Target,
        },
        {
          title: "Students",
          href: "/dashboard/mentor/students",
          icon: Users,
        },
        {
          title: "Reviews",
          href: "/dashboard/mentor/reviews",
          icon: FileText,
        },
        {
          title: "Settings",
          href: "/dashboard/mentor/settings",
          icon: Settings,
        },
      ],
    },
  ],

  /* =====================================================
     RECRUITER
  ===================================================== */

  RECRUITER: [
    {
      title: "RECRUITMENT",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard/recruiter",
          icon: LayoutDashboard,
        },
        {
          title: "Candidates",
          href: "/dashboard/recruiter/candidates",
          icon: Users,
        },
        {
          title: "Jobs",
          href: "/dashboard/recruiter/jobs",
          icon: Briefcase,
        },
      ],
    },
  ],

  /* =====================================================
     COMPANY
  ===================================================== */

  COMPANY: [
    {
      title: "COMPANY",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard/company",
          icon: LayoutDashboard,
        },
        {
          title: "Projects",
          href: "/dashboard/company/projects",
          icon: FolderKanban,
        },
        {
          title: "Hiring",
          href: "/dashboard/company/hiring",
          icon: Briefcase,
        },
      ],
    },
  ],
};