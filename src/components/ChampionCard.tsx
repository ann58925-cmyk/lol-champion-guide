import React, { useState } from 'react';
import { Champion, ROLE_INFO, LANE_INFO } from '../data/champions';
import { Volume2, Eye, GitCompare, Shield, Sparkles, Sword } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ChampionCardProps {
  champion: Champion;
  onSelect: (champion: Champion) => void;
  onToggleCompare: (champion: Champion) => void;
  isCompared: boolean;
}

export const ChampionCard: React.FC<ChampionCardProps> = ({
  champion,
  onSelect,
  onToggleCompare,
  isCompared,
}) => {
  const [imgError, setImgError] = useState(false);
  const primaryRoleInfo = ROLE_INFO[champion.primaryRole];
  const primaryLaneInfo = LANE_INFO[champion.primaryPosition];

  // Map difficulty level to text
  const difficultyText =
    champion.difficulty === 1 ? '簡單' : champion.difficulty === 2 ? '中等' : '困難';

  return (
    <div className="group relative rounded-xl border border-[#1e2f47] hover:border-[#c8aa6e]/80 bg-[#06101e] transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1">
      {/* Top Image / Splash Container with 4:3 ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#03080e]">
        {!imgError ? (
          <img
            src={champion.image}
            alt={`${champion.name} - ${champion.title}`}
            referrerPolicy="no-referrer"
            onError={() => {
              // Try fallback thumbnail if main image failed
              if (champion.image !== champion.thumbnail) {
                setImgError(true);
              }
            }}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c192d] to-[#040914] p-4 text-center">
            <Sparkles className="w-8 h-8 text-[#c8aa6e]/40 mb-2" />
            <span className="text-sm font-bold text-[#f0e6d2] font-cinzel">
              {champion.name}
            </span>
            <span className="text-xs text-[#64748b]">{champion.enName}</span>
          </div>
        )}

        {/* Measured gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101e] via-transparent to-transparent opacity-90" />

        {/* Top Floating Badge Bar - Functional Indicators */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="text-[11px] font-medium text-[#c8aa6e] bg-[#040914]/85 backdrop-blur-sm px-2 py-0.5 rounded border border-[#c8aa6e]/30">
            {champion.region}
          </span>
          <span className="text-[11px] font-medium text-[#0ac8b9] bg-[#040914]/85 backdrop-blur-sm px-2 py-0.5 rounded border border-[#0ac8b9]/30">
            {primaryLaneInfo.label}
          </span>
        </div>

        {/* Audio Quote trigger button on thumbnail */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.speakQuote(champion.quote);
          }}
          title="聆聽英雄台詞"
          className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#040914]/80 border border-[#c8aa6e]/50 hover:border-[#c8aa6e] text-[#c8aa6e] hover:text-[#f0e6d2] flex items-center justify-center transition-colors cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Unboxed metadata line with typographic bullet separators */}
          <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mb-1.5">
            <span className="text-[#f0e6d2] font-medium">{primaryRoleInfo.label}</span>
            <span aria-hidden="true">·</span>
            <span>{champion.attackType}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">難度：{difficultyText}</span>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-bold text-[#f0e6d2] font-cinzel group-hover:text-[#c8aa6e] transition-colors">
              {champion.name}
            </h3>
            <span className="text-xs text-[#64748b] font-mono tracking-wider">
              {champion.enName}
            </span>
          </div>

          <div className="text-xs text-[#0ac8b9] font-medium mb-3">
            {champion.title}
          </div>

          {/* Quote snippet */}
          <p className="text-xs text-[#94a3b8] italic line-clamp-2 leading-relaxed">
            「{champion.quote}」
          </p>
        </div>

        {/* Stat Meters */}
        <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px]">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="flex items-center gap-1 text-[#cbd5e1]">
              <Sword className="w-3 h-3 text-[#d97706]" /> 物理攻擊
            </span>
            <span className="font-mono tabular-nums text-[#cbd5e1]">{champion.ratings.attack}</span>
          </div>
          <div className="w-full h-1 bg-[#03080e] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d97706]"
              style={{ width: `${champion.ratings.attack}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[#64748b] pt-1">
            <span className="flex items-center gap-1 text-[#cbd5e1]">
              <Shield className="w-3 h-3 text-[#0ac8b9]" /> 生存防護
            </span>
            <span className="font-mono tabular-nums text-[#cbd5e1]">{champion.ratings.defense}</span>
          </div>
          <div className="w-full h-1 bg-[#03080e] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0ac8b9]"
              style={{ width: `${champion.ratings.defense}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => {
              sounds.playLockIn();
              onSelect(champion);
            }}
            className="w-full py-2 px-3 text-xs font-semibold text-[#f0e6d2] bg-[#0c1e36] hover:bg-[#122e54] border border-[#c8aa6e]/40 hover:border-[#c8aa6e] rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#c8aa6e]" />
            <span>技能詳情</span>
          </button>

          <button
            onClick={() => {
              sounds.playSlash();
              onToggleCompare(champion);
            }}
            className={`w-full py-2 px-3 text-xs font-semibold rounded border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isCompared
                ? 'bg-[#c8aa6e] text-[#040914] border-[#c8aa6e] font-bold'
                : 'bg-[#091428] text-[#94a3b8] hover:text-[#f0e6d2] border-white/10 hover:border-[#c8aa6e]/40'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompared ? '已加入對比' : '加入對比'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
