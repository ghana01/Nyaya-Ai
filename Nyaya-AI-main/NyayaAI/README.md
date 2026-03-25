# ⚖️ NyayaAI - The Hybrid Legal Tech Platform

Welcome to the **NyayaAI** repository! NyayaAI is a dual-purpose, AI-powered legal technology platform specifically optimized for the Indian judicial system. It features dedicated workflows for both ordinary citizens seeking accessible legal guidance and legal professionals requiring advanced research automation.

---

## 🛑 Problem Statement & Motivation
Navigating the Indian legal system presents a steep, complex, and highly expensive learning curve. **Ordinary citizens** often lack immediate access to comprehensible legal resources, emergency protocols, and basic document templates. On the flip side, **Legal Professionals (Lawyers, Advocates)** spend a disproportionate amount of their time executing manual case-law research, repeatedly drafting standard legal documents (notices, written statements, affidavits), and hunting for judicial precedents across highly fragmented online databases.

**Motivation:** Our goal is to democratize legal knowledge using cutting-edge AI (Google Gemini) and build a bridge between accessible justice for the masses and powerful productivity tools for legal practitioners.

---

## 💡 How We Are Solving This
NyayaAI provides a **Role-Based Web Application** offering two entirely different user experiences based on authentication:

### 🧑‍🤝‍🧑 For Citizens (Public Interface)
*   **Multilingual AI Legal Assistant:** Ask everyday legal questions, get conversational guidance, and understand your rights in plain language.
*   **Rights Database & Library:** A localized library translating complex Constitutional rights and Penal Codes into understandable modules.
*   **Emergency Help Wizards:** Step-by-step guides for immediate actions (e.g., How to file an FIR, domestic violence help).

### 👨‍⚖️ For Legal Professionals (SaaS Dashboard)
*   **AI Case Research Assistant:** Describe a client's situation, and the AI will extract *key legal principles, suggest legal arguments, and automatically surface similar landmark cases*.
*   **Hybrid Legal Case Search Engine:** A specialized search engine that queries a curated, ultra-fast **Local MongoDB** of landmark cases. If the database yields fewer than 5 results, it dynamically spins up an **external web scraper** (Axios & Cheerio) to query **Indian Kanoon** in real-time, fetching fresh results, caching them locally to speed up future queries, and seamlessly returning the merged data to the frontend.
*   **Automated Draft Generator:** Generate structure-perfect Legal Notices, Affidavits, Written Statements, and Petitions in seconds.
*   **Full History Tracking:** All AI research queries and generated drafts are permanently saved securely to the lawyer's account history for later retrieval and clipboard copying.

---

## 🏗️ Technical Architecture

NyayaAI is built on the **MERN** stack (MongoDB, Express, React, Node.js) with strict **TypeScript** end-to-end to ensure enterprise-grade stability.

### 🗄️ Database Layer (MongoDB)
*   **Mongoose Models:**
    *   `User`: Handles authentication, securely hashed passwords, and the critical `role` field (`citizen` vs `lawyer`).
    *   `Case`: Supports the Hybrid Search Engine. Contains fields for `title`, `court`, `summary`, `tags`, and an ultra-important `source` field (`local` or `external`) tracking provenance from Indian Kanoon.
    *   `ResearchHistory` & `DraftHistory`: Secure logs automatically binding generated AI outputs to a Lawyer's `userId`.
    *   `SavedCase`: Custom bookmarks for lawyers to save and annotate their favorite precedents.

### ⚙️ Backend API Layer (Node / Express)
The backend enforces strict separation of concerns and robust security paradigms:
*   **Auth Middleware:** JWT (JSON Web Tokens) dictate session validity. The `authorize('lawyer')` middleware strictly isolates endpoints so basic users cannot exploit premium features.
*   **Services:**
    *   `geminiService.ts`: Invokes Google Gemini for AI conversational analysis and semantic keyword tagging.
    *   `indianKanoonService.ts`: A robust, headless scraping utility that parses live data from the Indian Kanoon DOM.
*   **Controllers:** E.g., `lawyerController.ts` which orchestrates the complex logic of performing local DB lookups and merging external scraped items seamlessly.

### 🎨 Frontend Presentation Layer (React + Vite)
*   **Role-Based Routing:** `App.tsx` dynamically segregates layout components.
    *   Users get the classic top-navbar `MainLayout`.
    *   Lawyers are funneled into `LawyerLayout.tsx`—a dedicated, sticky Sidebar navigation SaaS environment ensuring a distraction-free workspace.
*   **Styling & UI:** Manufactured with **Tailwind CSS**. We utilized Dark/Slate gradients, glass-morphism panels, and `lucide-react` iconography for an ultra-premium "Apple-esque" aesthetic.
*   **Notifications:** `react-hot-toast` guarantees sleek, modern, non-intrusive feedback upon saving cases or encountering API network errors.

---

## 🌐 Understanding The API Workflows

### 1. Hybrid Search Workflow (`GET /api/lawyer/search`)
1.  **Request Input:** User inputs keywords, court names, or sections.
2.  **Local Query:** MongoDB runs a fast `$text` / `$regex` match on the `Case` collection.
3.  **Conditional Scrape:** If the `Case` array length is `< 5`, the backend invokes `indianKanoonService.ts`.
4.  **Parse & Merge:** It scrapes Indian Kanoon, maps the HTML nodes to our frontend TypeScript interfaces, filters out duplicate titles, inserts the new cases into MongoDB (to cache them as `source: 'external'`), and appends them to the Response array.
5.  **Return:** Frontend maps the unified array, highlighting data origin using colored UI badges.

### 2. Case Research Automation (`POST /api/lawyer/research`)
1.  **Request Input:** A lawyer submits a detailed contextual story (e.g., "A client was terminated after whistleblowing...").
2.  **AI Invocation:** Node pings Gemini AI to extract distinct arrays: `legalPrinciples`, `summary`, and `similarTopics`.
3.  **Cross-pollination:** The backend takes those `similarTopics` and loops them back into the Hybrid Search Workflow automatically.
4.  **Persistence:** The entire transaction is saved to `ResearchHistory`.
5.  **Return:** The frontend renders four distinct panels: Summary, Principles, Suggested Arguments, and Clickable "Similar Case" Cards (local + scraped).

---

## 🚀 Getting Started Locally

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Running locally on `mongodb://localhost:27017` or via MongoDB Atlas)
*   Google Gemini API Key

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/[Your-Username]/Nyaya-Ai.git
    cd Nyaya-Ai
    ```

2.  **Envirnoment Setup**
    Navigate to the `server` folder, create a `.env` file, and supply:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/nyayaai
    JWT_SECRET=your_super_secret_key
    GEMINI_API_KEY=your_gemini_api_key
    CLIENT_URL=http://localhost:5173
    ```

3.  **Install & Run Backend**
    ```bash
    cd server
    npm install
    npm run dev
    ```

4.  **Install & Run Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

**Note:** The backend automatically connects to MongoDB on boot. You do not need to seed Indian Kanoon cases manually, as the application searches and caches them automatically over time upon usage.
