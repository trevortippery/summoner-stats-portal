import { useEffect, useState } from "react";
import { useSummoner } from "./contexts/SummonerContext";
import { riotRateLimiter } from "./utils/rateLimiter";

const useProfile = () => {
  const { summoner } = useSummoner();
  const { puuid, gameName } = summoner;
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function getProfileStats() {
      if (!puuid) return;

      try {
        await riotRateLimiter.acquire();

        const apiKey = import.meta.env.VITE_RIOT_API_KEY;
        const profileStatsRes = await fetch(
          `
          https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
          { headers: { "X-Riot-Token": apiKey } },
        );

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

        setProfile(sortedProfile);
      } catch (err) {
        console.error(`Failed to fetch ${gameName}'s profile statistics`, err);
      }
    }

    getProfileStats();
  }, [puuid]);

  return profile;
};

export default useProfile;
