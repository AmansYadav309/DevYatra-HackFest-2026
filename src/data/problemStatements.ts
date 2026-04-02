export interface ProblemStatement {
  id: string;
  title: string;
  problem: string;
  expectedSolutions: string[];
  domain: string;
}

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: "PS-01",
    title: "Smart Clinic Queue Management System",
    problem: "Manual systems cause long waits, overcrowding, and poor patient experience. Staff struggle with efficiency and patients lack turn visibility.",
    expectedSolutions: [
      "Digital token generation",
      "Real-time tracking",
      "Waiting time estimation",
      "Notifications",
      "Admin dashboard"
    ],
    domain: "HealthTech"
  },
  {
    id: "PS-02",
    title: "Medicine & Health Routine Tracker",
    problem: "Patients (especially elderly/chronic) fail to follow routines like meds and hydration. Lack of reminders leads to poor health outcomes.",
    expectedSolutions: [
      "Medicine & habit tracking",
      "Timely reminders",
      "Routine monitoring",
      "Consistency reports",
      "Health insights"
    ],
    domain: "HealthTech"
  },
  {
    id: "PS-03",
    title: "Expense Analyzer with Insights",
    problem: "Users record expenses but lack analysis, leading to overspending and poor planning. They cannot identify unnecessary costs.",
    expectedSolutions: [
      "Expense categorization",
      "Spending trend analysis",
      "Overspending detection",
      "Savings suggestions",
      "Visual dashboard"
    ],
    domain: "FinTech"
  },
  {
    id: "PS-04",
    title: "Smart Study Planner with Analytics",
    problem: "Students struggle with schedules and productivity. Lack of planning leads to incomplete tasks and poor time management.",
    expectedSolutions: [
      "Study scheduling",
      "Task tracking",
      "Productivity analytics",
      "Improvement suggestions",
      "Reminders"
    ],
    domain: "EdTech"
  },
  {
    id: "PS-05",
    title: "Student Performance Predictor",
    problem: "Teachers find it hard to identify at-risk students before exams. Manual tracking is inefficient and limits timely support.",
    expectedSolutions: [
      "Data collection (marks/attendance)",
      "Performance prediction",
      "Identify weak students",
      "Suggest improvements",
      "Monitoring dashboard"
    ],
    domain: "AI & EdTech"
  },
  {
    id: "PS-06",
    title: "Resume–Job Match Analyzer",
    problem: "Students don't understand how their skills match job requirements. Recruiters struggle to evaluate candidates quickly.",
    expectedSolutions: [
      "Resume/JD upload",
      "Skill extraction",
      "Match score calculation",
      "Gap identification",
      "Improvement suggestions"
    ],
    domain: "HR-Tech"
  },
  {
    id: "PS-07",
    title: "Smart Parking Finder System",
    problem: "Drivers waste time and fuel searching for parking in urban areas, increasing congestion. Lack of real-time info makes it inefficient.",
    expectedSolutions: [
      "Slot visibility",
      "Location-based search",
      "Real-time updates",
      "Navigation support",
      "Crowdsourced updates"
    ],
    domain: "Smart City"
  },
  {
    id: "PS-08",
    title: "Emergency Alert & Response System",
    problem: "Individuals cannot quickly notify authorities or family during emergencies, leading to delayed communication and consequences.",
    expectedSolutions: [
      "One-tap alert",
      "Live location sharing",
      "Emergency contact notification",
      "Alert history",
      "Simple interface"
    ],
    domain: "Public Safety"
  },
  {
    id: "PS-09",
    title: "Real-Time Construction Progress Tracker",
    problem: "Projects face delays due to lack of real-time monitoring and poor communication. Manual reporting is often inaccurate.",
    expectedSolutions: [
      "Daily progress updates",
      "Planned vs actual comparison",
      "Delay identification",
      "Dashboard monitoring",
      "Alert system"
    ],
    domain: "Public & Social"
  },
  {
    id: "PS-10",
    title: "Fake News Detection Assistant",
    problem: "Users share unverified info on social media, spreading misinformation. A tool is needed to verify content before sharing.",
    expectedSolutions: [
      "Text analysis",
      "Source verification",
      "Credibility score",
      "Warning system",
      "Fact-check links"
    ],
    domain: "AI & Cybersecurity"
  },
  {
    id: "PS-11",
    title: "Smart Water Usage Monitor",
    problem: "Water wastage goes unnoticed due to lack of awareness. Users cannot track consumption or detect leaks easily.",
    expectedSolutions: [
      "Usage tracking",
      "Spike detection",
      "Leakage alerts",
      "Analytics dashboard",
      "Conservation tips"
    ],
    domain: "IoT & Sustainability"
  },
  {
    id: "PS-12",
    title: "Gamified Environmental Awareness Platform",
    problem: "Environmental education is too theoretical and fails to engage students. Lack of interaction reduces participation in eco-activities.",
    expectedSolutions: [
      "Quizzes & challenges",
      "Rewards & badges",
      "Progress tracking",
      "Leaderboard",
      "Real-life activities"
    ],
    domain: "EdTech & Sustainability"
  },
  {
    id: "PS-13",
    title: "Collaborative Travel Planning & Cost-Sharing",
    problem: "Traveling alone is expensive and finding compatible partners is difficult. Existing platforms lack cost-sharing flexibility.",
    expectedSolutions: [
      "Plan creation/joining",
      "User matching",
      "Cost sharing",
      "Ratings & verification",
      "Communication system"
    ],
    domain: "Travel"
  },
  {
    id: "PS-14",
    title: "Intelligent Tourist–Guide Matching",
    problem: "Tourists face overcharging and a lack of transparency. They struggle to find guides matching their preferences.",
    expectedSolutions: [
      "Verified guide listing",
      "Transparent pricing",
      "Custom itineraries",
      "Ratings & reviews",
      "Cost estimation"
    ],
    domain: "Travel"
  },
  {
    id: "PS-15",
    title: "AI Internship Readiness & Skill Gap Analyzer",
    problem: "Students apply for internships without understanding required skills, leading to high rejection rates and poor prep.",
    expectedSolutions: [
      "Resume analysis",
      "Job comparison",
      "Skill gap detection",
      "Learning roadmap",
      "Readiness score"
    ],
    domain: "AI & EdTech"
  },
  {
    id: "PS-16",
    title: "AI-Powered Lecture Summarization",
    problem: "Students struggle to manage lengthy lectures and unorganized notes, often missing important concepts during revision.",
    expectedSolutions: [
      "Multi-format input",
      "Speech-to-text",
      "Content summarization",
      "Key point extraction",
      "Structured notes"
    ],
    domain: "AI & EdTech"
  }
];

// Extract unique domains for the categories/tabs
export const DOMAINS = Array.from(new Set(PROBLEM_STATEMENTS.map(ps => ps.domain)));
