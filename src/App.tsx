/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  CHAMPIONS,
  Champion,
  ChampionRole,
  LanePosition,
  REGIONS_LIST,
  ROLE_INFO,
  LANE_INFO,
} from './data/champions';
import { Navbar } from './components/Navbar';
import { HeroSpotlight } from './components/HeroSpotlight';
import { RoleGuide } from './components/RoleGuide';
import { ChampionCard } from './components/ChampionCard';
import { ChampionDetailModal } from './components/ChampionDetailModal';
import { ChampionCompareModal } from './components/ChampionCompareModal';
import { Footer } from './components/Footer';
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  GitCompare,
  ArrowUpDown,
} from 'lucide-react';
import { sounds } from './utils/audio';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<ChampionRole | 'All'>('All');
  const [selectedLane, setSelectedLane] = useState<LanePosition | 'All'>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'default' | 'attack' | 'defense' | 'magic' | 'difficulty'>('default');

  const [activeChampion, setActiveChampion] = useState<Champion | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [comparedChampions, setComparedChampions] = useState<Champion[]>([
    CHAMPIONS[0],
    CHAMPIONS[1],
  ]);

  // Featured champion for spotlight
  const featuredChampion = CHAMPIONS[0]; // Ahri

  // Handle Random Pick
  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * CHAMPIONS.length);
    const chosen = CHAMPIONS[randomIndex];
    setActiveChampion(chosen);
  };

  // Toggle Compare
  const handleToggleCompare = (champion: Champion) => {
    setComparedChampions((prev) => {
      const exists = prev.some((c) => c.id === champion.id);
      if (exists) {
        return prev.filter((c) => c.id !== champion.id);
      }
      if (prev.length >= 2) {
        // Replace second champion
        return [prev[0], champion];
      }
      return [...prev, champion];
    });
  };

  const handleAddCompareChampion = (champ: Champion) => {
    setComparedChampions((prev) => {
      if (prev.some((c) => c.id === champ.id)) return prev;
      if (prev.length >= 2) {
        return [prev[1], champ];
      }
      return [...prev, champ];
    });
  };

  const handleRemoveCompareChampion = (id: string) => {
    setComparedChampions((prev) => prev.filter((c) => c.id !== id));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRole('All');
    setSelectedLane('All');
    setSelectedRegion('全部');
    setSelectedDifficulty('All');
    setSortBy('default');
  };

  // Filtered & Sorted Champions
  const filteredChampions = useMemo(() => {
    return CHAMPIONS.filter((c) => {
      // Search matches name, enName, title, or region
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.enName.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q);

      // Role filter (matches any of the champion's roles)
      const matchRole = selectedRole === 'All' || c.roles.includes(selectedRole);

      // Lane filter
      const matchLane = selectedLane === 'All' || c.positions.includes(selectedLane);

      // Region filter
      const matchRegion = selectedRegion === '全部' || c.region === selectedRegion;

      // Difficulty filter
      const matchDifficulty =
        selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;

      return matchSearch && matchRole && matchLane && matchRegion && matchDifficulty;
    }).sort((a, b) => {
      if (sortBy === 'attack') return b.ratings.attack - a.ratings.attack;
      if (sortBy === 'defense') return b.ratings.defense - a.ratings.defense;
      if (sortBy === 'magic') return b.ratings.magic - a.ratings.magic;
      if (sortBy === 'difficulty') return b.ratings.difficulty - a.ratings.difficulty;
      return 0;
    });
  }, [searchQuery, selectedRole, selectedLane, selectedRegion, selectedDifficulty, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedRole !== 'All' ||
    selectedLane !== 'All' ||
    selectedRegion !== '全部' ||
    selectedDifficulty !== 'All' ||
    sortBy !== 'default';

  return (
    <div className="min-h-screen bg-[#03080e] text-[#cbd5e1] flex flex-col font-sans selection:bg-[#c8aa6e]/30 selection:text-[#f0e6d2]">
      {/* Top Bar */}
      <Navbar
        onRandomPick={handleRandomPick}
        onOpenCompare={() => setIsCompareOpen(true)}
        compareCount={comparedChampions.length}
      />

      {/* Hero Spotlight */}
      <HeroSpotlight
        featured={featuredChampion}
        onSelectChampion={setActiveChampion}
        onExploreRoster={() => {
          const el = document.getElementById('roster');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Role & Lane Guide (Explaining the concepts) */}
      <RoleGuide
        selectedRole={selectedRole}
        selectedLane={selectedLane}
        onSelectRole={setSelectedRole}
        onSelectLane={setSelectedLane}
      />

      {/* Champions Roster Section */}
      <main id="roster" className="flex-1 py-14 max-w-7xl w-full mx-auto px-4 md:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#c8aa6e] tracking-widest uppercase mb-1">
              CHAMPION ARCHIVE
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0e6d2] font-cinzel">
              英雄陣容總覽
            </h2>
          </div>

          <div className="text-xs text-[#94a3b8]">
            顯示 <span className="font-mono text-[#f0e6d2] font-bold tabular-nums">{filteredChampions.length}</span> 位英雄（共 {CHAMPIONS.length} 位）
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#1e2f47] bg-[#06101e] space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="搜尋英雄名稱、英文 (Ahri, Yasuo) 或稱號..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#03080e] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-[#f0e6d2] placeholder-[#64748b] focus:outline-none focus:border-[#c8aa6e] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#f0e6d2]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Region Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#94a3b8] whitespace-nowrap">地區：</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-[#03080e] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#f0e6d2] focus:outline-none focus:border-[#c8aa6e] cursor-pointer"
              >
                {REGIONS_LIST.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#94a3b8] whitespace-nowrap">操作難度：</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedDifficulty(val === 'All' ? 'All' : Number(val));
                }}
                className="bg-[#03080e] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#f0e6d2] focus:outline-none focus:border-[#c8aa6e] cursor-pointer"
              >
                <option value="All">全部難度</option>
                <option value="1">簡單 (新手友好)</option>
                <option value="2">中等 (需要熟練)</option>
                <option value="3">困難 (極限微操)</option>
              </select>
            </div>

            {/* Sort Order Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#64748b]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-[#03080e] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#f0e6d2] focus:outline-none focus:border-[#c8aa6e] cursor-pointer"
              >
                <option value="default">預設排序</option>
                <option value="attack">最高物理輸出</option>
                <option value="defense">最高防禦坦度</option>
                <option value="magic">最高魔法強度</option>
                <option value="difficulty">最高操作難度</option>
              </select>
            </div>
          </div>

          {/* Role Segmented Filter Tabs */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#64748b] mr-1.5 font-medium">定位：</span>
              <button
                onClick={() => setSelectedRole('All')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  selectedRole === 'All'
                    ? 'bg-[#c8aa6e] text-[#040914]'
                    : 'bg-[#03080e] text-[#94a3b8] hover:text-[#f0e6d2] border border-white/5'
                }`}
              >
                全部
              </button>
              {(Object.keys(ROLE_INFO) as ChampionRole[]).map((role) => {
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#c8aa6e] text-[#040914]'
                        : 'bg-[#03080e] text-[#94a3b8] hover:text-[#f0e6d2] border border-white/5'
                    }`}
                  >
                    {ROLE_INFO[role].label}
                  </button>
                );
              })}
            </div>

            {/* Lane Segmented Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#64748b] mr-1.5 font-medium">分路：</span>
              <button
                onClick={() => setSelectedLane('All')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  selectedLane === 'All'
                    ? 'bg-[#0ac8b9] text-[#040914]'
                    : 'bg-[#03080e] text-[#94a3b8] hover:text-[#f0e6d2] border border-white/5'
                }`}
              >
                全部分路
              </button>
              {(Object.keys(LANE_INFO) as LanePosition[]).map((lane) => {
                const isSelected = selectedLane === lane;
                return (
                  <button
                    key={lane}
                    onClick={() => setSelectedLane(lane)}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0ac8b9] text-[#040914]'
                        : 'bg-[#03080e] text-[#94a3b8] hover:text-[#f0e6d2] border border-white/5'
                    }`}
                  >
                    {LANE_INFO[lane].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Filters Option */}
          {hasActiveFilters && (
            <div className="pt-2 flex items-center justify-between text-xs text-[#94a3b8]">
              <span>已套用進階篩選條件</span>
              <button
                onClick={handleResetFilters}
                className="text-[#c8aa6e] hover:text-[#f0e6d2] underline cursor-pointer"
              >
                重設所有篩選條件
              </button>
            </div>
          )}
        </div>

        {/* Champion Cards Grid */}
        {filteredChampions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredChampions.map((champion) => {
              const isCompared = comparedChampions.some((c) => c.id === champion.id);
              return (
                <ChampionCard
                  key={champion.id}
                  champion={champion}
                  onSelect={setActiveChampion}
                  onToggleCompare={handleToggleCompare}
                  isCompared={isCompared}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center p-8 rounded-xl border border-white/10 bg-[#06101e] space-y-4">
            <SlidersHorizontal className="w-10 h-10 mx-auto text-[#64748b]" />
            <h3 className="text-xl font-bold text-[#f0e6d2] font-cinzel">
              未找到符合條件的英雄
            </h3>
            <p className="text-sm text-[#94a3b8] max-w-md mx-auto">
              請嘗試放寬搜尋關鍵字、調整分路或重設職業定位篩選。
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 bg-[#c8aa6e] text-[#040914] font-semibold text-xs rounded hover:bg-[#d9b878] transition-colors cursor-pointer"
            >
              清除所有篩選
            </button>
          </div>
        )}
      </main>

      {/* Floating Compare Floating Dock if champions selected */}
      {comparedChampions.length > 0 && (
        <div className="fixed bottom-5 right-5 z-40 bg-[#040914]/95 border border-[#c8aa6e]/60 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3">
          <div className="flex -space-x-2">
            {comparedChampions.map((c) => (
              <img
                key={c.id}
                src={c.thumbnail}
                alt={c.name}
                className="w-9 h-9 rounded-full border-2 border-[#c8aa6e] object-cover"
              />
            ))}
          </div>
          <div className="text-xs">
            <span className="text-[#f0e6d2] font-semibold block">
              已選取 {comparedChampions.length}/2 位英雄
            </span>
            <span className="text-[11px] text-[#94a3b8]">
              {comparedChampions.map((c) => c.name).join(' vs ')}
            </span>
          </div>
          <button
            onClick={() => {
              sounds.playSlash();
              setIsCompareOpen(true);
            }}
            className="px-3.5 py-1.5 text-xs font-bold text-[#040914] bg-[#c8aa6e] hover:bg-[#d9b878] rounded cursor-pointer transition-colors"
          >
            開啟對比
          </button>
        </div>
      )}

      {/* Champion Detail Modal */}
      <ChampionDetailModal
        champion={activeChampion}
        onClose={() => setActiveChampion(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={
          activeChampion
            ? comparedChampions.some((c) => c.id === activeChampion.id)
            : false
        }
      />

      {/* Champion Compare Modal */}
      <ChampionCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedChampions={comparedChampions}
        onRemoveChampion={handleRemoveCompareChampion}
        onAddChampion={handleAddCompareChampion}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
