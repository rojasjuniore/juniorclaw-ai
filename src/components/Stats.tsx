'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { key: 'tasks', label: 'TAREAS', value: 2847, suffix: '+' },
  { key: 'agents', label: 'AGENTES', value: 11, suffix: '' },
  { key: 'lines', label: 'LÍNEAS', value: 184, suffix: 'K' },
  { key: 'uptime', label: 'UPTIME', value: 99.9, suffix: '%' },
];

export function Stats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 px-4 border-t border-[#111]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 justify-center mb-8"
        >
          <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse" />
          <span className="text-[10px] text-[#00ff41] font-mono tracking-wider">LIVE METRICS</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 border border-[#1a1a1a] bg-[#050505]"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#00ff41] mb-1">
                {mounted ? stat.value : '—'}{stat.suffix}
              </div>
              <div className="text-[10px] text-[#555] font-mono tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-[#444] text-xs font-mono">
            Sistema operativo 24/7 · Powered by GPT-4o · Deploy en Railway
          </p>
        </motion.div>
      </div>
    </section>
  );
}
