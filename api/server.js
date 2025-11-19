import Fastify from "fastify";
import summonerByPuuidRoutes from "./routes/summonerByPuuid.js";
import cors from "@fastify/cors";
import accountRoutes from "./routes/account.js";
import rankRoutes from "./routes/rank.js";
import matchHistoryRoutes from "./routes/matchHistory.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: "*",
});

fastify.register(summonerByPuuidRoutes);
fastify.register(accountRoutes);
fastify.register(rankRoutes);
fastify.register(matchHistoryRoutes);

const PORT = 3001;

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`API Server running at ${address}`);
});
