import type { MatchTimelineEvent } from "../types";
import { FALLBACK_TIMELINE_EVENTS } from "../constants/mockData";

/**
 * Parses raw API match data into a sorted array of timeline events.
 * Falls back to mock data when the API provides no event details.
 */
export function parseEventsFromAPI(data: Record<string, unknown>): MatchTimelineEvent[] {
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

  parseString(data.strHomeGoalDetails as string | null, "goal", "home");
  parseString(data.strAwayGoalDetails as string | null, "goal", "away");
  parseString(data.strHomeYellowCards as string | null, "yellow_card", "home");
  parseString(data.strAwayYellowCards as string | null, "yellow_card", "away");
  parseString(data.strHomeRedCards as string | null, "red_card", "home");
  parseString(data.strAwayRedCards as string | null, "red_card", "away");

  // If API has no event details, use the 1:1 Figma Mock Data to ensure visual fidelity
  if (timeline.length === 0) {
    return FALLBACK_TIMELINE_EVENTS;
  }

  // Sort real data by minute descending
  return timeline.sort((a, b) => {
    const minA = parseInt(a.minute.replace(/[^\d]/g, ""));
    const minB = parseInt(b.minute.replace(/[^\d]/g, ""));
    return minB - minA;
  });
}
