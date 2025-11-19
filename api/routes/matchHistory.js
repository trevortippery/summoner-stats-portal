import { riotFetch } from "../utils/riotClient.js";

export default async function matchHistoryRoutes(fastify) {
  fastify.get("/api/matches/:region/:puuid", async (req) => {
    const { region, puuid } = req.params;

    const url = `https://${region.toLowerCase()}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`;

    const matchIds = await riotFetch(url);

    const matches = [];
    for (const id of matchIds) {
      try {
        const matchUrl = `https://${region.toLowerCase()}.api.riotgames.com/lol/match/v5/matches/${id}`;
        const match = await riotFetch(matchUrl);
        matches.push(match);
      } catch (err) {
        fastify.log.warn(`Failed to fetch match ${id}: ${err.message}`);
      }
    }

    return matches;
  });
}
