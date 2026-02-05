import React from 'react';
import { 
  Phone, 
  Shield, 
  AlertTriangle, 
  FileText, 
  ExternalLink,
  Baby,
  User,
  Globe,
  Heart,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  available: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Police',
    number: '100',
    description: 'For any crime, theft, accident, or law and order emergency',
    icon: <Shield className="h-8 w-8" />,
    color: 'bg-blue-500',
    available: '24/7',
  },
  {
    name: 'Women Helpline',
    number: '1091',
    description: 'For women in distress, domestic violence, harassment',
    icon: <User className="h-8 w-8" />,
    color: 'bg-pink-500',
    available: '24/7',
  },
  {
    name: 'Childline',
    number: '1098',
    description: 'For child abuse, missing children, child labor issues',
    icon: <Baby className="h-8 w-8" />,
    color: 'bg-orange-500',
    available: '24/7',
  },
  {
    name: 'Ambulance',
    number: '108',
    description: 'For medical emergencies and accidents',
    icon: <Heart className="h-8 w-8" />,
    color: 'bg-red-500',
    available: '24/7',
  },
  {
    name: 'Fire Brigade',
    number: '101',
    description: 'For fire emergencies and rescue operations',
    icon: <AlertTriangle className="h-8 w-8" />,
    color: 'bg-yellow-500',
    available: '24/7',
  },
  {
    name: 'Emergency (All)',
    number: '112',
    description: 'Single emergency number for Police, Fire, Ambulance',
    icon: <Phone className="h-8 w-8" />,
    color: 'bg-purple-500',
    available: '24/7',
  },
];

const cybercrimeInfo = {
  name: 'National Cybercrime Portal',
  url: 'https://cybercrime.gov.in',
  description: 'Report cybercrime including online fraud, hacking, identity theft, social media crimes',
  helpline: '1930',
};

const safetyTips = [
  {
    title: 'Stay Calm',
    description: 'In any emergency, try to remain calm. Clear thinking helps you make better decisions.',
  },
  {
    title: 'Note Important Details',
    description: 'Remember or write down key details like location, vehicle numbers, physical descriptions.',
  },
  {
    title: 'Find a Safe Location',
    description: 'Move to a safe place before making calls if you are in immediate danger.',
  },
  {
    title: 'Document Everything',
    description: 'If safe to do so, take photos or videos as evidence for later.',
  },
  {
    title: 'Inform Trusted Person',
    description: 'Let a family member or friend know about your situation and location.',
  },
  {
    title: 'Follow Instructions',
    description: 'Listen carefully to emergency responders and follow their guidance.',
  },
];

const firSteps = [
  {
    step: 1,
    title: 'Go to Police Station',
    description: 'Visit the nearest police station in your jurisdiction where the incident occurred.',
  },
  {
    step: 2,
    title: 'Meet the Duty Officer',
    description: 'Ask for the duty officer or Station House Officer (SHO) and explain your situation.',
  },
  {
    step: 3,
    title: 'Provide Details',
    description: 'Give complete details of the incident - date, time, place, persons involved, and what happened.',
  },
  {
    step: 4,
    title: 'Submit Written Complaint',
    description: 'Write your complaint clearly or dictate it to the officer. Sign the complaint after reading.',
  },
  {
    step: 5,
    title: 'Get FIR Copy',
    description: 'Demand a free copy of the FIR - this is your legal right under Section 154 CrPC.',
  },
  {
    step: 6,
    title: 'Note FIR Number',
    description: 'Record the FIR number and the name of the investigating officer for future reference.',
  },
];

const EmergencyHelp: React.FC = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* High Contrast Header */}
      <div className="bg-red-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold">Emergency Help</h1>
          </div>
          <p className="text-red-100 text-lg">
            Quick access to emergency services and safety information
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Emergency Numbers Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Phone className="h-6 w-6 text-red-500" />
            Emergency Helplines
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact) => (
              <button
                key={contact.number}
                onClick={() => handleCall(contact.number)}
                className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-gray-500 rounded-xl p-6 text-left transition-all focus:outline-none focus:ring-4 focus:ring-red-500"
              >
                <div className="flex items-start gap-4">
                  <div className={`${contact.color} text-white p-3 rounded-xl`}>
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                    <p className="text-4xl font-bold text-yellow-400 my-2">{contact.number}</p>
                    <p className="text-gray-300 text-sm">{contact.description}</p>
                    <span className="inline-block mt-2 text-green-400 text-sm font-medium">
                      ● Available {contact.available}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Cybercrime Portal */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <Globe className="h-16 w-16 text-blue-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{cybercrimeInfo.name}</h2>
                <p className="text-blue-200 mb-4">{cybercrimeInfo.description}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={cybercrimeInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => handleCall(cybercrimeInfo.helpline)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call {cybercrimeInfo.helpline}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-500" />
            Safety Tips
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-green-500 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{tip.title}</h3>
                    <p className="text-gray-300 text-sm">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FIR Filing Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-yellow-500" />
            How to File an FIR
          </h2>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="space-y-1">
              {firSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                  {index < firSteps.length - 1 && (
                    <ChevronRight className="h-6 w-6 text-gray-500 hidden md:block mt-2" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-900/50 border border-yellow-600 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-yellow-300">Your Rights</h4>
                  <ul className="text-yellow-100 text-sm mt-2 space-y-1">
                    <li>• Police cannot refuse to register an FIR (Zero FIR is possible at any station)</li>
                    <li>• You can file FIR online in many states</li>
                    <li>• Get a free copy of FIR - it's your legal right</li>
                    <li>• If police refuses, approach the Superintendent of Police or Court</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/documents"
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-xl p-6 text-white transition-colors flex items-center gap-4"
            >
              <FileText className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold">Generate Police Complaint</h3>
                <p className="text-primary-100">Create a formal complaint letter instantly</p>
              </div>
              <ChevronRight className="h-6 w-6 ml-auto" />
            </a>
            
            <a
              href="/chatbot"
              className="bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-500 hover:to-secondary-600 rounded-xl p-6 text-white transition-colors flex items-center gap-4"
            >
              <Shield className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold">Legal AI Assistant</h3>
                <p className="text-secondary-100">Get instant legal guidance and advice</p>
              </div>
              <ChevronRight className="h-6 w-6 ml-auto" />
            </a>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center text-gray-400 text-sm">
          <p>In case of immediate danger, always call emergency services first.</p>
          <p className="mt-1">This information is for guidance only. Laws may vary by state.</p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelp;
