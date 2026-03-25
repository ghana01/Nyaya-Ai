import { Routes, Route, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AIAssistant from './pages/AIAssistant'
import KnowYourRights from './pages/KnowYourRights'
import RightDetail from './pages/RightDetail'
import LegalLibrary from './pages/LegalLibrary'
import CaseStatus from './pages/CaseStatus'
import JudgmentSearch from './pages/JudgmentSearch'
import EmergencyHelp from './pages/EmergencyHelp'
import Blog from './pages/Blog'
import DocumentGenerator from './pages/DocumentGenerator'
import AuthPage from './pages/AuthPage'
import CaseAnalyzer from './pages/CaseAnalyzer'
import History from './pages/History'
import LegalHelp from './pages/LegalHelp'
import LawyerDashboard from './pages/LawyerDashboard'
import CaseResearch from './pages/CaseResearch'
import LawyerDrafts from './pages/LawyerDrafts'
import SavedCases from './pages/SavedCases'
import AdvancedLawSearch from './pages/AdvancedLawSearch'
import LawyerLayout from './components/LawyerLayout'

// Layout for the main site (citizens)
const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
)

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#1e293b' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#1e293b' } },
        }} 
      />
      <Routes>
        {/* Main public/citizen routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/know-your-rights" element={<KnowYourRights />} />
          <Route path="/rights/:id" element={<RightDetail />} />
          <Route path="/legal-library" element={<LegalLibrary />} />
          <Route path="/case-status" element={<CaseStatus />} />
          <Route path="/judgment-search" element={<JudgmentSearch />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
          <Route path="/documents" element={<DocumentGenerator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/case-analyzer" element={<CaseAnalyzer />} />
          <Route path="/history" element={<History />} />
          <Route path="/legal-help" element={<LegalHelp />} />
        </Route>

        {/* Lawyer authenticated routes */}
        <Route element={<LawyerLayout />}>
          <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
          <Route path="/lawyer/research" element={<CaseResearch />} />
          <Route path="/lawyer/drafts" element={<LawyerDrafts />} />
          <Route path="/lawyer/saved-cases" element={<SavedCases />} />
          <Route path="/lawyer/search" element={<AdvancedLawSearch />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
