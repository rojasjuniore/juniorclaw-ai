'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXAMPLE_PROMPTS = [
  '¿Construir auth propio o usar Clerk/Auth0?',
  '¿Monolito o microservicios para MVP?',
  '¿Migrar de Firebase a Supabase?',
  '¿Priorizar features o pagar deuda técnica?',
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function DecisionEngine() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (prompt?: string) => {
    const text = prompt || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '[ERROR] Connection failed. Retry.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 relative" id="decision-engine">
      <div className="crt absolute inset-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-window"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              <span className="ml-4 text-xs text-[#666]">decision_engine.sh</span>
            </div>
            <span className="text-[10px] text-[#00ff41]">● ONLINE</span>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Header info */}
            <div className="mb-4 pb-4 border-b border-[#1a1a1a]">
              <div className="text-[#00ff41] text-sm">$ ./decision_engine --interactive</div>
              <div className="text-[#666] text-xs mt-1">
                # Describe tu problema. Obtienes diagnóstico real, no motivacional.
              </div>
            </div>

            {/* Messages area */}
            <div className="h-[350px] overflow-y-auto mb-4 space-y-4">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <div className="text-[#666] text-xs">
                    {'>'} No hay mensajes. Escribe una consulta o selecciona un ejemplo:
                  </div>
                  <div className="space-y-2">
                    {EXAMPLE_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSubmit(prompt)}
                        className="block w-full text-left px-3 py-2 border border-[#1a1a1a] hover:border-[#00ff41] text-xs text-[#666] hover:text-[#00ff41] transition-all"
                      >
                        <span className="text-[#00ff41]">[{i + 1}]</span> {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {messages.map((message, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm"
                    >
                      {message.role === 'user' ? (
                        <div>
                          <span className="text-[#00ff41]">user@query $ </span>
                          <span className="text-[#f0f0f0]">{message.content}</span>
                        </div>
                      ) : (
                        <div className="mt-2 pl-2 border-l border-[#00ff41]/30">
                          <div className="text-[#00ff41] text-xs mb-1">// junior_claw.response</div>
                          <div className="text-[#f0f0f0] whitespace-pre-wrap">{message.content}</div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#00ff41] text-sm"
                    >
                      <span className="animate-pulse">{'>'} Processing query...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex items-center gap-2 border-t border-[#1a1a1a] pt-4"
            >
              <span className="text-[#00ff41] text-sm">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent text-[#f0f0f0] text-sm outline-none placeholder:text-[#333]"
                disabled={isLoading}
              />
              <span className={`w-2 h-4 bg-[#00ff41] ${isLoading ? 'opacity-50' : 'cursor-blink'}`} />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
