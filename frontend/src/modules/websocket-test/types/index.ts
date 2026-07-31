export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface WebSocketMessage {
  type: 'message' | 'join' | 'leave';
  payload: Message | User;
}

