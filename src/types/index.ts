export interface Event {
  idEvent: string;
  strEvent: string;
  strLeague: string;
  idLeague: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string;
  strTimestamp: string;
  strTime: string;
  dateEvent: string;
  strThumb: string;
  idHomeTeam: string;
  idAwayTeam: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  strVenue: string;
  strCountry: string;
  strDescriptionEN: string | null;
}

export interface MatchTimelineEvent {
  id: string;
  type:
    | "goal"
    | "yellow_card"
    | "red_card"
    | "substitution"
    | "corner"
    | "injury"
    | "info";
  minute: string;
  team: "home" | "away";
  player1?: string;
  player2?: string;
  description?: string;
}

export interface MatchDetails extends Event {
  events: MatchTimelineEvent[];
}

export interface APIResponse {
  events: Event[];
}
