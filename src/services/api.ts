import type { APIResponse } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchUpcomingMatches(): Promise<APIResponse> {
  const response = await fetch(`${BASE_URL}/eventsnext.php?id=133602`);
  return response.json();
}

export async function fetchMatchById(id: string): Promise<APIResponse> {
  const response = await fetch(`${BASE_URL}/lookupevent.php?id=${id}`);
  return response.json();
}
