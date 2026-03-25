import { useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Scale, BookOpen, Loader2, AlertCircle, ChevronRight, ArrowLeft, Bookmark, ExternalLink } from 'lucide-react';
import { researchCase, saveCase } from '../services/lawyerService';
import type { ResearchResult } from '../services/lawyerService';
import { Link } from 'react-router-dom';

export default function CaseResearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);
    try {
      const response = await researchCase(query.trim());
      if (response.success) {
        setResult(response.data);
        toast.success('Analysis complete!');
      } else {
        setError('Research failed. Please try again.');
        toast.error('Research failed.');
      }
    } catch {
      setError('Unable to connect. Please check your connection.');
      toast.error('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    try {
      await saveCase({
        caseTitle: result.query,
        notes: result.summary,
        tags: result.similarTopics.slice(0, 5),
      });
      setSaved(true);
      toast.success('Case snippet saved successfully!');
    } catch {
      toast.error('Failed to save case snippet.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/lawyer-dashboard" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-sm mb-4">
            <Search className="h-4 w-4" /> AI Case Research
          </div>
          <h1 className="text-3xl font-bold text-white">Case Research Assistant</h1>
          <p className="text-slate-300 mt-1">Describe your case or legal issue for AI-powered analysis</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleResearch} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
          <div className="flex gap-2">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your legal issue in detail, e.g., 'Client was wrongfully terminated after whistleblowing about financial fraud...'"
              className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-3 text-sm outline-none resize-none min-h-[80px]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="self-end flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-400 hover:to-indigo-500 disabled:opacity-50 transition-all"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              Analyze
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-12 text-center">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-3" />
            <p className="text-slate-300">Analyzing with AI...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Results for: <span className="text-white font-medium">"{result.query}"</span></span>
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${saved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'}`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-emerald-300' : ''}`} />
                {saved ? 'Saved' : 'Save Case'}
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-blue-400 font-semibold mb-3">
                <BookOpen className="h-5 w-5" /> Research Summary
              </div>
              <p className="text-slate-200 leading-relaxed text-sm">{result.summary}</p>
            </div>

            {/* Two columns */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-3">
                  <Scale className="h-5 w-5" /> Legal Principles
                </div>
                <ul className="space-y-2">
                  {result.legalPrinciples.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <ChevronRight className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-amber-400 font-semibold mb-3">⚡ Suggested Arguments</h3>
                <ul className="space-y-2">
                  {result.suggestedArguments.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="text-amber-400 flex-shrink-0">▸</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Similar Cases */}
            {result.similarCases && result.similarCases.length > 0 && (
              <div className="mt-8">
                <h3 className="text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> Similar Cases
                </h3>
                <div className="space-y-3">
                  {result.similarCases.map(r => (
                    <div key={r._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:border-white/30 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-white font-semibold">{r.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-400 flex-shrink-0">
                          <span className={r.source === 'external' ? "bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md text-xs" : "bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md text-xs"}>
                            {r.source === 'external' ? 'Indian Kanoon' : 'Local DB'}
                          </span>
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md text-xs">{r.court}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">{r.summary}</p>
                      <div className="flex flex-wrap gap-1.5 items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {r.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs border border-slate-600 text-slate-400 px-2 py-0.5 rounded-md">#{tag}</span>
                          ))}
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
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
