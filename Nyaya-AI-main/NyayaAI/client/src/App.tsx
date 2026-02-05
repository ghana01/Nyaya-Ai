import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
