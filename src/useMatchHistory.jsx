import { useEffect, useState } from "react";
import useQueueInfo from "./useQueueInfo";
import { timeAgo } from "./utils/time";
import { calculateKDA, calculateCS } from "./utils/calculate";
import { useSummoner } from "./contexts/SummonerContext";
import emptyImage from "./assets/images/empty-image.png";
import { getCurrentVersion } from "./utils/version";

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
  const [loading, setLoading] = useState(false);
  const queues = useQueueInfo();
  const { summoner } = useSummoner();
  const { puuid, region } = summoner;

  // Fetch latest DDragon version
  useEffect(() => {
    (async () => {
      try {
        const latest = await getCurrentVersion();
        setVersion(latest);
      } catch (err) {
        console.error("Failed to fetch DDragon version:", err);
      }
    })();
  }, []);

  // Fetch match history from backend
  useEffect(() => {
    if (!queues || !version || !puuid || !region || loading) return;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/matches/${region}/${puuid}`);
        if (!res.ok) throw new Error(`Failed to fetch matches: ${res.status}`);
        const matchData = await res.json();

        // Transform matches for frontend
        const processed = matchData.map((match) => {
          const p = match.info.participants.find((x) => x.puuid === puuid);
          if (!p) return null;

          const ddragonBase = `https://ddragon.leagueoflegends.com/cdn/${version}/img/`;

          return {
            id: match.metadata.matchId,
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
              image: `${ddragonBase}spell/${summonerSpellMap[p[`summoner${n}Id`]]}.png`,
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
            items: Array.from({ length: 7 }).map((_, n) => {
              const id = p[`item${n}`];
              return id && id !== 0
                ? { id: `${id}-${n}`, image: `${ddragonBase}item/${id}.png` }
                : { id: `empty-${n}`, image: emptyImage };
            }),
            participants: match.info.participants.map((participant) => ({
              summonerName:
                participant.riotIdGameName ||
                participant.summonerName ||
                "Unknown",
              championName: participant.championName,
              championImage: `${ddragonBase}champion/${participant.championName}.png`,
              teamId: participant.teamId,
              gameName: participant.riotIdGameName,
              tagLine: participant.riotIdTagLine,
              puuid: participant.puuid,
            })),
          };
        });

        setMatches(processed.filter(Boolean));
      } catch (err) {
        console.error("Error fetching match history:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [puuid, region, queues, version]);

  return { matches, loading };
};

export default useMatchHistory;
