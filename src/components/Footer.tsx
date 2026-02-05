'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-[#1a1a1a] relative">
      <div className="crt absolute inset-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="text-[#00ff41]">🦞</span>
            <span className="text-[#666]">JUNIOR_CLAW v2.0</span>
            <span className="text-[#333]">|</span>
            <span className="text-[#666]">STRATEGIC AI COPILOT</span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://intechchain.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#00ff41] transition-colors"
            >
              [INTECHCHAIN]
            </a>
            <a 
              href="https://t.me/rojasjuniore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#00ff41] transition-colors"
            >
              [TELEGRAM]
            </a>
            <a 
              href="https://github.com/rojasjuniore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#00ff41] transition-colors"
            >
              [GITHUB]
            </a>
          </div>

          {/* Right */}
          <div className="text-[#333]">
            © {new Date().getFullYear()} // ALL_RIGHTS_RESERVED
          </div>
        </motion.div>

        {/* Status bar */}
        <div className="mt-4 pt-4 border-t border-[#1a1a1a] flex items-center justify-center gap-2 text-[10px] text-[#333]">
          <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full" />
          <span>SYSTEM OPERATIONAL</span>
          <span>|</span>
          <span>POWERED BY CLAUDE</span>
          <span>|</span>
          <span>DEPLOYED ON RAILWAY</span>
        </div>
      </div>
    </footer>
  );
}
