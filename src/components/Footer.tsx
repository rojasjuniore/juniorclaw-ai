'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, Globe } from 'lucide-react';

const links = [
  { icon: Globe, href: 'https://intechchain.com', label: 'IntechChain' },
  { icon: MessageCircle, href: 'https://t.me/rojasjuniore', label: 'Telegram' },
  { icon: Twitter, href: 'https://twitter.com/rojasjuniore', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/rojasjuniore', label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo/Name */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦞</span>
            <div>
              <h3 className="font-bold text-lg">Junior Claw</h3>
              <p className="text-sm text-muted-foreground">Strategic AI Copilot</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IntechChain. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
