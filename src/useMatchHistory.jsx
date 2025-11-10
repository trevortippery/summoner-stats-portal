import { useEffect, useState } from "react";
import useQueueInfo from "./useQueueInfo";
import { timeAgo } from "./utils/time";
import { calculateKDA, calculateCS } from "./utils/calculate";
import { useSummoner } from "./contexts/SummonerContext";
import { riotRateLimiter } from "./utils/rateLimiter";
import emptyImage from "./assets/images/empty-image.png";

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

const useMatchHistory = () => {
  const [matches, setMatches] = useState([]);
  const [version, setVersion] = useState(null);
  const [runeIcons, setRuneIcons] = useState({});
  const queues = useQueueInfo();
  const { summoner } = useSummoner();
  const { puuid } = summoner;

  useEffect(() => {
    (async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json",
        );
        const versions = await versionRes.json();
        const latest = versions[0];
        setVersion(latest);

        const runesRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/runesReforged.json`,
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

        // Acquire rate limit token before making request
        await riotRateLimiter.acquire();

        const matchIdsRes = await fetch(
          `${baseURL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
          { headers: { "X-Riot-Token": apiKey } },
        );
        const matchIds = await matchIdsRes.json();

        const matchDetails = [];

        for (const id of matchIds) {
          try {
            // Acquire rate limit token before each match request
            await riotRateLimiter.acquire();

            const matchRes = await fetch(
              `${baseURL}/lol/match/v5/matches/${id}`,
              { headers: { "X-Riot-Token": apiKey } },
            );

            if (matchRes.status === 429) {
              console.warn("Rate limited despite limiter — waiting 5s before retry...");
              await new Promise(res => setTimeout(res, 5000));
              continue;
            }

            const match = await matchRes.json();
            const p = match.info?.participants?.find((x) => x.puuid === puuid);
            if (!p) continue;

            matchDetails.push({
              id,
              gameInfo: {
                summonerName: p.riotIdGameName || p.summonerName,
                gameType: queues[match.info.queueId] || "Match",
                date: timeAgo(match.info.gameEndTimestamp),
                result: p.win ? "Victory" : "Defeat",
                duration: `${Math.floor(match.info.gameDuration / 60)}:${String(
                  match.info.gameDuration % 60,
                ).padStart(2, "0")}`,
                kills: p.kills,
                deaths: p.deaths,
                assists: p.assists,
                kda: calculateKDA(p.kills, p.deaths, p.assists),
                minionScore: calculateCS(
                  match.info.gameDuration,
                  p.totalMinionsKilled + p.neutralMinionsKilled,
                ),
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
              augments: p.perks.styles.map((style) => ({
                image: runeTreeMap[style.style]
                  ? `https://ddragon.leagueoflegends.com/cdn/img/${runeTreeMap[style.style]}`
                  : `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png`,
                name:
                  style.description === "primaryStyle"
                    ? "Primary Rune Tree"
                    : "Secondary Rune Tree",
              })),
              items: (() => {
                const itemSlots = [0, 1, 2, 3, 4, 5, 6];
                return itemSlots.map((n) => {
                  const id = p[`item${n}`];
                  return id && id !== 0
                    ? { id, image: `${ddragonBase}item/${id}.png` }
                    : {
                        id: `empty-${n}`,
                        image: emptyImage,
                      };
                });
              })(),
              participants: match.info.participants.map((participant) => ({
                summonerName:
                  participant.riotIdGameName ||
                  participant.summonerName ||
                  "Unknown",
                championName: participant.championName,
                championImage: `${ddragonBase}champion/${participant.championName}.png`,
                teamId: participant.teamId,
              })),
            });
          } catch (err) {
            console.error("Error fetching match:", id, err);
          }
        }

        setMatches(matchDetails.filter(Boolean));
      } catch (err) {
        console.error("Error fetching match history:", err);
      }
    })();
  }, [puuid, queues, version, runeIcons]);

  return matches;
};

export default useMatchHistory;