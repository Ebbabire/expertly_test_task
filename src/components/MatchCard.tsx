import { Link } from "react-router-dom";
import { MoreVertical, Shield } from "lucide-react";
import type { Event } from "../types";

interface MatchCardProps {
  match: Event;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isFinished = match.strStatus === "Match Finished";
  const isLive = !isFinished && match.strStatus !== "Not Started";
  const isUpcoming = match.strStatus === "Not Started";

  // Format time or status
  let displayStatus = match.strStatus;
  if (isFinished) displayStatus = "FT";
  if (isUpcoming) displayStatus = match.strTime?.substring(0, 5) || "TBC";

  return (
    <Link
      to={`/match/${match.idEvent}`}
      className="group flex items-center bg-[#15171e] hover:bg-[#1f212a] border-b border-[#2d2f39]/30 py-4 px-4 transition-colors relative"
    >
      {/* Left indicator bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${isLive ? "bg-[#00ff88]" : isUpcoming ? "bg-[#94a3b8]" : "bg-[#ff4d4d]"}`}
      />

      {/* Time/Status */}
      <div className="w-16 flex flex-col items-center justify-center mr-4">
        <span
          className={`text-xs font-bold ${isLive ? "text-[#00ff88]" : isUpcoming ? "text-[#94a3b8]" : "text-[#ff4d4d]"}`}
        >
          {displayStatus}
        </span>
        {isLive && (
          <div className="w-4 h-0.5 bg-[#00ff88] mt-1 animate-pulse" />
        )}
      </div>

      {/* Teams and Scores */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#1f212a] flex items-center justify-center overflow-hidden border border-[#2d2f39]/50">
              {match.strHomeTeamBadge ? (
                <img
                  src={match.strHomeTeamBadge}
                  alt={match.strHomeTeam}
                  className="w-5 h-5 object-contain"
                />
              ) : (
                <Shield size={14} className="text-[#94a3b8]" />
              )}
            </div>
            <span className="text-sm font-medium text-white group-hover:text-[#00ff88] transition-colors">
              {match.strHomeTeam}
            </span>
            {isLive && match.idEvent === "133602" && (
              <span className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 px-1.5 py-0.5 rounded border border-[#00ff88]/20 font-bold">
                ✓ AGG
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isUpcoming && (
              <span className="text-sm font-bold text-white">
                {match.intHomeScore || "0"}
              </span>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#1f212a] flex items-center justify-center overflow-hidden border border-[#2d2f39]/50">
              {match.strAwayTeamBadge ? (
                <img
                  src={match.strAwayTeamBadge}
                  alt={match.strAwayTeam}
                  className="w-5 h-5 object-contain"
                />
              ) : (
                <Shield size={14} className="text-[#94a3b8]" />
              )}
            </div>
            <span className="text-sm font-medium text-white group-hover:text-[#00ff88] transition-colors">
              {match.strAwayTeam}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isUpcoming && (
              <span className="text-sm font-bold text-white">
                {match.intAwayScore || "0"}
              </span>
            )}
          </div>
        </div>
      </div>

      <button className="ml-4 p-2 text-[#64748b] hover:text-white transition-colors">
        <MoreVertical size={18} />
      </button>
    </Link>
  );
};

export default MatchCard;
