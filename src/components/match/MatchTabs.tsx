interface MatchTabsProps {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MatchTabs: React.FC<MatchTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="px-6 flex items-center justify-between border-b border-[#2d2f39] mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-4 text-xs font-black uppercase tracking-widest whitespace-nowrap relative transition-all ${
            activeTab === tab
              ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#00ff88]"
              : "text-[#64748b] hover:text-[#94a3b8]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MatchTabs;
