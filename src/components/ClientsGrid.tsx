'use client';

import { motion } from 'framer-motion';
import { clients, categoryLabels, type Client } from '@/lib/clients';

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <motion.a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: index * 0.02 }}
      viewport={{ once: true }}
      className="group px-3 py-2 border border-[#1a1a1a] hover:border-[#00ff41] hover:bg-[#00ff41]/5 transition-all text-xs"
    >
      <span className="text-[#666] group-hover:text-[#00ff41] transition-colors">
        {client.name}
      </span>
    </motion.a>
  );
}

export function ClientsGrid() {
  const groupedClients = {
    fintech: clients.filter(c => c.category === 'fintech'),
    infra: clients.filter(c => c.category === 'infra'),
    public: clients.filter(c => c.category === 'public'),
  };

  return (
    <section className="py-24 px-4 relative" id="track-record">
      {/* Scanlines */}
      <div className="crt absolute inset-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header - terminal style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="terminal-window mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d]">
            <span className="text-xs text-[#666]">track_record.log</span>
          </div>
          <div className="p-4">
            <div className="text-[#00ff41] text-sm">$ cat ./experience/clients.json</div>
            <div className="text-[#666] text-xs mt-2"># Empresas y entidades con las que he trabajado</div>
          </div>
        </motion.div>

        {Object.entries(groupedClients).map(([category, categoryClients]) => (
          <div key={category} className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="text-[#00ff41] text-xs">{'>'}</span>
              <span className="text-[#00ff41] text-xs uppercase tracking-wider">
                {categoryLabels[category as Client['category']]}
              </span>
              <span className="text-[#333] text-xs">// {categoryClients.length} entries</span>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {categoryClients.map((client, index) => (
                <ClientCard key={client.name} client={client} index={index} />
              ))}
            </div>
          </div>
        ))}

        {/* Stats line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-4 border-t border-[#1a1a1a] text-xs text-[#666]"
        >
          <span className="text-[#00ff41]">EOF</span> | Total: {clients.length} organizaciones | Sectores: Fintech, Infra, Público
        </motion.div>
      </div>
    </section>
  );
}
