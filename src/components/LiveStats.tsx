'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
  key: string;
}

export function LiveStats() {
  const [stats, setStats] = useState<Stat[]>([
    { key: 'tasks', label: 'TASKS_COMPLETED', value: '2847' },
    { key: 'agents', label: 'AGENTS_ONLINE', value: '11' },
    { key: 'lines', label: 'LINES_REVIEWED', value: '184291' },
    { key: 'decisions', label: 'DECISIONS_TODAY', value: '47' },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.key === 'tasks') {
          const current = parseInt(stat.value);
          return { ...stat, value: String(current + Math.floor(Math.random() * 2)) };
        }
        if (stat.key === 'decisions') {
          const current = parseInt(stat.value);
          const newVal = current + (Math.random() > 0.7 ? 1 : 0);
          return { ...stat, value: String(newVal) };
        }
        return stat;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 border-y border-[#1a1a1a] relative">
      <div className="crt absolute inset-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-2 h-2 bg-[#00ff41] animate-pulse" />
          <span className="text-[#00ff41] text-xs uppercase tracking-wider">LIVE METRICS</span>
          <span className="text-[#333] text-xs">// real-time system status</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-[#1a1a1a] p-4 hover:border-[#00ff41]/50 transition-colors"
            >
              <div className="text-[#666] text-[10px] uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <div className="text-[#00ff41] text-2xl md:text-3xl font-bold glow-matrix-subtle">
                {parseInt(stat.value).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex items-center justify-between text-[10px] text-[#666]"
        >
          <span>LAST_UPDATE: {new Date().toISOString()}</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </motion.div>
      </div>
    </section>
  );
}
