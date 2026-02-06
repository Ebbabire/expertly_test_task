import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Award, Info } from "lucide-react";
import type { Event, MatchTimelineEvent, APIResponse } from "../types";

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Event | null>(null);
  const [events, setEvents] = useState<MatchTimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Events");

  const tabs = ["Details", "Odds", "Lineups", "Events", "Stats", "Standings"];

  const parseEventsFromAPI = (data: any): MatchTimelineEvent[] => {
    const timeline: MatchTimelineEvent[] = [];

    const parseString = (
      str: string | null,
      type: MatchTimelineEvent["type"],
      team: "home" | "away",
    ) => {
      if (!str || str.trim() === "") return;
      str.split(";").forEach((item, idx) => {
        const parts = item.split(":");
        if (parts.length >= 2) {
          const minute = parts[0].trim();
          const player1 = parts[1].trim();
          timeline.push({
            id: `${type}-${team}-${idx}-${minute}`,
            type,
            minute,
            team,
            player1,
          });
        }
      });
    };

    parseString(data.strHomeGoalDetails, "goal", "home");
    parseString(data.strAwayGoalDetails, "goal", "away");
    parseString(data.strHomeYellowCards, "yellow_card", "home");
    parseString(data.strAwayYellowCards, "yellow_card", "away");
    parseString(data.strHomeRedCards, "red_card", "home");
    parseString(data.strAwayRedCards, "red_card", "away");

    // If API has no event details, use the 1:1 Figma Mock Data to ensure visual fidelity
    if (timeline.length === 0) {
      const mockEvents: MatchTimelineEvent[] = [
        {
          id: "1",
          type: "substitution",
          minute: "89'",
          team: "home",
          player1: "Gyokores",
          player2: "Odegard",
        },
        {
          id: "2",
          type: "goal",
          minute: "88'",
          team: "away",
          player1: "Ekitike",
          player2: "Sallah",
        },
        {
          id: "3",
          type: "yellow_card",
          minute: "78'",
          team: "home",
          player1: "Saliba",
        },
        {
          id: "4",
          type: "corner",
          minute: "74'",
          team: "home",
          description: "3rd corner",
        },
        {
          id: "5",
          type: "substitution",
          minute: "67'",
          team: "home",
          player1: "Rice",
          player2: "Zubemendi",
        },
        {
          id: "6",
          type: "substitution",
          minute: "67'",
          team: "away",
          player1: "Frimpong",
          player2: "Robertson",
        },
        {
          id: "7",
          type: "red_card",
          minute: "66'",
          team: "away",
          player1: "Van Dijk",
          description: "Sent Off",
        },
        { id: "8", type: "goal", minute: "55'", team: "home", player1: "Saka" },
        {
          id: "9",
          type: "corner",
          minute: "52'",
          team: "home",
          description: "5th corner",
        },
        {
          id: "10",
          type: "corner",
          minute: "48'",
          team: "away",
          description: "3rd Corner",
        },
        {
          id: "11",
          type: "corner",
          minute: "45+2'",
          team: "home",
          description: "2nd corner",
        },
        {
          id: "12",
          type: "substitution",
          minute: "45'",
          team: "away",
          player1: "Jones",
          player2: "Mcallister",
        },
        {
          id: "13",
          type: "yellow_card",
          minute: "44'",
          team: "home",
          player1: "Gabriel",
        },
        {
          id: "14",
          type: "injury",
          minute: "44'",
          team: "away",
          player1: "Jones",
          description: "Injured",
        },
        {
          id: "15",
          type: "corner",
          minute: "36'",
          team: "home",
          description: "1st corner",
        },
        {
          id: "16",
          type: "yellow_card",
          minute: "34'",
          team: "away",
          player1: "Konate",
        },
        {
          id: "17",
          type: "info",
          minute: "25'",
          team: "home",
          player1: "Gyokores",
          description: "VAR Check",
        },
        {
          id: "18",
          type: "corner",
          minute: "16'",
          team: "away",
          description: "2nd Corner",
        },
        {
          id: "19",
          type: "goal",
          minute: "12'",
          team: "home",
          player1: "Gyokores",
          player2: "Odegard",
        },
        {
          id: "20",
          type: "corner",
          minute: "3'",
          team: "away",
          description: "1st Corner",
        },
      ];
      return mockEvents;
    }

    // Sort real data by minute descending
    return timeline.sort((a, b) => {
      const minA = parseInt(a.minute.replace(/[^\d]/g, ""));
      const minB = parseInt(b.minute.replace(/[^\d]/g, ""));
      return minB - minA;
    });
  };

  const fetchMatchDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/lookupevent.php?id=${id}`,
      );
      const data: APIResponse = await response.json();

      if (data.events && data.events.length > 0) {
        const matchData = data.events[0];
        setMatch(matchData);
        setEvents(parseEventsFromAPI(matchData));
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMatchDetails();
  }, [fetchMatchDetails]);

  const renderEventIcon = (event: MatchTimelineEvent) => {
    switch (event.type) {
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#0b0c10]">
        <div className="w-12 h-12 border-4 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin mb-4" />
        <p className="text-[#64748b] text-sm font-bold uppercase tracking-widest">
          Refreshing Scores...
        </p>
      </div>
    );
  }

  if (!match) return null;

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-[#0b0c10] text-white overflow-x-hidden">
      {/* Navigation Header */}
      <div className="px-6 py-6 flex items-center gap-6 sticky top-0 bg-[#0b0c10] z-20">
        <button
          onClick={() => navigate("/")}
          className="hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold tracking-tight">{match.strLeague}</h1>
      </div>

      {/* Head-to-Head Section */}
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
              11 AUG
            </span>
            <div className="text-4xl font-black flex items-center gap-4 tracking-tighter">
              <span>{match.intHomeScore || "0"}</span>
              <span className="text-[#2d2f39] opacity-50">-</span>
              <span>{match.intAwayScore || "0"}</span>
            </div>
            <div className="bg-[#ff4d4d] px-3 py-1 rounded text-[10px] font-black uppercase text-white shadow-lg shadow-red-900/20">
              Finished
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

      {/* Detail Tabs */}
      <div className="px-6 flex items-center justify-between border-b border-[#2d2f39] mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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

      {/* Events Timeline Container */}
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
              {events.map((event) => {
                const isHome = event.team === "home";
                const isGoal = event.type === "goal";

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-center relative group"
                  >
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
                              {renderEventIcon(event)}
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
                              {renderEventIcon(event)}
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
              })}
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
                Kick Off - {match.strTime?.substring(0, 5) || "13:00"}
              </span>
              <div className="h-px flex-1 bg-[#2d2f39]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
