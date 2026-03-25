import api from './api';

export interface LegalHelpType {
  value: string;
  label: string;
  icon: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface LegalHelpResult {
  problemType: string;
  title: string;
  steps: string[];
  laws: string[];
  nextActions: string[];
  urgencyLevel: 'high' | 'medium' | 'low';
  helplineNumbers?: string[];
  description?: string;
  disclaimer: string;
}

export interface LegalHelpTypesResponse {
  success: boolean;
  data: { types: LegalHelpType[] };
}

export interface LegalHelpResponse {
  success: boolean;
  data: LegalHelpResult;
}

export const getLegalHelpTypes = async (): Promise<LegalHelpTypesResponse> => {
  const response = await api.get<LegalHelpTypesResponse>('/legal-help/types');
  return response.data;
};

export const getLegalHelp = async (problemType: string, description?: string): Promise<LegalHelpResponse> => {
  const response = await api.post<LegalHelpResponse>('/legal-help', { problemType, description });
  return response.data;
};
