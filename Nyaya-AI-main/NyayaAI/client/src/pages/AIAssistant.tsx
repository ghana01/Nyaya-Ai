import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Send, 
  Bot, 
  FileText,
  User, 
  Loader2, 
  Plus, 
  MessageSquare, 
  Menu,
  Scale,
  ChevronRight
} from 'lucide-react';
import { sendChatMessage, getOrCreateUserId, generateSessionId } from '../services/chatService';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  lawReferences?: string[];
  steps?: string[];
  suggestedDocument?: {
    type: string;
    title: string;
    description: string;
  } | null;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { text: "What are my rights if I'm arrested?", icon: "🔒" },
  { text: "How do I file an FIR?", icon: "📋" },
  { text: "Explain consumer rights in India", icon: "🛒" },
  { text: "How to file an RTI application?", icon: "📄" },
  { text: "What is the divorce process in India?", icon: "⚖️" },
  { text: "Property registration process", icon: "🏠" },
];

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'ai',
  content: `Namaste! 🙏 I'm **NyayaAI**, your AI legal assistant specializing in Indian law.

I can help you understand:
- 📋 Criminal Law (FIR, arrest rights, bail)
- 👨‍👩‍👧 Family Law (divorce, custody, maintenance)
- 🏠 Property Law (registration, disputes)
- 🛒 Consumer Rights & Complaints
- 📄 RTI Applications
- 💼 Labor & Employment Law

**How can I assist you today?**

_Note: I provide legal information for educational purposes. Please consult a qualified advocate for specific legal advice._`,
  timestamp: new Date(),
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
  const [userId] = useState<string>(() => getOrCreateUserId());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const hasAutoSent = useRef(false);
  const location = useLocation();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  // Auto-send prefilled message from Legal Help or other pages
  useEffect(() => {
    const state = location.state as { prefillMessage?: string } | null;
    if (state?.prefillMessage && !hasAutoSent.current) {
      hasAutoSent.current = true;
      setInput(state.prefillMessage);
      // Clear the location state so it doesn't re-trigger on re-render
      window.history.replaceState({}, '');
      // Auto-submit after a short delay so the input is set
      setTimeout(() => {
        setInput(state.prefillMessage!);
        // Trigger submit programmatically
        const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitBtn) submitBtn.click();
      }, 300);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(currentInput, sessionId, userId);
      
      const aiMessage: Message = {
        id: response.data.aiResponse.id,
        role: 'ai',
        content: response.data.aiResponse.message,
        timestamp: new Date(response.data.aiResponse.timestamp),
        lawReferences: response.data.aiResponse.lawReferences || [],
        steps: response.data.aiResponse.steps || [],
        suggestedDocument: response.data.aiResponse.suggestedDocument || null,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Update session ID if new one was created
      if (response.data.sessionId !== sessionId) {
        setSessionId(response.data.sessionId);
      }
      
      // Update chat sessions
      setChatSessions((prev) => {
        const existing = prev.find((s) => s.id === sessionId);
        if (existing) {
          return prev.map((s) =>
            s.id === sessionId
              ? { ...s, lastMessage: currentInput, timestamp: new Date() }
              : s
          );
        }
        return [
          {
            id: sessionId,
            title: currentInput.slice(0, 30) + (currentInput.length > 30 ? '...' : ''),
            lastMessage: currentInput,
            timestamp: new Date(),
          },
          ...prev,
        ];
      });
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        role: 'ai',
        content: 'I apologize, but I encountered an error processing your request. Please try again or check your connection.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    setMessages([welcomeMessage]);
    setSessionId(generateSessionId());
    setSidebarOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic text
        line = line.replace(/_(.*?)_/g, '<em>$1</em>');
        // List items
        if (line.startsWith('- ')) {
          return `<li class="ml-4">${line.substring(2)}</li>`;
        }
        if (line.match(/^\d+\./)) {
          return `<li class="ml-4">${line}</li>`;
        }
        return line ? `<p class="mb-2">${line}</p>` : '<br/>';
      })
      .join('');
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Chat
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Recent Chats
            </h3>
            <div className="space-y-1">
              {chatSessions.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">No chat history yet</p>
              ) : (
                chatSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-800 transition-colors ${
                      session.id === sessionId ? 'bg-gray-800' : ''
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="truncate">{session.title}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Scale className="h-4 w-4" />
              <span>NyayaAI Legal Assistant</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary-600" />
            <span className="font-semibold">NyayaAI</span>
          </div>
          <button
            onClick={handleNewChat}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="New chat"
          >
            <Plus className="h-5 w-5" />
          </button>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Messages */}
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`flex-1 max-w-[85%] ${
                      message.role === 'user' ? 'order-first' : ''
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white ml-auto'
                          : 'bg-white shadow-sm border border-gray-100'
                      }`}
                      style={{ maxWidth: message.role === 'user' ? 'fit-content' : '100%' }}
                    >
                      {message.role === 'ai' ? (
                        <div
                          className="prose prose-sm max-w-none text-gray-800"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                        />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>

                    {/* Relevant Laws */}
                    {message.role === 'ai' && message.lawReferences && message.lawReferences.length > 0 && (
                      <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1.5">⚖️ Relevant Laws</p>
                        <div className="flex flex-wrap gap-1.5">
                          {message.lawReferences.map((law, i) => (
                            <span key={i} className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full border border-indigo-200">
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steps to Take */}
                    {message.role === 'ai' && message.steps && message.steps.length > 0 && (
                      <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">📋 Steps to Take</p>
                        <ol className="space-y-1">
                          {message.steps.map((step, i) => (
                            <li key={i} className="flex gap-2 text-xs text-emerald-800">
                              <span className="flex-shrink-0 w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">{i + 1}</span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Suggested Document */}
                    {message.role === 'ai' && message.suggestedDocument && (
                      <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1.5">📄 Generate Legal Document</p>
                        <p className="text-sm text-amber-800 mb-2">{message.suggestedDocument.description}</p>
                        <button
                          onClick={() => {
                            window.open(`/documents?type=${message.suggestedDocument!.type}`, '_blank');
                          }}
                          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          {message.suggestedDocument.title}
                        </button>
                      </div>
                    )}

                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                      <span className="text-gray-500 text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (shown when only welcome message) */}
            {messages.length === 1 && (
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-3">Try asking:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question.text)}
                      className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-left text-sm hover:bg-gray-50 hover:border-primary-300 transition-all group"
                    >
                      <span className="text-lg">{question.icon}</span>
                      <span className="text-gray-700 group-hover:text-primary-600">
                        {question.text}
                      </span>
                      <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-primary-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-gray-100 rounded-2xl p-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a legal question..."
                rows={1}
                className="flex-1 bg-transparent border-0 resize-none px-3 py-2 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 max-h-[200px]"
                disabled={isLoading}
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              NyayaAI provides legal information, not legal advice. Consult a lawyer for specific matters.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
