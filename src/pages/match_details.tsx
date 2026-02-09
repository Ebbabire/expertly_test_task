import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMatchDetails } from "../hooks/useMatchDetails";
import { MATCH_DETAIL_TABS } from "../constants/navigation";
import MatchHeader from "../components/match/MatchHeader";
import MatchTabs from "../components/match/MatchTabs";
import EventTimeline from "../components/match/EventTimeline";

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { match, events, loading } = useMatchDetails(id);
  const [activeTab, setActiveTab] = useState("Events");

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

      <MatchHeader match={match} />

      <MatchTabs
        tabs={MATCH_DETAIL_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <EventTimeline
        events={events}
        kickOffTime={match.strTime?.substring(0, 5) || "13:00"}
      />
    </div>
  );
};

export default MatchDetails;
