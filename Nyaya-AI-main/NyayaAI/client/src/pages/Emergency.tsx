import { Phone, Shield, AlertTriangle, Heart, Baby, Users, Globe, FileWarning, Car, Building } from 'lucide-react'

const emergencyContacts = [
  {
    category: 'General Emergency',
    contacts: [
      { name: 'Police', number: '100', icon: Shield, color: 'bg-blue-500', description: 'Emergency Police Assistance' },
      { name: 'Ambulance', number: '102', icon: Heart, color: 'bg-red-500', description: 'Medical Emergency Services' },
      { name: 'Fire', number: '101', icon: AlertTriangle, color: 'bg-orange-500', description: 'Fire Department' },
      { name: 'Emergency Response', number: '112', icon: Phone, color: 'bg-green-500', description: 'Unified Emergency Number' },
    ],
  },
  {
    category: 'Women & Child Safety',
    contacts: [
      { name: 'Women Helpline', number: '1091', icon: Users, color: 'bg-pink-500', description: 'Women in Distress' },
      { name: 'Women Helpline (NCW)', number: '7827-170-170', icon: Users, color: 'bg-pink-600', description: 'National Commission for Women' },
      { name: 'Domestic Violence', number: '181', icon: Shield, color: 'bg-purple-500', description: 'Women Helpline (Domestic Abuse)' },
      { name: 'Child Helpline', number: '1098', icon: Baby, color: 'bg-yellow-500', description: 'Child Abuse & Protection' },
    ],
  },
  {
    category: 'Cyber & Financial Crimes',
    contacts: [
      { name: 'Cybercrime Helpline', number: '1930', icon: Globe, color: 'bg-indigo-500', description: 'Report Cyber Fraud & Crimes' },
      { name: 'Anti-Corruption', number: '1064', icon: Building, color: 'bg-gray-600', description: 'Report Corruption' },
    ],
  },
  {
    category: 'Other Emergencies',
    contacts: [
      { name: 'Accident Emergency', number: '1073', icon: Car, color: 'bg-red-600', description: 'Road Accident Help' },
      { name: 'Senior Citizens', number: '14567', icon: Users, color: 'bg-teal-500', description: 'Elder Helpline' },
      { name: 'Disaster Management', number: '1078', icon: AlertTriangle, color: 'bg-amber-600', description: 'NDMA Helpline' },
    ],
  },
]

const firGuide = [
  {
    step: 1,
    title: 'Visit the Police Station',
    description: 'Go to the nearest police station in the jurisdiction where the crime occurred.',
  },
  {
    step: 2,
    title: 'Provide Information',
    description: 'Give complete details about the incident including date, time, place, and description of events.',
  },
  {
    step: 3,
    title: 'Get FIR Registered',
    description: 'The police officer is legally bound to register an FIR for cognizable offenses. Get a copy of the FIR.',
  },
  {
    step: 4,
    title: 'Note the FIR Number',
    description: 'Keep the FIR number safe. You can use it to track your case progress.',
  },
  {
    step: 5,
    title: 'Zero FIR Option',
    description: 'If police refuse, you can file a Zero FIR at any police station. It will be transferred to the correct jurisdiction.',
  },
]

export default function Emergency() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
          </div>
          <h1 className="section-title text-red-600">Emergency Helplines</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Quick access to all emergency helplines in India. Save these numbers – they could save a life.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-600 text-white rounded-2xl p-6 mb-8 text-center">
          <p className="text-lg font-semibold mb-2">In case of immediate danger, call 112</p>
          <p className="text-red-100">This is India's unified emergency number, similar to 911.</p>
          <a
            href="tel:112"
            className="inline-flex items-center mt-4 bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
          >
            <Phone className="h-6 w-6 mr-2" aria-hidden="true" />
            Call 112 Now
          </a>
        </div>

        {/* Emergency Contacts */}
        {emergencyContacts.map((category) => (
          <div key={category.category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.contacts.map((contact) => {
                const Icon = contact.icon
                return (
                  <a
                    key={contact.number}
                    href={`tel:${contact.number.replace(/-/g, '')}`}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${contact.color} text-white mb-4`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {contact.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary-600 my-1">{contact.number}</p>
                    <p className="text-sm text-gray-500">{contact.description}</p>
                  </a>
                )
              })}
            </div>
          </div>
        ))}

        {/* FIR Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <div className="flex items-center mb-6">
            <FileWarning className="h-8 w-8 text-purple-600 mr-3" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900">How to File an FIR</h2>
          </div>
          
          <div className="space-y-4">
            {firGuide.map((step) => (
              <div key={step.step} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> If police refuse to file FIR, you can send a written complaint to the 
              Superintendent of Police, or approach the Magistrate under Section 156(3) of CrPC, or file a 
              complaint online at your state police website.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
