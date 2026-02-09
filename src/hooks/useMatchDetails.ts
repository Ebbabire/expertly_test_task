import { useState, useEffect, useCallback } from "react";
import type { Event, MatchTimelineEvent } from "../types";
import { fetchMatchById } from "../services/api";
import { parseEventsFromAPI } from "../utils/eventParser";

export function useMatchDetails(id: string | undefined) {
  const [match, setMatch] = useState<Event | null>(null);
  const [events, setEvents] = useState<MatchTimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMatchDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchMatchById(id);

      if (data.events && data.events.length > 0) {
        const matchData = data.events[0];
        setMatch(matchData);
        setEvents(parseEventsFromAPI(matchData as unknown as Record<string, unknown>));
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMatchDetails();
  }, [loadMatchDetails]);

  return { match, events, loading };
}
