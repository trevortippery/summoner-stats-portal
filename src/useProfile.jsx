import { useEffect, useState } from "react";
// import { riotRateLimiter } from "./utils/rateLimiter";
import { useSummoner } from "./contexts/SummonerContext";

const useProfile = () => {
  const { summoner } = useSummoner();
  const { puuid, gameName, platform } = summoner;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProfileStats() {
      if (!puuid || !platform) return;

      if (loading) return;

      try {
        setLoading(true);

        const profileRes = await fetch(
          `/api/summoner/by-puuid/${platform}/${puuid}`,
        );

        if (!profileRes.ok) {
          throw new Error(`API responded with status ${profileRes.status}`);
        }

        const profileData = await profileRes.json();
        setProfile(profileData);
      } catch (err) {
        console.error(`Failed to fetch ${gameName}'s profile`, err);
      } finally {
        setLoading(false);
      }
    }

    getProfileStats();
  }, [puuid, platform]);

  return { profile, loading };
};

export default useProfile;
