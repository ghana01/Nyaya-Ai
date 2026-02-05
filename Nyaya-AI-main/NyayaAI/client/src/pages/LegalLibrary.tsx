import { useState, useEffect } from 'react';
import {
  Library,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  X,
  Loader2,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { getAllLaws, searchLaws, explainLaw, Law, LawGroup, getActIcon } from '../services/lawsService';

export default function LegalLibrary() {
  const [lawGroups, setLawGroups] = useState<LawGroup[]>([]);
  const [acts, setActs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Law[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAct, setSelectedAct] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  // AI Explanation modal state
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [currentLaw, setCurrentLaw] = useState<Law | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');

  useEffect(() => {
    fetchLaws();
  }, []);

  const fetchLaws = async () => {
    setLoading(true);
    try {
      const response = await getAllLaws();
      if (response.success) {
        setLawGroups(response.data.grouped);
        setActs(response.data.acts);
      }
    } catch (error) {
      console.error('Failed to fetch laws:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || searchQuery.length < 2) return;
    
    setIsSearching(true);
    try {
      const response = await searchLaws(searchQuery);
      if (response.success) {
        setSearchResults(response.data.laws);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleExplainWithAI = async (law: Law) => {
    setCurrentLaw(law);
    setShowExplainModal(true);
    setExplaining(true);
    setAiExplanation('');

    try {
      const response = await explainLaw(law.section, law.title, law.explanation);
      if (response.success) {
        setAiExplanation(response.data.simplifiedExplanation);
      }
    } catch (error) {
      console.error('Explanation failed:', error);
      setAiExplanation('Sorry, I could not generate an explanation at this time. Please try again later.');
    } finally {
      setExplaining(false);
    }
  };

  const filteredGroups = selectedAct
    ? lawGroups.filter((g) => g.actName === selectedAct)
    : lawGroups;

  const displayData = searchResults.length > 0 ? null : filteredGroups;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 min-h-screen sticky top-0 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Library className="h-6 w-6 text-teal-600" />
              <h2 className="font-bold text-gray-900">Legal Acts</h2>
            </div>
          </div>
          
          <nav className="p-2">
            <button
              onClick={() => setSelectedAct(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedAct
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📚 All Acts
            </button>
            
            {acts.map((act) => (
              <button
                key={act}
                onClick={() => setSelectedAct(act)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mt-1 ${
                  selectedAct === act
                    ? 'bg-teal-100 text-teal-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{getActIcon(act)}</span>
                {act.length > 30 ? act.substring(0, 30) + '...' : act}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
              <Library className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Library</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse Indian laws and get simple explanations. Click "Explain with AI" for civilian-friendly explanations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search laws, sections, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || searchQuery.length < 2}
                className="px-6 py-3 bg-teal-600 text-white rounded-r-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSearching ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>

          {/* Mobile Act Selector */}
          <div className="lg:hidden mb-6">
            <select
              value={selectedAct || ''}
              onChange={(e) => setSelectedAct(e.target.value || null)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Acts</option>
              {acts.map((act) => (
                <option key={act} value={act}>
                  {act}
                </option>
              ))}
            </select>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
              <span className="ml-3 text-gray-600">Loading laws...</span>
            </div>
          ) : searchResults.length > 0 ? (
            /* Search Results */
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search Results ({searchResults.length})
                </h2>
                <button
                  onClick={clearSearch}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Clear search
                </button>
              </div>
              
              {searchResults.map((law) => (
                <div key={law._id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {law.actShortName || law.actName}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-2">
                        {law.section}: {law.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleExplainWithAI(law)}
                      className="flex items-center text-sm text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg"
                    >
                      <Sparkles className="h-4 w-4 mr-1" />
                      Explain with AI
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{law.explanation}</p>
                  {law.punishment && (
                    <p className="text-red-600 text-sm font-medium">
                      ⚠️ Punishment: {law.punishment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : displayData && displayData.length > 0 ? (
            /* Grouped Laws */
            <div className="space-y-6">
              {displayData.map((group) => (
                <div key={group.actName} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getActIcon(group.actName)}</span>
                      <div>
                        <h2 className="font-bold text-lg">{group.actName}</h2>
                        <p className="text-teal-100 text-sm">{group.sections.length} sections</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {group.sections.map((section) => {
                      const isExpanded = expandedSections.has(section._id);
                      return (
                        <div key={section._id} className="border-l-4 border-transparent hover:border-teal-500 transition-colors">
                          <button
                            onClick={() => toggleSection(section._id)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">
                                {section.section}
                              </span>
                              <span className="text-gray-600 ml-2">– {section.title}</span>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                          
                          {isExpanded && (
                            <div className="px-5 pb-4 bg-gray-50">
                              <p className="text-gray-600 mb-3">{section.explanation}</p>
                              
                              {section.punishment && (
                                <div className="flex items-start space-x-2 text-red-600 text-sm mb-3">
                                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span><strong>Punishment:</strong> {section.punishment}</span>
                                </div>
                              )}
                              
                              <button
                                onClick={() => handleExplainWithAI(section)}
                                className="inline-flex items-center text-sm text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
                              >
                                <Sparkles className="h-4 w-4 mr-2" />
                                Explain with AI
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No laws found</h3>
              <p className="text-gray-600">
                Try searching for a different term or select a different act.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* AI Explanation Modal */}
      {showExplainModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-teal-600" />
                <h3 className="font-bold text-gray-900">AI Explanation</h3>
              </div>
              <button
                onClick={() => setShowExplainModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {currentLaw && (
              <div className="px-6 py-3 bg-teal-50 border-b border-teal-100">
                <p className="text-sm text-teal-700 font-medium">
                  {currentLaw.section}: {currentLaw.title}
                </p>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto p-6">
              {explaining ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
                  <span className="ml-3 text-gray-600">Generating explanation...</span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  {aiExplanation.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h4 key={i} className="font-bold text-gray-900 mt-4 mb-2">
                          {line.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li key={i} className="text-gray-700 ml-4">
                          {line.substring(2)}
                        </li>
                      );
                    }
                    if (line.match(/^\d+\./)) {
                      return (
                        <li key={i} className="text-gray-700 ml-4 list-decimal">
                          {line.replace(/^\d+\.\s*/, '')}
                        </li>
                      );
                    }
                    if (line.trim()) {
                      return (
                        <p key={i} className="text-gray-700 mb-2">
                          {line}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                ⚠️ This is a simplified explanation for educational purposes. Please consult a lawyer for specific legal advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
