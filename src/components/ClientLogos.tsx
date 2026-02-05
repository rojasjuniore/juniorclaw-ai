'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Client {
  name: string;
  url: string;
  logo: string;
  category: 'fintech' | 'infra' | 'public';
}

const clients: Client[] = [
  // Fintech / Web3
  { name: 'Chainlink', url: 'https://chain.link', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png', category: 'fintech' },
  { name: 'Gnosis Pay', url: 'https://gnosispay.com', logo: 'https://docs.gnosischain.com/img/tokens/gno.png', category: 'fintech' },
  { name: 'Sumsub', url: 'https://sumsub.com', logo: 'https://sumsub.com/favicon.ico', category: 'fintech' },
  { name: 'Changelly', url: 'https://changelly.com', logo: 'https://changelly.com/icons/favicon-96x96.png', category: 'fintech' },
  { name: 'Elliptic', url: 'https://elliptic.co', logo: 'https://www.elliptic.co/hubfs/Elliptic%20September%202022/Images/elliptic-logo.svg', category: 'fintech' },
  { name: 'Web3Auth', url: 'https://web3auth.io', logo: 'https://web3auth.io/images/web3authlog.png', category: 'fintech' },
  
  // Infra
  { name: 'Google Cloud', url: 'https://cloud.google.com', logo: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg', category: 'infra' },
  { name: 'Firebase', url: 'https://firebase.google.com', logo: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/firebase/images/touchicon-180.png', category: 'infra' },
  { name: 'Railway', url: 'https://railway.app', logo: 'https://railway.app/brand/logo-light.png', category: 'infra' },
  { name: 'Twilio', url: 'https://twilio.com', logo: 'https://www.twilio.com/assets/icons/twilio-icon-512.png', category: 'infra' },
  
  // Public
  { name: 'Alcaldía de Medellín', url: 'https://medellin.gov.co', logo: 'https://www.medellin.gov.co/assets/images/logo-alcaldia-medellin.svg', category: 'public' },
  { name: 'Alcaldía de Envigado', url: 'https://envigado.gov.co', logo: 'https://www.envigado.gov.co/images/logo-envigado.png', category: 'public' },
];

const categoryLabels = {
  fintech: 'FINTECH & WEB3',
  infra: 'INFRAESTRUCTURA',
  public: 'SECTOR PÚBLICO',
};

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

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {categoryClients.map((client, i) => (
                <motion.a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-center justify-center p-4 border border-[#1a1a1a] hover:border-[#00ff41]/50 bg-[#0a0a0a] hover:bg-[#0a0a0a]/80 transition-all aspect-square"
                >
                  <div className="relative w-10 h-10 mb-2 opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[9px] text-[#555] group-hover:text-[#888] font-mono text-center leading-tight">
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
