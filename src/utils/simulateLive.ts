import type { Event } from "../types";

/**
 * Parses the current minute from a match status string like "63'" or "HT".
 * Returns the numeric minute, or 45 for "HT".
 */
function parseMinute(status: string): number {
  if (status === "HT") return 45;
  const num = parseInt(status.replace(/[^\d]/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

/**
 * Pure function that advances simulated live matches forward in time.
 * - Each match's minute advances by a 1 minutes
 * - ~20% chance per match that a random team scores a goal
 */
export function advanceSimulatedMatches(matches: Event[]): Event[] {
  return matches.map((match) => {
    // Don't advance finished matches
    if (match.strStatus === "Match Finished") return match;

    const currentMinute = parseMinute(match.strStatus);
    // const advance = Math.floor(Math.random() * 5) + 3; // 3-7 minutes
    const newMinute = currentMinute + 1;

    const updated = { ...match };

    if (newMinute >= 90) {
      updated.strStatus = "Match Finished";
    } else {
      updated.strStatus = `${newMinute}'`;
    }

    // ~20% chance of scoring a goal
    if (Math.random() < 0.2) {
      const scoringTeam = Math.random() < 0.5 ? "home" : "away";
      if (scoringTeam === "home") {
        updated.intHomeScore = String(
          parseInt(updated.intHomeScore || "0", 10) + 1,
        );
      } else {
        updated.intAwayScore = String(
          parseInt(updated.intAwayScore || "0", 10) + 1,
        );
      }
    }

    return updated;
  });
}
