import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Scale, ChevronDown, LogOut, FileText, UserCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const getNavLinks = (user: any) => {
  if (user?.role === 'lawyer') {
    return [
      { name: 'Dashboard', path: '/lawyer-dashboard' },
      { name: 'Case Research', path: '/lawyer/research' },
      { name: 'Drafts', path: '/lawyer/drafts' },
      { name: 'Saved Cases', path: '/lawyer/saved-cases' },
      { name: 'Law Search', path: '/lawyer/search' },
      { name: 'AI Assistant', path: '/ai-assistant' },
    ]
  }
  
  return [
    { name: 'Home', path: '/' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Legal Help', path: '/legal-help' },
    { name: 'Case Analyzer', path: '/case-analyzer' },
    { name: 'Legal Library', path: '/legal-library' },
    { name: 'Know Your Rights', path: '/know-your-rights' },
    { name: 'Documents', path: '/documents' },
    { name: 'Case Status', path: '/case-status' },
    { name: 'Emergency', path: '/emergency' },
    { name: 'History', path: '/history' },
    { name: 'Blog', path: '/blog' },
  ]
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const links = getNavLinks(user)
  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to={user?.role === 'lawyer' ? '/lawyer-dashboard' : '/'} 
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            aria-label="NyayaAI Home"
          >
            <Scale className="h-8 w-8" aria-hidden="true" />
            <span className="text-xl font-bold">NyayaAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.slice(0, 5).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
            
            {/* More dropdown for additional links */}
            {links.length > 5 && (
              <div className="relative group">
                <button 
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                  aria-haspopup="true"
                >
                  More <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {links.slice(5).map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2 text-sm ${
                          isActive(link.path)
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Button & User Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full capitalize">
                        {user.role === 'lawyer' ? 'Legal Professional' : 'Citizen'}
                      </span>
                    </div>
                    
                    {user.role === 'lawyer' && (
                      <Link
                        to="/lawyer-dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 border-b"
                      >
                        <UserCircle className="h-4 w-4" />
                        Lawyer Dashboard
                      </Link>
                    )}

                    <Link
                      to="/documents"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FileText className="h-4 w-4" />
                      My Documents
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 space-y-2 border-t mt-2">
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-primary-600 mt-1 capitalize">{user.role === 'lawyer' ? 'Legal Professional' : 'Citizen'}</p>
                </div>
                
                {user.role === 'lawyer' && (
                  <Link
                    to="/lawyer-dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 text-primary-700 bg-primary-50 rounded-lg font-medium"
                  >
                    Lawyer Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-center px-4 py-2 text-red-600 bg-red-50 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary rounded-lg py-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
