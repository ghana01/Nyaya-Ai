<p align="center">
  <img src="https://img.shields.io/badge/NyayaAI-⚖️_AI_Legal_Platform-blue?style=for-the-badge&labelColor=0f172a" alt="NyayaAI" />
</p>

<h1 align="center">⚖️ NyayaAI — India's AI-Powered Legal Intelligence Platform</h1>

<p align="center">
  <em>Bridging the justice gap between citizens and the Indian legal system using Artificial Intelligence, Hybrid Case Search, and Automated Legal Document Generation.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-100%25-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb" />
  <img src="https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=flat-square&logo=google" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss" />
</p>

---

## 📑 Table of Contents

1.  [Problem Statement](#-problem-statement)
2.  [Motivation & Vision](#-motivation--vision)
3.  [How NyayaAI Solves This](#-how-nyayaai-solves-this)
4.  [Key Features](#-key-features-at-a-glance)
5.  [System Architecture](#-system-architecture)
6.  [Tech Stack](#-tech-stack)
7.  [Project Structure (Codebase)](#-project-structure-codebase)
8.  [Database Schema Design](#-database-schema-design)
9.  [How We Leverage the LLM (Google Gemini)](#-how-we-leverage-the-llm-google-gemini)
10. [Hybrid Case Search Engine](#-hybrid-case-search-engine-indiankanoon-integration)
11. [Complete API Reference](#-complete-api-reference)
12. [Role-Based Access Control (RBAC)](#-role-based-access-control-rbac)
13. [Frontend Pages & Components](#-frontend-pages--components)
14. [Getting Started](#-getting-started)
15. [Environment Variables](#-environment-variables)
16. [Seeding the Database](#-seeding-the-database)
17. [Future Roadmap](#-future-roadmap)
18. [Contributing](#-contributing)
19. [License](#-license)

---

## 🛑 Problem Statement

India has **1.5 billion people** but only approximately **1.4 million registered lawyers** — that's roughly **1 lawyer for every 1,100 citizens**. As of 2024, over **5 crore (50 million) cases are pending** across Indian courts. The legal system is one of the most complex in the world with a multi-layered hierarchy of courts (District → High Court → Supreme Court), thousands of statutes (IPC, CrPC, CPC, Constitution, Special Acts), and procedures that vary by state.

### The Core Problems:

| Problem | Who It Affects | Impact |
|---|---|---|
| **Legal illiteracy** | 70%+ of India's rural population | People don't know their basic rights (Right to FIR, Right to Bail, Right to Free Legal Aid) |
| **Inaccessible legal guidance** | Daily wage workers, women, minorities | Cannot afford ₹5,000–₹50,000 lawyer consultation fees for simple questions |
| **No emergency protocols** | Victims of domestic violence, fraud, police harassment | Don't know the step-by-step procedure for filing FIR, PIL, or consumer complaints |
| **Manual case research** | Lawyers, advocates, law students | Hours spent searching fragmented databases like Indian Kanoon, SCC Online, Manupatra |
| **Repetitive document drafting** | Junior lawyers, legal aid workers | Re-typing Legal Notices, Affidavits, Written Statements from scratch for every client |
| **No unified platform** | Everyone | No single platform that serves BOTH common citizens AND legal professionals |

---

## 💡 Motivation & Vision

### Why We Built NyayaAI

> *"Justice delayed is justice denied, but justice misunderstood is justice never sought."*

We believe that **access to legal knowledge is a fundamental right**, not a luxury. In a country where a significant portion of the population cannot read complex legal English, where police stations routinely refuse to file FIRs, and where millions of women don't know that domestic violence is a criminal offense under the Protection of Women from Domestic Violence Act, 2005 — there is an **urgent, moral need** for a platform that translates the law into actionable guidance.

### Our Vision

**NyayaAI is designed to be the "Google Translate" of Indian law** — converting dense legal jargon into step-by-step, plain-language guidance that ANY Indian citizen can follow. Simultaneously, it serves as a **"GitHub Copilot for Lawyers"** — an AI-powered research assistant that dramatically accelerates case preparation, document drafting, and precedent discovery.

### Who Is This For?

| User Type | What They Get |
|---|---|
| 🧑‍🤝‍🧑 **Common Citizens** | Plain-language legal guidance, rights education, emergency help wizards, document generators, case status tracking |
| 👨‍⚖️ **Lawyers & Advocates** | AI case research with auto-scraped precedents, automated draft generation, saved case management, hybrid search engine |
| 🎓 **Law Students** | Landmark case library, legal principles database, research history for study |
| 🏛️ **Legal Aid Organizations** | Scalable tool for providing free legal assistance at scale |

---

## 🔧 How NyayaAI Solves This

NyayaAI attacks the problem from **both sides simultaneously**:

### For Common People (Citizen Interface)
1.  **Ask Any Legal Question** → Get a detailed, step-by-step answer from the AI assistant, including which sections of law apply, where to go, what documents to carry, what it costs, and what to do if it fails.
2.  **Know Your Rights** → Browse categorized rights modules (Fundamental Rights, Women's Rights, Consumer Rights, etc.) explained in simple language.
3.  **Emergency Help** → Step-by-step emergency protocols for situations like domestic violence, cyber fraud, property disputes, wrongful detention.
4.  **Generate Legal Documents** → Auto-generate FIR drafts, RTI applications, consumer complaints, and police complaint letters with AI assistance.
5.  **Track Case Status** → Look up the status of any pending case in Indian courts.

### For Legal Professionals (Lawyer SaaS Dashboard)
1.  **AI Case Research** → Describe a client's situation in plain English → Get AI-extracted legal principles, suggested arguments, and auto-discovered similar cases from both the local DB and Indian Kanoon.
2.  **Hybrid Case Search** → Search across 12+ seeded landmark Supreme Court cases + real-time scraped cases from Indian Kanoon. Results are automatically cached in MongoDB for instant future retrieval.
3.  **Automated Draft Generator** → Generate Legal Notices, Written Statements, Affidavits, and Petition Drafts using structured templates. Fill forms, get formatted output, copy or download.
4.  **Saved Cases** → Bookmark, tag, and annotate important cases for quick reference during court appearances.
5.  **Full History Tracking** → Every research query and generated draft is automatically saved to your account history.

---

## ✨ Key Features At a Glance

| # | Feature | Description | Tech Used |
|---|---|---|---|
| 1 | 🤖 AI Legal Chatbot | Conversational assistant answering any Indian law question with 400-1000 word detailed responses | Google Gemini API |
| 2 | 📚 Rights Library | Categorized database of Indian Constitutional & statutory rights | MongoDB + React |
| 3 | 🚨 Emergency Help | Step-by-step guides for legal emergencies | React Wizard UI |
| 4 | 📄 Document Generator | Auto-generate FIR drafts, RTI apps, consumer complaints | Gemini AI + Templates |
| 5 | 📊 Case Status Tracker | CNR-based case status lookup | External API Integration |
| 6 | 🔍 Judgment Search | Full-text search across landmark Indian judgments | MongoDB Text Index |
| 7 | 🔬 AI Case Research | Deep legal analysis with extracted principles & arguments | Gemini + Hybrid Search |
| 8 | 🌐 Hybrid Case Search | Local DB + Real-time Indian Kanoon scraping with auto-caching | Axios + Cheerio + MongoDB |
| 9 | 📝 Legal Draft Generator | 4 professional templates (Notice, Statement, Affidavit, Petition) | Template Engine |
| 10 | 💾 Saved Cases CRUD | Full create/read/update/delete for lawyer bookmarks | Mongoose + REST |
| 11 | 📜 Research & Draft History | Auto-saved logs of all AI interactions per user | MongoDB Collections |
| 12 | 🔐 Role-Based Auth | Citizen vs Lawyer separation with JWT middleware | JWT + bcrypt |
| 13 | 🎨 SaaS Lawyer Dashboard | Dedicated sidebar layout isolated from citizen UI | React Router Outlet |
| 14 | 🔔 Toast Notifications | Professional success/error feedback across all endpoints | react-hot-toast |
| 15 | 📱 Responsive Design | Mobile-first design with collapsible sidebar | Tailwind CSS |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                        │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ MainLayout   │  │ LawyerLayout │  │ AuthContext (JWT Store)   │  │
│  │ (Citizens)   │  │ (SaaS Sidebar│  │ Role-based redirects     │  │
│  │ Navbar+Footer│  │  Navigation) │  │ Token interceptor        │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────────┘  │
│         │                 │                                         │
│  ┌──────┴───────┐  ┌──────┴───────────────────────────────────┐    │
│  │  20 Pages    │  │  Lawyer Pages                            │    │
│  │  Home        │  │  LawyerDashboard, CaseResearch,          │    │
│  │  AIAssistant │  │  LawyerDrafts, SavedCases,               │    │
│  │  KnowRights  │  │  AdvancedLawSearch                       │    │
│  │  LegalHelp   │  │                                          │    │
│  │  Documents   │  │  Features:                               │    │
│  │  CaseAnalyzer│  │  • Source badges (Local/External)        │    │
│  │  Emergency   │  │  • Toast notifications                   │    │
│  │  Blog, etc.  │  │  • Copy/Download drafts                  │    │
│  └──────────────┘  └─────────────────────────────────────────-┘    │
│                                                                     │
│                    axios interceptor (Bearer token)                  │
└─────────────────────────────┬───────────────────────────────────────┘
                              │ HTTP (REST API)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     SERVER (Node.js + Express)                      │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                     MIDDLEWARE LAYER                            │ │
│  │  cors ─── express.json ─── protect (JWT) ─── authorize (Role) │ │
│  └────────────────────────────┬───────────────────────────────────┘ │
│                               │                                     │
│  ┌────────────────────────────▼───────────────────────────────────┐ │
│  │                      ROUTE LAYER (11 Route Files)              │ │
│  │                                                                │ │
│  │  /api/health     │  /api/auth      │  /api/ai                 │ │
│  │  /api/rights     │  /api/laws      │  /api/case-status        │ │
│  │  /api/documents  │  /api/case      │  /api/activity           │ │
│  │  /api/legal-help │  /api/lawyer (🔒 Protected)                │ │
│  └────────────────────────────┬───────────────────────────────────┘ │
│                               │                                     │
│  ┌────────────────────────────▼───────────────────────────────────┐ │
│  │                   CONTROLLER LAYER                             │ │
│  │  authController, chatController, caseController,               │ │
│  │  lawyerController, documentsController, legalHelpController,   │ │
│  │  activityController, rightsController, lawsController          │ │
│  └──────────┬─────────────────────────────────┬───────────────────┘ │
│             │                                 │                     │
│  ┌──────────▼──────────┐           ┌──────────▼──────────────────┐ │
│  │  SERVICE LAYER      │           │  EXTERNAL INTEGRATIONS      │ │
│  │                     │           │                              │ │
│  │  geminiService.ts   │           │  indianKanoonService.ts      │ │
│  │  (Google Gemini LLM)│           │  (Web Scraper: Axios +      │ │
│  │                     │           │   Cheerio HTML Parser)       │ │
│  │  • askNyayaAI()     │           │                              │ │
│  │  • analyzeCaseAI()  │           │  • scrapeIndianKanoon()      │ │
│  └──────────┬──────────┘           └──────────┬──────────────────┘ │
│             │                                 │                     │
│  ┌──────────▼─────────────────────────────────▼──────────────────┐ │
│  │                    DATABASE LAYER (MongoDB)                    │ │
│  │                                                                │ │
│  │  User │ Case │ ChatMessage │ Right │ Law │ GeneratedDocument   │ │
│  │  SavedCase │ ResearchHistory │ DraftHistory │ UserActivity     │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + TypeScript | Component-based UI with strict type safety |
| **Build Tool** | Vite | Lightning-fast HMR and optimized production builds |
| **Styling** | Tailwind CSS | Utility-first CSS framework for responsive, dark-themed UI |
| **Icons** | Lucide React | Consistent, lightweight SVG icon library |
| **Notifications** | react-hot-toast | Non-intrusive success/error feedback popups |
| **Routing** | React Router v6 | Nested layouts, outlet-based route segregation |
| **HTTP Client** | Axios | Interceptor-based API calls with automatic JWT injection |
| **Backend** | Node.js + Express | RESTful API server with middleware pipeline |
| **Language** | TypeScript (end-to-end) | Full type safety across client and server |
| **Database** | MongoDB + Mongoose | Flexible document store with schema validation |
| **Authentication** | JWT (jsonwebtoken) | Stateless, scalable token-based auth |
| **Password Security** | bcryptjs | Salted password hashing (10 rounds) |
| **AI / LLM** | Google Gemini API (`gemini-3-flash-preview`) | Legal question answering, case analysis, keyword extraction |
| **Web Scraping** | Axios + Cheerio | Real-time HTML parsing of Indian Kanoon search results |
| **Environment** | dotenv | Secure configuration management |

---

## 📂 Project Structure (Codebase)

```
NyayaAI/
├── client/                          # Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Dynamic navigation (citizen vs lawyer links)
│   │   │   ├── Footer.tsx           # Site-wide footer
│   │   │   └── LawyerLayout.tsx     # SaaS sidebar layout with auth guards
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # Global auth state (user, role, token)
│   │   ├── pages/                   # 20 page components
│   │   │   ├── Home.tsx             # Landing page with feature showcase
│   │   │   ├── AIAssistant.tsx      # Main AI chatbot interface
│   │   │   ├── AuthPage.tsx         # Login/Register with role selection
│   │   │   ├── KnowYourRights.tsx   # Rights categories browser
│   │   │   ├── RightDetail.tsx      # Individual right detail view
│   │   │   ├── LegalLibrary.tsx     # Searchable law library
│   │   │   ├── LegalHelp.tsx        # Interactive legal help wizard
│   │   │   ├── DocumentGenerator.tsx # AI-powered document creation
│   │   │   ├── CaseAnalyzer.tsx     # Public case analysis tool
│   │   │   ├── CaseStatus.tsx       # Court case status tracker
│   │   │   ├── JudgmentSearch.tsx   # Full-text judgment search
│   │   │   ├── EmergencyHelp.tsx    # Emergency legal protocols
│   │   │   ├── Blog.tsx             # Legal awareness blog
│   │   │   ├── History.tsx          # User activity history
│   │   │   ├── LawyerDashboard.tsx  # Lawyer hub (cards layout)
│   │   │   ├── CaseResearch.tsx     # AI case research + similar cases
│   │   │   ├── LawyerDrafts.tsx     # Draft generator (4 templates)
│   │   │   ├── SavedCases.tsx       # CRUD case bookmarks
│   │   │   └── AdvancedLawSearch.tsx # Hybrid search UI with badges
│   │   ├── services/
│   │   │   ├── api.ts               # Axios instance with JWT interceptor
│   │   │   ├── authService.ts       # Login, register, token management
│   │   │   └── lawyerService.ts     # All lawyer API calls + TypeScript interfaces
│   │   ├── App.tsx                  # Root router with MainLayout + LawyerLayout
│   │   └── main.tsx                 # Vite entry point
│   └── package.json
│
├── server/                          # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection with Mongoose
│   │   ├── middleware/
│   │   │   └── auth.ts              # protect(), authorize(), optionalAuth()
│   │   ├── models/                  # 10 Mongoose models
│   │   │   ├── User.ts              # Auth with role field + bcrypt
│   │   │   ├── Case.ts              # Hybrid search (local/external source)
│   │   │   ├── ChatMessage.ts       # AI conversation history
│   │   │   ├── Right.ts             # Constitutional rights data
│   │   │   ├── Law.ts               # Indian statutes and sections
│   │   │   ├── GeneratedDocument.ts # AI-generated legal documents
│   │   │   ├── SavedCase.ts         # Lawyer bookmarked cases
│   │   │   ├── ResearchHistory.ts   # AI research query logs
│   │   │   ├── DraftHistory.ts      # Generated draft logs
│   │   │   └── UserActivity.ts      # User interaction tracking
│   │   ├── controllers/             # Business logic handlers
│   │   │   ├── authController.ts    # Register, login, getMe, profile
│   │   │   ├── chatController.ts    # AI chat + session management
│   │   │   ├── caseController.ts    # Case analysis + similar cases
│   │   │   ├── lawyerController.ts  # Research, drafts, search, saved cases
│   │   │   ├── documentsController.ts # AI document generation
│   │   │   ├── legalHelpController.ts # Legal help wizard logic
│   │   │   ├── activityController.ts  # Activity logging
│   │   │   ├── rightsController.ts  # Rights CRUD
│   │   │   └── lawsController.ts    # Laws search
│   │   ├── services/
│   │   │   ├── geminiService.ts     # Google Gemini LLM integration
│   │   │   └── indianKanoonService.ts # Web scraper for Indian Kanoon
│   │   ├── routes/                  # 11 Express route files
│   │   │   ├── auth.ts, chat.ts, case.ts, lawyer.ts,
│   │   │   ├── documents.ts, rights.ts, laws.ts,
│   │   │   ├── legalHelp.ts, activity.ts, caseStatus.ts, health.ts
│   │   ├── seeds/
│   │   │   └── seedCases.ts         # 12 landmark Supreme Court cases
│   │   └── index.ts                 # Server entry point
│   ├── .env                         # Environment variables (not committed)
│   └── package.json
│
└── README.md                        # ← You are here
```

---

## 🗃️ Database Schema Design

NyayaAI uses **10 MongoDB collections** managed via Mongoose schemas:

### `User` — Authentication & Role Management
```typescript
{
  name: string,              // "Rajesh Kumar" — 2-100 chars
  email: string,             // Unique, lowercase, validated
  password: string,          // bcrypt hashed (10 salt rounds), hidden by default
  phone?: string,            // Optional phone number
  role: "citizen" | "lawyer" | "admin",  // Determines dashboard & API access
  isVerified: boolean,       // Email verification flag
  createdAt: Date,
  updatedAt: Date
}
// Indexes: email (unique), role
// Methods: comparePassword(candidatePassword) → boolean
```

### `Case` — Hybrid Search Engine Core
```typescript
{
  title: string,             // "Kesavananda Bharati v. State of Kerala"
  court: "Supreme Court" | "High Court" | "District Court" | "Tribunal",
  year: number,              // 1947 – present
  summary: string,           // Detailed case summary
  judgement: string,          // Full judgment text/reference
  legalPrinciples: string[], // ["Basic Structure Doctrine", "Judicial Review"]
  tags: string[],            // ["constitution", "amendment", "article 368"]
  citation?: string,         // "AIR 1973 SC 1461"
  source: "local" | "external",  // ⭐ Tracks data provenance
  link?: string,             // ⭐ URL to Indian Kanoon (for external cases)
  createdAt: Date
}
// Indexes: title (text), summary (text), tags (text) — enables $text search
```

### `ChatMessage` — AI Conversation Persistence
```typescript
{
  sessionId: string,         // Groups messages into conversations
  userId?: string,           // Links to User if authenticated
  role: "user" | "assistant",
  content: string,           // The actual message text
  lawReferences: string[],   // AI-extracted law citations
  steps: string[],           // AI-extracted procedure steps
  suggestedDocument?: { type, title, description },
  createdAt: Date
}
```

### `SavedCase` — Lawyer Bookmarks
```typescript
{
  userId: string,            // Owner lawyer's ID
  caseTitle: string,         // Free-text title
  notes: string,             // Personal annotations
  tags: string[],            // Custom tags for organization
  court?: string,
  year?: number,
  citation?: string,
  createdAt: Date
}
```

### `ResearchHistory` — AI Research Audit Trail
```typescript
{
  userId: string,
  query: string,             // Original research question
  summary: string,           // AI-generated summary
  legalPrinciples: string[],
  suggestedArguments: string[],
  similarTopics: string[],
  createdAt: Date
}
```

### `DraftHistory` — Generated Document Logs
```typescript
{
  userId: string,
  type: string,              // "legal-notice" | "affidavit" | etc.
  title: string,             // Auto-generated title
  formData: object,          // Original form input (preserved for re-generation)
  content: string,           // Full generated draft text
  createdAt: Date
}
```

### Other Models
- **`Right`** — Constitutional and statutory rights with categories, descriptions, and related sections
- **`Law`** — Indian statutes with sections, acts, and searchable descriptions
- **`GeneratedDocument`** — AI-generated legal documents (FIR, RTI, consumer complaints)
- **`UserActivity`** — Interaction tracking (searches, document views, chat sessions)

---

## 🧠 How We Leverage the LLM (Google Gemini)

NyayaAI uses **Google Gemini (`gemini-3-flash-preview`)** as its core intelligence engine. The LLM is NOT used as a generic chatbot — it's a **deeply specialized legal advisor** with custom system prompts that enforce Indian law expertise.

### LLM Integration Architecture

```
User Query ──► geminiService.ts ──► Google Gemini API ──► Structured JSON ──► Frontend
                     │
                     ├── askNyayaAI()        → General legal questions
                     └── analyzeCaseWithAI()  → Case research & analysis
```

### System Prompt Engineering

The Gemini model receives a **comprehensive 77-line system prompt** (`NYAYA_SYSTEM_PROMPT`) that enforces:

1.  **India-Only Scope** — Rejects queries about non-Indian law
2.  **Dual-Audience Tone** — Simple Hinglish for citizens, precise citations for lawyers
3.  **Mandatory Response Sections:**
    - What is the legal issue (plain language)
    - Which specific laws/sections apply (exact citations)
    - Step-by-step procedure (where to go, documents to carry, forms to fill)
    - Timeline (how long each step takes)
    - Cost involved (court fees, lawyer fees, stamp duty)
    - What if it fails? (alternative remedies, appeals, escalation)
    - Landmark cases (real, verified case names)
    - Practical tips lawyers know but citizens don't
4.  **Strict JSON Output Format** — No free-text responses

### Function 1: `askNyayaAI(userQuery: string)`

This is the main citizen-facing AI function. It processes any legal question and returns:

```json
{
  "answer": "Detailed 400-1000 word explanation with markdown formatting...",
  "lawReferences": [
    "IPC Section 420 – Cheating and dishonestly inducing delivery of property",
    "CrPC Section 154 – Information in cognizable cases",
    "Article 21 – Right to Life and Personal Liberty"
  ],
  "steps": [
    "Step 1: Gather all evidence including photographs, messages, receipts...",
    "Step 2: Visit the police station having jurisdiction over the area...",
    "Step 3: If police refuses to file FIR, approach the Superintendent of Police...",
    "Step 4: If SP also refuses, file a complaint before the Judicial Magistrate under Section 156(3) CrPC..."
  ],
  "suggestedDocument": {
    "type": "fir-draft",
    "title": "Draft FIR Application",
    "description": "Generate a ready-to-use FIR draft based on your situation"
  }
}
```

**Configuration:**
- Model: `gemini-3-flash-preview`
- Max Output Tokens: `8192` (allows detailed, long-form responses)
- Temperature: `0.7` (balanced between creativity and accuracy)

### Function 2: `analyzeCaseWithAI(query, similarCaseTags)`

This is the lawyer-facing case analysis function. It receives the lawyer's description plus any matching tags from the local database, and returns:

```json
{
  "summary": "A 2-3 paragraph clear analysis of the legal situation...",
  "legalPrinciples": [
    "Doctrine of Legitimate Expectation",
    "Natural Justice – Audi Alteram Partem",
    "Right to Livelihood under Article 21"
  ],
  "similarTopics": [
    "Wrongful Termination",
    "Whistleblower Protection",
    "Labour Law Remedies"
  ]
}
```

### Robust Error Handling & Fallback

If the Gemini API fails (rate limits, network issues, invalid key):
- The system returns a **graceful fallback** with generic legal principles
- The user sees a professional error message, not a crash
- The JSON parsing handles edge cases (markdown code fences, malformed JSON)

---

## 🌐 Hybrid Case Search Engine (IndianKanoon Integration)

This is NyayaAI's most innovative feature — a **two-tier search engine** that combines the speed of a local database with the breadth of India's largest legal database.

### How It Works (Step-by-Step)

```
User searches "cybercrime"
        │
        ▼
┌─── Step 1: Local MongoDB Search ───┐
│  db.cases.find({ $text: "cybercrime" })  │
│  Result: 2 cases found (< 5 threshold)   │
└──────────────┬──────────────────────┘
               │ Less than 5 results?
               ▼ YES
┌─── Step 2: External Scraping ──────┐
│  GET indiankanoon.org/search/?formInput=cybercrime  │
│  Parse HTML with Cheerio                              │
│  Extract: title, court, summary, link                 │
│  Result: 5 external cases parsed                      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─── Step 3: Deduplication ──────────┐
│  Compare titles (case-insensitive)          │
│  Filter out cases already in local results  │
│  Result: 4 unique new cases                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─── Step 4: Cache to MongoDB ───────┐
│  Insert new cases with source: "external"   │
│  Next search for same topic = INSTANT       │
│  Database grows organically over time       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─── Step 5: Merge & Return ─────────┐
│  Combine: 2 local + 4 external = 6 cases  │
│  Frontend shows source badges:              │
│    🟢 Local DB  │  🔵 Indian Kanoon        │
│  External cases have "Open Case" link       │
└─────────────────────────────────────┘
```

### The Scraping Service (`indianKanoonService.ts`)

```typescript
// Uses Axios for HTTP + Cheerio for DOM parsing
// Targets: https://indiankanoon.org/search/?formInput={query}
// Parses: .result_title (title + link), .docsource (court), .headline (summary)
// Returns: Array of { title, court, summary, link }
// Timeout: 10 seconds
// User-Agent: Chrome-compatible header to avoid blocking
// Error handling: Returns empty array on failure (graceful degradation)
```

### Self-Improving Database

The beauty of this system: **the database gets smarter over time**. Every search that triggers external scraping adds new cached cases to MongoDB. After weeks of usage, common topics like "property disputes", "bail", "divorce", "fraud" will return instant local results without ever needing to scrape again.

---

## 📡 Complete API Reference

### Authentication APIs (`/api/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ Public | Register new user (citizen/lawyer) |
| `POST` | `/api/auth/login` | ❌ Public | Login, returns JWT token |
| `GET` | `/api/auth/me` | 🔒 JWT | Get current user profile |
| `PUT` | `/api/auth/profile` | 🔒 JWT | Update profile (name, phone) |
| `PUT` | `/api/auth/password` | 🔒 JWT | Change password |

**Register Request:**
```json
POST /api/auth/register
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "password": "secure123",
  "role": "lawyer"
}
```
**Register Response:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "Rajesh Kumar", "email": "rajesh@example.com", "role": "lawyer" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Login Response:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "...", "email": "...", "role": "lawyer" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### AI Chat APIs (`/api/ai`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/ai/chat` | ❌ Public | Send message, get AI legal response |
| `GET` | `/api/ai/history/:sessionId` | ❌ Public | Get chat history for session |
| `GET` | `/api/ai/sessions/:userId` | ❌ Public | Get all sessions for user |
| `DELETE` | `/api/ai/session/:sessionId` | ❌ Public | Delete a chat session |

**Chat Request:**
```json
POST /api/ai/chat
{
  "message": "How to file an FIR if police refuses?",
  "sessionId": "optional-session-id",
  "userId": "optional-user-id"
}
```
**Chat Response:**
```json
{
  "success": true,
  "data": {
    "answer": "**Filing an FIR When Police Refuses**\n\nIf the police station refuses to register your FIR...(400-1000 words)...",
    "lawReferences": [
      "CrPC Section 154 – FIR registration is mandatory for cognizable offences",
      "CrPC Section 156(3) – Magistrate can direct FIR registration",
      "Lalita Kumari v. Govt. of UP (2014) – Mandatory FIR registration"
    ],
    "steps": [
      "Step 1: Write your complaint on paper with full facts, date, place...",
      "Step 2: Submit to the SHO (Station House Officer)...",
      "Step 3: If refused, send complaint by registered post to SP...",
      "Step 4: Approach Judicial Magistrate under Section 156(3) CrPC...",
      "Step 5: File complaint on state police online portal..."
    ],
    "suggestedDocument": {
      "type": "fir-draft",
      "title": "Draft FIR Application",
      "description": "Generate a formal complaint letter for FIR registration"
    },
    "sessionId": "sess_abc123"
  }
}
```

---

### Case APIs (`/api/case`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/case/analyze` | ❌ Public | Analyze a case description with AI |
| `GET` | `/api/case/similar?tag=` | ❌ Public | Find similar cases by tag |
| `GET` | `/api/case/all` | ❌ Public | Get all seeded landmark cases |

**Analyze Response:**
```json
{
  "success": true,
  "data": {
    "summary": "This case involves a dispute over...",
    "legalPrinciples": ["Right to Property", "Natural Justice"],
    "similarTopics": ["Land Acquisition", "Eminent Domain"],
    "cases": [{ "title": "...", "court": "Supreme Court", "year": 1973 }]
  }
}
```

---

### Document APIs (`/api/documents`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/documents/types` | ❌ Public | List available document types |
| `POST` | `/api/documents/generate` | 🔓 Optional | Generate a legal document with AI |
| `GET` | `/api/documents/my-documents` | 🔒 JWT | Get user's generated documents |
| `GET` | `/api/documents/:id` | 🔓 Optional | Get a specific document |

**Generate Request:**
```json
POST /api/documents/generate
{
  "type": "fir-draft",
  "details": {
    "incident": "My phone was stolen at the market on 15th March...",
    "location": "Sector 18, Noida",
    "items": "iPhone 15, wallet with ₹5000 cash"
  }
}
```

---

### Legal Help APIs (`/api/legal-help`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/legal-help/types` | ❌ Public | Get available legal help categories |
| `POST` | `/api/legal-help` | ❌ Public | Get AI-guided legal help for a scenario |

---

### Activity APIs (`/api/activity`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/activity` | ❌ Public | Log a user activity |
| `GET` | `/api/activity?userId=&type=&limit=&page=` | ❌ Public | Get activity history |
| `DELETE` | `/api/activity/:id` | ❌ Public | Delete an activity record |

---

### 🔒 Lawyer-Only APIs (`/api/lawyer`)

> **All routes below require JWT authentication + `role: "lawyer"` or `role: "admin"`**

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/lawyer/research` | AI case research with hybrid similar cases |
| `GET` | `/api/lawyer/draft-types` | List available draft templates |
| `POST` | `/api/lawyer/draft` | Generate a legal draft from template |
| `POST` | `/api/lawyer/save-case` | Save/bookmark a case |
| `GET` | `/api/lawyer/saved-cases` | Get all saved cases (paginated) |
| `PUT` | `/api/lawyer/saved-cases/:id` | Update a saved case |
| `DELETE` | `/api/lawyer/saved-cases/:id` | Delete a saved case |
| `GET` | `/api/lawyer/search?keywords=&court=&year=&section=` | Hybrid case search |

**Research Request:**
```json
POST /api/lawyer/research
{
  "query": "Client was wrongfully terminated after whistleblowing about financial fraud in the company"
}
```
**Research Response:**
```json
{
  "success": true,
  "data": {
    "query": "Client was wrongfully terminated after whistleblowing...",
    "summary": "This case involves a potential wrongful termination... (detailed analysis)",
    "legalPrinciples": [
      "Right against unfair labour practices",
      "Whistleblower Protection Act, 2014",
      "Industrial Disputes Act, Section 2(oo) – Definition of retrenchment",
      "Article 19(1)(a) – Freedom of Speech in workplace context"
    ],
    "similarTopics": ["Wrongful Termination", "Labour Law", "Whistleblower Protection"],
    "suggestedArguments": [
      "Argued on the basis of: Right against unfair labour practices",
      "Argued on the basis of: Whistleblower Protection Act, 2014"
    ],
    "similarCases": [
      {
        "_id": "abc123",
        "title": "Vishaka v. State of Rajasthan",
        "court": "Supreme Court",
        "year": 1997,
        "summary": "Landmark case on workplace rights...",
        "source": "local",
        "tags": ["workplace", "fundamental rights"],
        "link": null
      },
      {
        "_id": "def456",
        "title": "Relevant Labour Case from Indian Kanoon",
        "court": "High Court",
        "summary": "A case involving wrongful dismissal...",
        "source": "external",
        "link": "https://indiankanoon.org/doc/12345/",
        "tags": ["Wrongful Termination"]
      }
    ]
  }
}
```

**Hybrid Search Request:**
```
GET /api/lawyer/search?keywords=cybercrime&court=High Court&year=2020
```
**Hybrid Search Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "_id": "...",
        "title": "Shreya Singhal v. Union of India",
        "court": "Supreme Court",
        "year": 2015,
        "summary": "Section 66A of IT Act struck down...",
        "source": "local",
        "tags": ["IT Act", "section 66A", "internet"],
        "citation": "AIR 2015 SC 1523",
        "link": null
      },
      {
        "_id": "...",
        "title": "State of Tamil Nadu v. Suhas Katti",
        "court": "High Court",
        "year": 2020,
        "summary": "First conviction under IT Act...",
        "source": "external",
        "tags": ["cybercrime"],
        "link": "https://indiankanoon.org/doc/..."
      }
    ],
    "total": 7,
    "filters": { "keywords": "cybercrime", "court": "High Court", "year": "2020" }
  }
}
```

**Draft Generation Request:**
```json
POST /api/lawyer/draft
{
  "type": "legal-notice",
  "formData": {
    "recipientName": "ABC Builders Pvt. Ltd.",
    "recipientAddress": "Plot 15, Sector 62, Noida",
    "clientName": "Rajesh Kumar",
    "subject": "Non-delivery of flat despite full payment",
    "facts": "My client paid ₹45,00,000 for a 3BHK flat...",
    "demand": "Complete handover of flat within 30 days",
    "deadline": "15 days",
    "advocateName": "Adv. Priya Sharma",
    "barCouncilNumber": "D/1234/2020"
  }
}
```
**Draft Response:**
```json
{
  "success": true,
  "data": {
    "type": "legal-notice",
    "content": "LEGAL NOTICE\n\nDate: 25/03/2026\n\nTo,\nABC Builders Pvt. Ltd.\nPlot 15, Sector 62, Noida\n\nSubject: Non-delivery of flat despite full payment\n\nDear Sir/Madam,\n\nUnder instructions from and on behalf of my client, Rajesh Kumar...\n\n...(full formatted legal notice)...\n\nAdv. Priya Sharma\nAdvocate\nD/1234/2020",
    "generatedAt": "2026-03-25T16:30:00.000Z"
  }
}
```

---

## 🔐 Role-Based Access Control (RBAC)

NyayaAI implements a **three-tier role system** with JWT-based authentication:

```
┌─────────────────────────────────────────────────────┐
│                     USER ROLES                       │
├─────────────┬──────────────────┬────────────────────┤
│   citizen   │     lawyer       │      admin         │
├─────────────┼──────────────────┼────────────────────┤
│ AI Chatbot  │ ✅ Everything    │ ✅ Everything      │
│ Rights DB   │   citizens get   │   + admin panel    │
│ Emergency   │ + Case Research  │   (future)         │
│ Documents   │ + Draft Generator│                    │
│ Case Status │ + Saved Cases    │                    │
│ Legal Help  │ + Hybrid Search  │                    │
│ Blog        │ + History Logs   │                    │
│             │ + SaaS Dashboard │                    │
└─────────────┴──────────────────┴────────────────────┘
```

### How It Works:

1.  **Frontend:** `LawyerLayout.tsx` checks `AuthContext` on mount. If unauthenticated → redirect to `/login`. If role ≠ `lawyer` → redirect to `/`.
2.  **Backend:** `router.use(protect, authorize('lawyer', 'admin'))` middleware chain validates JWT token AND checks the user's role from MongoDB before allowing access.
3.  **JWT Token:** Stored in `localStorage`, injected into every API call via Axios interceptor as `Authorization: Bearer <token>`.

---

## 🖥️ Frontend Pages & Components

| # | Page | Route | Role | Description |
|---|---|---|---|---|
| 1 | Home | `/` | All | Landing page with animated hero section |
| 2 | Login | `/login` | All | Login form with role indicator |
| 3 | Register | `/register` | All | Registration with role selection (citizen/lawyer) |
| 4 | AI Assistant | `/ai-assistant` | All | Full conversational legal chatbot |
| 5 | Know Your Rights | `/know-your-rights` | All | Rights categories browser |
| 6 | Right Detail | `/rights/:id` | All | Individual right explanation |
| 7 | Legal Library | `/legal-library` | All | Searchable Indian law database |
| 8 | Legal Help | `/legal-help` | All | Interactive wizard for legal scenarios |
| 9 | Document Generator | `/documents` | All | AI-powered document creation |
| 10 | Case Analyzer | `/case-analyzer` | All | Public case analysis tool |
| 11 | Case Status | `/case-status` | All | CNR-based case tracking |
| 12 | Judgment Search | `/judgment-search` | All | Full-text case search |
| 13 | Emergency Help | `/emergency` | All | Emergency protocols |
| 14 | Blog | `/blog` | All | Legal awareness articles |
| 15 | History | `/history` | All | Activity timeline |
| 16 | **Lawyer Dashboard** | `/lawyer-dashboard` | 🔒 Lawyer | Professional hub with tool cards |
| 17 | **Case Research** | `/lawyer/research` | 🔒 Lawyer | AI research + similar cases |
| 18 | **Draft Generator** | `/lawyer/drafts` | 🔒 Lawyer | 4-template document wizard |
| 19 | **Saved Cases** | `/lawyer/saved-cases` | 🔒 Lawyer | CRUD case bookmarks |
| 20 | **Advanced Search** | `/lawyer/search` | 🔒 Lawyer | Hybrid local+external search |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** running locally (`mongod`) or a MongoDB Atlas connection string
- **Google Gemini API Key** — Get from [Google AI Studio](https://aistudio.google.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/ghana01/Nyaya-Ai.git
cd Nyaya-Ai/Nyaya-AI-main/NyayaAI
```

### Step 2: Setup Backend
```bash
cd server
npm install
```

### Step 3: Configure Environment
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nyayaai
JWT_SECRET=your-super-secret-jwt-key-change-this
GEMINI_API_KEY=your-google-gemini-api-key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Step 4: Seed the Database (Optional but Recommended)
```bash
npx ts-node src/seeds/seedCases.ts
```
This inserts **12 landmark Supreme Court cases** (Kesavananda Bharati, Maneka Gandhi, Vishaka, etc.) into your local MongoDB.

### Step 5: Start Backend Server
```bash
npm run dev
# Server starts at http://localhost:5000
```

### Step 6: Setup & Start Frontend
```bash
cd ../client
npm install
npm run dev
# Frontend starts at http://localhost:5173
```

### Step 7: Open in Browser
Navigate to `http://localhost:5173` and you're live! Register as a `lawyer` to access the full SaaS dashboard.

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Express server port |
| `MONGODB_URI` | Yes | `mongodb://localhost:27017/nyayaai` | MongoDB connection string |
| `JWT_SECRET` | Yes | `nyayaai-secret-key` | Secret key for JWT signing |
| `GEMINI_API_KEY` | Yes | — | Google Gemini API key for AI features |
| `CLIENT_URL` | No | `http://localhost:5173` | Frontend URL for CORS |
| `NODE_ENV` | No | `development` | Environment mode |

---

## 🌱 Seeding the Database

The seed script (`server/src/seeds/seedCases.ts`) populates your MongoDB with **12 landmark Indian Supreme Court cases**, including:

| # | Case Name | Year | Key Topic |
|---|---|---|---|
| 1 | Kesavananda Bharati v. State of Kerala | 1973 | Basic Structure Doctrine |
| 2 | Maneka Gandhi v. Union of India | 1978 | Due Process / Right to Life |
| 3 | Vishaka v. State of Rajasthan | 1997 | Sexual Harassment at Workplace |
| 4 | Shah Bano Case | 1985 | Maintenance Rights / Personal Law |
| 5 | Indra Sawhney v. Union of India | 1992 | OBC Reservation / 50% Ceiling |
| 6 | D.K. Basu v. State of West Bengal | 1997 | Custodial Torture / Arrest Guidelines |
| 7 | Shreya Singhal v. Union of India | 2015 | Internet Free Speech / Section 66A |
| 8 | Navtej Singh Johar v. Union of India | 2018 | Section 377 / LGBTQ Rights |
| 9 | K.S. Puttaswamy v. Union of India | 2017 | Right to Privacy / Aadhaar |
| 10 | Shayara Bano v. Union of India | 2017 | Triple Talaq / Gender Equality |
| 11 | Olga Tellis v. Bombay Municipal Corp. | 1985 | Right to Livelihood / Eviction |
| 12 | MC Mehta v. Union of India | 1987 | Environmental Rights / Pollution |

---

## 🗺️ Future Roadmap

- [ ] **Real-time Legal News Feed** — Aggregate legal news from Indian courts and legal journals
- [ ] **Voice Input** — Ask legal questions via speech (Hindi + English)
- [ ] **PDF Export** — Download generated drafts as formatted PDF documents
- [ ] **Court Date Reminders** — Calendar integration for case hearing dates
- [ ] **Lawyer Marketplace** — Connect citizens with verified lawyers in their city
- [ ] **Multi-language Support** — Full Hindi, Tamil, Bengali, Marathi UI translations
- [ ] **Admin Dashboard** — Analytics, user management, content moderation
- [ ] **Mobile App** — React Native companion app for field advocates
- [ ] **E-Filing Integration** — Direct submission of documents to court e-filing portals
- [ ] **Legal AI Fine-tuning** — Fine-tune Gemini on Indian legal corpus for better accuracy

---

## 🤝 Contributing

We welcome contributions from lawyers, developers, legal tech enthusiasts, and law students!

1.  Fork the repository
2.  Create a feature branch: `git checkout -b feature/amazing-feature`
3.  Commit your changes: `git commit -m 'feat: add amazing feature'`
4.  Push to the branch: `git push origin feature/amazing-feature`
5.  Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ for India's Justice System</strong><br/>
  <em>NyayaAI — Making law accessible, one query at a time.</em>
</p>
