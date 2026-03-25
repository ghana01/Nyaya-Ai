import { useState, useRef, useEffect } from 'react';
import { Search, Scale, BookOpen, Tag, ExternalLink, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { analyzeCase, getSimilarCases } from '../services/caseService';
import type { RelatedCase } from '../services/caseService';
import { getOrCreateUserId } from '../services/chatService';

interface AnalysisResult {
  query: string;
  summary: string;
  legalPrinciples: string[];
  similarTopics: string[];
  relatedCases: RelatedCase[];
}

export default function CaseAnalyzer() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagCases, setTagCases] = useState<RelatedCase[]>([]);
  const [tagLoading, setTagLoading] = useState(false);
  const userId = getOrCreateUserId();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setSelectedTag(null);
    setTagCases([]);

    try {
      const response = await analyzeCase(query.trim(), userId);
      if (response.success) {
        setResult(response.data);
      } else {
        setError('Failed to analyze case. Please try again.');
      }
    } catch {
      setError('Unable to connect to the server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagClick = async (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setTagCases([]);
      return;
    }
    setSelectedTag(tag);
    setTagLoading(true);
    try {
      const response = await getSimilarCases(tag);
      if (response.success) setTagCases(response.data.cases);
    } catch {
      setTagCases([]);
    } finally {
      setTagLoading(false);
    }
  };

  const exampleQueries = [
    'Vishaka guidelines on sexual harassment',
    'Rights of an arrested person',
    'Right to privacy in India',
    'Triple talaq case',
    'Environmental PIL case law',
    'Maneka Gandhi right to life',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-4 py-2 rounded-full text-sm mb-6">
            <Scale className="h-4 w-4" />
            AI-Powered Indian Case Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Analyzer</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Describe your legal situation or enter a case name. Our AI will analyze it using Indian law and find similar landmark cases.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <form onSubmit={handleAnalyze} className="relative">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Explain Vishaka case' or 'My employer is harassing me'"
                className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-3 text-base outline-none"
                disabled={isLoading}
                id="case-query-input"
              />
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                Analyze
              </button>
            </div>
          </div>
        </form>

        {/* Example Queries */}
        {!result && !isLoading && (
          <div className="mt-4">
            <p className="text-slate-400 text-sm mb-2">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="text-sm border border-slate-600 text-slate-300 hover:border-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-indigo-400 animate-spin" />
              </div>
              <div className="text-slate-300">
                <p className="font-medium">NyayaAI is analyzing your case...</p>
                <p className="text-sm text-slate-400 mt-1">Searching through Indian legal precedents</p>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultsRef} className="mt-8 space-y-6">
            {/* Query Display */}
            <div className="text-slate-400 text-sm">
              Results for: <span className="text-white font-medium">"{result.query}"</span>
            </div>

            {/* Summary Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
                <BookOpen className="h-5 w-5" />
                Case Analysis Summary
              </div>
              <p className="text-slate-200 leading-relaxed">{result.summary}</p>
            </div>

            {/* Two-column: Legal Principles + Similar Topics */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-3">
                  <Scale className="h-5 w-5" />
                  Key Legal Principles
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
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
                  <Tag className="h-5 w-5" />
                  Similar Legal Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.similarTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-sm bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Cases */}
            {result.relatedCases.length > 0 && (
              <div>
                <h2 className="text-white font-semibold text-xl mb-4">
                  Related Landmark Cases ({result.relatedCases.length})
                </h2>
                <div className="grid gap-4">
                  {result.relatedCases.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:border-indigo-400/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{c.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                            <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md">{c.court}</span>
                            <span>{c.year}</span>
                            {c.citation && <span className="text-slate-500">{c.citation}</span>}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      </div>
                      <p className="text-slate-300 text-sm mb-3">{c.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.tags.slice(0, 5).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`text-xs px-2 py-0.5 rounded-md border transition-colors ${
                              selectedTag === tag
                                ? 'bg-indigo-500 border-indigo-400 text-white'
                                : 'border-slate-600 text-slate-400 hover:border-indigo-400 hover:text-indigo-300'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tag-based Similar Cases */}
            {selectedTag && (
              <div className="mt-6">
                <h3 className="text-white font-semibold text-lg mb-3">
                  More cases tagged <span className="text-indigo-400">#{selectedTag}</span>
                </h3>
                {tagLoading ? (
                  <div className="text-center py-6">
                    <Loader2 className="h-6 w-6 text-indigo-400 animate-spin mx-auto" />
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {tagCases.map((c) => (
                      <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-white font-medium">{c.title}</div>
                        <div className="text-sm text-slate-400">{c.court} · {c.year}</div>
                        <p className="text-sm text-slate-300 mt-1">{c.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-200">
              ⚠️ This analysis is AI-generated for educational purposes only. For specific legal advice, please consult a qualified advocate.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
