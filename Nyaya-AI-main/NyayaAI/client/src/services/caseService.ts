import api from './api';

export interface CaseAnalysisResponse {
  success: boolean;
  data: {
    query: string;
    summary: string;
    legalPrinciples: string[];
    similarTopics: string[];
    relatedCases: RelatedCase[];
  };
}

export interface RelatedCase {
  id: string;
  title: string;
  court: string;
  year: number;
  summary: string;
  legalPrinciples: string[];
  tags: string[];
  citation?: string;
}

export interface SimilarCasesResponse {
  success: boolean;
  data: {
    tag: string;
    count: number;
    cases: RelatedCase[];
  };
}

export interface AllCasesResponse {
  success: boolean;
  data: {
    cases: RelatedCase[];
    total: number;
    page: number;
    limit: number;
  };
}

export const analyzeCase = async (query: string, userId?: string): Promise<CaseAnalysisResponse> => {
  const response = await api.post<CaseAnalysisResponse>('/case/analyze', { query, userId });
  return response.data;
};

export const getSimilarCases = async (tag: string, limit = 10): Promise<SimilarCasesResponse> => {
  const response = await api.get<SimilarCasesResponse>(`/case/similar?tag=${encodeURIComponent(tag)}&limit=${limit}`);
  return response.data;
};

export const getAllCases = async (page = 1, limit = 12): Promise<AllCasesResponse> => {
  const response = await api.get<AllCasesResponse>(`/case/all?page=${page}&limit=${limit}`);
  return response.data;
};
