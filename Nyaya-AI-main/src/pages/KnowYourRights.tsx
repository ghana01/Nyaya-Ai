import { Users, ShoppingCart, Heart, Wifi, Home, Briefcase, AlertCircle, Book } from 'lucide-react';
import InfoCard from '../components/InfoCard';

export default function KnowYourRights() {
  const rightsCategories = [
    {
      icon: Users,
      title: 'Civil Rights',
      description: 'Fundamental rights guaranteed by the Constitution including equality, freedom of speech, and protection against discrimination.'
    },
    {
      icon: ShoppingCart,
      title: 'Consumer Rights',
      description: 'Right to safety, information, choice, and redressal. Protection against unfair trade practices and defective products.'
    },
    {
      icon: Heart,
      title: "Women's Rights",
      description: 'Protection against domestic violence, workplace harassment, equal pay, and rights related to marriage and property.'
    },
    {
      icon: Wifi,
      title: 'Cyber Crime',
      description: 'Protection against online fraud, identity theft, cyberbullying, and unauthorized access to digital information.'
    },
    {
      icon: Home,
      title: 'Property Rights',
      description: 'Rights related to ownership, inheritance, tenancy, and protection against illegal possession or eviction.'
    },
    {
      icon: Briefcase,
      title: 'Labour Rights',
      description: 'Fair wages, safe working conditions, protection against exploitation, and rights to form unions and associations.'
    },
    {
      icon: AlertCircle,
      title: 'Criminal Rights',
      description: 'Right to legal representation, fair trial, protection against arbitrary arrest, and presumption of innocence.'
    },
    {
      icon: Book,
      title: 'Education Rights',
      description: 'Right to free and compulsory education, protection against discrimination in educational institutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Know Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Rights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering you with knowledge about your legal rights and protections under Indian law.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white shadow-xl">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-8 w-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Important Notice</h3>
              <p className="text-blue-100 leading-relaxed">
                This information is for general guidance only. For specific legal advice tailored to your situation, please consult with a qualified legal professional or use our AI chatbot for preliminary guidance.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {rightsCategories.map((category, index) => (
            <InfoCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need More Information?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our AI-powered chatbot can provide detailed information about your specific rights and guide you through various legal scenarios. Get instant answers to your questions 24/7.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Talk to AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
