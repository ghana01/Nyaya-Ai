import api from './api';

// Types
export interface CaseStatusRequest {
  state: string;
  district: string;
  court: string;
  caseNumber: string;
  caseType?: string;
  year?: string;
}

export interface CaseParty {
  name: string;
  role: 'petitioner' | 'respondent' | 'appellant' | 'defendant';
  advocate?: string;
}

export interface CaseHearing {
  date: string;
  purpose: string;
  remarks?: string;
}

export interface CaseStatus {
  caseNumber: string;
  caseType: string;
  filingDate: string;
  registrationDate: string;
  caseStage: string;
  courtName: string;
  judge: string;
  nextHearingDate: string;
  previousHearings: CaseHearing[];
  parties: {
    petitioners: CaseParty[];
    respondents: CaseParty[];
  };
  acts: string[];
  disposalDate?: string;
  nature?: string;
}

export interface CaseStatusResponse {
  success: boolean;
  message: string;
  data: CaseStatus;
  source: 'mock' | 'ecourts';
}

export interface State {
  code: string;
  name: string;
  districts: string[];
}

export interface LocationsResponse {
  success: boolean;
  data: {
    states: State[];
  };
}

export interface Court {
  id: string;
  name: string;
}

export interface CourtsResponse {
  success: boolean;
  data: {
    state: string;
    district: string;
    courts: Court[];
  };
}

// Get case status
export const getCaseStatus = async (request: CaseStatusRequest): Promise<CaseStatusResponse> => {
  const response = await api.post<CaseStatusResponse>('/case-status', request);
  return response.data;
};

// Get locations (states and districts)
export const getLocations = async (): Promise<LocationsResponse> => {
  const response = await api.get<LocationsResponse>('/case-status/locations');
  return response.data;
};

// Get courts for a district
export const getCourts = async (state: string, district: string): Promise<CourtsResponse> => {
  const response = await api.get<CourtsResponse>('/case-status/courts', {
    params: { state, district },
  });
  return response.data;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Calculate days until hearing
export const getDaysUntilHearing = (dateString: string): number => {
  const hearing = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  hearing.setHours(0, 0, 0, 0);
  const diffTime = hearing.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
