export const HACKATHON_INFO = {
  title: "DevYatra",
  year: "2026",
  subtitle: "Innovate. Build. Disrupt",
  meta: ["Hybrid  Hackathon", "Online 24h + Offline Finals"],
  prizePool: "₹20,000",
  aboutText: "DevYatra Hack Fest is a hybrid coding hackathon designed to push your limits. It's more than just a competition; it's a movement promoting problem-solving, innovation, teamwork, and real-world application development .",
  registrationCloses: "4th April 2026"
};

export const METRICS = [
  { icon: "timer", value: "24h", label: "Online Coding" },
  { icon: "payments", value: "₹20K", label: "Prize Pool" },
  { icon: "reorder", value: "2", label: "Rounds" },
  { icon: "groups", value: "2-3", label: "Members Per Team" }
];

export const WHY_PARTICIPATE = [
  { icon: "cloud", title: "Master Modern Tech", description: "Build robust, full-stack applications using the latest frameworks and deploy them to the real world." },
  { icon: "psychology", title: "Bring Ideas to Life", description: "Turn your late-night brainstorming sessions into functioning products within a high-energy environment." },
  { icon: "diversity_3", title: "Expert Mentorship", description: "Get unstuck faster with 1-on-1 guidance from experienced developers and industry professionals." },
  { icon: "emoji_events", title: "Epic Prizes & Swag", description: "Compete for an exciting prize pool, exclusive developer tools, and ultimate bragging rights." },
  { icon: "verified", title: "Boost Your Resume", description: "Every Walk away with a prestigious DEV-IT certificate to showcase your practical coding skills to employers." },
  { icon: "hub", title: "Build Connections", description: "Network directly with peers, tech leaders, and company recruiters looking for fresh talent." }
];

export const TIMELINE = [
  {
    round: "Phase 01", date: "Now", title: "Registration Open",
    desc: "Gather your team and register for the DevYatra HackFest. Get ready to build innovative cloud solutions.",
    type: "Registration", fee: "Free Entry", icon: "how_to_reg", glow: "border-primary glow-primary"
  },
  {
    round: "Phase 02", date: "4th April 2026", title: "Registration Closes",
    desc: "Final deadline to submit your team details. No late entries will be accepted.",
    type: "Deadline", fee: "Mandatory", icon: "event_busy", glow: "border-on-surface/20"
  },
  {
    round: "Round 01", date: "04 - 05 April 2026", title: "Virtual Innovation",
    desc: "24-hour continuous development phase. Submit your project via GitHub repository, explanatory video, and PPT presentation.",
    type: "Online Phase", fee: "Free Entry", icon: "public", glow: "border-primary glow-primary"
  },
  {
    round: "Round 02", date: "18 March 2026", title: "The Face-Off",
    desc: "Top selected teams from Round 1 will present their live prototypes to a panel of judges in a high-stakes 10-minute pitch session.",
    type: "Offline Final", fee: "₹300 Entry Fee", icon: "location_on", glow: "border-on-surface/20"
  }
];

export const PRIZES = [
  { place: "2nd Place", amount: "₹5,000", perks: "Pure Cash Prize", perks2: "+ Trophy + Certificate + Goodies", icon: "workspace_premium", color: "text-slate-400", bg: "bg-slate-400/20", border: "border-slate-400/50" },
  { place: "Champion", amount: "₹8,000", perks: "Pure Cash Prize", perks2: "+ Trophy + Certificate + Goodies", icon: "workspace_premium", color: "text-primary", bg: "bg-primary", border: "border-primary h-[450px]" },
  { place: "3rd Place", amount: "₹3,000", perks: "Pure Cash Prize", perks2: "+ Trophy + Certificate + Goodies", icon: "workspace_premium", color: "text-orange-800", bg: "bg-orange-800/20", border: "border-orange-800/50" }
];

export const PROBLEMS = [
  { track: "AI & Machine Learning", icon: "psychology_alt", title: "Note Summarizer & Deepfake Detection", desc: "Develop an AI-driven system to summarize complex lecture notes or detect sophisticated video manipulations." },
  { track: "AgriTech", icon: "agriculture", title: "Smart Irrigation Systems", desc: "Use IoT and Cloud to optimize water usage in farming based on soil moisture and weather prediction models." },
  { track: "HealthTech", icon: "medical_services", title: "AI-Powered Medical Assistant", desc: "Build a conversational interface that helps patients track medications and provides preliminary health insights." },
  { track: "ClimateTech", icon: "eco", title: "Carbon Footprint Tracker", desc: "Enable organizations to monitor and mitigate their environmental impact through real-time carbon data analytics." },
  { track: "EdTech", icon: "science", title: "Virtual STEM Labs", desc: "Creating an immersive digital environment for students to perform scientific experiments safely and remotely." }
];
