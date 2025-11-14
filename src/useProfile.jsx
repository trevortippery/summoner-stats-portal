import { useEffect, useState } from "react";
import { riotRateLimiter } from "./utils/rateLimiter";
import { useSummoner } from "./contexts/SummonerContext";

const useProfile = () => {
  const { summoner } = useSummoner();
  const { puuid, gameName } = summoner;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getProfileStats() {
      if (!puuid) return;

      try {
        await riotRateLimiter.acquire();

        const apiKey = import.meta.env.VITE_RIOT_API_KEY;

        const profileRes = await fetch(
          `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
          { headers: { "X-Riot-Token": apiKey } },
        );

        if (!profileRes.ok) {
          throw new Error(`API responded with status ${profileRes.status}`);
        }

        const profileData = await profileRes.json();
        setProfile(profileData);
      } catch (err) {
        console.error(`Failed to fetch ${gameName}'s profile`, err);
      }
    }

    getProfileStats();
  }, [puuid]);

  return profile;
};

export default useProfile;
