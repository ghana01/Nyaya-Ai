import { Send, Bot } from 'lucide-react';
import { useState } from 'react';
import ChatBubble from '../components/ChatBubble';

export default function Chatbot() {
  const [message, setMessage] = useState('');

  const sampleMessages = [
    { text: 'Hello! How can I assist you with your legal questions today?', isUser: false, time: '10:30 AM' },
    { text: 'What are my rights as a consumer if I receive a defective product?', isUser: true, time: '10:31 AM' },
    { text: 'Under the Consumer Protection Act, 2019, you have the right to seek replacement, refund, or compensation for defective products. You can file a complaint with the consumer forum within 2 years of purchase. Would you like to know more about the complaint process?', isUser: false, time: '10:31 AM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              AI Legal{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Assistant
              </span>
            </h1>
          </div>
          <p className="text-gray-600">Ask me anything about your legal rights and concerns</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">AI Assistant Online</span>
              </div>
              <div className="text-white text-sm">Average response time: 2 sec</div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
            {sampleMessages.map((msg, index) => (
              <ChatBubble
                key={index}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.time}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your legal question here..."
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                <Send className="h-6 w-6" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              This is a UI preview. Messages are not processed in this version.
            </p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-blue-200">
            <p className="text-sm text-gray-700">What are my rights as a tenant?</p>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-blue-200">
            <p className="text-sm text-gray-700">How do I file a consumer complaint?</p>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-blue-200">
            <p className="text-sm text-gray-700">What is the process for bail application?</p>
          </button>
        </div>
      </div>
    </div>
  );
}
