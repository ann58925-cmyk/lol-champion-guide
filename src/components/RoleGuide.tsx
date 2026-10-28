import React from 'react';
import { ChampionRole, LanePosition, ROLE_INFO, LANE_INFO } from '../data/champions';
import {
  Crosshair,
  Sword,
  Sparkles,
  Target,
  Shield,
  HeartHandshake,
  Compass,
  MapPin,
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface RoleGuideProps {
  selectedRole: ChampionRole | 'All';
  selectedLane: LanePosition | 'All';
  onSelectRole: (role: ChampionRole | 'All') => void;
  onSelectLane: (lane: LanePosition | 'All') => void;
}

const ROLE_ICONS: Record<ChampionRole, React.ReactNode> = {
  Assassin: <Crosshair className="w-5 h-5 text-[#e11d48]" />,
  Fighter: <Sword className="w-5 h-5 text-[#d97706]" />,
  Mage: <Sparkles className="w-5 h-5 text-[#3b82f6]" />,
  Marksman: <Target className="w-5 h-5 text-[#10b981]" />,
  Support: <HeartHandshake className="w-5 h-5 text-[#06b6d4]" />,
  Tank: <Shield className="w-5 h-5 text-[#8b5cf6]" />,
};

export const RoleGuide: React.FC<RoleGuideProps> = ({
  selectedRole,
  selectedLane,
  onSelectRole,
  onSelectLane,
}) => {
  const roles = Object.keys(ROLE_INFO) as ChampionRole[];
  const lanes = Object.keys(LANE_INFO) as LanePosition[];

  return (
    <section id="roles" className="py-14 border-b border-[#c8aa6e]/15 bg-[#030914]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Section 1: 6 Major Battle Roles (戰鬥定位) */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#c8aa6e] uppercase">
                <Compass className="w-4 h-4" />
                <span>COMBAT ROLE CLASSIFICATION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0e6d2] font-cinzel mt-1">
                六大核心職業定位
              </h2>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-md">
              每位英雄在戰場上承擔專屬的職責，點擊下方卡片即可直接篩選該定位英雄。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => {
              const info = ROLE_INFO[role];
              const isSelected = selectedRole === role;

              return (
                <div
                  key={role}
                  onClick={() => {
                    sounds.playLockIn();
                    onSelectRole(isSelected ? 'All' : role);
                  }}
                  className={`p-5 rounded-lg border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#c8aa6e] bg-[#0c1f38] shadow-[0_0_15px_rgba(200,170,110,0.25)]'
                      : 'border-[#1e2e45] bg-[#06101e] hover:border-[#c8aa6e]/50 hover:bg-[#0a182d]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-[#03080e] border border-white/5">
                        {ROLE_ICONS[role]}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#f0e6d2] font-cinzel text-lg">
                          {info.label}
                        </h3>
                        <span className="text-[11px] text-[#64748b] tracking-wider uppercase font-mono">
                          {role}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-[#c8aa6e] font-semibold">
                        已選取
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {info.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: 5 Strategic Lanes (召喚峽谷五大分路) */}
        <div id="lanes" className="pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0ac8b9] uppercase">
                <MapPin className="w-4 h-4" />
                <span>SUMMONER&apos;S RIFT LANES</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#f0e6d2] font-cinzel mt-1">
                召喚峽谷五大戰術分路
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {lanes.map((lane) => {
              const info = LANE_INFO[lane];
              const isSelected = selectedLane === lane;

              return (
                <button
                  key={lane}
                  onClick={() => {
                    sounds.playLockIn();
                    onSelectLane(isSelected ? 'All' : lane);
                  }}
                  className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0ac8b9] bg-[#082333] shadow-[0_0_12px_rgba(10,200,185,0.25)]'
                      : 'border-[#1e2e45] bg-[#06101e] hover:border-[#0ac8b9]/50 hover:bg-[#071728]'
                  }`}
                >
                  <div className="text-sm font-bold text-[#f0e6d2] font-cinzel">
                    {info.label}
                  </div>
                  <div className="text-[11px] text-[#0ac8b9] font-mono tracking-wider mb-2">
                    {info.sub}
                  </div>
                  <p className="text-xs text-[#94a3b8] line-clamp-2">
                    {info.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
