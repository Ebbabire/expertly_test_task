# Statscore — Football Fixtures & Live Match Tracker

A real-time football/soccer fixtures dashboard built with React, TypeScript, and Tailwind CSS. Browse upcoming matches, watch simulated live scores update automatically, and dive into detailed match event timelines.

## Features

- **Fixtures dashboard** — upcoming matches grouped by league with date navigation and filters (All / Live / Favorites)
- **Live match simulation** — three simulated Champions League matches that advance in real time (minute-by-minute with random goals)
- **Match detail view** — full event timeline with goals, cards, substitutions, corners, and injuries displayed on a centre-aligned timeline
- **Auto-refresh** — match data polls every 20 seconds to keep scores current
- **Responsive UI** — dark-themed, mobile-first design with a purple gradient navbar

## Tech Stack

| Layer     | Technology                      |
| --------- | ------------------------------- |
| Framework | React 19 + TypeScript 5.9       |
| Build     | Vite 7                          |
| Routing   | React Router DOM 7 (HashRouter) |
| Styling   | Tailwind CSS 4                  |
| Icons     | Lucide React                    |
| API       | TheSportsDB (free tier)         |

## Project Structure

```
src/
├── pages/            # Route-level components (fixtures, match_details)
├── components/       # Reusable UI components
│   └── match/        # Match-detail-specific components (timeline, header, tabs)
├── hooks/            # Custom React hooks (useMatches, useMatchDetails)
├── services/         # API client functions
├── constants/        # Static data, mock/fallback fixtures, simulated matches
├── types/            # TypeScript interfaces
└── utils/            # Helpers (event parser, live simulation, match formatting)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_BASE_URL=https://www.thesportsdb.com/api/v1/json/3
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API

The app uses [TheSportsDB](https://www.thesportsdb.com/) free API to fetch upcoming fixtures and individual match details.

### Known Limitations

- **Event timeline** — the API does not provide granular match events (goals, cards, subs) for most matches, so the match detail page uses **dummy/fallback timeline data** to demonstrate the UI.
- **Team badges** — badge URLs are not consistently returned by the API; the app includes a **fallback badge map** for common teams (Arsenal, Liverpool, Barcelona, etc.) so crests still display correctly.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR      |
| `npm run build`   | Type-check and build for production |
| `npm run lint`    | Run ESLint                          |
| `npm run preview` | Preview the production build        |
