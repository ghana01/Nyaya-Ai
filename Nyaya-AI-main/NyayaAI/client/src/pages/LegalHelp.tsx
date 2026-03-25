import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Phone, Scale, AlertCircle, Loader2, HelpCircle } from 'lucide-react';
import { getLegalHelpTypes, getLegalHelp } from '../services/legalHelpService';
import type { LegalHelpType, LegalHelpResult } from '../services/legalHelpService';

type WizardStep = 'select' | 'describe' | 'result';

const urgencyConfig = {
  high: { label: 'High Urgency', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', dot: 'bg-red-400' },
  medium: { label: 'Medium Urgency', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', dot: 'bg-amber-400' },
  low: { label: 'Low Urgency', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', dot: 'bg-emerald-400' },
};

export default function LegalHelp() {
  const [step, setStep] = useState<WizardStep>('select');
  const [problemTypes, setProblemTypes] = useState<LegalHelpType[]>([]);
  const [selectedType, setSelectedType] = useState<LegalHelpType | null>(null);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<LegalHelpResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typesLoading, setTypesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await getLegalHelpTypes();
        if (response.success) setProblemTypes(response.data.types);
      } catch {
        // Use fallback list
      } finally {
        setTypesLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const handleSelectType = (type: LegalHelpType) => {
    setSelectedType(type);
    setStep('describe');
  };

  const handleSubmit = async () => {
    if (!selectedType) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getLegalHelp(selectedType.value, description.trim() || undefined);
      if (response.success) {
        setResult(response.data);
        setStep('result');
      } else {
        setError('Failed to get legal guidance. Please try again.');
      }
    } catch {
      setError('Unable to connect to server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('select');
    setSelectedType(null);
    setDescription('');
    setResult(null);
    setError(null);
  };

  const stepIndex = { select: 0, describe: 1, result: 2 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-full text-sm mb-4">
            <HelpCircle className="h-4 w-4" />
            Guided Legal Assistance
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            I Have a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Problem</span>
          </h1>
          <p className="text-slate-300">Answer a few quick questions and get personalised step-by-step legal guidance.</p>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {['Select Type', 'Describe', 'Get Guidance'].map((label, idx) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  stepIndex[step] >= idx ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    stepIndex[step] > idx
                      ? 'bg-emerald-500 text-white'
                      : stepIndex[step] === idx
                      ? 'bg-emerald-500/30 border-2 border-emerald-400 text-emerald-400'
                      : 'bg-slate-700 text-slate-500'
                  }`}>
                    {stepIndex[step] > idx ? '✓' : idx + 1}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {idx < 2 && <div className={`w-8 h-px ${stepIndex[step] > idx ? 'bg-emerald-500' : 'bg-slate-600'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Select Problem Type */}
        {step === 'select' && (
          <div>
            <h2 className="text-white font-semibold text-xl mb-4">What type of problem are you facing?</h2>
            {typesLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mx-auto" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {problemTypes.map((type) => {
                  const urgency = urgencyConfig[type.urgency];
                  return (
                    <button
                      key={type.value}
                      id={`problem-type-${type.value}`}
                      onClick={() => handleSelectType(type)}
                      className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 rounded-2xl p-5 text-left transition-all"
                    >
                      <div className="text-3xl">{type.icon}</div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-emerald-300 transition-colors">{type.label}</p>
                        <div className={`inline-flex items-center gap-1.5 mt-1.5 text-xs px-2 py-0.5 rounded-full border ${urgency.bg} ${urgency.color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
                          {urgency.label}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors mt-1 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Describe */}
        {step === 'describe' && selectedType && (
          <div>
            <button
              onClick={() => setStep('select')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Change problem type
            </button>

            <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedType.icon}</div>
                <div>
                  <p className="text-white font-semibold">{selectedType.label}</p>
                  <p className={`text-sm ${urgencyConfig[selectedType.urgency].color}`}>
                    {urgencyConfig[selectedType.urgency].label}
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-white font-semibold text-xl mb-2">Briefly describe your situation <span className="text-slate-400 font-normal text-base">(optional)</span></h2>
            <p className="text-slate-400 text-sm mb-4">This helps us provide more relevant guidance, but you can skip this step.</p>

            <textarea
              id="legal-problem-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., My employer hasn't paid my salary for 2 months and is threatening to fire me..."
              rows={5}
              maxLength={500}
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-400/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none resize-none transition-colors text-sm"
            />
            <div className="text-right text-xs text-slate-500 mt-1">{description.length}/500</div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm mt-3">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <button
              id="get-legal-help-btn"
              onClick={handleSubmit}
              disabled={isLoading}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Getting your guidance...
                </>
              ) : (
                <>
                  Get Legal Guidance
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 'result' && result && (
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-white font-bold text-xl">{result.title}</h2>
                  <div className={`inline-flex items-center gap-1.5 mt-1 text-xs ${urgencyConfig[result.urgencyLevel].color}`}>
                    <div className={`w-2 h-2 rounded-full ${urgencyConfig[result.urgencyLevel].dot} animate-pulse`} />
                    {urgencyConfig[result.urgencyLevel].label} — Act accordingly
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">📋</span>
                Step-by-Step Guidance
              </h3>
              <ol className="space-y-3">
                {result.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold">
                      {i + 1}
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Laws */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-400" />
                Relevant Laws
              </h3>
              <div className="space-y-2">
                {result.laws.map((law, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="text-indigo-400 flex-shrink-0 mt-0.5">▸</span>
                    {law}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Actions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">⚡ Immediate Next Actions</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {result.nextActions.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-sm text-amber-200"
                  >
                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
                    {action}
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Numbers */}
            {result.helplineNumbers && result.helplineNumbers.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-red-400" />
                  Emergency Helpline Numbers
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {result.helplineNumbers.map((num, i) => (
                    <div key={i} className="text-red-300 text-sm font-medium bg-red-500/10 rounded-lg px-3 py-2">
                      📞 {num}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-slate-500 text-xs text-center">{result.disclaimer}</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white py-3 rounded-xl text-sm transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Start Over
              </button>
              <button
                onClick={() => {
                  // Build a context message from the legal help result
                  const contextParts: string[] = [];
                  if (result) {
                    contextParts.push(`I need help with: ${result.title}`);
                    if (description.trim()) {
                      contextParts.push(`My situation: ${description.trim()}`);
                    }
                    contextParts.push(`\nThe guided legal help told me these steps:\n${result.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
                    contextParts.push(`\nRelevant laws: ${result.laws.join(', ')}`);
                    contextParts.push(`\nPlease give me more detailed advice on this. What else should I know? What are my options if these steps don't work?`);
                  }
                  navigate('/ai-assistant', {
                    state: { prefillMessage: contextParts.join('\n') },
                  });
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-medium transition-all"
              >
                Chat with NyayaAI
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
