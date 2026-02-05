import { Link } from 'react-router-dom'
import { Scale, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'AI Legal Chatbot', path: '/ai-assistant' },
    { name: 'Case Status', path: '/case-status' },
    { name: 'Judgment Search', path: '/judgment-search' },
    { name: 'Legal Library', path: '/legal-library' },
  ],
  resources: [
    { name: 'Know Your Rights', path: '/know-your-rights' },
    { name: 'Emergency Help', path: '/emergency' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Contact Us', path: '/contact' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-primary-400" aria-hidden="true" />
              <span className="text-xl font-bold">NyayaAI</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Empowering every Indian with AI-powered legal assistance. 
              Access justice, know your rights, and navigate the legal system with confidence.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href="mailto:support@nyayaai.com" className="hover:text-white transition-colors">
                  support@nyayaai.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href="tel:+911800123456" className="hover:text-white transition-colors">
                  1800-123-456
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} NyayaAI. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Disclaimer: NyayaAI provides legal information, not legal advice. 
              Please consult a qualified lawyer for specific legal matters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
