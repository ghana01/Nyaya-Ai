import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Bookmark, Trash2, Edit3, Tag, Loader2, Plus, X, ArrowLeft, Save } from 'lucide-react';
import { getSavedCases, saveCase, updateSavedCase, deleteSavedCase } from '../services/lawyerService';
import type { SavedCaseItem } from '../services/lawyerService';
import { Link } from 'react-router-dom';

export default function SavedCases() {
  const [cases, setCases] = useState<SavedCaseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ caseTitle: '', notes: '', tags: '' });

  const fetchCases = async () => {
    setIsLoading(true);
    try {
      const response = await getSavedCases();
      if (response.success) setCases(response.data.cases);
    } catch { /* */ }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchCases(); }, []);

  const handleSave = async () => {
    if (!form.caseTitle.trim()) return;
    try {
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      if (editId) {
        const response = await updateSavedCase(editId, { caseTitle: form.caseTitle, notes: form.notes, tags });
        if (response.success) {
          setCases(prev => prev.map(c => c._id === editId ? response.data : c));
          toast.success('Case updated successfully!');
        } else {
          toast.error('Failed to update case.');
        }
        setEditId(null);
      } else {
        const response = await saveCase({ caseTitle: form.caseTitle, notes: form.notes, tags });
        if (response.success) {
          setCases(prev => [response.data, ...prev]);
          toast.success('Case saved successfully!');
        } else {
          toast.error('Failed to save case.');
        }
      }
      setForm({ caseTitle: '', notes: '', tags: '' });
      setShowAdd(false);
    } catch {
      toast.error('An error occurred.');
    }
  };

  const handleEdit = (c: SavedCaseItem) => {
    setForm({ caseTitle: c.caseTitle, notes: c.notes, tags: c.tags.join(', ') });
    setEditId(c._id);
    setShowAdd(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSavedCase(id);
      setCases(prev => prev.filter(c => c._id !== id));
      toast.success('Case deleted successfully!');
    } catch {
      toast.error('Failed to delete case.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/lawyer-dashboard" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Bookmark className="h-8 w-8 text-emerald-400" /> Saved Cases
              </h1>
              <p className="text-slate-400 mt-1">{cases.length} cases saved</p>
            </div>
            <button
              onClick={() => { setShowAdd(!showAdd); setEditId(null); setForm({ caseTitle: '', notes: '', tags: '' }); }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {showAdd ? 'Cancel' : 'Add Case'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Add/Edit Form */}
        {showAdd && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6">
            <h3 className="text-white font-semibold mb-4">{editId ? 'Edit Case' : 'Add New Case'}</h3>
            <div className="space-y-3">
              <input
                value={form.caseTitle}
                onChange={(e) => setForm(f => ({ ...f, caseTitle: e.target.value }))}
                placeholder="Case title, e.g., Vishaka v. State of Rajasthan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none text-sm"
              />
              <textarea
                value={form.notes}
                onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Your notes about this case..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none resize-none text-sm"
              />
              <input
                value={form.tags}
                onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="Tags (comma separated), e.g., fundamental rights, article 21"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none text-sm"
              />
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <Save className="h-4 w-4" />
                {editId ? 'Update' : 'Save Case'}
              </button>
            </div>
          </div>
        )}

        {/* Cases List */}
        {isLoading ? (
          <div className="text-center py-16">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-3" />
            <p className="text-slate-400">Loading saved cases...</p>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-white font-medium text-xl mb-2">No saved cases yet</p>
            <p className="text-slate-400">Save cases from research or add them manually.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <div key={c._id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium">{c.caseTitle}</h3>
                    {c.notes && <p className="text-slate-400 text-sm mt-1 line-clamp-2">{c.notes}</p>}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {c.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-md">
                          <Tag className="h-3 w-3" />{tag}
                        </span>
                      ))}
                      <span className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(c)} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
