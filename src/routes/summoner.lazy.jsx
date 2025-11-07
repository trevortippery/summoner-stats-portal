import { createLazyFileRoute } from "@tanstack/react-router";
import MatchHistory from "../MatchHistory";
import usePuuid from "../usePuuid";

export const Route = createLazyFileRoute("/summoner")({
  component: Summoner,
});

function Summoner() {
  const { puuid, loading, error } = usePuuid();

  if (loading) {
    return <div>Loading profile and match history...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!puuid) {
    return null;
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 bg-indigo-500">
      <div>
        <p>player stats</p>
      </div>
      <div className="lg:col-span-2">
        <MatchHistory />
      </div>
    </div>
  );
}
