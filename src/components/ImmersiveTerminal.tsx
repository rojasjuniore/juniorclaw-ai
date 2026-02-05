'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface TerminalLine {
  type: 'system' | 'input' | 'output' | 'success' | 'error' | 'progress' | 'ascii';
  content: string;
  delay?: number;
}

const ASCII_CLAW = `
     ██╗ ██████╗ 
     ██║██╔════╝ 
     ██║██║      
 ██  ██║██║      
 ╚████╔╝╚██████╗ 
  ╚═══╝  ╚═════╝ 
`;

const BOOT_SEQUENCE: TerminalLine[] = [
  { type: 'system', content: '╔══════════════════════════════════════════════════════════════════╗' },
  { type: 'system', content: '║                                                                  ║' },
  { type: 'ascii', content: ASCII_CLAW },
  { type: 'system', content: '║                     JUNIOR CLAW v2.0                             ║' },
  { type: 'system', content: '║                   Strategic AI Copilot                           ║' },
  { type: 'system', content: '║                                                                  ║' },
  { type: 'system', content: '╚══════════════════════════════════════════════════════════════════╝' },
  { type: 'system', content: '' },
  { type: 'progress', content: '> Initializing neural networks...' },
  { type: 'progress', content: '> Loading decision engine...' },
  { type: 'progress', content: '> Connecting to build systems...' },
  { type: 'success', content: '> System ready.' },
  { type: 'system', content: '' },
  { type: 'output', content: '🦞 Soy Junior Claw. Tu CTO AI.' },
  { type: 'output', content: '' },
  { type: 'output', content: 'No explico conceptos básicos. Ayudo a CONSTRUIR.' },
  { type: 'output', content: '' },
  { type: 'success', content: '¿Qué quieres construir hoy?' },
  { type: 'system', content: '' },
  { type: 'system', content: 'Ejemplos: "una landing page", "un dashboard", "una API REST", "un bot de telegram"' },
  { type: 'system', content: '' },
];

const BUILD_PHASES = [
  { name: 'ANÁLISIS', steps: ['Analizando requerimientos...', 'Identificando componentes clave...', 'Definiendo scope...'] },
  { name: 'ARQUITECTURA', steps: ['Diseñando estructura...', 'Seleccionando stack...', 'Configurando dependencias...'] },
  { name: 'DESARROLLO', steps: ['Generando código base...', 'Implementando features...', 'Optimizando performance...'] },
  { name: 'DEPLOY', steps: ['Preparando build...', 'Subiendo a Railway...', 'Configurando DNS...'] },
];

