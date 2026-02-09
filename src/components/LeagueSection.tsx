import { ChevronRight, Shield } from "lucide-react";
import type { Event } from "../types";
import MatchCard from "./MatchCard";

interface LeagueSectionProps {
  leagueName: string;
  matches: Event[];
  loading: boolean;
}

const LeagueSection: React.FC<LeagueSectionProps> = ({ leagueName, matches, loading }) => {
  return (
    <div className="bg-[#15171e] rounded-2xl overflow-hidden border border-[#2d2f39]/50 shadow-2xl transition-all">
      <div className="p-4 flex items-center justify-between bg-[#1f212a]/50 border-b border-[#2d2f39]/30">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#0b0c10] rounded flex items-center justify-center p-1">
            <Shield size={14} className="text-[#00ff88]" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wide">
            {leagueName}
          </span>
        </div>
        <button className="text-[#64748b] hover:text-white transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="divide-y divide-[#2d2f39]/30">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#00ff88] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#64748b] font-medium">
              Fetching match data...
            </p>
          </div>
        ) : matches.length > 0 ? (
          matches.map((m) => <MatchCard key={m.idEvent} match={m} />)
        ) : (
          <div className="p-12 text-center text-[#64748b]">
            No upcoming matches found for this league.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueSection;
