'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface TerminalLine {
  type: 'system' | 'input' | 'output' | 'success' | 'error' | 'progress';
  content: string;
}

const BOOT_LINES: TerminalLine[] = [
  { type: 'system', content: '> Initializing Junior Claw v2.0...' },
  { type: 'success', content: '> System ready.' },
  { type: 'system', content: '' },
  { type: 'output', content: '🦞 Soy Junior Claw. Tu CTO AI estratégico.' },
  { type: 'output', content: '' },
  { type: 'output', content: 'No doy charlas TED. No vendo humo. CONSTRUYO.' },
  { type: 'system', content: '' },
  { type: 'success', content: '¿Qué quieres construir?' },
];

const BUILD_PHASES = ['ANÁLISIS', 'ARQUITECTURA', 'CÓDIGO', 'DEPLOY'];

export function TerminalHero() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    let i = 0;
    const bootLines = [...BOOT_LINES];
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        if (line) {
          setLines(prev => [...prev, line]);
        }
        i++;
      } else {
        clearInterval(interval);
        setIsBooting(false);
        setReady(true);
        inputRef.current?.focus();
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const addLine = useCallback((line: TerminalLine) => {
    if (line && line.type && typeof line.content === 'string') {
      setLines(prev => [...prev, line]);
    }
  }, []);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const simulateBuild = useCallback(async (project: string) => {
    setIsBuilding(true);
    setReady(false);

    addLine({ type: 'system', content: '' });
    addLine({ type: 'output', content: `> Construyendo: "${project}"` });

    // Consultar AI
    addLine({ type: 'progress', content: '> Analizando con GPT-4o...' });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Quiero construir: "${project}". Dame un análisis técnico en 3 líneas máximo: stack recomendado, componentes clave, y tiempo estimado. Estilo terminal, sin markdown.`
          }]
        }),
      });
      const data = await res.json();
      
      addLine({ type: 'system', content: '' });
      if (data.content) {
        const responseLines = data.content.split('\n').filter((l: string) => l && l.trim());
        for (const line of responseLines) {
          addLine({ type: 'output', content: `  ${line}` });
        }
      }
    } catch {
      addLine({ type: 'error', content: '> Error de conexión' });
    }

    // Simular fases
    for (let p = 0; p < BUILD_PHASES.length; p++) {
      setPhase(p + 1);
      addLine({ type: 'system', content: '' });
      addLine({ type: 'success', content: `▓ ${BUILD_PHASES[p]}` });
      await sleep(600 + Math.random() * 400);
      addLine({ type: 'success', content: '  ✓ Completado' });
    }

    // Final
    const slug = project.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15);
    const url = `https://${slug}.up.railway.app`;
    addLine({ type: 'system', content: '' });
    addLine({ type: 'success', content: '════════════════════════════════════' });
    addLine({ type: 'success', content: '  🚀 DEPLOYED!' });
    addLine({ type: 'output', content: `  ${url}` });
    addLine({ type: 'success', content: '════════════════════════════════════' });
    addLine({ type: 'system', content: '' });
    addLine({ type: 'output', content: '🦞 Eso es lo que hago. ¿Qué más?' });

    setIsBuilding(false);
    setPhase(0);
    setReady(true);
    inputRef.current?.focus();
  }, [addLine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isBooting || isBuilding) return;
    
    const text = input.trim();
    setInput('');
    addLine({ type: 'input', content: `$ construir "${text}"` });
    
    if (text === 'clear') {
      setLines([]);
      setReady(true);
      return;
    }
    
    simulateBuild(text);
  };

  return (
    <section className="min-h-screen flex flex-col relative">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] z-50" />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Terminal */}
          <div 
            className="border border-[#1a1a1a] bg-[#050505] shadow-[0_0_60px_rgba(0,255,65,0.08)] cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#0a0a0a]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                <span className="ml-3 text-[10px] text-[#444] font-mono">junior-claw</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                {isBuilding && <span className="text-[#ffbd2e]">FASE {phase}/4</span>}
                <span className="text-[#00ff41] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>

            {/* Body */}
            <div ref={containerRef} className="h-[50vh] max-h-[400px] overflow-y-auto p-4 font-mono text-sm">
              {lines.map((line, i) => {
                if (!line || !line.type) return null;
                return (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.type === 'input' ? 'text-[#00ff41]' :
                      line.type === 'success' ? 'text-[#00ff41]' :
                      line.type === 'error' ? 'text-[#ff5f56]' :
                      line.type === 'progress' ? 'text-[#ffbd2e]' :
                      line.type === 'output' ? 'text-[#e0e0e0]' :
                      'text-[#555]'
                    }`}
                  >
                    {line.content || ''}
                  </div>
                );
              })}

              {ready && (
                <form onSubmit={handleSubmit} className="flex items-center mt-1">
                  <span className="text-[#00ff41]">$ construir &quot;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
                    placeholder="tu proyecto..."
                  />
                  <span className="text-[#00ff41]">&quot;</span>
                  <span className="w-2 h-5 bg-[#00ff41] ml-1 animate-[blink_1s_step-end_infinite]" />
                </form>
              )}

              {isBuilding && (
                <div className="text-[#ffbd2e] animate-pulse mt-1">&gt; Construyendo...</div>
              )}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-8 flex flex-col items-center text-[#333] animate-bounce">
            <span className="text-[10px] font-mono mb-1">SCROLL</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
