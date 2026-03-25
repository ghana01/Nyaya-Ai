import api from './api';

export interface ResearchResult {
  query: string;
  summary: string;
  legalPrinciples: string[];
  similarTopics: string[];
  suggestedArguments: string[];
  similarCases?: SearchResult[];
}

export interface DraftType {
  value: string;
  label: string;
  icon: string;
  description: string;
}

export interface SavedCaseItem {
  _id: string;
  caseTitle: string;
  notes: string;
  tags: string[];
  court?: string;
  year?: number;
  citation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  _id: string;
  title: string;
  court: string;
  year: number;
  summary: string;
  legalPrinciples: string[];
  tags: string[];
  citation?: string;
  source: 'local' | 'external';
  link?: string;
}

// Case Research
export const researchCase = async (query: string) => {
  const response = await api.post<{ success: boolean; data: ResearchResult }>('/lawyer/research', { query });
  return response.data;
};

// Draft Types
export const getDraftTypes = async () => {
  const response = await api.get<{ success: boolean; data: { types: DraftType[] } }>('/lawyer/draft-types');
  return response.data;
};

// Generate Draft
export const generateDraft = async (type: string, formData: Record<string, string>) => {
  const response = await api.post<{ success: boolean; data: { type: string; content: string; generatedAt: string } }>('/lawyer/draft', { type, formData });
  return response.data;
};

// Saved Cases
export const getSavedCases = async (page = 1, limit = 20, tag?: string) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (tag) params.append('tag', tag);
  const response = await api.get<{ success: boolean; data: { cases: SavedCaseItem[]; total: number; hasMore: boolean } }>(`/lawyer/saved-cases?${params}`);
  return response.data;
};

export const saveCase = async (data: { caseTitle: string; notes?: string; tags?: string[]; court?: string; year?: number; citation?: string }) => {
  const response = await api.post<{ success: boolean; data: SavedCaseItem }>('/lawyer/save-case', data);
  return response.data;
};

export const updateSavedCase = async (id: string, data: { caseTitle?: string; notes?: string; tags?: string[] }) => {
  const response = await api.put<{ success: boolean; data: SavedCaseItem }>(`/lawyer/saved-cases/${id}`, data);
  return response.data;
};

export const deleteSavedCase = async (id: string) => {
  await api.delete(`/lawyer/saved-cases/${id}`);
};

// Advanced Search
export const advancedSearch = async (filters: { keywords?: string; court?: string; year?: string; section?: string }) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => { if (val) params.append(key, val); });
  const response = await api.get<{ success: boolean; data: { results: SearchResult[]; total: number } }>(`/lawyer/search?${params}`);
  return response.data;
};
