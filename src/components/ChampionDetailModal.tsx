import React, { useState, useEffect } from 'react';
import { Champion, ROLE_INFO, LANE_INFO } from '../data/champions';
import {
  X,
  Volume2,
  Sword,
  Shield,
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface ChampionDetailModalProps {
  champion: Champion | null;
  onClose: () => void;
  onToggleCompare: (champion: Champion) => void;
  isCompared: boolean;
}

export const ChampionDetailModal: React.FC<ChampionDetailModalProps> = ({
  champion,
  onClose,
  onToggleCompare,
  isCompared,
}) => {
  const [activeTab, setActiveTab] = useState<'abilities' | 'build' | 'lore' | 'skins'>('abilities');
  const [selectedAbilityKey, setSelectedAbilityKey] = useState<'P' | 'Q' | 'W' | 'E' | 'R'>('Q');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!champion) return null;

  const currentAbility =
    champion.abilities.find((a) => a.key === selectedAbilityKey) || champion.abilities[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border border-[#c8aa6e]/40 bg-[#040a14] shadow-2xl text-[#cbd5e1] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Banner with Champion Art */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#02050a] shrink-0">
          <img
            src={champion.image}
            alt={champion.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = champion.thumbnail;
            }}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040a14] via-[#040a14]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040a14] via-[#040a14]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#040a14]/80 border border-[#c8aa6e]/40 hover:border-[#c8aa6e] text-[#f0e6d2] flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Champion Header Title info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-[#c8aa6e] font-semibold tracking-wider uppercase mb-1">
              <span>{champion.region}</span>
              <span aria-hidden="true">·</span>
              <span>{LANE_INFO[champion.primaryPosition].label}</span>
              <span aria-hidden="true">·</span>
              <span>{ROLE_INFO[champion.primaryRole].label}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f0e6d2] font-cinzel tracking-wide">
                {champion.name}
              </h2>
              <span className="text-lg text-[#94a3b8] font-cinzel">
                {champion.title}
              </span>
              <span className="text-xs text-[#64748b] font-mono">
                ({champion.enName})
              </span>
            </div>

            {/* Quote voice readout */}
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xs sm:text-sm text-[#cbd5e1] italic">
                「{champion.quote}」
              </p>
              <button
                onClick={() => sounds.speakQuote(champion.quote)}
                className="text-xs text-[#c8aa6e] hover:text-[#f0e6d2] flex items-center gap-1 cursor-pointer shrink-0"
                title="播放語音"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs (Interactive Controls) */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-[#061020] overflow-x-auto">
          <button
            onClick={() => setActiveTab('abilities')}
            className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'abilities'
                ? 'bg-[#c8aa6e] text-[#040914]'
                : 'text-[#94a3b8] hover:text-[#f0e6d2] hover:bg-white/5'
            }`}
          >
            技能機制 (Q / W / E / R)
          </button>
          <button
            onClick={() => setActiveTab('build')}
            className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'build'
                ? 'bg-[#c8aa6e] text-[#040914]'
                : 'text-[#94a3b8] hover:text-[#f0e6d2] hover:bg-white/5'
            }`}
          >
            戰術玩法與裝備
          </button>
          <button
            onClick={() => setActiveTab('lore')}
            className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'lore'
                ? 'bg-[#c8aa6e] text-[#040914]'
                : 'text-[#94a3b8] hover:text-[#f0e6d2] hover:bg-white/5'
            }`}
          >
            背景傳記
          </button>
          <button
            onClick={() => setActiveTab('skins')}
            className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'skins'
                ? 'bg-[#c8aa6e] text-[#040914]'
                : 'text-[#94a3b8] hover:text-[#f0e6d2] hover:bg-white/5'
            }`}
          >
            造型一覽
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playSlash();
                onToggleCompare(champion);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer whitespace-nowrap ${
                isCompared
                  ? 'bg-[#0ac8b9] text-[#040914] border-[#0ac8b9]'
                  : 'border-[#c8aa6e]/40 text-[#c8aa6e] hover:bg-[#c8aa6e]/10'
              }`}
            >
              {isCompared ? '已加入對比' : '+ 加入對比'}
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 space-y-6">
          {/* TAB 1: Abilities */}
          {activeTab === 'abilities' && (
            <div className="space-y-6">
              {/* Skill Selection Row */}
              <div className="grid grid-cols-5 gap-2">
                {champion.abilities.map((ability) => {
                  const isSelected = selectedAbilityKey === ability.key;
                  return (
                    <button
                      key={ability.key}
                      onClick={() => {
                        sounds.playLockIn();
                        setSelectedAbilityKey(ability.key);
                      }}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#c8aa6e] bg-[#0c1f38] shadow-[0_0_12px_rgba(200,170,110,0.25)]'
                          : 'border-[#1e2f47] bg-[#06101e] hover:border-[#c8aa6e]/50'
                      }`}
                    >
                      <div className="w-8 h-8 mx-auto rounded flex items-center justify-center font-bold text-sm bg-[#040914] text-[#c8aa6e] border border-[#c8aa6e]/30 mb-1">
                        {ability.key}
                      </div>
                      <div className="text-xs font-semibold text-[#f0e6d2] truncate">
                        {ability.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Ability Detail Box */}
              {currentAbility && (
                <div className="p-5 rounded-lg border border-[#c8aa6e]/30 bg-[#061122] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-[#c8aa6e] text-[#040914]">
                        {currentAbility.key === 'P' ? '被動技能 (Passive)' : `${currentAbility.key} 技能`}
                      </span>
                      <h4 className="text-lg font-bold text-[#f0e6d2] font-cinzel">
                        {currentAbility.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
                      {currentAbility.cooldown && (
                        <span>冷卻時間：<strong className="text-[#cbd5e1] font-mono">{currentAbility.cooldown}</strong></span>
                      )}
                      {currentAbility.cost && (
                        <span>消耗：<strong className="text-[#0ac8b9] font-mono">{currentAbility.cost}</strong></span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    {currentAbility.description}
                  </p>
                </div>
              )}

              {/* Champion Ratings Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                <div className="p-3 rounded bg-[#06101e] border border-white/5">
                  <div className="text-xs text-[#94a3b8] mb-1">物理輸出</div>
                  <div className="text-xl font-bold font-mono text-[#f0e6d2] tabular-nums">
                    {champion.ratings.attack}%
                  </div>
                  <div className="w-full h-1.5 bg-[#03080e] rounded mt-2 overflow-hidden">
                    <div className="h-full bg-[#d97706]" style={{ width: `${champion.ratings.attack}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded bg-[#06101e] border border-white/5">
                  <div className="text-xs text-[#94a3b8] mb-1">生存坦度</div>
                  <div className="text-xl font-bold font-mono text-[#f0e6d2] tabular-nums">
                    {champion.ratings.defense}%
                  </div>
                  <div className="w-full h-1.5 bg-[#03080e] rounded mt-2 overflow-hidden">
                    <div className="h-full bg-[#0ac8b9]" style={{ width: `${champion.ratings.defense}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded bg-[#06101e] border border-white/5">
                  <div className="text-xs text-[#94a3b8] mb-1">魔法強度</div>
                  <div className="text-xl font-bold font-mono text-[#f0e6d2] tabular-nums">
                    {champion.ratings.magic}%
                  </div>
                  <div className="w-full h-1.5 bg-[#03080e] rounded mt-2 overflow-hidden">
                    <div className="h-full bg-[#3b82f6]" style={{ width: `${champion.ratings.magic}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded bg-[#06101e] border border-white/5">
                  <div className="text-xs text-[#94a3b8] mb-1">操作難度</div>
                  <div className="text-xl font-bold font-mono text-[#f0e6d2] tabular-nums">
                    {champion.ratings.difficulty}%
                  </div>
                  <div className="w-full h-1.5 bg-[#03080e] rounded mt-2 overflow-hidden">
                    <div className="h-full bg-[#e11d48]" style={{ width: `${champion.ratings.difficulty}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Tactical Build & Matchups */}
          {activeTab === 'build' && (
            <div className="space-y-6">
              {/* Tactical tip */}
              <div className="p-4 rounded-lg bg-[#081527] border border-[#0ac8b9]/30">
                <div className="text-xs font-semibold text-[#0ac8b9] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> 實戰戰術指導
                </div>
                <p className="text-sm text-[#e2e8f0] leading-relaxed">
                  {champion.build.playstyleTip}
                </p>
              </div>

              {/* Items and Runes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#06101e] border border-white/5">
                  <div className="text-xs font-semibold text-[#c8aa6e] uppercase tracking-wider mb-3">
                    核心推薦出裝
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {champion.build.coreItems.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded text-xs bg-[#03080e] border border-[#c8aa6e]/30 text-[#f0e6d2]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#06101e] border border-white/5">
                  <div className="text-xs font-semibold text-[#c8aa6e] uppercase tracking-wider mb-3">
                    基石符文配置
                  </div>
                  <span className="inline-block px-3 py-1.5 rounded text-xs bg-[#03080e] border border-[#0ac8b9]/40 text-[#0ac8b9] font-semibold">
                    {champion.build.keyRune}
                  </span>
                </div>
              </div>

              {/* Matchups and Allies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#06101e] border border-white/5">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 最佳配合搭檔
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {champion.build.goodWith.map((ally) => (
                      <span
                        key={ally}
                        className="px-2.5 py-1 text-xs bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded"
                      >
                        {ally}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#06101e] border border-white/5">
                  <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> 需提防的克制英雄
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {champion.build.counters.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 text-xs bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Lore & Biography */}
          {activeTab === 'lore' && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#f0e6d2] font-cinzel">
                符文大地傳記：{champion.name}
              </h4>
              <p className="text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line">
                {champion.lore}
              </p>
              <div className="p-4 rounded bg-[#06101e] border border-white/5 text-xs text-[#94a3b8] space-y-1">
                <div>出生陣營 / 地區：<strong className="text-[#f0e6d2]">{champion.region}</strong></div>
                <div>使用能量機制：<strong className="text-[#0ac8b9]">{champion.resource}</strong></div>
                <div>普攻距離類型：<strong className="text-[#f0e6d2]">{champion.attackType}</strong></div>
              </div>
            </div>
          )}

          {/* TAB 4: Skins Collection */}
          {activeTab === 'skins' && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#f0e6d2] font-cinzel">
                造型典藏庫
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {champion.skins.map((skin) => (
                  <div
                    key={skin.name}
                    className="p-4 rounded-lg bg-[#06101e] border border-[#1e2f47] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#f0e6d2]">
                        {skin.name}
                      </div>
                      <div className="text-xs text-[#94a3b8]">
                        主題系列：{skin.theme}
                      </div>
                    </div>
                    <span className="text-xs text-[#c8aa6e] font-mono">
                      經典珍藏
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
