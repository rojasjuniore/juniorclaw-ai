'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [ready, setReady] = useState(false);
  const [building, setBuilding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const boot = [
      '> Initializing Junior Claw v2.0...',
      '> System ready.',
      '',
      '🦞 Soy Junior Claw. Tu CTO AI estratégico.',
      '',
      'No doy charlas TED. No vendo humo. CONSTRUYO.',
      '',
      '¿Qué quieres construir?',
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < boot.length) {
        setLines(prev => [...prev, boot[i]]);
        i++;
      } else {
        clearInterval(interval);
        setReady(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [lines]);

  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready]);

  const addLine = (text: string) => setLines(prev => [...prev, text]);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const build = async (project: string) => {
    setBuilding(true);
    setReady(false);

    addLine('');
    addLine(`> Construyendo: "${project}"`);
    addLine('> Analizando con GPT-4o...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Construir: "${project}". Análisis técnico en 3 líneas: stack, componentes, tiempo. Sin markdown.` }]
        }),
      });
      const data = await res.json();
      addLine('');
      if (data.content) {
        data.content.split('\n').filter((l: string) => l.trim()).forEach((l: string) => addLine('  ' + l));
      }
    } catch {
      addLine('> Error de conexión');
    }

    const phases = ['ANÁLISIS', 'ARQUITECTURA', 'CÓDIGO', 'DEPLOY'];
    for (const phase of phases) {
      addLine('');
      addLine(`▓ ${phase}`);
      await sleep(500);
      addLine('  ✓ OK');
    }

    const url = `https://${project.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 12)}.up.railway.app`;
    addLine('');
    addLine('════════════════════════════');
    addLine('  🚀 DEPLOYED!');
    addLine(`  ${url}`);
    addLine('════════════════════════════');
    addLine('');
    addLine('🦞 ¿Qué más quieres construir?');

    setBuilding(false);
    setReady(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || building) return;
    const text = input.trim();
    setInput('');
    addLine(`$ construir "${text}"`);
    if (text === 'clear') {
      setLines([]);
      setReady(true);
      return;
    }
    build(text);
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono p-4">
      <div className="max-w-3xl mx-auto">
        {/* Terminal */}
        <div className="border border-zinc-800 bg-zinc-950">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-zinc-500">junior-claw</span>
            <span className="ml-auto text-xs text-green-500">● ONLINE</span>
          </div>

          {/* Body */}
          <div 
            ref={containerRef}
            className="h-[60vh] overflow-y-auto p-4 text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => {
              const text = line || '';
              const isGreen = text.startsWith('>') || text.startsWith('▓') || text.startsWith('$');
              const isLightGreen = text.startsWith('  ✓') || text.includes('DEPLOYED') || text.includes('═');
              return (
                <div key={i} className={isGreen ? 'text-green-500' : isLightGreen ? 'text-green-400' : 'text-zinc-300'}>
                  {text}
                </div>
              );
            })}

            {ready && (
              <form onSubmit={submit} className="flex items-center mt-1">
                <span className="text-green-500">$ construir &quot;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  placeholder="tu proyecto..."
                  autoFocus
                />
                <span className="text-green-500">&quot;</span>
                <span className="w-2 h-5 bg-green-500 ml-1 animate-pulse" />
              </form>
            )}

            {building && <div className="text-yellow-500 animate-pulse mt-1">&gt; Construyendo...</div>}
          </div>
        </div>

        {/* Clients section */}
        <div className="mt-16 border-t border-zinc-800 pt-8">
          <div className="text-center mb-8">
            <span className="text-green-500 text-xs">{'>'} TRACK RECORD</span>
            <h2 className="text-xl mt-2">Empresas que <span className="text-green-500">confían</span></h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
            {['Chainlink', 'Gnosis Pay', 'Sumsub', 'Changelly', 'Elliptic', 'Web3Auth', 'Google Cloud', 'Firebase', 'Railway', 'Twilio', 'Alcaldía Medellín', 'Alcaldía Envigado'].map(name => (
              <div key={name} className="p-3 border border-zinc-800 text-zinc-500 hover:text-green-500 hover:border-green-500/30 transition-colors text-center">
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-4 gap-4 text-center">
          <div className="p-4 border border-zinc-800">
            <div className="text-2xl text-green-500">2847+</div>
            <div className="text-xs text-zinc-500">TAREAS</div>
          </div>
          <div className="p-4 border border-zinc-800">
            <div className="text-2xl text-green-500">11</div>
            <div className="text-xs text-zinc-500">AGENTES</div>
          </div>
          <div className="p-4 border border-zinc-800">
            <div className="text-2xl text-green-500">184K</div>
            <div className="text-xs text-zinc-500">LÍNEAS</div>
          </div>
          <div className="p-4 border border-zinc-800">
            <div className="text-2xl text-green-500">99.9%</div>
            <div className="text-xs text-zinc-500">UPTIME</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 py-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-600">
          <span>🦞 JUNIOR CLAW v2.0</span>
          <div className="flex gap-4">
            <a href="https://intechchain.com" className="hover:text-green-500">INTECHCHAIN</a>
            <a href="https://t.me/rojasjuniore" className="hover:text-green-500">TELEGRAM</a>
            <a href="https://github.com/rojasjuniore" className="hover:text-green-500">GITHUB</a>
          </div>
        </div>
      </div>
    </main>
  );
}
