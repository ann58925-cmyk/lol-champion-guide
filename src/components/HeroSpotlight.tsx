import React from 'react';
import { Champion } from '../data/champions';
import { Shield, Sparkles, Sword, Play, Volume2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroSpotlightProps {
  featured: Champion;
  onSelectChampion: (champion: Champion) => void;
  onExploreRoster: () => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  featured,
  onSelectChampion,
  onExploreRoster,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#c8aa6e]/20 bg-[#02060d]">
      {/* Background panoramic art */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_runeterra_rift_1793190128792.jpg"
          alt="Summoner's Rift Battlefield"
          className="w-full h-full object-cover object-center opacity-30 md:opacity-40 scale-105"
        />
        {/* Measured scrim gradients for WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03080e] via-[#03080e]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03080e] via-[#03080e]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading and narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#c8aa6e] uppercase">
              <span className="w-1.5 h-1.5 bg-[#c8aa6e] rotate-45"></span>
              <span>RUNETERRA CHAMPIONS SHOWCASE</span>
              <span className="text-[#64748b]">·</span>
              <span className="text-[#94a3b8]">召喚峽谷英雄指南</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f0e6d2] tracking-tight font-cinzel leading-tight text-balance">
              掌控符文大地傳奇力量
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c89b3c] via-[#f0e6d2] to-[#0ac8b9] mt-2">
                洞悉英雄定位與戰技
              </span>
            </h1>

            <p className="text-base md:text-lg text-[#94a3b8] max-w-xl leading-relaxed">
              從刺客的致命瞬殺到坦克的堅韌壁壘，全面解析英雄技能機制、裝備流派與分路對位技巧，助你在每一場對決中鎖定勝局。
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sounds.playSlash();
                  onExploreRoster();
                }}
                className="px-6 py-3 bg-[#c8aa6e] hover:bg-[#d9b878] text-[#040914] font-bold text-sm tracking-wider rounded transition-all shadow-[0_0_20px_rgba(200,170,110,0.35)] cursor-pointer whitespace-nowrap"
              >
                瀏覽全部英雄
              </button>

              <button
                onClick={() => {
                  sounds.playLockIn();
                  onSelectChampion(featured);
                }}
                className="px-6 py-3 border border-[#c8aa6e]/40 hover:border-[#c8aa6e] bg-[#091428]/80 hover:bg-[#091428] text-[#f0e6d2] font-semibold text-sm tracking-wider rounded transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-[#c8aa6e]" />
                <span>查看今日焦點：{featured.name}</span>
              </button>
            </div>

            {/* Quiet metadata strip with typographic separators */}
            <div className="pt-4 flex items-center flex-wrap gap-4 text-xs text-[#94a3b8]">
              <span>6 大核心戰術定位</span>
              <span aria-hidden="true">·</span>
              <span>5 條專業分路指南</span>
              <span aria-hidden="true">·</span>
              <span>100% 官方技能數據庫</span>
            </div>
          </div>

          {/* Right Column: Featured Champion Glass Card */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-xl border border-[#c8aa6e]/30 bg-gradient-to-b from-[#0c192d]/90 to-[#040b15]/95 p-6 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-[#c8aa6e]/70">
              {/* Corner Hextech accent triangles */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c8aa6e]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c8aa6e]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c8aa6e]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c8aa6e]" />

              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#c8aa6e]/40 shrink-0 bg-[#091428]">
                  <img
                    src={featured.thumbnail}
                    alt={featured.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#c8aa6e] tracking-widest uppercase font-semibold">
                    今日精選焦點英雄
                  </div>
                  <h3 className="text-2xl font-bold text-[#f0e6d2] font-cinzel">
                    {featured.name} <span className="text-sm text-[#94a3b8] font-sans font-normal">/ {featured.enName}</span>
                  </h3>
                  <div className="text-xs text-[#0ac8b9]">
                    {featured.title} · {featured.region}
                  </div>
                </div>
              </div>

              {/* Quote bubble */}
              <div className="p-3 bg-[#06101e] rounded border border-white/5 mb-4 relative">
                <p className="text-xs italic text-[#cbd5e1] leading-relaxed">
                  「{featured.quote}」
                </p>
                <button
                  onClick={() => sounds.speakQuote(featured.quote)}
                  className="mt-2 text-[11px] text-[#c8aa6e] hover:text-[#f0e6d2] flex items-center gap-1 cursor-pointer transition-colors"
                  title="播放台詞語音"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>聆聽原聲台詞</span>
                </button>
              </div>

              {/* Key ratings mini-bars */}
              <div className="space-y-2 text-xs mb-5">
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>攻擊強度</span>
                  <span className="font-mono text-[#f0e6d2] tabular-nums">{featured.ratings.attack}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#091428] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#d97706] to-[#e11d48]"
                    style={{ width: `${featured.ratings.attack}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>生存能力</span>
                  <span className="font-mono text-[#f0e6d2] tabular-nums">{featured.ratings.defense}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#091428] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0ac8b9] to-[#3b82f6]"
                    style={{ width: `${featured.ratings.defense}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playLockIn();
                  onSelectChampion(featured);
                }}
                className="w-full py-2.5 text-center bg-[#091428] hover:bg-[#0e213d] border border-[#c8aa6e]/50 hover:border-[#c8aa6e] text-[#f0e6d2] text-xs font-semibold tracking-wider rounded transition-colors cursor-pointer"
              >
                進入英雄詳細檔案 (Q/W/E/R 技能解析)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
