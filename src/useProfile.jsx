import { useEffect, useState } from "react";
import { useSummoner } from "./contexts/SummonerContext";
import { riotRateLimiter } from "./utils/rateLimiter";

const useProfile = () => {
  const { summoner } = useSummoner();
  const { puuid, gameName } = summoner;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getProfileStats() {
      try {
        await riotRateLimiter.acquire();

        const apiKey = import.meta.env.VITE_RIOT_API_KEY;

        const profileStatsRes = await fetch(`
          https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
          { headers: { "X-Riot-Token": apiKey } }
        );

        if (!profileStatsRes.ok) {
          throw new Error(`API responded with status ${profileStatsRes.status}`);
        }

        const profileStats = await profileStatsRes.json();
        setProfile(profileStats);

      }   catch (err) {
        console.error(`Failed to fetch ${gameName}'s profile statistics`, err);
      }
    }
    getProfileStats()
  }, [puuid]);

  return profile;
};


export default useProfile;