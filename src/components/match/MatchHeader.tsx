import { Shield } from "lucide-react";
import type { Event } from "../../types";
import { formatMatchDate, getStatusDisplay } from "../../utils/matchHelpers";

interface MatchHeaderProps {
  match: Event;
}

const STATUS_VARIANT_CLASSES: Record<"red" | "green" | "gray", string> = {
  red: "bg-[#ff4d4d] text-white shadow-lg shadow-red-900/20",
  green: "bg-[#00ff88] text-[#0b0c10] shadow-lg shadow-green-900/20",
  gray: "bg-[#2d2f39] text-[#94a3b8]",
};

const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  const displayDate = formatMatchDate(match.dateEvent);
  const { label: statusLabel, variant: statusVariant } =
    getStatusDisplay(match);

  return (
    <div className="px-6 mb-10">
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#15171e] border border-[#2d2f39] flex items-center justify-center p-3 shadow-xl">
              {match.strHomeTeamBadge ? (
                <img
                  src={match.strHomeTeamBadge}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <Shield size={32} className="text-[#00ff88]/40" />
              )}
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#facc15] text-[#0b0c10] text-[10px] font-black rounded border-2 border-[#0b0c10] flex items-center justify-center shadow-lg">
              2
            </div>
          </div>
          <span className="text-sm font-black tracking-tight">
            {match.strHomeTeam}
          </span>
        </div>

        {/* Center Score */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.2em]">
            {displayDate}
          </span>
          <div className="text-4xl font-black flex items-center gap-4 tracking-tighter">
            <span>{match.intHomeScore || "0"}</span>
            <span className="text-[#2d2f39] opacity-50">-</span>
            <span>{match.intAwayScore || "0"}</span>
          </div>
          <div
            className={`px-3 py-1 rounded text-[10px] font-black uppercase ${STATUS_VARIANT_CLASSES[statusVariant]}`}
          >
            {statusLabel}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#15171e] border border-[#2d2f39] flex items-center justify-center p-3 shadow-xl">
              {match.strAwayTeamBadge ? (
                <img
                  src={match.strAwayTeamBadge}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <Shield size={32} className="text-[#7d40ff]/40" />
              )}
            </div>
            <div className="absolute -top-1 -left-1 flex items-center gap-1">
              <div className="w-6 h-6 bg-[#ff4d4d] text-white text-[10px] font-black rounded border-2 border-[#0b0c10] flex items-center justify-center shadow-lg">
                1
              </div>
              <div className="w-6 h-6 bg-[#facc15] text-[#0b0c10] text-[10px] font-black rounded border-2 border-[#0b0c10] flex items-center justify-center shadow-lg">
                1
              </div>
            </div>
          </div>
          <span className="text-sm font-black tracking-tight">
            {match.strAwayTeam}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
