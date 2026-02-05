import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const mono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Junior Claw | Strategic AI Copilot',
  description: 'Tu CTO AI en 60 segundos. Copiloto estratégico para decisiones reales, sin humo.',
  keywords: ['AI', 'CTO', 'copilot', 'strategic', 'decision making', 'tech lead'],
  authors: [{ name: 'IntechChain' }],
  openGraph: {
    title: 'Junior Claw | Strategic AI Copilot',
    description: 'Tu CTO AI en 60 segundos. Decisiones reales, sin humo.',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Junior Claw | Strategic AI Copilot',
    description: 'Tu CTO AI en 60 segundos. Decisiones reales, sin humo.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${mono.variable} font-mono antialiased bg-black text-[#f0f0f0]`}>
        {children}
      </body>
    </html>
  );
}
