/* ============================================================
   PORTFOLIO DATA — edit this file to update the website.
   You never need to touch the HTML/CSS/JS.

   TO ADD A NEW PROJECT:   copy a block in PROJECTS and edit it.
   TO ADD AN ACHIEVEMENT:  copy a block in CERTIFICATIONS or HIGHLIGHTS.
   Then commit + push, and GitHub Pages updates automatically.
   ============================================================ */

const PROFILE = {
  name: "Bhaven Thalke",
  // Roles cycled by the typing animation in the hero terminal
  roles: [
    "Incident Responder",
    "Cyber Security Analyst",
    "Threat Hunter",
    "SOC & EDR Specialist",
  ],
  tagline:
    "Security Consultant & Incident Responder specializing in endpoint security, threat detection, and enterprise incident response.",
  location: "Mumbai, India",
  email: "bhaventhalke.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhaven-thalke/",
  github: "https://github.com/Bhavenp-Thalke",
  about: [
    "I'm a cyber security professional with hands-on experience leading end-to-end incident response — threat detection, triage, containment, eradication, recovery, and post-incident analysis — across enterprise environments.",
    "I've investigated and responded to security incidents using SIEM, EDR/XDR, SOAR, threat intelligence, email security, vulnerability management, and cloud security platforms. I specialize in endpoint security with Trellix FireEye HX, and have led deployments of Google SecOps Chronicle and Siemplify SOAR with scalable telemetry pipelines.",
    "Currently working as a Security Consultant (Incident Responder) at IBM for HDFC Bank, one of India's largest private banks.",
  ],
};

/* Quick stats shown under the hero — tweak freely */
const HIGHLIGHTS = [
  { value: "10+", label: "Critical risks mitigated" },
  { value: "5+", label: "Years in IT & Security" },
  { value: "7+", label: "Certifications" },
  { value: "1", label: "Published research paper" },
];

const EXPERIENCE = [
  {
    role: "Security Consultant — Incident Responder",
    company: "IBM",
    client: "Client: HDFC Bank",
    period: "Jan 2026 — Present",
    points: [
      "Lead end-to-end incident response: threat detection, triage, containment, eradication, recovery, and post-incident analysis across enterprise environments.",
      "Investigate and respond to incidents using SIEM, EDR/XDR, SOAR, threat intelligence, email security, vulnerability management, and cloud security platforms.",
      "Perform threat hunting, forensic investigations, root cause analysis, and continuous security monitoring.",
      "Conducted a post-breach security assessment for one of India's largest asset management companies, identifying critical gaps and recommending strategic remediation.",
    ],
  },
  {
    role: "Cyber Security Analyst",
    company: "TCS",
    client: "Client: SMFG India Credit",
    period: "Jun 2024 — Dec 2025",
    points: [
      "Specialized in endpoint security with Trellix FireEye HX (EDR): exploit prevention, malware guard, process tracing, tamper protection, and heuristic-based detection.",
      "Led deployment of Google SecOps Chronicle and Siemplify SOAR, integrating EDR/NDR telemetry via BindPlane agents for scalable log ingestion.",
      "Acted as primary incident responder during major security breaches, coordinating containment, investigation, and recovery.",
      "Deployed and extended HXTool for FireEye HX — threat hunting, bulk acquisition, IOC testing, and forensic deep-dives.",
      "Configured Trellix FireEye NX (NDR) as IPS/IDS; identified and mitigated 10+ critical security risks across client environments.",
      "Participated in red team and purple team exercises, uncovering vulnerabilities and driving remediation.",
    ],
  },
  {
    role: "IT Support Administrator & Instructor",
    company: "VIDYA India",
    client: "",
    period: "Sep 2023 — Mar 2024",
    points: [
      "Headed the IT Support Department across Mumbai, Pune, and Goa — 120% growth in technical establishment.",
      "Implemented endpoint security compliance: AV deployment, monitoring, threat analysis, and response.",
      "Hardened endpoints with access control policies, patch management, and security tool deployment.",
      "Conducted staff cybersecurity awareness training; directed the TCS YEP Program with Vidya India and TCS.",
    ],
  },
  {
    role: "Network Service Provider Coordinator",
    company: "S.S.S Satellite (Affiliate)",
    client: "",
    period: "Jun 2020 — Apr 2023",
    points: [
      "Spearheaded network infrastructure covering 7 villages, built from zero to comprehensive coverage.",
      "~100% average annual customer growth over three years.",
      "Configured mainframe networking with emphasis on incident response and reporting; provided on-site and remote technical support.",
    ],
  },
];

