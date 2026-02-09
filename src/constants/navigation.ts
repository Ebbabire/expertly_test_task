export interface DateEntry {
  day: string;
  date: string;
  active?: boolean;
}

export const FIXTURE_DATES: DateEntry[] = [
  { day: "WED", date: "5 FEB" },
  { day: "THU", date: "6 FEB" },
  { day: "Today", date: "7 FEB", active: true },
  { day: "SUN", date: "8 FEB" },
  { day: "MON", date: "9 FEB" },
];

export const MATCH_DETAIL_TABS = [
  "Details",
  "Odds",
  "Lineups",
  "Events",
  "Stats",
  "Standings",
] as const;

export type MatchDetailTab = (typeof MATCH_DETAIL_TABS)[number];
