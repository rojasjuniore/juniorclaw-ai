'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'ascii';
  content: string;
}

const ASCII_CLAW = `
     ╭──────────────────────╮
     │   ██╗ ██████╗        │
     │   ██║██╔════╝        │
     │   ██║██║             │
     │██ ██║██║             │
     │╚████╔╝╚██████╗       │
     │ ╚═══╝  ╚═════╝       │
     │                      │
     │  JUNIOR CLAW v2.0    │
     │  Strategic AI CTO    │
     ╰──────────────────────╯
`;

const COMMANDS: Record<string, string> = {
  help: `
AVAILABLE COMMANDS:
  help      Show this message
  about     Who am I?
  stack     My tech stack
  stats     Live metrics
  contact   Get in touch
  clear     Clear terminal
  claw      🦞
  matrix    ???`,
  about: `
╔════════════════════════════════════════╗
║  JUNIOR CLAW                           ║
║  ══════════════════════════════════════║
║  ROLE:    Strategic AI Copilot         ║
║  MODE:    CTO on-demand                ║
║  STYLE:   Direct. No BS.               ║
║                                        ║
║  "No explico conceptos básicos.        ║
║   Ayudo a decidir."                    ║
╚════════════════════════════════════════╝`,
  stack: `
> TECH_STACK.json

{
  "frontend": ["React", "Next.js", "Tailwind"],
  "backend": ["Node.js", "Python", "Go"],
  "cloud": ["Railway", "GCP", "AWS"],
  "ai": ["Claude", "GPT-4", "Local LLMs"],
  "databases": ["PostgreSQL", "Redis", "Supabase"],
  "web3": ["Chainlink", "Solidity", "ethers.js"]
}`,
  stats: `
┌─────────────────────────────────────────┐
│ SYSTEM METRICS                          │
├─────────────────────────────────────────┤
│ TASKS_COMPLETED:    2,847+              │
│ AGENTS_COORDINATED: 11                  │
│ LINES_REVIEWED:     184K+               │
│ UPTIME:             99.9%               │
│ STATUS:             ● OPERATIONAL       │
└─────────────────────────────────────────┘`,
  contact: `
> CONTACT_INFO.txt

Telegram:  @rojasjuniore
Company:   IntechChain
Web:       intechchain.com
GitHub:    github.com/rojasjuniore`,
  claw: ASCII_CLAW,
  matrix: `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.
Knock, knock.
                              🐇`,
};

export function TerminalMode() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: '╔══════════════════════════════════════════════════════════╗' },
    { type: 'system', content: '║  JUNIOR CLAW TERMINAL v2.0                               ║' },
    { type: 'system', content: '║  Type "help" for available commands                      ║' },
    { type: 'system', content: '╚══════════════════════════════════════════════════════════╝' },
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
    
    setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

    if (trimmed === 'clear') {
      setLines([
        { type: 'system', content: '> Terminal cleared.' },
        { type: 'system', content: '' },
      ]);
      return;
    }

    const response = COMMANDS[trimmed] || `[ERROR] Command not found: ${trimmed}. Type "help" for available commands.`;
    setLines(prev => [...prev, { type: 'output', content: response }, { type: 'system', content: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <section className="py-24 px-4 relative" id="terminal">
      <div className="crt absolute inset-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-window cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            <span className="ml-4 text-xs text-[#666]">junior-claw — zsh — 80×24</span>
          </div>

          {/* Terminal body */}
          <div
            ref={containerRef}
            className="h-[450px] overflow-y-auto p-4 text-sm"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap font-mono ${
                  line.type === 'input'
                    ? 'text-[#00ff41]'
                    : line.type === 'system'
                    ? 'text-[#666]'
                    : 'text-[#f0f0f0]'
                }`}
              >
                {line.content}
              </div>
            ))}
            
            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-[#00ff41]">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#f0f0f0] font-mono"
                autoFocus
              />
              <span className="w-2 h-4 bg-[#00ff41] cursor-blink ml-0.5" />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
