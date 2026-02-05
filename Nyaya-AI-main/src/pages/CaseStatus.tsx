import { Search, CheckCircle, Clock, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function CaseStatus() {
  const [caseId, setCaseId] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleSearch = () => {
    if (caseId.trim()) {
      setShowStatus(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Case Status
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your case ID to view the current status and updates
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Case ID Number
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="e.g., NYA-2025-001234"
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Your case ID was sent to your registered email after filing the complaint
          </p>
        </div>

        {showStatus && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Case #{caseId || 'NYA-2025-001234'}</h2>
                    <p className="text-blue-100">Consumer Complaint</p>
                  </div>
                  <div className="bg-green-400 text-green-900 px-4 py-2 rounded-full font-semibold flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>In Progress</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Filed On</p>
                      <p className="font-semibold text-gray-900">January 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-semibold text-gray-900">January 20, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Case Type</p>
                      <p className="font-semibold text-gray-900">Consumer Rights</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Case Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="w-0.5 h-16 bg-gray-300"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="font-semibold text-gray-900">Complaint Submitted</p>
                        <p className="text-sm text-gray-500 mt-1">January 15, 2025 at 10:30 AM</p>
                        <p className="text-sm text-gray-600 mt-2">Your complaint has been successfully received and registered in our system.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="w-0.5 h-16 bg-gray-300"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="font-semibold text-gray-900">Under Review</p>
                        <p className="text-sm text-gray-500 mt-1">January 16, 2025 at 02:15 PM</p>
                        <p className="text-sm text-gray-600 mt-2">Your case is being reviewed by our legal team. All documents have been verified.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div className="w-0.5 h-16 bg-gray-200"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="font-semibold text-gray-900">Investigation in Progress</p>
                        <p className="text-sm text-gray-500 mt-1">January 20, 2025 at 09:00 AM</p>
                        <p className="text-sm text-gray-600 mt-2">Our team is currently investigating the matter. We have contacted the concerned party.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-500">Resolution Pending</p>
                        <p className="text-sm text-gray-400 mt-1">Estimated: 7-10 business days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
              <p className="text-blue-800 text-sm">
                We will notify you via email and SMS once the investigation is complete. You can check back here anytime for updates. If you have any questions, please contact our support team.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                If you have any questions about your case or need additional assistance, our support team is here to help.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Contact Support
              </button>
            </div>
          </div>
        )}

        {!showStatus && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">How to Track Your Case</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Enter your unique case ID in the search box above</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold">2.</span>
                <span>View detailed timeline and current status of your complaint</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Receive real-time updates via email and SMS notifications</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
