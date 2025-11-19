import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SummonerContext = createContext();

export function SummonerProvider({ children }) {
  const [summoner, setSummoner] = useState(() => {
    const saved = localStorage.getItem("summoner");
    return saved
      ? JSON.parse(saved)
      : {
          gameName: "",
          tagLine: "",
          platform: "na1",
          region: "americas",
          puuid: null,
          loading: false,
          error: null,
        };
  });

  const setSummonerInfo = useCallback(
    ({ gameName, tagLine, platform, region }) => {
      setSummoner((s) => ({
        ...s,
        gameName: gameName ?? s.gameName,
        tagLine: tagLine ?? s.tagLine,
        platform: platform ?? s.platform,
        region: region ?? s.region,
        puuid: null,
        error: null,
      }));
    },
    [],
  );

  const setPuuid = useCallback((puuid) => {
    setSummoner((s) => ({ ...s, puuid, loading: false, error: null }));
  }, []);

  const setLoading = useCallback((loading) => {
    setSummoner((s) => ({ ...s, loading }));
  }, []);

  const setError = useCallback((error) => {
    setSummoner((s) => ({ ...s, error, loading: false }));
  }, []);

  const resetSummoner = useCallback(() => {
    setSummoner({
      gameName: "",
      tagLine: "",
      puuid: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("summoner", JSON.stringify(summoner));
  }, [summoner]);

  return (
    <SummonerContext.Provider
      value={{
        summoner,
        setSummonerInfo,
        setPuuid,
        setLoading,
        setError,
        resetSummoner,
      }}
    >
      {children}
    </SummonerContext.Provider>
  );
}

export const useSummoner = () => useContext(SummonerContext);
