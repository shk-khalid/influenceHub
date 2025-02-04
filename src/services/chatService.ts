import api from './api';
import { ChatResponse } from '../components/types/chat';

export const sendMessage = async (message: string, sessionId: string): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>('/chat/send_message/', {
      message,
      session_id: sessionId,
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Add more API endpoints here as needed
export const getChatHistory = async (sessionId: string) => {
  try {
    const response = await api.get(`/chat/?session_id=${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};