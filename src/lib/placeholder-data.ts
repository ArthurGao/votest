// This file contains placeholder data that you'll be replacing with real data

import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Bot,
  Settings2,
  Frame,
  Map,
  ScanEye,
  Shield,
  FileCheck,
  CheckCheckIcon,
  ChartArea,
  Scroll,
  Calendar,
  AlertTriangle,
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
} from "lucide-react"

// Sample user data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-01-15",
    // avatar: "/placeholder.svg?height=32&width=32",
    avatar: "",
    initials: "SJ",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-01-14",
    avatar: "",
    initials: "MC",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Designer",
    department: "Design",
    status: "Active",
    lastLogin: "2024-01-13",
    avatar: "",
    initials: "ED",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    role: "Manager",
    department: "Marketing",
    status: "Inactive",
    lastLogin: "2024-01-10",
    avatar: "",
    initials: "AR",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-01-15",
    avatar: "",
    initials: "LW",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Analyst",
    department: "Finance",
    status: "Active",
    lastLogin: "2024-01-12",
    avatar: "",
    initials: "DB",
  },
  {
    id: "7",
    name: "Jennifer Wilson",
    email: "jennifer.wilson@company.com",
    role: "HR Manager",
    department: "Human Resources",
    status: "Active",
    lastLogin: "2024-01-14",
    avatar: "",
    initials: "JW",
  },
  {
    id: "8",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    role: "Sales Rep",
    department: "Sales",
    status: "Inactive",
    lastLogin: "2024-01-08",
    // avatar: "",
    initials: "RT",
  },
]


const active_user = {
    name: "CISO360AI User",
    email: "user@ciso360.ai",
    avatar: "https://github.com/ciso360ai.png",
  };

const teams = [
    {
      name: "ORG-A Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "ORG-B Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Reseller Corp.",
      logo: Command,
      plan: "Free",
    },
];

// This is sample data.
const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartArea,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Threats",
          url: "#",
        },
        {
          title: "Maturity",
          url: "#",
        },
        {
          title: "Links",
          url: "#",
        }
      ],
    },
    {
      title: "AI Sidekick",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "CISO",
          url: "#",
        },
        {
          title: "Compliance Officer",
          url: "#",
        },
        {
          title: "Security Analyst",
          url: "#",
        },
        {
          title: "Incident Responder",
          url: "#",
        },
        {
          title: "Pentester",
          url: "#",
        },
      ],
    },
    {
      title: "Assets",
      url: "#",
      icon: ScanEye,
      isActive: false,
      items: [
        {
          title: "Identities",
          url: "#",
        },
        {
          title: "Devices",
          url: "#",
        },
                {
          title: "Networks",
          url: "#",
        },
        {
          title: "Apps",
          url: "#",
        },
        {
          title: "Cloud",
          url: "#",
        },
        {
          title: "Data",
          url: "#",
        },
      ],
    },
// vulnerabilities
    {
      title: "Threat Management",
      url: "#",
      icon: Shield,
      isActive: false,
      items: [
        {
          title: "Vulnerabilities",
          url: "#",
        },
        {title: "Risks",
          url: "#",
        },
        {title: "Actions",
          url: "#",
        },
        {title: "Scans",
          url: "#",
        },
      ],
    },
    {
      title: "Compliance Management",
      url: "#",
      icon: FileCheck,
      isActive: false,
      items: [
        {title: "Frameworks",
          url: "#",
        },
        {title: "Policies",
          url: "#",
        },
        {title: "Controls",
          url: "#",
        },
        {title: "Assessments",
          url: "#",
        },
      ],
    },
    {
      title: "Third-Party Management",
      url: "#",
      icon: CheckCheckIcon,
      isActive: false,
      items: [
        {title: "Third-Party Suppliers",
          url: "#",
        },
        {title: "Third-Party Assessments",
          url: "#",
        },
        {title: "Third-Party Risks",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Scroll,
      isActive: false,
      items: [
        {title: "Vulnerability Reports",
          url: "#",
        },
        {title: "Compliance Reports",
          url: "#",
        },
        {title: "Risk Reports",
          url: "#",
        },
      ],
    },
];

  const projects = [
    {
      name: "Global",
      url: "#",
      icon: Frame,
    },
    {
      name: "CRM",
      url: "#",
      icon: Map,
    },
];

const navSettings = [
{
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Organisation Management",
          url: "/organization/users",
        },
        {
          title: "Integrations",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
      ],
    },
  ];

