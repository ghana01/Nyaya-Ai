import { useState, useEffect } from 'react';
import {
  FileSearch,
  Search,
  Clock,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Users,
  Scale,
  ChevronDown,
  ChevronUp,
  Loader2,
  History,
  Gavel,
} from 'lucide-react';
import {
  getCaseStatus,
  getLocations,
  CaseStatus as CaseStatusType,
  State,
  formatDate,
  getDaysUntilHearing,
} from '../services/caseStatusService';

const courts = [
  { id: 'district', name: 'District Court' },
  { id: 'sessions', name: 'Sessions Court' },
  { id: 'civil', name: 'Civil Court' },
  { id: 'family', name: 'Family Court' },
  { id: 'consumer', name: 'Consumer Court' },
  { id: 'labor', name: 'Labour Court' },
  { id: 'high-court', name: 'High Court' },
];

const stageColors: Record<string, string> = {
  'Pending': 'bg-amber-100 text-amber-700',
  'Under Trial': 'bg-blue-100 text-blue-700',
  'Arguments': 'bg-purple-100 text-purple-700',
  'Reserved for Judgment': 'bg-indigo-100 text-indigo-700',
  'Evidence Stage': 'bg-cyan-100 text-cyan-700',
  'Written Statement': 'bg-teal-100 text-teal-700',
  'Final Hearing': 'bg-orange-100 text-orange-700',
  'Disposed': 'bg-green-100 text-green-700',
};

export default function CaseStatus() {
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<CaseStatusType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      if (response.success) {
        setStates(response.data.states);
      }
    } catch (err) {
      console.error('Failed to fetch locations:', err);
    }
  };

  const selectedStateData = states.find((s) => s.name === selectedState);
  const districts = selectedStateData?.districts || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!selectedState || !selectedDistrict || !selectedCourt || !caseNumber) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSearching(true);
    try {
      const response = await getCaseStatus({
        state: selectedState,
        district: selectedDistrict,
        court: selectedCourt,
        caseNumber: caseNumber.trim(),
      });

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to fetch case status. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const daysUntil = result ? getDaysUntilHearing(result.nextHearingDate) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <FileSearch className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Status Tracker</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Track the status of your court cases across Indian courts.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Court */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Court <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Court</option>
                  {courts.map((court) => (
                    <option key={court.id} value={court.name}>
                      {court.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Case Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="e.g., 123/2024 or WP(C) 456/2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Case Status
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-green-100 text-sm mb-1">Case Number</p>
                  <h2 className="text-2xl font-bold">{result.caseNumber}</h2>
                  <p className="text-green-100 mt-1">{result.caseType}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${stageColors[result.caseStage] || 'bg-gray-100 text-gray-700'}`}>
                  {result.caseStage}
                </div>
              </div>
            </div>

            {/* Next Hearing Highlight */}
            <div className="bg-amber-50 border-b border-amber-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-amber-800 font-medium">Next Hearing:</span>
                  <span className="ml-2 text-amber-900 font-bold">
                    {formatDate(result.nextHearingDate)}
                  </span>
                </div>
                <span className={`text-sm font-medium ${daysUntil <= 7 ? 'text-red-600' : 'text-amber-700'}`}>
                  {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                </span>
              </div>
            </div>

            {/* Case Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Court & Judge */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Court</p>
                      <p className="text-gray-900 font-medium">{result.courtName}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Gavel className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Presiding Judge</p>
                      <p className="text-gray-900 font-medium">{result.judge}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Filing Date</p>
                      <p className="text-gray-900 font-medium">{formatDate(result.filingDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Acts */}
                <div>
                  <div className="flex items-start">
                    <Scale className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Under Acts</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.acts.map((act, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-400" />
                  Parties Involved
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Petitioners */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-medium mb-2">Petitioner(s)</p>
                    {result.parties.petitioners.map((party, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-gray-900 font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-blue-500" />
                          {party.name}
                        </p>
                        {party.advocate && (
                          <p className="text-sm text-gray-600 ml-6">
                            Advocate: {party.advocate}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Respondents */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-600 font-medium mb-2">Respondent(s)</p>
                    {result.parties.respondents.map((party, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-gray-900 font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-red-500" />
                          {party.name}
                        </p>
                        {party.advocate && (
                          <p className="text-sm text-gray-600 ml-6">
                            Advocate: {party.advocate}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hearing History */}
              {result.previousHearings.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <History className="h-5 w-5 mr-2 text-gray-400" />
                      Previous Hearings ({result.previousHearings.length})
                    </h3>
                    {showHistory ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {showHistory && (
                    <div className="mt-4 space-y-3">
                      {result.previousHearings.map((hearing, i) => (
                        <div key={i} className="flex items-start bg-gray-50 rounded-lg p-3">
                          <div className="w-24 flex-shrink-0">
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(hearing.date)}
                            </p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{hearing.purpose}</p>
                            {hearing.remarks && (
                              <p className="text-xs text-gray-500 mt-1">{hearing.remarks}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <p className="text-xs text-gray-500 text-center">
                ⚠️ This is mock data for demonstration. Connect to eCourts API for real case status.
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!result && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">How to find your Case Number?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your court summons or case filing receipt</li>
              <li>• Use the 16-digit CNR (Case Number Record) for exact match</li>
              <li>• Contact your advocate for case details</li>
              <li>• Visit the eCourts website: ecourts.gov.in</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
