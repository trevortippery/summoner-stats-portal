import { useEffect } from "react";
import { useSummoner } from "./contexts/SummonerContext";

const usePuuid = () => {
  const { summoner, setPuuid, setLoading, setError } = useSummoner();
  const { gameName, tagLine, puuid, loading, error } = summoner;

  useEffect(() => {
    async function fetchPuuid() {
      try {
        setLoading(true);
        const baseURL = import.meta.env.VITE_BASE_URL;
        const apiKey = import.meta.env.VITE_RIOT_API_KEY;

        const puuidRes = await fetch(
          `${baseURL}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
          {
            headers: { "X-Riot-Token": apiKey },
          },
        );

        if (!puuidRes.ok) {
          throw new Error(`Failed to fetch PUUID: ${puuidRes.statusText}`);
        }

        const accountPuuid = await puuidRes.json();

        setPuuid(accountPuuid.puuid);
      } catch (err) {
        console.log("Error fetch PUUID:", err);
        setError(err.message || "Failed to fetch PUUID");
      }
    }
    fetchPuuid();
  }, [gameName, tagLine, setPuuid, setLoading, setError]);

  return { puuid, loading, error };
};

export default usePuuid;
