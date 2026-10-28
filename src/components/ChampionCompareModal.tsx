import React, { useState } from 'react';
import { Champion, CHAMPIONS, ROLE_INFO, LANE_INFO } from '../data/champions';
import { X, Sword, Shield, Sparkles, Zap, Trophy, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ChampionCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedChampions: Champion[];
  onRemoveChampion: (id: string) => void;
  onAddChampion: (champion: Champion) => void;
}

export const ChampionCompareModal: React.FC<ChampionCompareModalProps> = ({
  isOpen,
  onClose,
  comparedChampions,
  onRemoveChampion,
  onAddChampion,
}) => {
  if (!isOpen) return null;

  const champ1 = comparedChampions[0] || CHAMPIONS[0];
  const champ2 = comparedChampions[1] || CHAMPIONS[1];

  const compareStats = [
    { label: '物理輸出 (Attack)', key: 'attack' as const, icon: Sword, color: '#d97706' },
    { label: '生存防護 (Defense)', key: 'defense' as const, icon: Shield, color: '#0ac8b9' },
    { label: '魔法強度 (Magic)', key: 'magic' as const, icon: Sparkles, color: '#3b82f6' },
    { label: '戰場機動 (Mobility)', key: 'mobility' as const, icon: Zap, color: '#eab308' },
    { label: '操作難度 (Difficulty)', key: 'difficulty' as const, icon: Trophy, color: '#e11d48' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border border-[#c8aa6e]/40 bg-[#040914] shadow-2xl p-6 text-[#cbd5e1] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-semibold text-[#c8aa6e] tracking-widest uppercase">
              CHAMPION HEAD-TO-HEAD
            </div>
            <h2 className="text-2xl font-bold text-[#f0e6d2] font-cinzel">
              英雄戰力數值對抗比較
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#06101e] border border-white/10 hover:border-[#c8aa6e] text-[#f0e6d2] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Champion Pickers and Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Champion 1 */}
          <div className="p-4 rounded-lg border border-[#1e2f47] bg-[#06101e] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#c8aa6e] font-semibold">英雄 1</span>
              <select
                value={champ1.id}
                onChange={(e) => {
                  const target = CHAMPIONS.find((c) => c.id === e.target.value);
                  if (target) onAddChampion(target);
                }}
                className="bg-[#03080e] border border-white/15 text-xs text-[#f0e6d2] px-2.5 py-1 rounded cursor-pointer"
              >
                {CHAMPIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.enName})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={champ1.thumbnail}
                alt={champ1.name}
                className="w-16 h-16 rounded object-cover border border-[#c8aa6e]/40"
              />
              <div>
                <h3 className="text-xl font-bold text-[#f0e6d2] font-cinzel">
                  {champ1.name}
                </h3>
                <div className="text-xs text-[#0ac8b9]">{champ1.title}</div>
                <div className="text-xs text-[#94a3b8] mt-0.5">
                  {ROLE_INFO[champ1.primaryRole].label} · {LANE_INFO[champ1.primaryPosition].label} · {champ1.attackType}
                </div>
              </div>
            </div>
          </div>

          {/* Champion 2 */}
          <div className="p-4 rounded-lg border border-[#1e2f47] bg-[#06101e] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#c8aa6e] font-semibold">英雄 2</span>
              <select
                value={champ2.id}
                onChange={(e) => {
                  const target = CHAMPIONS.find((c) => c.id === e.target.value);
                  if (target) onAddChampion(target);
                }}
                className="bg-[#03080e] border border-white/15 text-xs text-[#f0e6d2] px-2.5 py-1 rounded cursor-pointer"
              >
                {CHAMPIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.enName})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={champ2.thumbnail}
                alt={champ2.name}
                className="w-16 h-16 rounded object-cover border border-[#c8aa6e]/40"
              />
              <div>
                <h3 className="text-xl font-bold text-[#f0e6d2] font-cinzel">
                  {champ2.name}
                </h3>
                <div className="text-xs text-[#0ac8b9]">{champ2.title}</div>
                <div className="text-xs text-[#94a3b8] mt-0.5">
                  {ROLE_INFO[champ2.primaryRole].label} · {LANE_INFO[champ2.primaryPosition].label} · {champ2.attackType}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Attribute Comparison Bars */}
        <div className="space-y-4 pt-2">
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            各項關鍵維度對比
          </div>

          <div className="space-y-3">
            {compareStats.map(({ label, key, color }) => {
              const val1 = champ1.ratings[key];
              const val2 = champ2.ratings[key];
              const diff = val1 - val2;

              return (
                <div
                  key={key}
                  className="p-3 rounded-lg bg-[#06101e] border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-mono tabular-nums font-bold ${
                        diff > 0 ? 'text-[#c8aa6e]' : 'text-[#94a3b8]'
                      }`}
                    >
                      {champ1.name}: {val1}% {diff > 0 && '(領先)'}
                    </span>
                    <span className="font-semibold text-[#f0e6d2]">{label}</span>
                    <span
                      className={`font-mono tabular-nums font-bold ${
                        diff < 0 ? 'text-[#c8aa6e]' : 'text-[#94a3b8]'
                      }`}
                    >
                      {diff < 0 && '(領先) '} {champ2.name}: {val2}%
                    </span>
                  </div>

                  {/* Dual Bar Indicator */}
                  <div className="grid grid-cols-2 gap-1.5 h-2">
                    <div className="flex justify-end bg-[#03080e] rounded-l overflow-hidden">
                      <div
                        className="h-full rounded-l transition-all duration-300"
                        style={{
                          width: `${val1}%`,
                          backgroundColor: diff >= 0 ? '#c8aa6e' : '#64748b',
                        }}
                      />
                    </div>
                    <div className="flex justify-start bg-[#03080e] rounded-r overflow-hidden">
                      <div
                        className="h-full rounded-r transition-all duration-300"
                        style={{
                          width: `${val2}%`,
                          backgroundColor: diff <= 0 ? '#c8aa6e' : '#64748b',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tactical verdict */}
        <div className="p-4 rounded-lg bg-[#07172b] border border-[#c8aa6e]/30 text-xs text-[#cbd5e1] leading-relaxed">
          <strong className="text-[#f0e6d2] block mb-1">
            對線與戰術相性剖析：
          </strong>
          {champ1.name}（{ROLE_INFO[champ1.primaryRole].label}）與 {champ2.name}（{ROLE_INFO[champ2.primaryRole].label}）各自在召喚峽谷具有不同側重的戰略價值。
          {champ1.ratings.attack > champ2.ratings.attack ? ` ${champ1.name} 具備更強大的正面物理爆發力；` : ` ${champ2.name} 具備更出色的物理輸出效率；`}
          {champ1.ratings.defense > champ2.ratings.defense ? ` 同時 ${champ1.name} 的坦度更能承擔前排衝鋒。` : ` 同時 ${champ2.name} 在防守抗傷時更具優勢。`}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#c8aa6e] hover:bg-[#d9b878] text-[#040914] font-bold text-xs rounded transition-colors cursor-pointer"
          >
            完成對比關閉
          </button>
        </div>
      </div>
    </div>
  );
};
