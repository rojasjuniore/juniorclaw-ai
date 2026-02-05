import { TerminalHero } from '@/components/TerminalHero';
import { ClientLogos } from '@/components/ClientLogos';
import { Stats } from '@/components/Stats';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <TerminalHero />
      <ClientLogos />
      <Stats />
      <Footer />
    </main>
  );
}
