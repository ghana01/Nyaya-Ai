import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FileText, ArrowLeft, ArrowRight, Loader2, Download, Copy, Check } from 'lucide-react';
import { getDraftTypes, generateDraft } from '../services/lawyerService';
import type { DraftType } from '../services/lawyerService';
import { Link } from 'react-router-dom';

type Step = 'select' | 'fill' | 'preview';

const FORM_FIELDS: Record<string, { label: string; placeholder: string; type: 'text' | 'textarea' }[]> = {
  'legal-notice': [
    { label: 'Recipient Name', placeholder: 'Full name of the recipient', type: 'text' },
    { label: 'Recipient Address', placeholder: 'Complete address', type: 'textarea' },
    { label: 'Client Name', placeholder: 'Your client\'s full name', type: 'text' },
    { label: 'Client Address', placeholder: 'Client\'s address', type: 'text' },
    { label: 'Subject', placeholder: 'Subject of the legal notice', type: 'text' },
    { label: 'Facts', placeholder: 'Detailed facts of the matter...', type: 'textarea' },
    { label: 'Legal Basis', placeholder: 'Applicable sections and provisions...', type: 'textarea' },
    { label: 'Demand', placeholder: 'State your demand clearly...', type: 'textarea' },
    { label: 'Deadline', placeholder: 'e.g., 15 days', type: 'text' },
    { label: 'Advocate Name', placeholder: 'Your name', type: 'text' },
    { label: 'Bar Council Number', placeholder: 'Bar Council Enrollment No.', type: 'text' },
  ],
  'written-statement': [
    { label: 'Court Name', placeholder: 'e.g., Court of Civil Judge Senior Division', type: 'text' },
    { label: 'Case Type', placeholder: 'e.g., Civil Suit', type: 'text' },
    { label: 'Case Number', placeholder: 'e.g., 123/2025', type: 'text' },
    { label: 'Plaintiff Name', placeholder: 'Plaintiff\'s full name', type: 'text' },
    { label: 'Defendant Name', placeholder: 'Defendant\'s full name', type: 'text' },
    { label: 'Preliminary Objections', placeholder: 'State preliminary objections...', type: 'textarea' },
    { label: 'Para-wise Reply', placeholder: 'Reply to each paragraph...', type: 'textarea' },
    { label: 'Prayer', placeholder: 'Relief sought...', type: 'textarea' },
    { label: 'Advocate Name', placeholder: 'Your name', type: 'text' },
  ],
  'affidavit': [
    { label: 'Deponent Name', placeholder: 'Full name of deponent', type: 'text' },
    { label: 'Age', placeholder: 'Age in years', type: 'text' },
    { label: 'Occupation', placeholder: 'Occupation', type: 'text' },
    { label: 'Address', placeholder: 'Complete address', type: 'textarea' },
    { label: 'Relationship', placeholder: 'e.g., petitioner, complainant', type: 'text' },
    { label: 'Statements', placeholder: 'State facts paragraph by paragraph...\n\n3. That...\n4. That...', type: 'textarea' },
    { label: 'Place', placeholder: 'City/Town', type: 'text' },
  ],
  'petition-draft': [
    { label: 'Court Name', placeholder: 'e.g., High Court of Delhi', type: 'text' },
    { label: 'Petition Type', placeholder: 'e.g., Writ Petition (Civil)', type: 'text' },
    { label: 'Petitioner Name', placeholder: 'Petitioner\'s full name', type: 'text' },
    { label: 'Respondent Name', placeholder: 'Respondent\'s name', type: 'text' },
    { label: 'Legal Provision', placeholder: 'e.g., Article 226 of the Constitution', type: 'text' },
    { label: 'Facts', placeholder: 'Detailed facts of the case...', type: 'textarea' },
    { label: 'Grounds', placeholder: 'Legal grounds for the petition...', type: 'textarea' },
    { label: 'Prayer', placeholder: 'Relief sought...', type: 'textarea' },
    { label: 'Advocate Name', placeholder: 'Your name', type: 'text' },
    { label: 'Bar Council Number', placeholder: 'Bar Council Enrollment No.', type: 'text' },
  ],
};

// Convert label to camelCase key
const toKey = (label: string) => {
  return label.charAt(0).toLowerCase() + label.slice(1).replace(/\s+(.)/g, (_, c) => c.toUpperCase());
};

export default function LawyerDrafts() {
  const [step, setStep] = useState<Step>('select');
  const [draftTypes, setDraftTypes] = useState<DraftType[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getDraftTypes().then(r => { if (r.success) setDraftTypes(r.data.types); }).catch(() => {});
  }, []);

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setFormData({});
    setStep('fill');
  };

  const handleGenerate = async () => {
    if (!selectedType) return;
    setIsLoading(true);
    try {
      const response = await generateDraft(selectedType, formData);
      if (response.success) {
        setContent(response.data.content);
        setStep('preview');
        toast.success('Draft generated successfully!');
      } else {
        toast.error('Failed to generate draft.');
      }
    } catch {
      toast.error('An error occurred during generation.');
    } finally { setIsLoading(false); }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/lawyer-dashboard" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-4 py-2 rounded-full text-sm mb-4">
            <FileText className="h-4 w-4" /> Legal Draft Generator
          </div>
          <h1 className="text-3xl font-bold text-white">Generate Legal Documents</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step 1: Select Type */}
        {step === 'select' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {draftTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => handleSelect(t.value)}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 rounded-2xl p-6 text-left transition-all"
              >
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors">{t.label}</h3>
                <p className="text-slate-400 text-sm mt-1">{t.description}</p>
                <div className="flex items-center text-indigo-400 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Fill Form */}
        {step === 'fill' && selectedType && (
          <div>
            <button onClick={() => setStep('select')} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6">
              <ArrowLeft className="h-4 w-4" /> Change type
            </button>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h2 className="text-white font-semibold text-xl mb-5">Fill Document Details</h2>
              <div className="space-y-4">
                {(FORM_FIELDS[selectedType] || []).map((field) => {
                  const key = toKey(field.label);
                  return (
                    <div key={key}>
                      <label className="block text-sm text-slate-300 mb-1.5">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={formData[key] || ''}
                          onChange={(e) => setFormData(f => ({ ...f, [key]: e.target.value }))}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none resize-none text-sm"
                        />
                      ) : (
                        <input
                          value={formData[key] || ''}
                          onChange={(e) => setFormData(f => ({ ...f, [key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none text-sm"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
                {isLoading ? 'Generating...' : 'Generate Draft'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setStep('fill')} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm">
                <ArrowLeft className="h-4 w-4" /> Back to Edit
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([content], { type: 'text/plain' });
                    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
                    a.download = `${selectedType}_${Date.now()}.txt`; a.click();
                  }}
                  className="flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <pre className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed font-mono">{content}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
