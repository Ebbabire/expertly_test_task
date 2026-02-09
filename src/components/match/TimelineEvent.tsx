import type { MatchTimelineEvent } from "../../types";
import EventIcon from "./EventIcon";

interface TimelineEventProps {
  event: MatchTimelineEvent;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
  const isHome = event.team === "home";
  const isGoal = event.type === "goal";

  return (
    <div className="flex items-center justify-center relative group">
      {/* Horizontal Connector Left */}
      <div
        className={`absolute left-[calc(50%-56px)] right-1/2 h-px bg-[#2d2f39] transition-colors group-hover:bg-[#00ff88]/30 ${!isHome ? "opacity-0" : "opacity-100"}`}
      />

      {/* Left Event Details */}
      <div className="flex-1 text-right pr-14 z-10">
        {isHome && (
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-white leading-none mb-1">
                  {event.player1}
                </span>
                {event.player2 && (
                  <span className="text-[10px] font-bold text-[#64748b]">
                    {event.player2}
                  </span>
                )}
                {event.description && !event.player1 && (
                  <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wide">
                    {event.description}
                  </span>
                )}
              </div>
              <div className="scale-110">
                <EventIcon type={event.type} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Middle Minute Bubble */}
      <div
        className={`relative z-10 w-14 h-7 rounded-full flex items-center justify-center text-[10px] font-black border border-[#2d2f39] shadow-lg shrink-0 transition-all ${
          isGoal
            ? "bg-[#00ff88] text-[#0b0c10] border-[#00ff88]"
            : "bg-[#111218] text-[#64748b]"
        }`}
      >
        {event.minute}
      </div>

      {/* Horizontal Connector Right */}
      <div
        className={`absolute right-[calc(50%-56px)] left-1/2 h-px bg-[#2d2f39] transition-colors group-hover:bg-[#00ff88]/30 ${isHome ? "opacity-0" : "opacity-100"}`}
      />

      {/* Right Event Details */}
      <div className="flex-1 text-left pl-14 z-10">
        {!isHome && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="scale-110">
                <EventIcon type={event.type} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-black text-white leading-none mb-1">
                  {event.player1}
                </span>
                {event.player2 && (
                  <span className="text-[10px] font-bold text-[#64748b]">
                    {event.player2}
                  </span>
                )}
                {event.description && !event.player1 && (
                  <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wide">
                    {event.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineEvent;
