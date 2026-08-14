import type { TieredPrice } from "@/lib/pricing";

export interface TechSpecs {
  poeSupport?: boolean;
  rackMountable?: "1U" | "2U" | null;
  wifiStandard?: "Wi-Fi 6" | "Wi-Fi 6E" | "Wi-Fi 7" | null;
  portCount?: number | null;
}

export interface Product {
  sku: string;
  name: string;
  vendor: string;
  category: string;
  description: string;
  shortDesc: string;
  specs: string[];
  fullSpecs: { label: string; value: string }[];
  stock: "in-stock" | "low-stock" | "out-of-stock" | "digital";
  priceNote: string;
  tieredPrice?: TieredPrice;
  techSpecs: TechSpecs;
  branchStock: { branch: string; stock: number }[];
  image?: string;
  datasheet?: string;
  warranty: string;
  tags: string[];
}

export const products: Product[] = [
  {
    sku: "CS-C1000-24P",
    name: "Cisco Catalyst 1000 24-Port 1G Managed Switch",
    vendor: "Cisco",
    category: "Networking",
    description:
      "Enterprise-grade managed switch ideal for branch offices and SME deployments. Provides 24x 1GbE copper ports with 4x 1GbS SFP uplinks for reliable Layer 2 connectivity.",
    shortDesc: "24-port managed switch with SFP uplinks for branch office networking.",
    specs: ["24 × 1GbE", "4 × SFP uplinks", "Layer 2 Managed"],
    fullSpecs: [
      { label: "Ports", value: "24 × 10/100/1000BASE-T" },
      { label: "Uplinks", value: "4 × 1G SFP" },
      { label: "Switching Capacity", value: "56 Gbps" },
      { label: "Forwarding Rate", value: "41.67 Mpps" },
      { label: "Managed Features", value: "L2+, VLAN, QoS, STP" },
      { label: "Power", value: "External adapter (included)" },
      { label: "Form Factor", value: "Desktop / 1-RU wall-mount" },
      { label: "Warranty", value: "Limited lifetime" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 1500,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 1500, discountPercent: 0 },
        { minQty: 10, maxQty: 49, unitPrice: 1350, discountPercent: 10 },
        { minQty: 50, maxQty: null, unitPrice: 1200, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 47 },
      { branch: "Penang", stock: 12 },
      { branch: "Johor Bahru", stock: 8 },
      { branch: "Kota Kinabalu", stock: 3 },
      { branch: "Kuching", stock: 5 },
    ],
    warranty: "Limited lifetime warranty",
    techSpecs: { poeSupport: false, rackMountable: null, wifiStandard: null, portCount: 24 },
    tags: ["switch", "networking", "cisco", "enterprise"],
  },
  {
    sku: "DL-PE-R760",
    name: "Dell PowerEdge R760 Rack Server",
    vendor: "Dell Technologies",
    category: "Servers & Storage",
    description:
      "2U dual-socket rack server built for demanding workloads. Supports 3rd Gen Intel Xeon Scalable processors with up to 16 DIMM slots and 12x 2.5\" drive bays for flexible storage configurations.",
    shortDesc: "2U dual-socket rack server for enterprise virtualisation and database workloads.",
    specs: ["2 × Intel Xeon Scalable", "16 × DDR5 DIMMs", "12 × 2.5\" SAS/SATA"],
    fullSpecs: [
      { label: "Processors", value: "2 × Intel Xeon Scalable (Ice Lake)" },
      { label: "Max Cores", value: "Up to 60 cores per CPU" },
      { label: "Memory", value: "16 × DDR5 slots, up to 4TB" },
      { label: "Drive Bays", value: "12 × 2.5\" or 6 × 3.5\" (configurable)" },
      { label: "Expansion", value: "5 × PCIe Gen 5 slots" },
      { label: "Power Supply", value: "Dual hot-plug Platinum (up to 1950W)" },
      { label: "Management", value: "iDRAC9 Enterprise" },
      { label: "Warranty", value: "3-year ProSupport" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 12500,
      tiers: [
        { minQty: 1, maxQty: 4, unitPrice: 12500, discountPercent: 0 },
        { minQty: 5, maxQty: 9, unitPrice: 11250, discountPercent: 10 },
        { minQty: 10, maxQty: null, unitPrice: 10000, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 15 },
      { branch: "Penang", stock: 4 },
      { branch: "Johor Bahru", stock: 2 },
      { branch: "Kota Kinabalu", stock: 1 },
      { branch: "Kuching", stock: 0 },
    ],
    warranty: "3-year ProSupport with next-business-day on-site",
    techSpecs: { poeSupport: false, rackMountable: "2U", wifiStandard: null, portCount: null },
    tags: ["server", "dell", "rack", "enterprise"],
  },
  {
    sku: "HP-DL380-G11",
    name: "HPE ProLiant DL380 Gen11",
    vendor: "HPE",
    category: "Servers & Storage",
    description:
      "Industry-standard 2U rack server delivering performance for virtualisation, databases, and application workloads. Powered by Intel Xeon Scalable processors with advanced management via iLO 7.",
    shortDesc: "Versatile 2U rack server for virtualisation and application workloads.",
    specs: ["2 × Intel Xeon Scalable", "16 × DDR5 DIMMs", "8 × 2.5\" SAS/SATA"],
    fullSpecs: [
      { label: "Processors", value: "2 × Intel Xeon Scalable (4th Gen)" },
      { label: "Max Cores", value: "Up to 64 cores per CPU" },
      { label: "Memory", value: "16 × DDR5 slots, up to 4TB" },
      { label: "Drive Bays", value: "Up to 8 × 2.5\" or 4 × 3.5\"" },
      { label: "Expansion", value: "7 × PCIe Gen 5 slots" },
      { label: "Power Supply", value: "Dual hot-plug Gold (up to 1600W)" },
      { label: "Management", value: "iLO 7 with advanced security" },
      { label: "Warranty", value: "3-year warranty" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 11800,
      tiers: [
        { minQty: 1, maxQty: 4, unitPrice: 11800, discountPercent: 0 },
        { minQty: 5, maxQty: 9, unitPrice: 10620, discountPercent: 10 },
        { minQty: 10, maxQty: null, unitPrice: 9440, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 22 },
      { branch: "Penang", stock: 6 },
      { branch: "Johor Bahru", stock: 3 },
      { branch: "Kota Kinabalu", stock: 2 },
      { branch: "Kuching", stock: 1 },
    ],
    warranty: "3-year limited warranty with on-site upgrade available",
    techSpecs: { poeSupport: false, rackMountable: "2U", wifiStandard: null, portCount: null },
    tags: ["server", "hpe", "rack", "enterprise"],
  },
  {
    sku: "LN-TP-X1C-G12",
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    vendor: "Lenovo",
    category: "Endpoints & Mobility",
    description:
      "Ultra-lightweight 14\" business laptop featuring Intel Core Ultra processors, up to 32GB LPDDR5x memory, and a stunning 2.8K OLED display option. Weighs just 1.12kg for maximum portability.",
    shortDesc: "Premium 14\" ultrabook for executives and mobile professionals.",
    specs: ["Intel Core Ultra 7", "32GB LPDDR5x", "14\" 2.8K OLED"],
    fullSpecs: [
      { label: "Processor", value: "Intel Core Ultra 7 155H" },
      { label: "Memory", value: "32GB LPDDR5x-7467 (soldered)" },
      { label: "Storage", value: "1TB PCIe Gen4 SSD" },
      { label: "Display", value: "14\" 2880×1800 OLED, 400 nits" },
      { label: "Battery", value: "72Wh, up to 15 hours" },
      { label: "Weight", value: "1.12 kg" },
      { label: "Ports", value: "2× Thunderbolt 4, 2× USB-A 3.2, HDMI 2.1" },
      { label: "Warranty", value: "3-year courier/restore" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 5200,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 5200, discountPercent: 0 },
        { minQty: 10, maxQty: 24, unitPrice: 4680, discountPercent: 10 },
        { minQty: 25, maxQty: null, unitPrice: 4160, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 34 },
      { branch: "Penang", stock: 8 },
      { branch: "Johor Bahru", stock: 6 },
      { branch: "Kota Kinabalu", stock: 4 },
      { branch: "Kuching", stock: 3 },
    ],
    warranty: "3-year courier/restore service",
    techSpecs: { poeSupport: false, rackMountable: null, wifiStandard: null, portCount: null },
    tags: ["laptop", "lenovo", "thinkpad", "ultrabook"],
  },
  {
    sku: "FN-FG200F",
    name: "Fortinet FortiGate 200F Next-Gen Firewall",
    vendor: "Fortinet",
    category: "Cybersecurity",
    description:
      "High-performance branch firewall delivering 7.8 Gbps encrypted throughput. Combines next-generation firewall, secure SD-WAN, and advanced threat protection with FortiGuard subs.",
    shortDesc: "Branch next-gen firewall with integrated SD-WAN and threat protection.",
    specs: ["7.8 Gbps encrypted", "8 × 1GbE copper", "4 × 1GbS SFP"],
    fullSpecs: [
      { label: "NGFW Throughput", value: "7.8 Gbps" },
      { label: "Threat Protection", value: "1.8 Gbps" },
      { label: "VPN Throughput", value: "1.6 Gbps" },
      { label: "WAN Ports", value: "4 × 1G SFP + 4 × 1G Copper" },
      { label: "Management Ports", value: "1 × dedicated" },
      { label: "Power", value: "1 × hot-swap 220W" },
      { label: "Form Factor", value: "1U rackmount" },
      { label: "Warranty", value: "1-year FutureLab (upgradeable)" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 8500,
      tiers: [
        { minQty: 1, maxQty: 4, unitPrice: 8500, discountPercent: 0 },
        { minQty: 5, maxQty: 9, unitPrice: 7650, discountPercent: 10 },
        { minQty: 10, maxQty: null, unitPrice: 6800, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 18 },
      { branch: "Penang", stock: 5 },
      { branch: "Johor Bahru", stock: 3 },
      { branch: "Kota Kinabalu", stock: 2 },
      { branch: "Kuching", stock: 1 },
    ],
    warranty: "1-year FortiCare FutureLab (upgradeable to 3 years)",
    techSpecs: { poeSupport: false, rackMountable: "1U", wifiStandard: null, portCount: 8 },
    tags: ["firewall", "fortinet", "security", "sdwan"],
  },
  {
    sku: "ARUBA-AP22",
    name: "Aruba Instant On AP22 Wi-Fi 6 Access Point",
    vendor: "Aruba",
    category: "Networking",
    description:
      "Indoor Wi-Fi 6 access point delivering up to 1.8 Gbps aggregate throughput. Easy cloud-managed deployment for SMBs and branch offices with support for up to 64 concurrent clients.",
    shortDesc: "Wi-Fi 6 access point with cloud management for SMB deployments.",
    specs: ["Wi-Fi 6 (802.11ax)", "1.8 Gbps aggregate", "2×2:2 MIMO"],
    fullSpecs: [
      { label: "Wi-Fi Standard", value: "802.11a/b/g/n/ac/ax" },
      { label: "Radio", value: "2×2:2 2.4GHz + 2×2:2 5GHz" },
      { label: "Max Throughput", value: "1.8 Gbps" },
      { label: "Antennas", value: "Internal (4 total)" },
      { label: "Ethernet Ports", value: "2 × Gigabit (1 × PoE In)" },
      { label: "Power", value: "802.3af PoE" },
      { label: "Max Clients", value: "64" },
      { label: "Warranty", value: "1-year limited" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 850,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 850, discountPercent: 0 },
        { minQty: 10, maxQty: 24, unitPrice: 765, discountPercent: 10 },
        { minQty: 25, maxQty: null, unitPrice: 680, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 56 },
      { branch: "Penang", stock: 14 },
      { branch: "Johor Bahru", stock: 10 },
      { branch: "Kota Kinabalu", stock: 6 },
      { branch: "Kuching", stock: 4 },
    ],
    warranty: "1-year limited warranty",
    techSpecs: { poeSupport: true, rackMountable: null, wifiStandard: "Wi-Fi 6", portCount: null },
    tags: ["wifi", "aruba", "access-point", "wifi6"],
  },
  {
    sku: "UBNT-UDMP-PRO",
    name: "Ubiquiti UniFi Dream Machine Pro",
    vendor: "Ubiquiti",
    category: "Networking",
    description:
      "All-in-one gateway, switch, and controller featuring a 10Gb SFP+ WAN uplink, 8× 1GbE ports, and 2× 2.5GbE ports. Runs UniFi Network Application for centralized management.",
    shortDesc: "All-in-one gateway, switch, and controller with 10Gb uplink.",
    specs: ["10Gb SFP+ WAN", "8 × 1GbE + 2 × 2.5GbE", "UniFi Controller built-in"],
    fullSpecs: [
      { label: "WAN", value: "1 × 10Gb SFP+" },
      { label: "LAN Ports", value: "8 × 1GbE + 2 × 2.5GbE" },
      { label: "Switching", value: "12-port Gigabit with PoE (15W total)" },
      { label: "Storage", value: "1 × 2.5\" HDD bay (up to 4TB)" },
      { label: "Controller", value: "UniFi Network Application (built-in)" },
      { label: "Power", value: "Passive PoE (included)" },
      { label: "Form Factor", value: "Fanless, desktop" },
      { label: "Warranty", value: "1-year limited" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 2100,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 2100, discountPercent: 0 },
        { minQty: 10, maxQty: 24, unitPrice: 1890, discountPercent: 10 },
        { minQty: 25, maxQty: null, unitPrice: 1680, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 21 },
      { branch: "Penang", stock: 7 },
      { branch: "Johor Bahru", stock: 4 },
      { branch: "Kota Kinabalu", stock: 2 },
      { branch: "Kuching", stock: 3 },
    ],
    warranty: "1-year limited warranty",
    techSpecs: { poeSupport: false, rackMountable: null, wifiStandard: null, portCount: 10 },
    tags: ["gateway", "ubiquiti", "unifi", "all-in-one"],
  },
  {
    sku: "MS-M365-BP",
    name: "Microsoft 365 Business Premium (1-Year Licence)",
    vendor: "Microsoft",
    category: "Software & Licensing",
    description:
      "Cloud-based productivity suite with advanced security. Includes Microsoft 365 Apps, Windows 365 Boomerang, Microsoft Defender for Office 365, and conditional access policies.",
    shortDesc: "Productivity and security suite for small and medium businesses.",
    specs: ["365 Apps (Office)", "Defender for Office 365", "Conditional Access"],
    fullSpecs: [
      { label: "Type", value: "Cloud subscription (1 year)" },
      { label: "Users", value: "Per user" },
      { label: "Apps", value: "Word, Excel, PowerPoint, Outlook, Teams" },
      { label: "Security", value: "Defender for Office 365 Plan 2" },
      { label: "Cloud Storage", value: "1 TB OneDrive per user" },
      { label: "Device Management", value: "Intune included" },
      { label: "Delivery", value: "Electronic delivery (license key)" },
      { label: "Warranty", value: "N/A — subscription service" },
    ],
    stock: "digital",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 420,
      tiers: [
        { minQty: 1, maxQty: 49, unitPrice: 420, discountPercent: 0 },
        { minQty: 50, maxQty: 199, unitPrice: 378, discountPercent: 10 },
        { minQty: 200, maxQty: null, unitPrice: 336, discountPercent: 20 },
      ],
    },
    branchStock: [],
    warranty: "N/A — cloud subscription",
    techSpecs: { poeSupport: false, rackMountable: null, wifiStandard: null, portCount: null },
    tags: ["software", "microsoft", "office365", "licensing"],
  },
  {
    sku: "LOGI-RALLYBAR",
    name: "Logitech Rally Bar Video Conferencing System",
    vendor: "Logitech",
    category: "Endpoints & Mobility",
    description:
      "All-in-one 4K conferencing camera and speakerbar for medium to large meeting rooms. Features 120° field of view, camera zoom, AI-powered auto-framing, and Logitech Synergy ecosystem integration.",
    shortDesc: "4K all-in-one conferencing system for medium to large rooms.",
    specs: ["4K UHD camera", "120° FOV", "AI auto-framing"],
    fullSpecs: [
      { label: "Camera", value: "4K UHD, 120° diagonal FOV" },
      { label: "Zoom", value: "4× digital zoom" },
      { label: "Speaker", value: "Dual 30W amplifiers, 16 mics" },
      { label: "Processing", value: "Logitech Rally Bar processor (built-in)" },
      { label: "Connectivity", value: "USB 3.0, PoE+" },
      { label: "Room Size", value: "Up to 18m (60ft)" },
      { label: "Compatible Platforms", value: "Zoom, Teams, Webex, Google Meet" },
      { label: "Warranty", value: "2-year hardware" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 6800,
      tiers: [
        { minQty: 1, maxQty: 4, unitPrice: 6800, discountPercent: 0 },
        { minQty: 5, maxQty: 9, unitPrice: 6120, discountPercent: 10 },
        { minQty: 10, maxQty: null, unitPrice: 5440, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 9 },
      { branch: "Penang", stock: 3 },
      { branch: "Johor Bahru", stock: 2 },
      { branch: "Kota Kinabalu", stock: 1 },
      { branch: "Kuching", stock: 0 },
    ],
    warranty: "2-year limited hardware warranty",
    techSpecs: { poeSupport: true, rackMountable: null, wifiStandard: null, portCount: null },
    tags: ["videoconferencing", "logitech", "rally", "4k"],
  },
  {
    sku: "EPSON-EBL735U",
    name: "Epson BrightLink 735U Laser Projector",
    vendor: "Epson",
    category: "Endpoints & Mobility",
    description:
      "7,300-lumen 4K SXRD laser projector designed for large boardrooms and presentation spaces. Delivers native 4K e-shift resolution with laser-phosphor technology for vibrant colour.",
    shortDesc: "7,300-lumen 4K laser projector for large boardrooms and presentations.",
    specs: ["7,300 lumens", "4K e-shift (WUXGA)", "Laser-phosphor source"],
    fullSpecs: [
      { label: "Brightness", value: "7,300 lumens (colour & white)" },
      { label: "Resolution", value: "Native WUXGA + 4K e-shift" },
      { label: "Light Source", value: "Laser-phosphor, 20,000 hrs" },
      { label: "Contrast", value: "2,500,000:1" },
      { label: "Projection", value: "1.6× optical zoom, motorised" },
      { label: "Connectivity", value: "2× HDMI, 1× USB, network" },
      { label: "Throw Ratio", value: "1.39–2.23 (1m–10m)" },
      { label: "Warranty", value: "5-year / 20,000 hrs" },
    ],
    stock: "low-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 9500,
      tiers: [
        { minQty: 1, maxQty: 4, unitPrice: 9500, discountPercent: 0 },
        { minQty: 5, maxQty: 9, unitPrice: 8550, discountPercent: 10 },
        { minQty: 10, maxQty: null, unitPrice: 7600, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 4 },
      { branch: "Penang", stock: 1 },
      { branch: "Johor Bahru", stock: 1 },
      { branch: "Kota Kinabalu", stock: 0 },
      { branch: "Kuching", stock: 0 },
    ],
    warranty: "5-year limited warranty (20,000 hour laser source)",
    techSpecs: { poeSupport: false, rackMountable: null, wifiStandard: null, portCount: null },
    tags: ["projector", "epson", "4k", "laser"],
  },
  {
    sku: "SYNO-RS1221Plus",
    name: "Synology RackStation RS1221+ NAS",
    vendor: "Synology",
    category: "Servers & Storage",
    description:
      "2-bay rackable NAS with Intel Celeron J4125 processor, dual GbE with link aggregation, and 12GbS SAS expansion. Runs DiskStation Manager for file sharing, backup, and virtualisation.",
    shortDesc: "2-bay rackable NAS for SME file services and backup.",
    specs: ["2 × 3.5\" SATA", "Intel Celeron J4125", "Dual GbE + 12GbS SAS"],
    fullSpecs: [
      { label: "Drive Bays", value: "2 × 3.5\" SATA HDD/SSD" },
      { label: "Processor", value: "Intel Celeron J4125 (4C/4T)" },
      { label: "Memory", value: "4GB DDR4 (expandable to 8GB)" },
      { label: "Network", value: "2 × Gigabit + 1 × 10GbE (add-on)" },
      { label: "SAS Expansion", value: "1 × 12GbS (via HBA module)" },
      { label: "USB Ports", value: "2 × USB 3.2 Gen 1" },
      { label: "OS", value: "DiskStation Manager (DSM)" },
      { label: "Warranty", value: "3-year limited" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 2800,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 2800, discountPercent: 0 },
        { minQty: 10, maxQty: 24, unitPrice: 2520, discountPercent: 10 },
        { minQty: 25, maxQty: null, unitPrice: 2240, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 11 },
      { branch: "Penang", stock: 4 },
      { branch: "Johor Bahru", stock: 2 },
      { branch: "Kota Kinabalu", stock: 1 },
      { branch: "Kuching", stock: 2 },
    ],
    warranty: "3-year limited warranty",
    techSpecs: { poeSupport: false, rackMountable: "1U", wifiStandard: null, portCount: null },
    tags: ["nas", "synology", "storage", "rackmount"],
  },
  {
    sku: "APC-SMT3000RM2UC",
    name: "APC Smart-UPS 3000VA LCD Rack/Tower",
    vendor: "APC",
    category: "Accessories & Peripherals",
    description:
      "3000VA/2700W online double-conversion UPS in a 2U rack-tower form factor. Provides clean sine wave output, hot-swappable batteries, and network management via Network Management Card 2.",
    shortDesc: "2700W online UPS for server rooms and critical IT equipment.",
    specs: ["3000VA / 2700W", "Online double conversion", "Hot-swappable batteries"],
    fullSpecs: [
      { label: "Capacity", value: "3000VA / 2700W" },
      { label: "Topology", value: "Online double-conversion" },
      { label: "Output", value: "Pure sine wave, 230V" },
      { label: "Batteries", value: "2 × SMART-UPS192B-AB (hot-swap)" },
      { label: "Form Factor", value: "2U rack/tower convertible" },
      { label: "Management", value: "SNMP card 2 slot (included)" },
      { label: "Runtime", value: "~20 min at 50% load" },
      { label: "Warranty", value: "4-year / 2-year battery" },
    ],
    stock: "in-stock",
    priceNote: "Login for reseller pricing",
    tieredPrice: {
      listPrice: 3200,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 3200, discountPercent: 0 },
        { minQty: 10, maxQty: 24, unitPrice: 2880, discountPercent: 10 },
        { minQty: 25, maxQty: null, unitPrice: 2560, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "Kuala Lumpur HQ", stock: 14 },
      { branch: "Penang", stock: 5 },
      { branch: "Johor Bahru", stock: 3 },
      { branch: "Kota Kinabalu", stock: 2 },
      { branch: "Kuching", stock: 1 },
    ],
    warranty: "4-year warranty (2-year battery replacement warranty)",
    techSpecs: { poeSupport: false, rackMountable: "2U", wifiStandard: null, portCount: null },
    tags: ["ups", "apc", "power", "battery"],
  },
];

export const vendors = [
  "APC",
  "Aruba",
  "Cisco",
  "Dell Technologies",
  "Epson",
  "Fortinet",
  "HPE",
  "Lenovo",
  "Logitech",
  "Microsoft",
  "Synology",
  "Ubiquiti",
];

export const categories = [
  { id: "networking", label: "Networking", icon: "network" },
  { id: "servers-storage", label: "Servers & Storage", icon: "server" },
  { id: "endpoints", label: "Endpoints & Mobility", icon: "monitor" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "shield" },
  { id: "software", label: "Software & Licensing", icon: "package" },
  { id: "accessories", label: "Accessories & Peripherals", icon: "cable" },
];
