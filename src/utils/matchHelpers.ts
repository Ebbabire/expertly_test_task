import type { Event } from "../types";

/** Returns true if the match is currently in progress (live). */
export function isMatchLive(match: Event): boolean {
  return match.strStatus !== "Not Started" && match.strStatus !== "Match Finished";
}

/** Groups an array of matches by their `strLeague` field. */
export function groupMatchesByLeague(matches: Event[]): Record<string, Event[]> {
  return matches.reduce<Record<string, Event[]>>((groups, match) => {
    const league = match.strLeague;
    if (!groups[league]) {
      groups[league] = [];
    }
    groups[league].push(match);
    return groups;
  }, {});
}

/** Formats a date string like "2025-08-11" into "11 AUG". */
export function formatMatchDate(dateEvent: string): string {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(dateEvent);
  if (isNaN(date.getTime())) return dateEvent;
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

/**
 * Returns the display label and color variant for a match status.
 * - "Match Finished" -> { label: "Finished", variant: "red" }
 * - "Not Started"    -> { label: time or "TBC", variant: "gray" }
 * - Anything else    -> { label: status (e.g. "63'"), variant: "green" }
 */
export function getStatusDisplay(match: Event): { label: string; variant: "red" | "green" | "gray" } {
  if (match.strStatus === "Match Finished") {
    return { label: "Finished", variant: "red" };
  }
  if (match.strStatus === "Not Started") {
    return { label: match.strTime?.substring(0, 5) || "TBC", variant: "gray" };
  }
  return { label: match.strStatus, variant: "green" };
}
