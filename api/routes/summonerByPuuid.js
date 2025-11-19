import { riotFetch } from "../utils/riotClient.js";

export default async function summonerByPuuidRoutes(fastify) {
  fastify.get("/api/summoner/by-puuid/:platform/:puuid", async (req) => {
    const { platform, puuid } = req.params;

    const url = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

    return await riotFetch(url);
  });
}
