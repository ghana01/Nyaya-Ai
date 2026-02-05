import api from './api';

export interface Law {
  _id: string;
  actName: string;
  actShortName?: string;
  section: string;
  title: string;
  explanation: string;
  punishment?: string;
  category?: string;
}

export interface LawGroup {
  actName: string;
  actShortName?: string;
  sections: Law[];
}

export interface LawsResponse {
  success: boolean;
  data: {
    laws: Law[];
    grouped: LawGroup[];
    acts: string[];
    count: number;
  };
}

export interface SearchResponse {
  success: boolean;
  data: {
    laws: Law[];
    query: string;
    count: number;
  };
}

export interface ExplainResponse {
  success: boolean;
  data: {
    originalSection: string;
    originalTitle: string;
    simplifiedExplanation: string;
    disclaimer: string;
  };
}

// Get all laws
export const getAllLaws = async (act?: string): Promise<LawsResponse> => {
  const params = act ? { act } : {};
  const response = await api.get<LawsResponse>('/laws', { params });
  return response.data;
};

// Search laws
export const searchLaws = async (query: string): Promise<SearchResponse> => {
  const response = await api.get<SearchResponse>('/laws/search', {
    params: { q: query },
  });
  return response.data;
};

// Get AI explanation for a law
export const explainLaw = async (
  section: string,
  title: string,
  explanation: string
): Promise<ExplainResponse> => {
  const response = await api.post<ExplainResponse>('/laws/explain', {
    section,
    title,
    explanation,
  });
  return response.data;
};

// Act display info with icons
export const actIcons: Record<string, string> = {
  'Indian Penal Code, 1860': '⚖️',
  'Information Technology Act, 2000': '💻',
  'Consumer Protection Act, 2019': '🛒',
  'Motor Vehicles Act, 1988': '🚗',
  'Protection of Women from Domestic Violence Act, 2005': '🛡️',
  'Protection of Children from Sexual Offences Act, 2012': '👶',
  'Right to Information Act, 2005': '📋',
  'Hindu Marriage Act, 1955': '💍',
};

export const getActIcon = (actName: string): string => {
  return actIcons[actName] || '📜';
};
