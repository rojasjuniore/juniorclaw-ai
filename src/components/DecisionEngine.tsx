'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const EXAMPLE_PROMPTS = [
  '¿Debería construir mi propio auth o usar un servicio como Clerk?',
  'Tengo 3 meses para lanzar un MVP. ¿Qué stack recomiendas?',
  '¿Es mejor monolito o microservicios para una startup?',
  '¿Vale la pena migrar de Firebase a Supabase?',
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
        content: 'Error de conexión. Intenta de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-secondary/30" id="decision-engine">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Claude
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Decision Engine</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe tu problema de negocio o decisión técnica. 
            Te doy un diagnóstico real, no motivacional.
          </p>
        </motion.div>

        {/* Chat interface */}
        <Card className="bg-card border-border overflow-hidden">
          {/* Messages area */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-6">
                  Pregúntame algo o prueba con un ejemplo:
                </p>
                <div className="grid gap-2 w-full max-w-lg">
                  {EXAMPLE_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(prompt)}
                      className="text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-border hover:border-amber-500/30 text-sm text-muted-foreground hover:text-foreground transition-all flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-amber-500 text-black'
                          : 'bg-secondary border border-border'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2 text-amber-500 text-xs font-semibold">
                          🦞 Junior Claw
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary border border-border rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Analizando...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex gap-3"
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe tu problema o decisión..."
                className="min-h-[60px] max-h-[120px] resize-none bg-secondary border-border focus:border-amber-500/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-amber-500 hover:bg-amber-600 text-black px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
