import { MessageSquare, Shield, FileText, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Legal Assistance</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Justice Made{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Accessible
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empower yourself with AI-driven legal guidance. Know your rights, file complaints, and track your cases — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onNavigate('chatbot')}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Try Nyaya AI</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('rights')}
              className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
          <div className="relative grid md:grid-cols-3 gap-8 text-white">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">24/7 AI Support</h3>
                <p className="text-blue-100">Get instant answers to your legal questions anytime.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Simplified Process</h3>
                <p className="text-blue-100">File complaints and track cases with ease.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                <p className="text-blue-100">Your data is protected with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to navigate the legal system</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Know Your Rights"
              description="Access comprehensive information about your legal rights across various domains including civil, consumer, and criminal law."
              gradient="from-blue-500 to-indigo-500"
            />
            <FeatureCard
              icon={MessageSquare}
              title="AI Legal Chatbot"
              description="Get instant answers to your legal questions from our intelligent AI assistant trained on Indian legal frameworks."
              gradient="from-indigo-500 to-purple-500"
            />
            <FeatureCard
              icon={FileText}
              title="File a Complaint"
              description="Easily file and submit complaints with our guided step-by-step process. Track your submissions in real-time."
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who have already empowered themselves with legal knowledge.
          </p>
          <button
            onClick={() => onNavigate('chatbot')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}
