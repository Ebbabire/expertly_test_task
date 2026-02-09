import { Radio, Heart } from "lucide-react";

export type FilterType = "all" | "live" | "favorites";

interface MatchFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  matchCount: number;
  liveCount: number;
  favoritesCount: number;
}

const MatchFilters: React.FC<MatchFiltersProps> = ({
  filter,
  onFilterChange,
  matchCount,
  liveCount,
  favoritesCount,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button
        onClick={() => onFilterChange("all")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
          filter === "all"
            ? "bg-[#00ff88] text-[#0b0c10] border-[#00ff88]"
            : "bg-[#15171e] text-white border-[#2d2f39] hover:bg-[#1f212a]"
        }`}
      >
        All{" "}
        <span
          className={`px-1.5 rounded text-[10px] ${filter === "all" ? "bg-[#0b0c10] text-white" : "bg-[#2d2f39]"}`}
        >
          {matchCount}
        </span>
      </button>
      <button
        onClick={() => onFilterChange("live")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
          filter === "live"
            ? "bg-[#00ff88] text-[#0b0c10] border-[#00ff88]"
            : "bg-[#15171e] text-white border-[#2d2f39] hover:bg-[#1f212a]"
        }`}
      >
        <Radio size={16} /> Live{" "}
        <span
          className={`px-1.5 rounded text-[10px] ${filter === "live" ? "bg-[#0b0c10] text-white" : "bg-[#2d2f39]"}`}
        >
          {liveCount}
        </span>
      </button>
      <button
        onClick={() => onFilterChange("favorites")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
          filter === "favorites"
            ? "bg-[#00ff88] text-[#0b0c10] border-[#00ff88]"
            : "bg-[#15171e] text-white border-[#2d2f39] hover:bg-[#1f212a]"
        }`}
      >
        <Heart size={16} /> Favorites{" "}
        <span
          className={`px-1.5 rounded text-[10px] ${filter === "favorites" ? "bg-[#0b0c10] text-white" : "bg-[#2d2f39]"}`}
        >
          {favoritesCount}
        </span>
      </button>
    </div>
  );
};

export default MatchFilters;
