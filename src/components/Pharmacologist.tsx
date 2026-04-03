'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect } from 'react';

const SUGGESTED_QUESTIONS = [
  'What are the risks of combining MDMA with SSRIs?',
  'Is ketamine safe for someone with high blood pressure?',
  'What are the contraindications for ayahuasca?',
  'How does psilocybin interact with lithium?',
];

export function Pharmacologist() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/safety' }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-teal-glow text-void font-display text-sm font-bold px-5 py-3 rounded-full shadow-lg hover:bg-teal-glow/90 transition-all"
        style={{
          boxShadow: '0 0 20px rgba(0, 229, 204, 0.4), 0 0 40px rgba(0, 229, 204, 0.2)',
        }}
      >
        {isOpen ? '✕ Close' : '⚗️ Ask The Pharmacologist'}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-surface border border-deep-purple rounded-xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: 'min(600px, calc(100dvh - 8rem))' }}
        >
          {/* Header */}
          <div className="bg-deep-purple px-4 py-3 border-b border-teal-glow/20">
            <h3 className="font-display text-sm font-bold text-teal-glow flex items-center gap-2">
              ⚗️ The Pharmacologist
            </h3>
            <p className="text-[10px] text-warning-red mt-1">
              Educational information only. Not medical advice. Always consult healthcare professionals.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted">
                  Ask me about substance safety, interactions, contraindications, or harm reduction.
                </p>
                <div className="space-y-2">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className="block w-full text-left text-xs text-teal-glow/80 hover:text-teal-glow bg-deep-purple/50 hover:bg-deep-purple px-3 py-2 rounded-lg transition-colors border border-teal-glow/10 hover:border-teal-glow/30"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`text-sm ${
                  m.role === 'user'
                    ? 'bg-deep-purple/80 text-white-flash ml-8'
                    : 'bg-teal-glow/5 text-white-flash/90 mr-4 border border-teal-glow/10'
                } px-3 py-2.5 rounded-lg`}
              >
                {m.role === 'assistant' && (
                  <span className="text-[10px] text-teal-glow font-display font-bold block mb-1">
                    The Pharmacologist
                  </span>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.parts?.map((part, i) =>
                    part.type === 'text' ? <span key={i}>{part.text}</span> : null
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="bg-teal-glow/5 border border-teal-glow/10 px-3 py-2.5 rounded-lg mr-4">
                <span className="text-[10px] text-teal-glow font-display font-bold block mb-1">
                  The Pharmacologist
                </span>
                <span className="text-sm text-muted animate-pulse">Analyzing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-deep-purple p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about safety, interactions..."
              className="flex-1 bg-deep-purple/60 border border-muted/20 rounded-lg px-3 py-2 text-sm text-white-flash placeholder:text-muted/50 focus:outline-none focus:border-teal-glow/50 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-teal-glow text-void font-display text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-glow/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Ask
            </button>
          </form>
        </div>
      )}
    </>
  );
}
