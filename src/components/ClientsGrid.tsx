'use client';

import { motion } from 'framer-motion';
import { clients, categoryLabels, type Client } from '@/lib/clients';
import { ExternalLink } from 'lucide-react';

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <motion.a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative flex items-center justify-center p-6 rounded-lg bg-secondary/50 border border-border hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300"
    >
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {client.name}
      </span>
      <ExternalLink className="absolute top-2 right-2 w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
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
    <section className="py-24 px-4" id="track-record">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Track Record <span className="gradient-text">Comprobado</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experiencia real con empresas, plataformas y entidades que mueven el ecosistema
          </p>
        </motion.div>

        {Object.entries(groupedClients).map(([category, categoryClients]) => (
          <div key={category} className="mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-4"
            >
              {categoryLabels[category as Client['category']]}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categoryClients.map((client, index) => (
                <ClientCard key={client.name} client={client} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
