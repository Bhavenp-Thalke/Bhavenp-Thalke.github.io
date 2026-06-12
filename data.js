/* ============================================================
   PORTFOLIO DATA — edit this file to update the website.
   You never need to touch the HTML/CSS/JS.

   TO ADD A NEW PROJECT:      copy a block in PROJECTS and edit it.
                              "details" powers the popup case study —
                              leave it out for a simple card.
   TO ADD AN ACHIEVEMENT:     copy a block in ACHIEVEMENTS.
   TO ADD A CERTIFICATION:    copy a block in CERTIFICATIONS.
   Then: git add data.js && git commit -m "update" && git push
   GitHub Pages updates automatically in ~1 minute.
   ============================================================ */

const PROFILE = {
  name: "Bhaven Thalke",
  // Roles cycled by the typing animation in the hero terminal
  roles: [
    "Incident Responder",
    "Cyber Security Analyst",
    "Threat Hunter",
    "SOC & EDR Specialist",
    "Blue Teamer",
  ],
  status: "OPEN TO OPPORTUNITIES", // pill shown in hero; "" hides it
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
   tags:    short keywords shown as chips on the card.
   link:    optional URL (repo / credential / write-up). "" for none.
   details: powers the click-to-open case study popup. Optional —
            remove it and the card simply has no popup.
     overview:   what the project was (1-3 sentences)
     highlights: bullet list of what you actually did
     outcome:    the result / impact
     tools:      tech used, shown as chips in the popup
   ============================================================ */
const PROJECTS = [
  {
    title: "Trellix FireEye HX — Deployment & Configuration",
    description:
      "Enterprise-wide deployment of Trellix FireEye HX EDR plus the open-source HXTool for advanced threat hunting and forensics.",
    tags: ["EDR", "Trellix HX", "Threat Hunting", "Forensics"],
    link: "",
    details: {
      overview:
        "End-to-end deployment, integration, and configuration of Trellix FireEye HX (EDR) across a large enterprise environment, extended with HXTool to unlock advanced investigation capabilities beyond the native console.",
      highlights: [
        "Rolled out HX agents fleet-wide and tuned policies: exploit prevention, malware guard, process tracing, tamper protection, and heuristic-based detection.",
        "Deployed and extended HXTool enabling threat hunting, bulk acquisition, IOC testing, forensic data gathering, and deep-dive investigations.",
        "Integrated endpoint telemetry with SOC workflows for real-time detection and response.",
        "Built investigation playbooks for endpoint-related threats and suspicious activity.",
      ],
      outcome:
        "Fortified endpoint defenses across the estate, accelerated threat detection workflows, and gave the SOC forensic-grade visibility into every endpoint.",
      tools: ["Trellix FireEye HX", "HXTool", "Redline", "IOC frameworks"],
    },
  },
  {
    title: "Google SecOps Chronicle + SOAR Integration",
    description:
      "Led deployment of Google SecOps (Chronicle) and Siemplify SOAR with scalable telemetry pipelines via BindPlane.",
    tags: ["SOAR", "Chronicle", "BindPlane", "Telemetry"],
    link: "",
    details: {
      overview:
        "Architected and led the deployment of Google SecOps Chronicle (SIEM) and Siemplify SOAR, building the telemetry pipeline that feeds them from EDR, NDR, and other security sources.",
      highlights: [
        "Deployed BindPlane agents for scalable log ingestion and pipeline management across diverse infrastructure.",
        "Integrated EDR/NDR telemetry and additional security sources into Chronicle for unified detection.",
        "Configured SOAR playbooks to automate triage and response actions.",
        "Managed parser mappings and data normalization for reliable detections.",
      ],
      outcome:
        "A scalable, automated detection-and-response stack: faster triage, consistent response actions, and full telemetry coverage in one place.",
      tools: ["Google SecOps (Chronicle)", "Siemplify SOAR", "BindPlane", "EDR/NDR"],
    },
  },
  {
    title: "SIEM Security Operations with Microsoft Sentinel",
    description:
      "Configured SIEM security operations using Microsoft Sentinel — Microsoft Applied Skills credential.",
    tags: ["SIEM", "Microsoft Sentinel", "Azure", "Applied Skills"],
    link: "",
    details: {
      overview:
        "Hands-on Microsoft Applied Skills assessment: configuring a complete SIEM security-operations workflow in Microsoft Sentinel.",
      highlights: [
        "Connected data sources via data connectors and configured log ingestion.",
        "Built analytics rules for threat detection and configured incident workflows.",
        "Worked with workbooks, watchlists, and automation rules.",
      ],
      outcome:
        "Earned the Microsoft Applied Skills credential, validating practical Sentinel SOC configuration skills.",
      tools: ["Microsoft Sentinel", "Azure Monitor", "KQL"],
    },
  },
  {
    title: "Secure Azure Workload Access & Networking",
    description:
      "Configured secure access to workloads with Azure networking — Microsoft Applied Skills credential.",
    tags: ["Azure", "Network Security", "Applied Skills"],
    link: "",
    details: {
      overview:
        "Microsoft Applied Skills assessment focused on securing workload access using Azure networking controls.",
      highlights: [
        "Configured network security groups (NSGs) and application security groups.",
        "Implemented private endpoints and service endpoints for workload isolation.",
        "Designed network segmentation for defense in depth.",
      ],
      outcome: "Microsoft Applied Skills credential in Azure network security.",
      tools: ["Azure Virtual Network", "NSGs", "Private Endpoints"],
    },
  },
  {
    title: "Secure Storage for Azure Files & Blob Storage",
    description:
      "Implemented secure storage for Azure Files and Blob Storage — Microsoft Applied Skills credential.",
    tags: ["Azure", "Cloud Security", "Applied Skills"],
    link: "",
    details: {
      overview:
        "Microsoft Applied Skills assessment on hardening Azure storage services.",
      highlights: [
        "Configured encryption at rest and in transit for Files and Blob Storage.",
        "Implemented shared access signatures, access policies, and identity-based authorization.",
        "Applied network restrictions and firewall rules to storage accounts.",
      ],
      outcome: "Microsoft Applied Skills credential in Azure storage security.",
      tools: ["Azure Storage", "Entra ID", "Azure Key Vault"],
    },
  },
  {
    title: "Microsoft Azure Backup Implementation",
    description:
      "Implemented Microsoft Azure Backup for workload protection and recovery validation.",
    tags: ["Azure", "Backup & Recovery"],
    link: "",
    details: {
      overview:
        "Implementation of Microsoft Azure Backup to protect enterprise workloads and guarantee recoverability.",
      highlights: [
        "Deployed Recovery Services vaults and defined backup policies.",
        "Configured backup for VMs and file shares with retention policies aligned to requirements.",
        "Performed restore drills to validate recovery objectives.",
      ],
      outcome:
        "Reliable, tested backup coverage — a critical ransomware-resilience control.",
      tools: ["Azure Backup", "Recovery Services Vault"],
    },
  },
  {
    title: "Incident Handler's Journals",
    description:
      "A documented collection of incident handling journals — detection, triage, containment, and lessons learned.",
    tags: ["Incident Response", "Documentation", "DFIR"],
    link: "",
    details: {
      overview:
        "An ongoing, structured journal of security incidents handled — capturing the full lifecycle of each case the way a professional incident handler documents engagements.",
      highlights: [
        "Documented detection sources, initial triage decisions, and severity assessment for each incident.",
        "Recorded containment, eradication, and recovery actions with timelines.",
        "Captured root cause analysis and lessons learned to improve future response.",
      ],
      outcome:
        "A growing playbook of real-world response experience that sharpens every future investigation.",
      tools: ["NIST IR lifecycle", "DFIR methodology"],
    },
  },
];

/* ============================================================
   ACHIEVEMENTS — badge wall. icon = any emoji.
   ============================================================ */
const ACHIEVEMENTS = [
  {
    icon: "🚨",
    title: "Primary Incident Responder — Major Breaches",
    detail:
      "Acted as primary responder during major security breaches, coordinating containment, investigation, and recovery end-to-end.",
    context: "TCS · SMFG India Credit",
  },
  {
    icon: "🛡️",
    title: "10+ Critical Security Risks Mitigated",
    detail:
      "Identified and mitigated 10+ critical risks, significantly improving client security posture and reducing attack surface.",
    context: "Enterprise clients",
  },
  {
    icon: "🔍",
    title: "Post-Breach Assessment — Major Indian AMC",
    detail:
      "Conducted a comprehensive post-breach security assessment for one of India's largest asset management companies.",
    context: "IBM consulting",
  },
  {
    icon: "📄",
    title: "Published Security Research",
    detail:
      "Authored research paper 'Cyberdefence in the Age of Artificial Intelligence'.",
    context: "Publication",
  },
  {
    icon: "⚔️",
    title: "Red & Purple Team Exercises",
    detail:
      "Participated in offensive exercises, uncovering vulnerabilities and driving remediation strategies across enterprise environments.",
    context: "Enterprise environments",
  },
  {
    icon: "📈",
    title: "120% Growth in Technical Establishment",
    detail:
      "Headed IT Support across Mumbai, Pune, and Goa, growing the technical establishment by 120%.",
    context: "VIDYA India",
  },
  {
    icon: "🌐",
    title: "Network Infrastructure for 7 Villages",
    detail:
      "Built network coverage for 7 villages from zero, with ~100% average annual customer growth over three years.",
    context: "S.S.S Satellite",
  },
  {
    icon: "🎖️",
    title: "7+ Industry Certifications",
    detail:
      "Trellix, Google, IBM, Microsoft, and SkillSoft credentials across endpoint, network, and cloud security.",
    context: "Continuous learning",
  },
];

/* ============================================================
   BLOG / WRITEUPS — your technical posts.
   Two ways to use each entry:
     A) EXTERNAL  → set "link" to a Medium/Dev.to/personal URL.
                    The card opens that link in a new tab. Omit "content".
     B) INLINE    → fill "content" with blocks and the post opens in an
                    on-site reader. Leave "link" as "".

   content blocks (use as many as you like, in any order):
     { type: "h",     text: "A section heading" }
     { type: "p",     text: "A paragraph of body text." }
     { type: "list",  items: ["first point", "second point"] }
     { type: "code",  text: "single or\nmulti-line code / commands" }
     { type: "quote", text: "A highlighted callout or key takeaway." }
   ============================================================ */
const BLOGS = [
  {
    title: "Threat Hunting with Trellix FireEye HX: A Practical Workflow",
    date: "2026-05-20",
    readTime: "7 min read",
    summary:
      "A repeatable hunting loop built on HX and HXTool — from hypothesis to bulk acquisition to validated detection.",
    tags: ["Threat Hunting", "Trellix HX", "DFIR", "EDR"],
    link: "", // inline post (uses content below)
    content: [
      { type: "p", text: "Good threat hunting isn't about staring at alerts — it's about forming a hypothesis, gathering the evidence to test it, and turning what you find into a durable detection. Here's the loop I run on Trellix FireEye HX." },
      { type: "h", text: "1. Start with a hypothesis, not a tool" },
      { type: "p", text: "Pick a specific, falsifiable idea grounded in an ATT&CK technique. For example: 'An adversary is using a scheduled task for persistence on our finance endpoints.' A hypothesis tells you exactly what data to pull and what 'found' looks like." },
      { type: "h", text: "2. Scope and acquire with HXTool" },
      { type: "p", text: "HXTool's bulk acquisition is where HX earns its keep. Rather than pivoting host-by-host in the console, define an acquisition script that collects the artifacts your hypothesis needs across a host set." },
      { type: "list", items: [
        "Persistence hunt → scheduled tasks, run keys, services, WMI subscriptions.",
        "Execution hunt → process tree, parent/child anomalies, command-line arguments.",
        "Collect from a representative sample first, then widen once the query is tuned.",
      ] },
      { type: "h", text: "3. Analyze for the anomaly, not the known-bad" },
      { type: "p", text: "Signatures catch known-bad; hunting catches the unusual. Stack the results and look for outliers — the one host where a scheduled task launches PowerShell from a user-writable path, the parent process that should never spawn a shell." },
      { type: "quote", text: "If everything looks normal, your hypothesis was wrong — that's a result, not a failure. Refine and re-run." },
      { type: "h", text: "4. Close the loop: turn findings into detections" },
      { type: "p", text: "A hunt that ends in a Slack message is wasted work. Every confirmed pattern should become an IOC test, an enterprise search, or a detection rule so the next occurrence pages the SOC automatically." },
      { type: "code", text: "# pseudo-workflow\nhypothesis  -> scope hosts\n           -> HXTool bulk acquisition\n           -> stack & analyze artifacts\n           -> confirm / refute\n           -> codify as detection (IOC / rule)" },
      { type: "p", text: "Replace this post with your own writeups — edit the BLOGS array in data.js." },
    ],
  },
  {
    title: "Building an Incident Handler's Journal That Actually Helps",
    date: "2026-04-08",
    readTime: "5 min read",
    summary:
      "The lightweight documentation habit that makes your next investigation faster — structured around the NIST IR lifecycle.",
    tags: ["Incident Response", "Documentation", "NIST"],
    link: "",
    content: [
      { type: "p", text: "Every responder is told to 'document everything,' and most journals die after two entries because they're a chore. The trick is a structure light enough to fill in during an incident but complete enough to learn from afterward." },
      { type: "h", text: "Anchor each entry to the IR lifecycle" },
      { type: "list", items: [
        "Detection — what fired, the source, and the initial indicator.",
        "Triage — severity call and the reasoning behind it.",
        "Containment — actions taken, with timestamps.",
        "Eradication & Recovery — how the threat was removed and service restored.",
        "Lessons learned — the one change that would have caught it sooner.",
      ] },
      { type: "h", text: "Timestamp everything" },
      { type: "p", text: "A timeline is the single most valuable artifact you produce. When the post-incident review asks 'how long from detection to containment?', a timestamped journal answers in seconds." },
      { type: "quote", text: "The lessons-learned line is the whole point. If you can't name one improvement, the investigation isn't finished." },
      { type: "p", text: "Swap this for your real journals and writeups by editing data.js — keep them sanitized and client-safe." },
    ],
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
