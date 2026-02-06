import { useState, useEffect, useCallback } from "react";
/* Added Shield to the imports from lucide-react */
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Radio,
  Heart,
  Shield,
} from "lucide-react";
import type { Event, APIResponse } from "../types";
import MatchCard from "../components/MatchCard";

const Fixtures = () => {
  const [matches, setMatches] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "live" | "favorites">("all");

  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/eventsnext.php?id=4396`,
      );
      const data: APIResponse = await response.json();

      // If API data exists, use it, otherwise fallback to the user's provided structure for demonstration
      if (data.events && data.events.length > 0) {
        setMatches(data.events);
      } else {
        // Fallback to mock data based on user provided JSON
        setMatches([
          {
            idEvent: "2274995",
            strEvent: "Bolton Wanderers vs Barnsley",
            strLeague: "English League 1",
            idLeague: "4396",
            strHomeTeam: "Bolton Wanderers",
            strAwayTeam: "Barnsley",
            intHomeScore: null,
            intAwayScore: null,
            strStatus: "Not Started",
            strTimestamp: "2026-02-07T15:01:00",
            dateEvent: "2026-02-07",
            strTime: "15:01:00",
            idHomeTeam: "133606",
            strHomeTeamBadge:
              "https://r2.thesportsdb.com/images/media/team/badge/yvxxrv1448808301.png",
            idAwayTeam: "133630",
            strAwayTeamBadge:
              "https://r2.thesportsdb.com/images/media/team/badge/xvxsuv1447437855.png",
            strVenue: "Toughsheet Community Stadium",
            strCountry: "England",
            strThumb:
              "https://r2.thesportsdb.com/images/media/event/thumb/iw44lq1752495981.jpg",
            strDescriptionEN: null,
          },
          {
            idEvent: "2275013",
            strEvent: "Lincoln City vs Bolton Wanderers",
            strLeague: "English League 1",
            idLeague: "4396",
            strHomeTeam: "Lincoln City",
            strAwayTeam: "Bolton Wanderers",
            intHomeScore: null,
            intAwayScore: null,
            strStatus: "Not Started",
            strTimestamp: "2026-02-14T15:00:00",
            dateEvent: "2026-02-14",
            strTime: "15:00:00",
            idHomeTeam: "135900",
            strHomeTeamBadge:
              "https://r2.thesportsdb.com/images/media/team/badge/x46tji1719860130.png",
            idAwayTeam: "133606",
            strAwayTeamBadge:
              "https://r2.thesportsdb.com/images/media/team/badge/yvxxrv1448808301.png",
            strVenue: "LNER Stadium",
            strCountry: "England",
            strThumb:
              "https://r2.thesportsdb.com/images/media/event/thumb/zgawi01752496065.jpg",
            strDescriptionEN: null,
          },
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(() => {
      fetchMatches();
    }, 20000); // Poll every 20 seconds as requested

    return () => clearInterval(interval);
  }, [fetchMatches]);

  const dates = [
    { day: "WED", date: "5 FEB" },
    { day: "THU", date: "6 FEB" },
    { day: "Today", date: "7 FEB", active: true },
    { day: "SUN", date: "8 FEB" },
    { day: "MON", date: "9 FEB" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Fixtures</h1>

      {/* Date Selector */}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
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
            {matches.length}
          </span>
        </button>
        <button
          onClick={() => setFilter("live")}
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
            0
          </span>
        </button>
        <button
          onClick={() => setFilter("favorites")}
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
            2
          </span>
        </button>
      </div>

      {/* Main League Display */}
      <div className="bg-[#15171e] rounded-2xl overflow-hidden border border-[#2d2f39]/50 shadow-2xl transition-all">
        <div className="p-4 flex items-center justify-between bg-[#1f212a]/50 border-b border-[#2d2f39]/30">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#0b0c10] rounded flex items-center justify-center p-1">
              <Shield size={14} className="text-[#00ff88]" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wide">
              English Premier League
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
    </div>
  );
};

export default Fixtures;
