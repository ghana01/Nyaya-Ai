import api from './api';

export interface Right {
  _id: string;
  title: string;
  category: 'women' | 'cybercrime' | 'arrest' | 'consumer' | 'tenant';
  description: string;
  lawReference: string;
  icon: string;
  keyPoints: string[];
  relatedLaws: string[];
  helplineNumbers?: { name: string; number: string }[];
}

export interface RightsResponse {
  success: boolean;
  data: {
    rights: Right[];
    grouped: Record<string, Right[]>;
    count: number;
  };
}

export interface RightDetailResponse {
  success: boolean;
  data: {
    right: Right;
    relatedRights: Right[];
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

// Get all rights (with optional category filter)
export const getAllRights = async (category?: string): Promise<RightsResponse> => {
  const params = category && category !== 'all' ? { category } : {};
  const response = await api.get<RightsResponse>('/rights', { params });
  return response.data;
};

// Get single right by ID
export const getRightById = async (id: string): Promise<RightDetailResponse> => {
  const response = await api.get<RightDetailResponse>(`/rights/${id}`);
  return response.data;
};

// Get all categories with counts
export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get<CategoriesResponse>('/rights/categories');
  return response.data;
};

// Category display info
export const categoryInfo: Record<string, { name: string; icon: string; color: string; bgColor: string }> = {
  women: { name: 'Women Rights', icon: '👩', color: 'text-pink-600', bgColor: 'bg-pink-100' },
  cybercrime: { name: 'Cybercrime', icon: '💻', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  arrest: { name: 'Arrest Rights', icon: '⚖️', color: 'text-red-600', bgColor: 'bg-red-100' },
  consumer: { name: 'Consumer Rights', icon: '🛒', color: 'text-green-600', bgColor: 'bg-green-100' },
  tenant: { name: 'Tenant Rights', icon: '🏠', color: 'text-amber-600', bgColor: 'bg-amber-100' },
};
