import { createLazyFileRoute } from "@tanstack/react-router";
import MatchHistory from "../MatchHistory";

export const Route = createLazyFileRoute("/summoner")({
  component: Summoner,
});

function Summoner() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3">
      <div>
        <p>player stats</p>
      </div>
      <div className="lg:col-span-2">
        <MatchHistory />
      </div>
    </div>
  );
}