const activities = [
  {
    user: {
      name: "Sarah Chen",
      email: "sarah.chen@ciso360.ai",
      avatar: "",
      initials: "SC",
    },
    action: "completed vulnerability assessment",
    target: "Critical Infrastructure Scan",
    time: "2 minutes ago",
  },
  {
    user: {
      name: "Mike Rodriguez",
      email: "mike.rodriguez@ciso360.ai",
      avatar: "",
      initials: "MR",
    },
    action: "updated risk register",
    target: "Third-Party Vendor Risk Assessment",
    time: "15 minutes ago",
  },
  {
    user: {
      name: "Emily Davis",
      email: "emily.davis@ciso360.ai",
      initials: "ED",
    },
    action: "submitted compliance report",
    target: "SOC 2 Type II Audit",
    time: "1 hour ago",
  },
  {
    user: {
      name: "Alex Thompson",
      email: "alex.thompson@ciso360.ai",
      initials: "AT",
    },
    action: "remediated security control",
    target: "Multi-Factor Authentication Implementation",
    time: "2 hours ago",
  },
  {
    user: {
      name: "Lisa Wang",
      email: "lisa.wang@ciso360.ai",
      initials: "LW",
    },
    action: "initiated incident response",
    target: "Potential Data Breach - Investigation",
    time: "3 hours ago",
  },
  {
    user: {
      name: "David Kim",
      email: "david.kim@ciso360.ai",
      initials: "DK",
    },
    action: "approved control framework",
    target: "NIST Cybersecurity Framework Mapping",
    time: "4 hours ago",
  },
  {
    user: {
      name: "Rachel Martinez",
      email: "rachel.martinez@ciso360.ai",
      initials: "RM",
    },
    action: "escalated high-risk finding",
    target: "Critical CVE-2024-1234 Vulnerability",
    time: "5 hours ago",
  },
  {
    user: {
      name: "James Wilson",
      email: "james.wilson@ciso360.ai",
      initials: "JW",
    },
    action: "completed penetration test",
    target: "Web Application Security Assessment",
    time: "6 hours ago",
  },
];

// Sample data for right sidebar
const notifications = [
  {
    id: 1,
    title: "Critical vulnerability CVE-2024-5678 detected",
    time: "5 min ago",
    type: "warning",
  },
  {
    id: 2,
    title: "SOC 2 compliance audit scheduled for next week",
    time: "18 min ago",
    type: "info",
  },
  {
    id: 3,
    title: "High-risk vendor assessment overdue",
    time: "1 hour ago",
    type: "warning",
  },
  {
    id: 4,
    title: "Monthly security report is ready for review",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 5,
    title: "New security control implementation completed",
    time: "3 hours ago",
    type: "success",
  },
]

const quickActions = [
  {
    title: "Create Risk Assessment",
    icon: AlertTriangle,
    action: () => console.log("Create risk assessment"),
  },
  {
    title: "Schedule Audit",
    icon: Calendar,
    action: () => console.log("Schedule audit"),
  },
  {
    title: "Add Vulnerability",
    icon: Plus,
    action: () => console.log("Add vulnerability"),
  },
  {
    title: "Search Controls",
    icon: Search,
    action: () => console.log("Search controls"),
  },
]

const recentActivity = [
  {
    title: "Security dashboard updated with latest threat intel",
    time: "5 min ago",
    user: "System",
  },
  {
    title: "NIST framework gap analysis completed",
    time: "32 min ago",
    user: "Sarah Chen",
  },
  {
    title: "Vulnerability scan results exported to CSV",
    time: "1 hour ago",
    user: "Mike Rodriguez",
  },
  {
    title: "Third-party risk assessment report generated",
    time: "2 hours ago",
    user: "Emily Davis",
  },
  {
    title: "ISO 27001 compliance status updated",
    time: "3 hours ago",
    user: "Alex Thompson",
  },
  {
    title: "Incident response playbook reviewed",
    time: "4 hours ago",
    user: "Lisa Wang",
  },
]

const user_stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12 this month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "2,654",
    change: "93.2% active rate",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Inactive Users",
    value: "193",
    change: "6.8% inactive rate",
    icon: UserX,
    color: "text-orange-600",
  },
  {
    title: "Admins",
    value: "24",
    change: "0.8% of total users",
    icon: Shield,
    color: "text-purple-600",
  },
]

export { users, active_user, teams, navMain, navSettings, projects, activities, notifications, quickActions, recentActivity, user_stats };
