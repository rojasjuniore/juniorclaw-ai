'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ASCII_CLAW = `
    ██╗ ██████╗
    ██║██╔════╝
    ██║██║     
██  ██║██║     
╚████╔╝╚██████╗
 ╚═══╝  ╚═════╝
`;

const BOOT_SEQUENCE = [
  '> INITIALIZING SYSTEM...',
  '> LOADING NEURAL NETWORKS...',
  '> CONNECTING TO STRATEGIC CORE...',
  '> CALIBRATING DECISION ENGINE...',
  '> SYSTEM READY.',
  '',
  '> WELCOME TO JUNIOR CLAW v2.0',
  '> STRATEGIC AI COPILOT',
  '',
];

const COMMANDS = [
  { cmd: '$ whoami', output: 'junior_claw // CTO AI Estratégico' },
  { cmd: '$ cat /etc/mission', output: 'Decisiones reales. Sin humo. Sin motivacional vacío.' },
  { cmd: '$ uptime', output: 'Online 24/7 | 2,847+ tareas completadas | 11 agentes coordinados' },
];

export function Hero() {
  const [bootIndex, setBootIndex] = useState(0);
  const [showCommands, setShowCommands] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (bootIndex < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setBootIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setShowCommands(true);
    }
  }, [bootIndex]);

  useEffect(() => {
    if (showCommands && commandIndex < COMMANDS.length) {
      const timer = setTimeout(() => {
        setCommandIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (commandIndex >= COMMANDS.length) {
      setIsTyping(false);
    }
  }, [showCommands, commandIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="crt absolute inset-0 pointer-events-none" />
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal-window"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            <span className="ml-4 text-xs text-[#666]">junior-claw@strategic-core ~ </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 min-h-[500px] font-mono text-sm">
            {/* ASCII Art */}
            <pre className="ascii-art mb-6 text-center">{ASCII_CLAW}</pre>

            {/* Boot sequence */}
            <div className="mb-6">
              {BOOT_SEQUENCE.slice(0, bootIndex).map((line, i) => (
                <div 
                  key={i} 
                  className={`${line.includes('SYSTEM READY') ? 'text-[#00ff41] glow-matrix-subtle' : 'text-[#666]'}`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Commands */}
            {showCommands && (
              <div className="space-y-4">
                {COMMANDS.slice(0, commandIndex).map((item, i) => (
                  <div key={i}>
                    <div className="text-[#00ff41]">{item.cmd}</div>
                    <div className="text-[#f0f0f0] pl-2">{item.output}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Blinking cursor */}
            {isTyping && (
              <div className="flex items-center mt-4">
                <span className="text-[#00ff41]">$ </span>
                <span className="w-2 h-5 bg-[#00ff41] cursor-blink ml-1" />
              </div>
            )}

            {/* CTA after boot */}
            {!isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-4"
              >
                <div className="text-[#666]">{'>'} Available commands:</div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => document.getElementById('decision-engine')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all text-sm"
                  >
                    [1] DECISION_ENGINE
                  </button>
                  <button
                    onClick={() => document.getElementById('track-record')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all text-sm"
                  >
                    [2] TRACK_RECORD
                  </button>
                  <button
                    onClick={() => document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all text-sm"
                  >
                    [3] TERMINAL
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
