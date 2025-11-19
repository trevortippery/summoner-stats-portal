import { riotFetch } from "../utils/riotClient.js";

export default async function rankRoutes(fastify) {
  fastify.get("/api/rank/:platform/:puuid", async (req) => {
    const { platform, puuid } = req.params;

    const url = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;

    const profileStats = await riotFetch(url);

    // Sort so RANKED_SOLO_5X5 is first
    const sortedProfile = [...profileStats].sort((a, b) => {
      const aType = a.queueType.toUpperCase();
      const bType = b.queueType.toUpperCase();

      if (aType === "RANKED_SOLO_5X5" && bType !== "RANKED_SOLO_5X5") return -1;
      if (bType === "RANKED_SOLO_5X5" && aType !== "RANKED_SOLO_5X5") return 1;
      return 0;
    });

    return sortedProfile;
  });
}
