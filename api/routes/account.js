
import { riotFetch } from "../utils/riotClient.js";

export default async function accountRoutes(fastify) {
  fastify.get("/api/account/:region/:gameName/:tagLine", async (req) => {
    const { region, gameName, tagLine } = req.params;

    const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;

    return await riotFetch(url);
  });
}

