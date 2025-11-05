import { createContext, useContext, useState } from "react";

const SummonerContext = createContext();

export const SummonerProvider = ({ children }) => {
  const [puuid, setPuuid] = useState(null);

  return (
    <SummonerContext.Provider value={{ puuid, setPuuid }}>
      {children}
    </SummonerContext.Provider>
  );
};

export const useSummoner = () => useContext(SummonerContext);
