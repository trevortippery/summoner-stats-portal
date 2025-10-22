import { useEffect, useState } from "react";
import useQueueInfo from "./useQueueInfo";

const summonerSpellMap = {
  1: "SummonerBoost",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  11: "SummonerSmite",
  12: "SummonerTeleport",
  13: "SummonerMana",
  14: "SummonerDot",
  21: "SummonerBarrier",
  32: "SummonerSnowball",
};

const runeTreeMap = {
  8000: "perk-images/Styles/7201_Precision.png",
  8100: "perk-images/Styles/7200_Domination.png",
  8200: "perk-images/Styles/7202_Sorcery.png",
  8300: "perk-images/Styles/7203_Whimsy.png",
  8400: "perk-images/Styles/7204_Resolve.png",
};

const useMatchHistory = (riotId, tag) => {
  const [matches, setMatches] = useState([]);
  const [version, setVersion] = useState(null);
  const [runeIcons, setRuneIcons] = useState({});
  const queues = useQueueInfo();

  useEffect(() => {
    (async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const versions = await versionRes.json();
        const latest = versions[0];
        setVersion(latest);

        const runesRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/runesReforged.json`
        );
        const runeData = await runesRes.json();

        const runeMap = {};
        for (const tree of runeData) {
          for (const slot of tree.slots) {
            for (const rune of slot.runes) {
              runeMap[rune.id] = rune.icon;
            }
          }
        }
        setRuneIcons(runeMap);
      } catch (err) {
        console.error("Failed to fetch DDragon version or runes:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!queues || !version) return;

    (async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const apiKey = import.meta.env.VITE_RIOT_API_KEY;
        const ddragonBase = `https://ddragon.leagueoflegends.com/cdn/${version}/img/`;

        const accountRes = await fetch(
          `${baseURL}riot/account/v1/accounts/by-riot-id/${riotId}/${tag}`,
          { headers: { "X-Riot-Token": apiKey } }
        );
        const accountJson = await accountRes.json();

        const matchIdsRes = await fetch(
          `${baseURL}lol/match/v5/matches/by-puuid/${accountJson.puuid}/ids?start=0&count=10`,
          { headers: { "X-Riot-Token": apiKey } }
        );
        const matchIds = await matchIdsRes.json();

        const matchDetails = await Promise.all(
          matchIds.map(async (id) => {
            const matchRes = await fetch(`${baseURL}lol/match/v5/matches/${id}`, {
              headers: { "X-Riot-Token": apiKey },
            });
            const match = await matchRes.json();

            const p = match.info.participants.find(
              (x) => x.puuid === accountJson.puuid
            );
            if (!p) return null;

            return {
              id,
              gameInfo: {
                gameType: queues[match.info.queueId] || "Match",
                date: new Date(match.info.gameStartTimestamp).toLocaleString(),
                result: p.win ? "Victory" : "Defeat",
                duration: `${Math.floor(match.info.gameDuration / 60)}:${String(
                  match.info.gameDuration % 60
                ).padStart(2, "0")}`,
              },
              champion: {
                image: `${ddragonBase}champion/${p.championName}.png`,
                name: p.championName,
              },
              summoners: [1, 2].map((n) => ({
                image: `${ddragonBase}spell/${
                  summonerSpellMap[p[`summoner${n}Id`]]
                }.png`,
                name: `Summoner Spell ${n}`,
              })),
              augments: p.perks.styles.map((style) => {
                if (style.description === "primaryStyle") {
                  return {
                    image: runeTreeMap[style.style]
                      ? `https://ddragon.leagueoflegends.com/cdn/img/${runeTreeMap[style.style]}`
                      : `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png`,
                    name: `Primary Rune Tree`,
                  };
                } else {
                  return {
                    image: runeTreeMap[style.style]
                      ? `https://ddragon.leagueoflegends.com/cdn/img/${runeTreeMap[style.style]}`
                      : `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png`,
                    name: "Secondary RuneTree",
                  };
                }
              }),
              items: [0, 1, 2, 3, 4, 5, 6]
                .map((n) => p[`item${n}`])
                .filter((id) => id)
                .map((id) => ({
                  id,
                  image: `${ddragonBase}item/${id}.png`,
                })),
            };
          })
        );

        setMatches(matchDetails.filter(Boolean));
      } catch (err) {
        console.error("Error fetching match history:", err);
      }
    })();
  }, [queues, riotId, tag, version, runeIcons]);

  return matches;
};

export default useMatchHistory;
