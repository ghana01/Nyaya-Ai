import api from './api';

export interface ChatMessage {
  id: string;
  message: string;
  role: 'user' | 'ai';
  timestamp: string;
  lawReferences?: string[];
  steps?: string[];
  suggestedDocument?: {
    type: string;
    title: string;
    description: string;
  } | null;
}

export interface ChatResponse {
  success: boolean;
  data: {
    sessionId: string;
    userId: string;
    userMessage: ChatMessage;
    aiResponse: ChatMessage & {
      lawReferences: string[];
      steps: string[];
      suggestedDocument?: {
        type: string;
        title: string;
        description: string;
      } | null;
    };
  };
}

export interface ChatHistoryResponse {
  success: boolean;
  data: {
    sessionId: string;
    messages: ChatMessage[];
    count: number;
  };
}

export interface ChatSession {
  sessionId: string;
  preview: string;
  lastActivity: string;
  messageCount: number;
}

export interface UserSessionsResponse {
  success: boolean;
  data: {
    userId: string;
    sessions: ChatSession[];
  };
}

// Send a chat message and get AI response
export const sendChatMessage = async (
  message: string,
  sessionId?: string,
  userId?: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/ai/chat', {
    message,
    sessionId,
    userId,
  });
  return response.data;
};

// Get chat history for a session
export const getChatHistory = async (sessionId: string): Promise<ChatHistoryResponse> => {
  const response = await api.get<ChatHistoryResponse>(`/ai/history/${sessionId}`);
  return response.data;
};

// Get user's chat sessions
export const getUserSessions = async (userId: string): Promise<UserSessionsResponse> => {
  const response = await api.get<UserSessionsResponse>(`/ai/sessions/${userId}`);
  return response.data;
};

// Delete a chat session
export const deleteChatSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/ai/session/${sessionId}`);
};

// Generate a unique session ID
export const generateSessionId = (): string => {
  return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Generate a unique user ID for anonymous users
export const getOrCreateUserId = (): string => {
  const storedUserId = localStorage.getItem('nyayaai_user_id');
  if (storedUserId) {
    return storedUserId;
  }
  const newUserId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('nyayaai_user_id', newUserId);
  return newUserId;
};
