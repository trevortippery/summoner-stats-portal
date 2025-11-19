import { useEffect } from "react";
import { useSummoner } from "./contexts/SummonerContext";

const usePuuid = () => {
  const { summoner, setPuuid, setLoading, setError } = useSummoner();
  const { gameName, tagLine, region, puuid, loading, error } = summoner;

  useEffect(() => {
    if (!gameName || !tagLine || !region || puuid) return;

    async function fetchPuuid() {
      try {
        setLoading(true);

        const puuidRes = await fetch(
          `/api/account/${region}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
        );

        if (!puuidRes.ok) {
          throw new Error(`Failed to fetch PUUID: ${puuidRes.statusText}`);
        }

        const accountPuuid = await puuidRes.json();
        setPuuid(accountPuuid.puuid);
      } catch (err) {
        console.log("Error fetch PUUID:", err);
        setError(err.message || "Failed to fetch PUUID");
      } finally {
        setLoading(false);
      }
    }

    fetchPuuid();
  }, [gameName, tagLine, region]);

  return { puuid, loading, error };
};

export default usePuuid;
