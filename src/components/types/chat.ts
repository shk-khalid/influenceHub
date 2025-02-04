export interface ChatResponse {
    user_message: {
      id: number;
      text: string;
      sender: string;
      timestamp: string;
      session_id: string;
    };
    bot_message: {
      id: number;
      text: string;
      sender: string;
      timestamp: string;
      session_id: string;
    };
  }