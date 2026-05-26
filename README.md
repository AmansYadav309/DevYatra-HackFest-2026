# 🚀 DevYatra HackFest 2026 Portal

[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.11.0-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Secure_Uploads-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38.0-F43F5E?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

Welcome to the **DevYatra HackFest 2026** platform! This is a state-of-the-art, high-performance web portal designed for student innovators, team leaders, and panel judges. Developed for the **DEV_IT Student Forum** at **KDK College of Engineering (KDKCE), Nagpur**, this application manages hackathon promotions, domain-based challenge discovery, student project submissions (up to 200MB deliverables), and an interactive Judge & Admin Grading Dashboard.

The user interface features a premium dark-themed aesthetic, dynamic glassmorphism panels, hardware-accelerated canvas-based physics background animations (`GravityStarsBackground`), and elegant micro-interactions powered by **Framer Motion**.

---

## 🌟 Core Features

### 1. 🌌 Interactive Landing Page (`HomePage`)
* **Interactive Countdown**: A live, millisecond-accurate ticker counting down to the hackathon kickoff.
* **Responsive Timeline Phases**: Clear step-by-step guidance mapping the hackathon workflow (Idea Submission, Coding Phases, and Final Pitching).
* **Glassmorphism Panels**: Modern card layouts displaying organizers, prizes, rules, eligibility criteria, FAQs, and a contact form.
* **Atmospheric Visuals**: A background rendering fluid, looping neon gradients behind clean typography.

### 2. 🎯 Problem Discovery Center (`ProblemStatementsPage`)
* **Dynamic Search & Filters**: Easy tabbed layout to filter **16 custom problem statements** across **11 technical domains** (Web3, Healthtech, Fintech, AI/ML, Agriculture, etc.).
* **Point-by-Point Requirements**: Detailed views showing specific challenge problem descriptions and list of expected solutions.
* **3D Hover Cards**: Smooth tilt effects reacting dynamically to user cursor movements.

### 3. 🔒 Secure Project Submission Portal (`ProjectSubmissionPage`)
* **Team Leader Authentication**: Only recognized team leader emails can access the form. The email verification check queries hardcoded authorized lists combined with dynamic Firebase Firestore documents (`authorizedEmails`).
* **Rigorous Frontend Valdation**: Custom validation that checks file limits (e.g., rejecting videos exceeding **200MB** before network transmission).
* **Cloud-Hosted File Uploads**: Integrated with the **Cloudinary Upload API** to store large assets securely, including pitch presentations (PPT/PDF) and dynamic MP4 video demonstrations.
* **Real-time Database Record**: Commits verified data structures, file URLs, and custom timestamps straight to Firestore.

### 4. 👑 Dynamic Panel Judge & Admin Dashboard (`AdminDashboard`)
* **Privileged Gates**: Protected admin route (triggered by logging in as `amansyadav309@gmail.com` or custom created admins inside the Firestore database).
* **High-Fidelity Rating Matrix**: Judges can inspect a team's deliverables (Live Demo, GitHub, PPT Slide, Video Demo) and assign a **1–5 Star Rating** per element.
* **Real-time Score Aggregator**: Instantly calculates and aggregates deliverables into a cumulative score out of 20 points, syncing to Firestore instantly.
* **Status Action Controllers**: Immediate buttons to toggle submissions between **Selected** (renders an engaging neon-green highlight), **Rejected** (dims the card), or **Pending**.
* **Access Control Center**:
  * **Dynamic Student Authorization**: Provision/fix team leader email credentials on the fly so students can access the submission portal.
  * **Judge Provisioning**: Create additional sub-admin emails and passwords in real-time, allowing collaborative grading.

---

## 🛠️ Technical Stack & Architecture

### Frontend
* **Core Library**: React 19 (Functional Components, Hook-based state trees)
* **Language**: TypeScript (Strongly typed payloads and interfaces)
* **Styling**: Tailwind CSS (Dark Mode utility variables) & custom Vanilla CSS gradients
* **Animation System**: Framer Motion & custom Canvas 2D physics engines

### Backend-as-a-Service
* **Database**: Google Firebase Firestore (NoSQL Document Store)
* **Media Server**: Cloudinary REST API (Raw presentation slides & video content delivery network)

---

## 📂 Project Structure

```bash
devyatra-app/
├── public/                 # Static assets (images, logos, manifest)
├── src/
│   ├── assets/             # Global media files and graphics
│   ├── components/         # Reusable structural blocks
│   │   ├── ui/             # Custom animated visual wrappers
│   │   │   ├── AnimatedHeading.tsx         # Framer motion staggered headers
│   │   │   ├── GravityStarsBackground.tsx  # Particle canvas visualizer
│   │   │   ├── StarsBackground.tsx         # Deep-space background wrapper
│   │   │   └── RollingText.tsx             # Typographic sliding marquee
│   │   ├── AdminDashboard.tsx       # Live grading table and access panel
│   │   ├── EventPhases.tsx          # Phase roadmap
│   │   ├── Hero.tsx                 # Branding countdown panel
│   │   ├── TopNavBar.tsx            # Floating glass nav controls
│   │   └── ... (Prizes, FAQ, Contact, Organizer, AboutStats)
│   ├── config/
│   │   └── firebase.ts              # Firebase client SDK initialization
│   ├── data/
│   │   ├── authorizedEmails.ts      # Statically permitted student lists
│   │   ├── problemStatements.ts     # Domain challenge definitions
│   │   └── mockData.ts              # FAQ and timeline information
│   ├── pages/
│   │   ├── HomePage.tsx             # Primary promotion landing layout
│   │   ├── ProblemStatementsPage.tsx# Challenge catalog filter
│   │   └── ProjectSubmissionPage.tsx# Gatekeeper & file attachment forms
│   ├── utils/
│   │   └── cloudinary.ts            # Cloudinary API multipart uploader
│   ├── App.css                      # Core layout typography overrides
│   ├── index.css                    # Tailwind CSS imports & custom animations
│   ├── App.tsx                      # React Router client routes
│   └── main.tsx                     # Entry point mounting App
├── .env.example            # Template for required API keys
├── tailwind.config.js      # Layout boundaries and bespoke colors
├── vite.config.ts          # Compilation overrides
└── tsconfig.json           # TS rules
```

---

## 🚀 Installation & Local Setup

To run a copy of the DevYatra HackFest platform on your local machine:

### Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed (v18.0.0+ recommended) alongside `npm` or `yarn`.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/DevYatra-HackFest.git
cd DevYatra-HackFest/devyatra-app
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the `devyatra-app` directory (you can copy `.env.example` if available) and add your respective credentials:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
VITE_CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
VITE_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

> 💡 **Note**: The codebase contains fully configured backup settings that will run immediately for the KDKCE DevYatra HackFest servers out of the box if no `.env` is loaded.

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
To bundle the application into optimized static assets for deployment (Vercel, Netlify, etc.):
```bash
npm run build
```
The compiled build output will be stored in the `/dist` folder.

---

## 🔥 Firebase Database Architecture

To configure the Firebase database manually for this application, instantiate the following collections:

### 1. `submissions`
Stores all team project submissions.
```typescript
interface SubmissionDocument {
  teamName: string;
  collegeName: string;
  teamLeaderEmail: string;
  problemStatement: string;        // ID - Name mapping
  githubLink: string;
  demoLink: string | null;
  driveLink: string | null;
  pptUrl: string;                  // Uploaded to Cloudinary
  videoUrl: string | null;         // Uploaded to Cloudinary
  submittedAt: ServerTimestamp;
  score: number;                   // Accumulation of field ratings (0-20)
  status: 'pending' | 'selected' | 'rejected';
  ratings: {                       // Star values (1-5)
    ppt: number;
    video: number;
    github: number;
    demo: number;
  };
}
```

### 2. `authorizedEmails`
Authorized team leaders who are cleared to upload.
```typescript
interface AuthorizedEmailDocument {
  addedAt: string;                 // ISO string of creation
}
```
*The document ID must be the lowercase email of the authorized student (e.g. `student@domain.com`).*

### 3. `admins`
Panel Judges and administrators.
```typescript
interface AdminDocument {
  password: string;                // Secure string password key
  addedAt: string;
}
```
*The document ID must be the lowercase email of the admin (e.g. `judge@domain.com`).*

---

## ☁️ Cloudinary Upload Configuration
Ensure your Cloudinary upload preset is set to **Unsigned**.
1. Log in to your Cloudinary Console.
2. Go to **Settings** -> **Upload**.
3. Under **Upload presets**, add an unsigned preset.
4. Set the **Folder** if you want submissions in a designated folder.
5. In **Upload control**, select **Auto** under **Resource type** to allow mixed types (PPTs, PDFs, and MP4 videos) to be processed cleanly.

---

## 👥 Contributors & Organizers

* **Organizing Committee**: DEV_IT Student Forum, Department of Information Technology, KDK College of Engineering (KDKCE), Nagpur.
* **Lead Developer / Contact**: Aman Yadav (`amansyadav309@gmail.com`)

---

Made with 💛 and ☕ by the KDKCE Dev Team. All rights reserved © 2026.
