import { useState, useRef, useEffect } from 'react';
import { HiOutlinePaperAirplane, HiOutlineTrash } from 'react-icons/hi';
import { useWebSocketChat } from '../hooks/useWebSocketChat';
import ChatMessage from './ChatMessage';

interface ChatPanelProps {
  userId: string;
  userName: string;
  userColor: string;
}

const ChatPanel = ({ userId, userName, userColor }: ChatPanelProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isConnected, sendMessage, clearMessages } = useWebSocketChat(
    userId,
    userName
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-4 text-white flex items-center justify-between"
        style={{ backgroundColor: userColor }}
      >
        <div>
          <h2 className="text-xl font-bold">{userName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-300' : 'bg-red-300'
              }`}
            />
            <span className="text-sm">
              {isConnected ? 'متصل' : 'غير متصل'}
            </span>
          </div>
        </div>
        <button
          onClick={clearMessages}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          title="مسح المحادثة"
        >
          <HiOutlineTrash className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>لا توجد رسائل بعد. ابدأ المحادثة!</p>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwnMessage={message.sender === userName}
                userColor={
                  message.sender === userName ? userColor : '#6B7280'
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!isConnected || !inputMessage.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <HiOutlinePaperAirplane className="w-5 h-5" />
            <span>إرسال</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;


