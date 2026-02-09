import type { MatchTimelineEvent } from "../../types";
import TimelineEvent from "./TimelineEvent";

interface EventTimelineProps {
  events: MatchTimelineEvent[];
  kickOffTime: string;
}

const EventTimeline: React.FC<EventTimelineProps> = ({ events, kickOffTime }) => {
  return (
    <div className="px-6 pb-20">
      <div className="bg-[#15171e] rounded-[32px] p-6 border border-[#2d2f39]/50 shadow-2xl">
        <h3 className="text-xs font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-10 pl-2">
          Events
        </h3>

        <div className="space-y-6 relative">
          {/* Timeline Vertical Divider Helper (Invisible) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-transparent -translate-x-1/2" />

          {/* Header: Fulltime */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-black text-[#64748b] uppercase tracking-widest">
            <div className="h-px flex-1 bg-[#2d2f39]" />
            <span className="px-2">Fulltime &nbsp; 2 - 1</span>
            <div className="h-px flex-1 bg-[#2d2f39]" />
          </div>

          {/* Event List Items */}
          <div className="space-y-4">
            {events.map((event) => (
              <TimelineEvent key={event.id} event={event} />
            ))}
          </div>

          {/* Header: Halftime */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-black text-[#64748b] uppercase tracking-widest pt-6">
            <div className="h-px flex-1 bg-[#2d2f39]" />
            <span className="px-2">Halftime ' &nbsp; 1 - 0</span>
            <div className="h-px flex-1 bg-[#2d2f39]" />
          </div>

          {/* Kick Off */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-black text-[#64748b] uppercase tracking-widest pt-6">
            <div className="h-px flex-1 bg-[#2d2f39]" />
            <span className="px-2">
              Kick Off - {kickOffTime}
            </span>
            <div className="h-px flex-1 bg-[#2d2f39]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