/* ============================================================
   PROJECTS — the section you'll update most often.
   tags: short keywords shown as chips.
   link: optional URL (GitHub repo, credential, write-up). Use "" for none.
   ============================================================ */
const PROJECTS = [
  {
    title: "Trellix FireEye HX — Deployment & Configuration",
    description:
      "Enterprise-wide deployment and configuration of Trellix FireEye HX EDR, plus the open-source HXTool for advanced threat hunting, bulk acquisition, IOC testing, and forensic data gathering.",
    tags: ["EDR", "Trellix HX", "Threat Hunting", "Forensics"],
    link: "",
  },
  {
    title: "SIEM Security Operations with Microsoft Sentinel",
    description:
      "Configured SIEM security operations using Microsoft Sentinel — data connectors, analytics rules, and incident workflows. Microsoft Applied Skills credential.",
    tags: ["SIEM", "Microsoft Sentinel", "Azure", "Applied Skills"],
    link: "",
  },
  {
    title: "Google SecOps Chronicle + SOAR Integration",
    description:
      "Led deployment of Google SecOps (Chronicle) and Siemplify SOAR, integrating EDR/NDR and other telemetry sources using BindPlane agents for scalable log ingestion and pipeline management.",
    tags: ["SOAR", "Chronicle", "BindPlane", "Telemetry"],
    link: "",
  },
  {
    title: "Secure Azure Workload Access & Networking",
    description:
      "Configured secure access to workloads using Azure networking — NSGs, private endpoints, and network segmentation. Microsoft Applied Skills credential.",
    tags: ["Azure", "Network Security", "Applied Skills"],
    link: "",
  },
  {
    title: "Secure Storage for Azure Files & Blob Storage",
    description:
      "Implemented secure storage configurations for Azure Files and Blob Storage: encryption, access policies, and identity-based authorization. Microsoft Applied Skills credential.",
    tags: ["Azure", "Cloud Security", "Applied Skills"],
    link: "",
  },
  {
    title: "Microsoft Azure Backup Implementation",
    description:
      "Implemented Microsoft Azure Backup for workload protection — recovery services vaults, backup policies, and restore validation.",
    tags: ["Azure", "Backup & Recovery"],
    link: "",
  },
  {
    title: "Incident Handler's Journals",
    description:
      "A documented collection of incident handling journals covering real-world detection, triage, containment, and lessons learned from security incidents.",
    tags: ["Incident Response", "Documentation", "DFIR"],
    link: "",
  },
];

/* Grouped skills — add new items to any list */
const SKILLS = [
  {
    group: "Security Domains",
    items: [
      "Incident Response", "EDR / XDR", "NDR", "SOC Operations", "SIEM",
      "IPS / IDS", "Threat Hunting", "Digital Forensics",
      "Infrastructure Security Assessment", "Telemetry Pipeline Management",
      "Anti-Virus / Endpoint Protection",
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      "Trellix FireEye HX", "Trellix FireEye NX", "Trellix EPO (McAfee)",
      "MVision EDR", "Cortex XDR", "Cortex XSOAR", "Securonix",
      "Google SecOps (Chronicle)", "BindPlane", "HXTool", "Redline",
      "Splunk", "QRadar", "Microsoft Sentinel",
    ],
  },
];

const CERTIFICATIONS = [
  { name: "Trellix FireEye HX: Endpoint Security HX for Analysts", issuer: "Trellix", link: "" },
  { name: "Trellix FireEye NX: Network Security for Network Administrators", issuer: "Trellix", link: "" },
  { name: "Google Cybersecurity Specialization", issuer: "Google", link: "" },
  { name: "IBM Cybersecurity Analyst Professional Certificate", issuer: "IBM", link: "" },
  { name: "Microsoft Azure Security Technologies (AZ-500) Exam Prep", issuer: "Microsoft", link: "" },
  { name: "CCSP 2022: Cloud Computing Concepts & Architectures", issuer: "SkillSoft", link: "" },
  { name: "Google IT Support Professional Certificate", issuer: "Google", link: "" },
];

const PUBLICATIONS = [
  {
    title: "Cyberdefence in the Age of Artificial Intelligence",
    type: "Research Paper",
    description:
      "Research exploring how artificial intelligence reshapes cyber defence — covering AI-driven threat detection, response automation, and the evolving threat landscape.",
    link: "",
  },
];

const EDUCATION = [
  {
    degree: "B.Sc. Computer Science",
    institution: "Mumbai University",
    detail: "CGPA: 8.95",
  },
];
