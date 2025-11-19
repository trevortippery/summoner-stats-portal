import fetch from "node-fetch";
import { riotRateLimiter } from "./rateLimiter.js";
import 'dotenv/config';

const API_KEY = process.env.RIOT_API_KEY;

export async function riotFetch(url) {
  await riotRateLimiter.acquire();

  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`\n[Riot API ERROR] ${response.status}\nURL: ${url}\nResponse: ${text}\n`);
      throw new Error(`Riot API error ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Riot API] ${url} fetched successfully`);
    return data;
  } catch (err) {
    console.error(`[Riot API] Failed to fetch: ${url}\n`, err.message);
    throw err;
  }
}
