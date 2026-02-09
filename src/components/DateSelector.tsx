import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import type { DateEntry } from "../constants/navigation";

interface DateSelectorProps {
  dates: DateEntry[];
}

const DateSelector: React.FC<DateSelectorProps> = ({ dates }) => {
  return (
    <div className="bg-[#15171e] rounded-xl p-3 flex items-center justify-between mb-6 border border-[#2d2f39]/50">
      <button className="p-2 text-[#64748b] hover:text-white transition-colors">
        <ChevronLeft size={20} />
      </button>
      <div className="flex-1 flex justify-around px-4 overflow-x-auto scrollbar-hide">
        {dates.map((d, i) => (
          <div
            key={i}
            className={`flex flex-col items-center min-w-[80px] cursor-pointer transition-colors ${d.active ? "text-[#00ff88]" : "text-[#64748b] hover:text-[#94a3b8]"}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {d.day}
            </span>
            <span
              className={`text-sm font-bold ${d.active ? "bg-[#00ff88]/10 px-3 py-1 rounded-lg border border-[#00ff88]/20 mt-1" : ""}`}
            >
              {d.date}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-[#64748b] hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
        <div className="w-px h-8 bg-[#2d2f39] mx-2" />
        <button className="p-2 text-[#00ff88] bg-[#00ff88]/10 rounded-lg">
          <Calendar size={20} />
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
