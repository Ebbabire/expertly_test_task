import { useState, useEffect, useCallback, useRef } from "react";
import type { Event } from "../types";
import { fetchUpcomingMatches } from "../services/api";
import { FALLBACK_FIXTURES } from "../constants/mockData";
import { INITIAL_SIMULATED_MATCHES } from "../constants/simulatedData";
import { advanceSimulatedMatches } from "../utils/simulateLive";

const POLL_INTERVAL_MS = 20_000;

export function useMatches() {
  const [matches, setMatches] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const simulatedRef = useRef<Event[]>(INITIAL_SIMULATED_MATCHES);
  const isFirstLoad = useRef(true);

  const loadMatches = useCallback(async () => {
    try {
      const data = await fetchUpcomingMatches();

      let apiMatches: Event[];
      if (data.events && data.events.length > 0) {
        apiMatches = data.events;
      } else {
        apiMatches = FALLBACK_FIXTURES;
      }

      // Advance simulated matches on every tick after the first load
      if (!isFirstLoad.current) {
        simulatedRef.current = advanceSimulatedMatches(simulatedRef.current);
      }
      isFirstLoad.current = false;

      setMatches([...simulatedRef.current, ...apiMatches]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
    const interval = setInterval(() => {
      loadMatches();
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [loadMatches]);

  return { matches, loading };
}
