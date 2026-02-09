import { useState, useMemo } from "react";
import { useMatches } from "../hooks/useMatches";
import { FIXTURE_DATES } from "../constants/navigation";
import { isMatchLive, groupMatchesByLeague } from "../utils/matchHelpers";
import DateSelector from "../components/DateSelector";
import MatchFilters from "../components/MatchFilters";
import LeagueSection from "../components/LeagueSection";
import type { FilterType } from "../components/MatchFilters";

const Fixtures = () => {
  const { matches, loading } = useMatches();
  const [filter, setFilter] = useState<FilterType>("all");

  const liveCount = useMemo(
    () => matches.filter(isMatchLive).length,
    [matches],
  );

  // Favorites: no backend, so we keep a static count for now
  const favoritesCount = 0;

  const filteredMatches = useMemo(() => {
    switch (filter) {
      case "live":
        return matches.filter(isMatchLive);
      case "favorites":
        return []; // No favorites backend — returns empty
      default:
        return matches;
    }
  }, [matches, filter]);

  const leagueGroups = useMemo(
    () => groupMatchesByLeague(filteredMatches),
    [filteredMatches],
  );

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Fixtures</h1>

      <DateSelector dates={FIXTURE_DATES} />

      <MatchFilters
        filter={filter}
        onFilterChange={setFilter}
        matchCount={matches.length}
        liveCount={liveCount}
        favoritesCount={favoritesCount}
      />

      {loading ? (
        <LeagueSection leagueName="English Premier League" matches={[]} loading />
      ) : Object.keys(leagueGroups).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(leagueGroups).map(([league, leagueMatches]) => (
            <LeagueSection
              key={league}
              leagueName={league}
              matches={leagueMatches}
              loading={false}
            />
          ))}
        </div>
      ) : (
        <LeagueSection leagueName="English Premier League" matches={[]} loading={false} />
      )}
    </div>
  );
};

export default Fixtures;
