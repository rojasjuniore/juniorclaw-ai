'use client';

import { motion } from 'framer-motion';

interface Client {
  name: string;
  url: string;
  category: 'fintech' | 'infra' | 'public';
}

const clients: Client[] = [
  // Fintech / Web3
  { name: 'Chainlink', url: 'https://chain.link', category: 'fintech' },
  { name: 'Gnosis Pay', url: 'https://gnosispay.com', category: 'fintech' },
  { name: 'Sumsub', url: 'https://sumsub.com', category: 'fintech' },
  { name: 'Changelly', url: 'https://changelly.com', category: 'fintech' },
  { name: 'Elliptic', url: 'https://elliptic.co', category: 'fintech' },
  { name: 'Web3Auth', url: 'https://web3auth.io', category: 'fintech' },
  { name: 'Minteo', url: 'https://minteo.com', category: 'fintech' },
  { name: 'Punto Red', url: 'https://puntored.co', category: 'fintech' },
  
  // Infra
  { name: 'Google Cloud', url: 'https://cloud.google.com', category: 'infra' },
  { name: 'Firebase', url: 'https://firebase.google.com', category: 'infra' },
  { name: 'Railway', url: 'https://railway.app', category: 'infra' },
  { name: 'Twilio', url: 'https://twilio.com', category: 'infra' },
  { name: 'Voltage', url: 'https://voltage.cloud', category: 'infra' },
  
  // Public
  { name: 'Alcaldía Medellín', url: 'https://medellin.gov.co', category: 'public' },
  { name: 'Alcaldía Envigado', url: 'https://envigado.gov.co', category: 'public' },
  { name: 'Alcaldía Itagüí', url: 'https://itagui.gov.co', category: 'public' },
  { name: 'Alcaldía Bello', url: 'https://bello.gov.co', category: 'public' },
  { name: 'Alcaldía Rionegro', url: 'https://rionegro.gov.co', category: 'public' },
];

const categoryLabels = {
  fintech: 'FINTECH & WEB3',
  infra: 'INFRAESTRUCTURA',
  public: 'SECTOR PÚBLICO',
};

function getFavicon(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
}

export function ClientLogos() {
  const grouped = {
    fintech: clients.filter(c => c.category === 'fintech'),
    infra: clients.filter(c => c.category === 'infra'),
    public: clients.filter(c => c.category === 'public'),
  };

  return (
    <section className="py-20 px-4 border-t border-[#111]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#1a1a1a] text-[10px] text-[#00ff41] font-mono mb-4">
            <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full" />
            TRACK RECORD
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Empresas que <span className="text-[#00ff41]">confían</span>
          </h2>
          <p className="text-[#666] text-sm font-mono">
            // Experiencia real, no teoría
          </p>
        </motion.div>

        {/* Categories */}
        {Object.entries(grouped).map(([category, categoryClients]) => (
          <div key={category} className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-[#00ff41] text-xs font-mono">{'>'}</span>
              <span className="text-[#00ff41] text-xs font-mono tracking-wider">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </span>
              <span className="flex-1 h-px bg-[#1a1a1a] ml-4" />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categoryClients.map((client, i) => (
                <motion.a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-3 p-3 border border-[#1a1a1a] hover:border-[#00ff41]/50 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getFavicon(client.url) || ''}
                    alt=""
                    className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <span className="text-[11px] text-[#666] group-hover:text-[#aaa] font-mono truncate">
                    {client.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
