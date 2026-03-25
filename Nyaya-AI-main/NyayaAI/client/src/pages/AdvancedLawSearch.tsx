import { useState } from 'react';
import { Search, Scale, Filter, Loader2, ArrowLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { advancedSearch } from '../services/lawyerService';
import type { SearchResult } from '../services/lawyerService';
import { Link } from 'react-router-dom';

const COURTS = ['Supreme Court of India', 'High Court', 'District Court', 'National Green Tribunal', 'NCLAT'];
const YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));

export default function AdvancedLawSearch() {
  const [filters, setFilters] = useState({ keywords: '', court: '', year: '', section: '' });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.keywords && !filters.court && !filters.year && !filters.section) return;
    setIsLoading(true);
    setSearched(true);
    try {
      const response = await advancedSearch(filters);
      if (response.success) setResults(response.data.results);
    } catch { setResults([]); }
    finally { setIsLoading(false); }
  };

  const clearFilters = () => {
    setFilters({ keywords: '', court: '', year: '', section: '' });
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link to="/lawyer-dashboard" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-full text-sm mb-4">
            <Scale className="h-4 w-4" /> Advanced Law Search
          </div>
          <h1 className="text-3xl font-bold text-white">Search Landmark Cases</h1>
          <p className="text-slate-300 mt-1">Filter by court, year, section, and keywords</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSearch} className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2 text-white font-semibold mb-4">
            <Filter className="h-5 w-5 text-purple-400" /> Search Filters
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <input
              value={filters.keywords}
              onChange={(e) => setFilters(f => ({ ...f, keywords: e.target.value }))}
              placeholder="Keywords..."
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none text-sm"
            />
            <select
              value={filters.court}
              onChange={(e) => setFilters(f => ({ ...f, court: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none text-sm appearance-none"
            >
              <option value="">All Courts</option>
              {COURTS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={filters.year}
              onChange={(e) => setFilters(f => ({ ...f, year: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none text-sm appearance-none"
            >
              <option value="">All Years</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <input
              value={filters.section}
              onChange={(e) => setFilters(f => ({ ...f, section: e.target.value }))}
              placeholder="Section/Article..."
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 transition-all">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </button>
            <button type="button" onClick={clearFilters} className="text-sm text-slate-400 hover:text-white px-4 py-2 transition-colors">
              Clear
            </button>
          </div>
        </form>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 text-purple-400 animate-spin mx-auto mb-3" />
            <p className="text-slate-400">Searching...</p>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-white font-medium">No cases found</p>
            <p className="text-slate-400 text-sm">Try different filter combinations.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r._id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-400/30 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white font-semibold">{r.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 flex-shrink-0">
                    <span className={r.source === 'external' ? "bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md text-xs" : "bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md text-xs"}>
                      {r.source === 'external' ? 'Indian Kanoon' : 'Local DB'}
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md text-xs">{r.court}</span>
                    <span>{r.year}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-3">{r.summary}</p>
                {r.legalPrinciples.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {r.legalPrinciples.slice(0, 3).map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                        <ChevronRight className="h-3 w-3 text-purple-400 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {r.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-xs border border-slate-600 text-slate-400 px-2 py-0.5 rounded-md">#{tag}</span>
                    ))}
                    {r.citation && <span className="text-xs text-slate-500 ml-2 mt-0.5">{r.citation}</span>}
                  </div>
                  {r.link && (
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
                      Open Case <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
