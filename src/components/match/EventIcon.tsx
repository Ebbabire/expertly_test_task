import { Award, Info } from "lucide-react";
import type { MatchTimelineEvent } from "../../types";

interface EventIconProps {
  type: MatchTimelineEvent["type"];
}

const EventIcon: React.FC<EventIconProps> = ({ type }) => {
  switch (type) {
    case "goal":
      return (
        <div className="w-4 h-4 rounded-full border border-[#00ff88] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
        </div>
      );
    case "yellow_card":
      return <div className="w-3.5 h-4.5 bg-[#facc15] rounded-sm" />;
    case "red_card":
      return <div className="w-3.5 h-4.5 bg-[#ff4d4d] rounded-sm" />;
    case "substitution":
      return (
        <div className="flex items-center gap-0.5 font-bold">
          <span className="text-[#00ff88] text-sm leading-none">↑</span>
          <span className="text-[#ff4d4d] text-sm leading-none">↓</span>
        </div>
      );
    case "corner":
      return (
        <span className="text-[#94a3b8] text-xs font-bold leading-none">
          ⚑
        </span>
      );
    case "injury":
      return <Info size={14} className="text-[#ff4d4d]" />;
    case "info":
      return <Award size={14} className="text-white" />;
    default:
      return null;
  }
};

export default EventIcon;
