import type { Message } from '../types/index';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  userColor: string;
}

const ChatMessage = ({ message, isOwnMessage, userColor }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-semibold"
            style={{ color: userColor }}
          >
            {message.sender}
          </span>
          <span className="text-xs text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-gray-200 text-gray-800 rounded-bl-sm'
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

