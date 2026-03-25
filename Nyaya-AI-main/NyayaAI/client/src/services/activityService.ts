import api from './api';

export type ActivityType = 'chat' | 'case_search' | 'law_read';

export interface Activity {
  _id: string;
  type: ActivityType;
  query: string;
  response: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ActivityResponse {
  success: boolean;
  data: {
    activities: Activity[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export const getActivity = async (
  userId: string,
  type?: ActivityType,
  page = 1,
  limit = 20
): Promise<ActivityResponse> => {
  const params = new URLSearchParams({ userId, page: String(page), limit: String(limit) });
  if (type) params.append('type', type);
  const response = await api.get<ActivityResponse>(`/activity?${params.toString()}`);
  return response.data;
};

export const deleteActivity = async (id: string): Promise<void> => {
  await api.delete(`/activity/${id}`);
};
