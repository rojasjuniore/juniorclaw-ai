import { Hero } from '@/components/Hero';
import { ClientsGrid } from '@/components/ClientsGrid';
import { DecisionEngine } from '@/components/DecisionEngine';
import { LiveStats } from '@/components/LiveStats';
import { TerminalMode } from '@/components/TerminalMode';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ClientsGrid />
      <LiveStats />
      <DecisionEngine />
      <TerminalMode />
      <Footer />
    </main>
  );
}
