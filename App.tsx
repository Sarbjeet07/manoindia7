import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from './services/ai';
import { Message } from './types';
import { Logo } from './components/Logo';

interface Action {
  label: string;
  icon: string;
  url?: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to Manoindia! 🌟\n\nI can help you book verified artists, venues, and event managers in 3 simple steps. How can I assist you today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    const messageText = text.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const responseText = await getAIResponse(messageText);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleAction = (action: Action) => {
    if (action.url) {
      window.open(action.url, '_blank');
    } else if (action.label === 'Support') {
      handleSend("I need contact and support information");
    } else {
      handleSend(`Tell me about ${action.label}`);
    }
  };

  const actions: Action[] = [
    { label: 'Artists', icon: 'fa-microphone-lines', url: 'https://manoindia.in' },
    { label: 'Venues', icon: 'fa-landmark', url: 'https://manoindia.in' },
    { label: 'Event Managers', icon: 'fa-user-tie', url: 'https://manoindia.in' },
    { label: 'Support', icon: 'fa-headset' }
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 glass-panel z-50">
        <div className="flex items-center gap-3">
          <Logo className="w-12 h-12" hideText={true} />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white leading-none">ManoIndia</h1>
            <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Premium Booking</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
            <a href="tel:8709736094" className="text-gray-400 hover:text-white transition-colors" title="Call Support">
                <i className="fas fa-phone"></i>
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="text-gray-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <i className="fas fa-rotate-right text-lg"></i>
            </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-10 scrollbar-hide bg-gradient-to-b from-[#0a0b0d] to-[#12141a]">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'items-start'} animate-msg`}>
              {msg.role === 'assistant' && (
                <div className="bot-avatar shrink-0 overflow-hidden bg-black border border-yellow-500/30">
                  <Logo className="w-5 h-5" hideText={true} />
                </div>
              )}
              <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble text-white shadow-lg shadow-blue-900/20' : 'text-gray-100 border border-white/5'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 items-start animate-pulse">
              <div className="bot-avatar shrink-0 overflow-hidden bg-black border border-yellow-500/30">
                <Logo className="w-5 h-5" hideText={true} />
              </div>
              <div className="message-bubble text-gray-500 italic">Thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer / Input Area */}
      <footer className="p-6 glass-panel border-t border-white/5">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {actions.map((act) => (
              <button
                key={act.label}
                onClick={() => handleAction(act)}
                className="action-button group"
              >
                <i className={`fas ${act.icon} group-hover:rotate-12 transition-transform`}></i>
                {act.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="input-container group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about Manoindia..."
              className="input-field"
            />
            <button 
              onClick={() => handleSend()}
              className={`send-btn mr-1 ${!input.trim() ? 'opacity-30 grayscale cursor-not-allowed' : 'opacity-100 hover:scale-105 active:scale-95'}`}
              disabled={!input.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            Browse • Book • Celebrate
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;