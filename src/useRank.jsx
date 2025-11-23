import { useEffect, useState } from "react";
import { useSummoner } from "./contexts/SummonerContext";
// import { riotRateLimiter } from "./utils/rateLimiter";

const useRank = () => {
  const { summoner } = useSummoner();
  const { puuid, gameName, platform } = summoner;
  const [rank, setRank] = useState([]);

  useEffect(() => {
    async function getRankStats() {
      if (!puuid || !platform) return;

      try {
        const profileStatsRes = await fetch(`/api/rank/${platform}/${puuid}`);

        if (!profileStatsRes.ok) {
          throw new Error(
            `API responded with status ${profileStatsRes.status}`,
          );
        }

        const profileStats = await profileStatsRes.json();

        const sortedProfile = [...profileStats].sort((a, b) => {
          const aType = a.queueType.toUpperCase();
          const bType = b.queueType.toUpperCase();

          if (aType === "RANKED_SOLO_5X5" && bType !== "RANKED_SOLO_5X5")
            return -1;
          if (bType === "RANKED_SOLO_5X5" && aType !== "RANKED_SOLO_5X5")
            return 1;
          return 0;
        });

        setRank(sortedProfile);
      } catch (err) {
        console.error(`Failed to fetch ${gameName}'s profile statistics`, err);
      }
    }

    getRankStats();
  }, [puuid, platform, gameName]);

  return rank;
};

export default useRank;
