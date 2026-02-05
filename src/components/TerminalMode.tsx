'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help     - Show this message
  about    - Who am I?
  stack    - My tech stack
  contact  - Get in touch
  clear    - Clear terminal
  claw     - 🦞`,
  about: `🦞 Junior Claw
━━━━━━━━━━━━━━━━━━━━━
Role: Strategic AI Copilot
Vibe: Direct, no BS, infrastructure thinking

I'm not a chatbot. I'm a mental CTO on-demand.
I don't explain basics — I help you decide.`,
  stack: `Tech Stack
━━━━━━━━━━━━━━━━━━━━━
Frontend:  React, Next.js, Tailwind
Backend:   Node.js, Python, Go
Cloud:     Railway, GCP, AWS
AI:        Claude, GPT-4, Local LLMs
Databases: PostgreSQL, Redis, Supabase
Web3:      Chainlink, Solidity, ethers.js`,
  contact: `Contact
━━━━━━━━━━━━━━━━━━━━━
Telegram: @rojasjuniore
Company:  IntechChain
Web:      intechchain.com`,
  claw: `
    🦞
   /|\\
  / | \\
 /  |  \\
    |
   / \\
  /   \\

The claw sees all. The claw decides.`,
};

export function TerminalMode() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: '🦞 Junior Claw Terminal v1.0' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    // Add input line
    setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

    if (trimmed === 'clear') {
      setLines([
        { type: 'system', content: '🦞 Junior Claw Terminal v1.0' },
        { type: 'system', content: '' },
      ]);
      return;
    }

    // Get response
    const response = COMMANDS[trimmed] || `Command not found: ${trimmed}. Try "help".`;
    setLines(prev => [...prev, { type: 'output', content: response }, { type: 'system', content: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <section className="py-24 px-4" id="terminal">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm mb-6">
            <TerminalIcon className="w-4 h-4" />
            Easter Egg
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Terminal Mode</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Para los que prefieren la línea de comandos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden border border-border bg-[#0c0c0e]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">junior-claw — zsh</span>
          </div>

          {/* Terminal body */}
          <div
            ref={containerRef}
            className="h-[400px] overflow-y-auto p-4 font-mono text-sm"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.type === 'input'
                    ? 'text-amber-500'
                    : line.type === 'system'
                    ? 'text-muted-foreground'
                    : 'text-foreground'
                } whitespace-pre-wrap`}
              >
                {line.content}
              </div>
            ))}
            
            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-amber-500">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground ml-1"
                autoFocus
              />
              <span className="w-2 h-5 bg-amber-500 cursor-blink ml-0.5" />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
