export interface Client {
  name: string;
  url: string;
  category: 'fintech' | 'infra' | 'public';
}

export const clients: Client[] = [
  // Fintech / Web3
  { name: 'IntechChain', url: 'https://intechchain.com/', category: 'fintech' },
  { name: 'Niiopay', url: 'https://niiopay.com/', category: 'fintech' },
  { name: 'Futswap', url: 'https://futswap.io/', category: 'fintech' },
  { name: 'DeepCapitals', url: 'https://deepcapitals.com/', category: 'fintech' },
  { name: 'Premium Trading Journal', url: 'https://premiumtradingjournal.com/', category: 'fintech' },
  { name: 'Gnosis Pay', url: 'https://gnosispay.com/', category: 'fintech' },
  { name: 'Sumsub', url: 'https://sumsub.com/', category: 'fintech' },
  { name: 'Minteo', url: 'https://minteo.com/', category: 'fintech' },
  { name: 'Punto Red', url: 'https://puntored.co/', category: 'fintech' },
  { name: 'Changelly', url: 'https://changelly.com/', category: 'fintech' },
  { name: 'Elliptic', url: 'https://www.elliptic.co/', category: 'fintech' },
  { name: 'Chainlink', url: 'https://chain.link/', category: 'fintech' },
  { name: 'Web3Auth', url: 'https://web3auth.io/', category: 'fintech' },
  
  // Infrastructure
  { name: 'Google Cloud', url: 'https://cloud.google.com/', category: 'infra' },
  { name: 'Firebase', url: 'https://firebase.google.com/', category: 'infra' },
  { name: 'Railway', url: 'https://railway.app/', category: 'infra' },
  { name: 'Twilio', url: 'https://www.twilio.com/', category: 'infra' },
  { name: 'Voltage', url: 'https://voltage.cloud/', category: 'infra' },
  
  // Public Sector
  { name: 'Alcaldía de Medellín', url: 'https://www.medellin.gov.co/', category: 'public' },
  { name: 'Alcaldía de Envigado', url: 'https://www.envigado.gov.co/', category: 'public' },
  { name: 'Alcaldía de Itagüí', url: 'https://www.itagui.gov.co/', category: 'public' },
  { name: 'Alcaldía de Bello', url: 'https://www.bello.gov.co/', category: 'public' },
  { name: 'Alcaldía de Rionegro', url: 'https://www.rionegro.gov.co/', category: 'public' },
];

export const categoryLabels: Record<Client['category'], string> = {
  fintech: 'Fintech & Web3',
  infra: 'Infrastructure',
  public: 'Public Sector',
};
