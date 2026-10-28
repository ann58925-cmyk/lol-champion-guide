import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#c8aa6e]/15 bg-[#02050b] py-10 px-4 md:px-8 text-[#64748b] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <div className="text-sm font-bold text-[#f0e6d2] font-cinzel">
            LEAGUE OF LEGENDS 英雄圖鑑
          </div>
          <p className="max-w-md">
            本專案為《英雄聯盟》非官方英雄定位與技能介紹展示網頁。遊戲內容與美術素材版權歸 Riot Games, Inc. 所有。
          </p>
        </div>

        <div className="flex items-center gap-6 text-[#94a3b8]">
          <a href="#roster" className="hover:text-[#f0e6d2] transition-colors">
            英雄名冊
          </a>
          <a href="#roles" className="hover:text-[#f0e6d2] transition-colors">
            職業定位
          </a>
          <a href="#lanes" className="hover:text-[#f0e6d2] transition-colors">
            分路導覽
          </a>
          <span>共收錄 12+ 位核心英雄數據</span>
        </div>
      </div>
    </footer>
  );
};
