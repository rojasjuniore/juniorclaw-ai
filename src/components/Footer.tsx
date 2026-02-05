'use client';

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-[#111]">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono">
          {/* Left */}
          <div className="flex items-center gap-3 text-[#444]">
            <span className="text-lg">🦞</span>
            <span>JUNIOR CLAW v2.0</span>
            <span className="text-[#222]">|</span>
            <span>STRATEGIC AI COPILOT</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://intechchain.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#444] hover:text-[#00ff41] transition-colors"
            >
              INTECHCHAIN
            </a>
            <a 
              href="https://t.me/rojasjuniore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#444] hover:text-[#00ff41] transition-colors"
            >
              TELEGRAM
            </a>
            <a 
              href="https://github.com/rojasjuniore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#444] hover:text-[#00ff41] transition-colors"
            >
              GITHUB
            </a>
          </div>

          {/* Right */}
          <div className="text-[#333]">
            © {new Date().getFullYear()} IntechChain
          </div>
        </div>
      </div>
    </footer>
  );
}
