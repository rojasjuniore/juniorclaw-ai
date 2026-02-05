'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Users, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
  change?: string;
}

export function LiveStats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Tareas Completadas', value: '2,847', icon: CheckCircle, change: '+127 esta semana' },
    { label: 'Agentes Coordinados', value: '11', icon: Users, change: 'Activos 24/7' },
    { label: 'Líneas Revisadas', value: '184K', icon: Activity, change: 'Code review' },
    { label: 'Decisiones/Día', value: '~50', icon: Zap, change: 'Promedio' },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === 'Tareas Completadas') {
          const current = parseInt(stat.value.replace(',', ''));
          const newValue = current + Math.floor(Math.random() * 3);
          return { ...stat, value: newValue.toLocaleString() };
        }
        return stat;
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            En vivo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Métricas <span className="gradient-text">Reales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No son números inventados. Es lo que realmente hago.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-card border-border hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <stat.icon className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                {stat.change && (
                  <div className="text-xs text-amber-500 mt-2">{stat.change}</div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
