import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message } from '../types/index';

export const useWebSocketChat = (userId: string, userName: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  // For demo purposes, we'll simulate WebSocket with a shared state
  // In production, you'd connect to a real WebSocket server
  useEffect(() => {
    // Simulate connection
    setIsConnected(true);

    // Listen for messages from other users via custom events
    const handleMessage = (event: CustomEvent) => {
      const message = event.detail as Message;
      if (message.sender !== userName) {
        setMessages(prev => [...prev, message]);
      }
    };

    window.addEventListener('chat-message' as any, handleMessage);

    return () => {
      window.removeEventListener('chat-message' as any, handleMessage);
      setIsConnected(false);
    };
  }, [userName]);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: userName,
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add to own messages
    setMessages(prev => [...prev, message]);

    // Broadcast to other users via custom event
    const event = new CustomEvent('chat-message', { detail: message });
    window.dispatchEvent(event);
  }, [userName]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isConnected,
    sendMessage,
    clearMessages,
  };
};