export function ImmersiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [awaitingInput, setAwaitingInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [awaitingInput]);

  // Boot sequence
  useEffect(() => {
    let index = 0;
    const bootInterval = setInterval(() => {
      if (index < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[index]]);
        index++;
      } else {
        clearInterval(bootInterval);
        setIsBooting(false);
        setAwaitingInput(true);
      }
    }, 100);

    return () => clearInterval(bootInterval);
  }, []);

  const addLine = useCallback((line: TerminalLine) => {
    setLines(prev => [...prev, line]);
  }, []);

  const addLines = useCallback((newLines: TerminalLine[], delayMs: number = 100) => {
    return new Promise<void>((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < newLines.length) {
          setLines(prev => [...prev, newLines[index]]);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, delayMs);
    });
  }, []);

  const simulateBuild = useCallback(async (projectDesc: string) => {
    setIsBuilding(true);
    setAwaitingInput(false);

    // Phase 0: Acknowledge
    await addLines([
      { type: 'system', content: '' },
      { type: 'output', content: `> Entendido. Vamos a construir: "${projectDesc}"` },
      { type: 'system', content: '' },
    ], 150);

    // Call AI for analysis
    addLine({ type: 'progress', content: '> Consultando con el Decision Engine...' });
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ 
            role: 'user', 
            content: `El usuario quiere construir: "${projectDesc}". 
            
Dame un análisis técnico MUY BREVE (máximo 4 líneas) de:
1. Stack recomendado (1 línea)
2. Componentes principales (1 línea)  
3. Tiempo estimado (1 línea)
4. Un consejo clave (1 línea)

Formato: líneas cortas, directo al punto, estilo terminal. No uses markdown.`
          }]
        }),
      });

      const data = await response.json();
      
      await addLines([
        { type: 'system', content: '' },
        { type: 'success', content: '╔═══════════════════ ANÁLISIS ═══════════════════╗' },
        { type: 'system', content: '' },
      ], 100);

      // Add AI response line by line
      const aiLines = data.content.split('\n').filter((l: string) => l.trim());
      for (const line of aiLines) {
        await addLines([{ type: 'output', content: `  ${line}` }], 80);
      }

      await addLines([
        { type: 'system', content: '' },
        { type: 'success', content: '╚════════════════════════════════════════════════╝' },
        { type: 'system', content: '' },
      ], 100);

    } catch {
      addLine({ type: 'error', content: '> Error consultando AI. Continuando con análisis básico...' });
    }

    // Simulate build phases
    for (let phaseIndex = 0; phaseIndex < BUILD_PHASES.length; phaseIndex++) {
      const phase = BUILD_PHASES[phaseIndex];
      setCurrentPhase(phaseIndex + 1);

      await addLines([
        { type: 'system', content: '' },
        { type: 'success', content: `▓▓▓ FASE ${phaseIndex + 1}/4: ${phase.name} ▓▓▓` },
      ], 200);

      for (const step of phase.steps) {
        await addLines([{ type: 'progress', content: `  > ${step}` }], 400);
        // Simulate work
        await new Promise(r => setTimeout(r, 300 + Math.random() * 500));
        await addLines([{ type: 'success', content: `    ✓ Completado` }], 100);
      }
    }

    // Final success
    const fakeUrl = `https://${projectDesc.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)}-production.up.railway.app`;
    
    await addLines([
      { type: 'system', content: '' },
      { type: 'system', content: '═══════════════════════════════════════════════════════════' },
      { type: 'success', content: '' },
      { type: 'success', content: '  ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗     ███████╗████████╗███████╗' },
      { type: 'success', content: ' ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║     ██╔════╝╚══██╔══╝██╔════╝' },
      { type: 'success', content: ' ██║     ██║   ██║██╔████╔██║██████╔╝██║     █████╗     ██║   █████╗  ' },
      { type: 'success', content: ' ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝     ██║   ██╔══╝  ' },
      { type: 'success', content: ' ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ███████╗███████╗   ██║   ███████╗' },
      { type: 'success', content: '  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝   ╚═╝   ╚══════╝' },
      { type: 'success', content: '' },
      { type: 'system', content: '═══════════════════════════════════════════════════════════' },
      { type: 'system', content: '' },
      { type: 'output', content: `  🚀 Tu proyecto está LIVE:` },
      { type: 'success', content: `  ${fakeUrl}` },
      { type: 'system', content: '' },
      { type: 'output', content: '  Tiempo total: ~3 minutos' },
      { type: 'output', content: '  Costo: $0 (free tier Railway)' },
      { type: 'system', content: '' },
      { type: 'system', content: '───────────────────────────────────────────────────────────' },
      { type: 'output', content: '' },
      { type: 'output', content: '  🦞 Eso es lo que hago. Construir. Sin humo.' },
      { type: 'output', content: '' },
      { type: 'success', content: '  ¿Qué más quieres construir?' },
      { type: 'system', content: '' },
    ], 60);

    setIsBuilding(false);
    setCurrentPhase(0);
    setAwaitingInput(true);
  }, [addLine, addLines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isBooting || isBuilding) return;

    const userInput = input.trim();
    setInput('');

    // Add user input to terminal
    addLine({ type: 'input', content: `$ construir "${userInput}"` });

    // Special commands
    if (userInput.toLowerCase() === 'clear') {
      setLines([]);
      setAwaitingInput(true);
      return;
    }

    if (userInput.toLowerCase() === 'help') {
      addLines([
        { type: 'system', content: '' },
        { type: 'output', content: 'Comandos disponibles:' },
        { type: 'system', content: '  [texto]  - Describe qué quieres construir' },
        { type: 'system', content: '  clear    - Limpiar terminal' },
        { type: 'system', content: '  help     - Mostrar ayuda' },
        { type: 'system', content: '' },
      ], 50);
      return;
    }

    // Start build simulation
    setProjectName(userInput);
    simulateBuild(userInput);
  };

  return (
    <div 
      className="min-h-screen bg-black p-2 sm:p-4 md:p-8 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] z-50" />
      
      {/* Terminal container */}
      <div className="max-w-4xl mx-auto">
        {/* Terminal window */}
        <div className="border border-[#1a1a1a] bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,255,65,0.1)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              <span className="ml-4 text-[10px] text-[#666] font-mono">junior-claw — construir</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              {isBuilding && (
                <span className="text-[#ffbd2e] animate-pulse">
                  FASE {currentPhase}/4
                </span>
              )}
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                <span className="text-[#00ff41]">ONLINE</span>
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={containerRef}
            className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] overflow-y-auto p-4 font-mono text-sm"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap leading-relaxed ${
                  line.type === 'input' ? 'text-[#00ff41]' :
                  line.type === 'success' ? 'text-[#00ff41]' :
                  line.type === 'error' ? 'text-[#ff5f56]' :
                  line.type === 'progress' ? 'text-[#ffbd2e]' :
                  line.type === 'output' ? 'text-[#f0f0f0]' :
                  line.type === 'ascii' ? 'text-[#00ff41]' :
                  'text-[#666]'
                }`}
              >
                {line.content}
              </div>
            ))}

            {/* Input line */}
            {awaitingInput && !isBooting && !isBuilding && (
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-[#00ff41]">$ construir "</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#f0f0f0] font-mono"
                  placeholder="describe tu proyecto..."
                  autoFocus
                />
                <span className="text-[#00ff41]">"</span>
                <span className="w-2 h-5 bg-[#00ff41] ml-1 animate-[blink_1s_step-end_infinite]" />
              </form>
            )}

            {/* Building indicator */}
            {isBuilding && (
              <div className="flex items-center mt-2 text-[#ffbd2e]">
                <span className="animate-pulse">{'>'} Construyendo...</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-[#333] font-mono px-2">
          <span>🦞 JUNIOR CLAW v2.0 | STRATEGIC AI COPILOT</span>
          <span>POWERED BY GPT-4o | RAILWAY</span>
        </div>
      </div>
    </div>
  );
}
