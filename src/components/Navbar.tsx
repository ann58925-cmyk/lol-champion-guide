import React from 'react';
import { Sparkles, Dna } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  onRandomPick: () => void;
  onOpenCompare: () => void;
  compareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRandomPick,
  onOpenCompare,
  compareCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#040914]/90 backdrop-blur-md border-b border-[#c8aa6e]/20 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg md:text-xl font-bold tracking-widest text-[#f0e6d2] font-cinzel whitespace-nowrap shrink-0 group"
        >
          <span className="w-2.5 h-2.5 rotate-45 bg-[#c8aa6e] group-hover:bg-[#0ac8b9] transition-colors shadow-[0_0_8px_#c8aa6e]"></span>
          <span>LEAGUE OF LEGENDS</span>
          <span className="hidden sm:inline text-xs font-normal tracking-wider text-[#c8aa6e] font-sans ml-1">
            英雄圖鑑
          </span>
        </a>

        {/* Zone 2: Single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#94a3b8]">
          <a
            href="#roster"
            className="hover:text-[#f0e6d2] transition-colors whitespace-nowrap shrink-0"
          >
            英雄名冊
          </a>
          <a
            href="#roles"
            className="hover:text-[#f0e6d2] transition-colors whitespace-nowrap shrink-0"
          >
            職業定位
          </a>
          <a
            href="#lanes"
            className="hover:text-[#f0e6d2] transition-colors whitespace-nowrap shrink-0"
          >
            分路導覽
          </a>
          <button
            onClick={() => {
              sounds.playSlash();
              onOpenCompare();
            }}
            className="hover:text-[#f0e6d2] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>英雄對比</span>
            {compareCount > 0 && (
              <span className="text-[11px] font-mono px-1.5 py-0.2 bg-[#c8aa6e] text-[#040914] font-bold rounded">
                {compareCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sounds.playLockIn();
              onRandomPick();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold tracking-wider text-[#040914] bg-gradient-to-r from-[#c89b3c] via-[#f0e6d2] to-[#c8aa6e] rounded hover:brightness-110 active:scale-95 transition-all shadow-[0_0_14px_rgba(200,170,110,0.3)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>隨機選角</span>
          </button>
        </div>
      </div>
    </header>
  );
};
