import { Link } from 'react-router-dom';
import { Search, FileText, BookmarkPlus, Scale, Newspaper, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const dashboardCards = [
  {
    title: 'Case Research',
    description: 'AI-powered case analysis with legal principles, precedents, and argument suggestions',
    icon: <Search className="h-7 w-7" />,
    path: '/lawyer/research',
    gradient: 'from-blue-600 to-blue-800',
    badge: 'AI Powered',
  },
  {
    title: 'Draft Generator',
    description: 'Generate legal notices, written statements, affidavits, and petitions',
    icon: <FileText className="h-7 w-7" />,
    path: '/lawyer/drafts',
    gradient: 'from-indigo-600 to-indigo-800',
    badge: '4 Templates',
  },
  {
    title: 'Saved Cases',
    description: 'Your saved cases with notes, tags, and quick reference',
    icon: <BookmarkPlus className="h-7 w-7" />,
    path: '/lawyer/saved-cases',
    gradient: 'from-emerald-600 to-emerald-800',
    badge: null,
  },
  {
    title: 'Advanced Law Search',
    description: 'Search landmark cases by court, year, section, and keywords',
    icon: <Scale className="h-7 w-7" />,
    path: '/lawyer/search',
    gradient: 'from-purple-600 to-purple-800',
    badge: 'Filters',
  },
  {
    title: 'AI Legal Assistant',
    description: 'Chat with NyayaAI for detailed legal research and guidance',
    icon: <Newspaper className="h-7 w-7" />,
    path: '/ai-assistant',
    gradient: 'from-amber-600 to-amber-800',
    badge: 'Gemini',
  },
];

export default function LawyerDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || 'L'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {user?.name?.split(' ')[0] || 'Advocate'}
              </h1>
              <p className="text-blue-300 text-sm">Legal Professional Dashboard</p>
            </div>
          </div>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Your command center for legal research, document drafting, and case management. All tools powered by NyayaAI for Indian law.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dashboardCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/40 rounded-2xl p-6 transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {card.badge && (
                <span className="absolute top-4 right-4 text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                  {card.badge}
                </span>
              )}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white mb-4 shadow-lg`}>
                {card.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-1.5 group-hover:text-blue-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{card.description}</p>
              <div className="flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'AI Research', value: '∞', icon: '🔍' },
            { label: 'Draft Templates', value: '4', icon: '📄' },
            { label: 'Search Filters', value: '4', icon: '⚖️' },
            { label: 'Landmark Cases', value: '12+', icon: '📚' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
