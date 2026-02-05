import { Link } from 'react-router-dom'
import { 
  Search, 
  Bot, 
  FileSearch, 
  Scale, 
  BookOpen, 
  FileText, 
  Library,
  Phone,
  Shield,
  AlertTriangle,
  FileWarning,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Card from '../components/Card'
import { useState } from 'react'

const emergencyButtons = [
  { 
    label: 'Police', 
    number: '100', 
    icon: Shield, 
    color: 'bg-blue-600 hover:bg-blue-700',
    description: 'Emergency Police Helpline'
  },
  { 
    label: 'Women Helpline', 
    number: '1091', 
    icon: Phone, 
    color: 'bg-pink-600 hover:bg-pink-700',
    description: 'Women in Distress'
  },
  { 
    label: 'Cybercrime', 
    number: '1930', 
    icon: AlertTriangle, 
    color: 'bg-orange-600 hover:bg-orange-700',
    description: 'Report Cyber Fraud'
  },
  { 
    label: 'FIR Guide', 
    path: '/know-your-rights', 
    icon: FileWarning, 
    color: 'bg-purple-600 hover:bg-purple-700',
    description: 'How to File an FIR'
  },
]

const features = [
  {
    title: 'AI Legal Chatbot',
    description: 'Get instant answers to your legal questions from our AI-powered assistant trained on Indian law.',
    icon: Bot,
    iconColor: 'text-primary-600',
    bgColor: 'bg-primary-100',
    path: '/ai-assistant',
  },
  {
    title: 'Case Status Tracker',
    description: 'Track the real-time status of your court cases across all Indian courts.',
    icon: FileSearch,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    path: '/case-status',
  },
  {
    title: 'Judgment Search',
    description: 'Search through thousands of court judgments to find relevant legal precedents.',
    icon: Scale,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-100',
    path: '/judgment-search',
  },
  {
    title: 'Know Your Rights',
    description: 'Learn about your fundamental rights as an Indian citizen in simple language.',
    icon: BookOpen,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
    path: '/know-your-rights',
  },
  {
    title: 'Document Generator',
    description: 'Generate legal documents like affidavits, agreements, and notices instantly.',
    icon: FileText,
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    path: '/documents',
  },
  {
    title: 'Legal Library',
    description: 'Access a comprehensive library of Indian laws, acts, and legal resources.',
    icon: Library,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-100',
    path: '/legal-library',
  },
]

const stats = [
  { value: '10,000+', label: 'Legal Queries Answered' },
  { value: '500+', label: 'Court Judgments' },
  { value: '100+', label: 'Legal Templates' },
  { value: '24/7', label: 'AI Assistance' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality will be implemented later
    console.log('Search:', searchQuery)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              NyayaAI – Legal Help for{' '}
              <span className="text-amber-300">Every Indian</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Access legal information, understand your rights, and navigate the Indian legal system 
              with our AI-powered platform. Justice made simple.
            </p>

            {/* Global Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a legal question or search for laws..."
                  className="w-full pl-12 pr-32 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-300 shadow-lg"
                  aria-label="Search for legal information"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/ai-assistant"
                className="inline-flex items-center bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg"
              >
                <Bot className="mr-2 h-5 w-5" aria-hidden="true" />
                Chat with AI
              </Link>
              <Link
                to="/know-your-rights"
                className="inline-flex items-center bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-all border border-primary-400"
              >
                <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                Know Your Rights
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Emergency Quick Access */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 -mt-16 relative z-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
              Emergency Helplines
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyButtons.map((item) => {
                const Icon = item.icon
                if (item.path) {
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`${item.color} text-white rounded-xl p-4 text-center transition-all hover:scale-105 shadow-md`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2" aria-hidden="true" />
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs opacity-90">{item.description}</div>
                    </Link>
                  )
                }
                return (
                  <a
                    key={item.label}
                    href={`tel:${item.number}`}
                    className={`${item.color} text-white rounded-xl p-4 text-center transition-all hover:scale-105 shadow-md`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2" aria-hidden="true" />
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-2xl font-bold">{item.number}</div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything You Need for Legal Help</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From understanding your rights to tracking court cases, NyayaAI provides 
              comprehensive legal assistance at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                iconColor={feature.iconColor}
                bgColor={feature.bgColor}
                to={feature.path}
                variant="feature"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">How NyayaAI Works</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Get legal help in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask Your Question</h3>
              <p className="text-gray-600">
                Type your legal query in simple language. Our AI understands Hindi and English.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your query against Indian laws and provides relevant information.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-gray-600">
                Use our resources to understand your options and take informed legal action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Legal Help?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Start with our AI assistant and get instant answers to your legal questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ai-assistant"
              className="inline-flex items-center btn-primary text-lg"
            >
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" aria-hidden="true" />
              Free to use
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" aria-hidden="true" />
              No registration required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" aria-hidden="true" />
              Available 24/7
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
