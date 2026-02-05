import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export default function ChatBubble({ message, isUser, timestamp = '10:30 AM' }: ChatBubbleProps) {
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 p-2 rounded-full ${isUser ? 'bg-blue-100' : 'bg-indigo-100'}`}>
        {isUser ? (
          <User className="h-5 w-5 text-blue-600" />
        ) : (
          <Bot className="h-5 w-5 text-indigo-600" />
        )}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-md`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
              : 'bg-white shadow-md text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1 px-2">{timestamp}</span>
      </div>
    </div>
  );
}
