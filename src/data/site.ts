export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Tan Sri Dato' Seri Ahmad Razak",
    role: "Managing Director",
    company: "Nexus Integrated Systems Sdn Bhd",
    quote:
      "ChannelFirst has been our go-to distributor for over five years. Their stock availability for enterprise networking gear is unmatched, and the dedicated account manager makes procurement seamless. They understand the Malaysian market better than any other distributor we've worked with.",
    rating: 5,
  },
  {
    name: "Lim Mei Ling",
    role: "Procurement Manager",
    company: "Greenfield Technology Solutions",
    quote:
      "The reseller portal changed how we manage our IT procurement. Real-time stock checks, fast order processing, and competitive pricing — it's the complete package. We've scaled from 20 to over 80 active accounts with ChannelFirst supporting our growth.",
    rating: 5,
  },
  {
    name: "Dr. Noraini Binti Yusof",
    role: "CTO",
    company: "Sarawak Data Centre Sdn Bhd",
    quote:
      "When we needed 50+ FortiGate units with same-day dispatch for a government project in Kuching, ChannelFirst delivered. Their East Malaysia logistics and technical support team made what could have been a nightmare completely stress-free.",
    rating: 5,
  },
];

export interface Promotion {
  id: string;
  title: string;
  description: string;
  validity: string;
  tag: string;
  badge: string;
}

export const promotions: Promotion[] = [
  {
    id: "net-refresh-2025",
    title: "Networking Refresh Promo",
    description:
      "Purchase 10 or more Cisco Catalyst switches or Aruba access points and receive up to 15% off list pricing. Valid on all 2024–2025 product lines. Perfect for branch office expansions and campus-wide network upgrades.",
    validity: "Valid until 30 September 2025",
    tag: "Promotion",
    badge: "Limited Time",
  },
  {
    id: "endpoint-sme-2025",
    title: "Endpoint Bundle for SMEs",
    description:
      "Bundle a Lenovo ThinkCentre or Dell Vostro workstation with a 24\" monitor and Logitech peripherals at a bundled price. Includes 3-year on-site warranty and free setup assistance. Ideal for SME office deployments.",
    validity: "Valid until 31 December 2025",
    tag: "Bundle Deal",
    badge: "New Arrival",
  },
  {
    id: "security-tradein-2025",
    title: "Security Appliance Trade-In Programme",
    description:
      "Trade in your legacy firewall or UTM appliance and receive additional discount on a FortiGate 200F or 100F. Includes free FortiGuard subscription for 12 months with qualifying trades. Make the upgrade to next-gen security.",
    validity: "Valid until 28 February 2026",
    tag: "Trade-In",
    badge: "Hot Deal",
  },
];

export interface ResellerTier {
  name: string;
  icon: string;
  color: string;
  minAnnualSpend: string;
  benefits: string[];
  highlight: boolean;
}

export const resellerTiers: ResellerTier[] = [
  {
    name: "Silver Partner",
    icon: "silver",
    color: "from-slate-400 to-slate-500",
    minAnnualSpend: "RM 100,000",
    benefits: [
      "Standard reseller pricing (5–10% off list)",
      "Dedicated reseller portal access",
      "Email and phone support during business hours",
      "Quarterly product newsletters",
      "Access to standard training webinars",
    ],
    highlight: false,
  },
  {
    name: "Gold Partner",
    icon: "gold",
    color: "from-amber-400 to-amber-600",
    minAnnualSpend: "RM 500,000",
    benefits: [
      "Enhanced reseller pricing (10–15% off list)",
      "Priority stock allocation on high-demand products",
      "Dedicated account manager",
      "Same-day dispatch on selected stock",
      "Marketing development funds (MDF) up to RM 5,000/year",
      "Access to advanced technical training",
      "Co-branded marketing materials",
    ],
    highlight: true,
  },
  {
    name: "Platinum Partner",
    icon: "platinum",
    color: "from-blue-500 to-blue-700",
    minAnnualSpend: "RM 1,500,000",
    benefits: [
      "Maximum reseller pricing (15–25% off list)",
      "Guaranteed stock reservation for enterprise deals",
      "Named senior account director",
      "Priority engineering support (24/7 for Platinum projects)",
      "MDF up to RM 20,000/year",
      "Exclusive partner events and vendor summits",
      "Custom solution architecture support",
      "Fast-track RMA and warranty processing",
    ],
    highlight: false,
  },
];

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  seats: number;
  available: number;
  description: string;
  tags: string[];
}

export const events: Event[] = [
  {
    id: "fortinet-fundamentals",
    title: "Fortinet Security Fundamentals",
    date: "15 September 2025",
    time: "9:00 AM – 5:00 PM",
    location: "ChannelFirst Academy, Subang Jaya",
    seats: 30,
    available: 8,
    description:
      "Two-day hands-on workshop covering FortiGate firewall configuration, SD-WAN deployment, and FortiGuard threat protection. Includes Fortinet NSE 4 preparation materials.",
    tags: ["Fortinet", "Cybersecurity", "Certification"],
  },
  {
    id: "aruba-bootcamp",
    title: "Aruba Networking Bootcamp",
    date: "28 September 2025",
    time: "9:00 AM – 4:00 PM",
    location: "Penang Branch Office",
    seats: 20,
    available: 3,
    description:
      "Deep-dive into Aruba Instant On and Mobility Master architecture. Learn switch configuration, wireless design, and Air Engine deployment for modern enterprise networks.",
    tags: ["Aruba", "Networking", "Wi-Fi"],
  },
  {
    id: "m365-partner",
    title: "Microsoft 365 Partner Enablement",
    date: "10 October 2025",
    time: "10:00 AM – 3:00 PM",
    location: "Virtual (Zoom)",
    seats: 50,
    available: 22,
    description:
      "Updated session on Microsoft 365 licensing strategies, Defender for Office 365 deployment, and Intune device management. Designed for partners selling to SMB and enterprise clients.",
    tags: ["Microsoft", "Cloud", "Licensing"],
  },
];

export interface Branch {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  type: "hq" | "branch";
}

export const branches: Branch[] = [
  {
    name: "Kuala Lumpur HQ",
    address:
      "Lot 15, Jalan Teknologi 3/5, Taman Sains Selangor, 47810 Petaling Jaya, Selangor",
    phone: "03-2780 8888",
    email: "sales@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 6:00 PM",
    type: "hq",
  },
  {
    name: "Penang Branch",
    address:
      "Lot 3-2-1, Block C, Bayan Perdana Tech Hub, 11900 Bayan Lepas, Penang",
    phone: "04-618 8888",
    email: "penang@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 5:30 PM",
    type: "branch",
  },
  {
    name: "Johor Bahru Office",
    address:
      "Lot 03-01, Plaza Belua, Jalan Tun Abdul Razak, 80000 Johor Bahru, Johor",
    phone: "07-233 8888",
    email: "jb@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 5:30 PM",
    type: "branch",
  },
  {
    name: "Kota Kinabalu Branch",
    address:
      "Lot 2-1-8, Block 2, Menara Lien Hoe, Jalan Tun Abang Haji Openg, 88300 Kota Kinabalu, Sabah",
    phone: "088-318 888",
    email: "sabah@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 5:30 PM",
    type: "branch",
  },
  {
    name: "Kuching Office",
    address:
      "Lot 1-4-5, First Avenue, Lot 12, Persiaran First Avenue, Petra Jaya, 93000 Kuching, Sarawak",
    phone: "082-228 888",
    email: "sarawak@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 5:30 PM",
    type: "branch",
  },
];
