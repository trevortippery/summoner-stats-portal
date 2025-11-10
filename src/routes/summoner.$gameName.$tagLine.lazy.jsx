import { createLazyFileRoute, useParams } from "@tanstack/react-router";
import MatchHistory from "../MatchHistory";
import usePuuid from "../usePuuid";
import Profile from "../Profile";

export const Route = createLazyFileRoute("/summoner/$gameName/$tagLine")({
  component: Summoner,
});

function Summoner() {
  const { gameName, tagLine } = useParams({
    from: "/summoner/$gameName/$tagLine",
  });
  const { puuid, loading, error } = usePuuid();

  if (loading)
    return (
      <div>
        Loading {gameName}#{tagLine}…
      </div>
    );
  if (error) return <div className="text-red-600">{error}</div>;
  if (!puuid) return null;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3">
      <div>
        <Profile />
      </div>
      <div className="lg:col-span-2">
        <MatchHistory />
      </div>
    </div>
  );
}
