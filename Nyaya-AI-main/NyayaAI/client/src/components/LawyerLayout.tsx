import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Scale, Search, FileText, BookmarkPlus, Menu, LogOut, ChevronLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', path: '/lawyer-dashboard', icon: <Scale className="h-5 w-5" /> },
  { name: 'Case Research', path: '/lawyer/research', icon: <Search className="h-5 w-5" /> },
  { name: 'Draft Generator', path: '/lawyer/drafts', icon: <FileText className="h-5 w-5" /> },
  { name: 'Saved Cases', path: '/lawyer/saved-cases', icon: <BookmarkPlus className="h-5 w-5" /> },
  { name: 'Law Search', path: '/lawyer/search', icon: <Scale className="h-5 w-5" /> },
];

export default function LawyerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login', { state: { from: location } });
      } else if (user.role !== 'lawyer' && user.role !== 'admin') {
        navigate('/');
      }
    }
  }, [user, isLoading, navigate, location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-950 items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user || (user.role !== 'lawyer' && user.role !== 'admin')) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/10 flex flex-col z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Scale className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-white font-bold text-lg tracking-wide">NyayaAI Lawyer</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 font-medium border border-blue-500/30 shadow-inner' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/10">
            <NavLink
              to="/ai-assistant"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="text-xl leading-none">🤖</div>
              AI Assistant
            </NavLink>
            <NavLink
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all mt-1"
            >
              <ChevronLeft className="h-5 w-5" />
              Exit to Main Site
            </NavLink>
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'L'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs truncate">Legal Professional</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-medium text-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-500" />
            <span className="text-white font-bold">NyayaAI</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>
        
        <main className="flex-1 overflow-y-auto w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
