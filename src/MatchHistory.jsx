import Game from "./Game";
import useMatchHistory from "./useMatchHistory";

const MatchHistory = () => {
  const matches = useMatchHistory("Tippery", "NA1");

  return (
    <div className="flex flex-col gap-2">
      {matches.length === 0 ? (
        <p>Loading match history...</p>
      ) : (
        matches.map((match) => <Game key={match.id} {...match} />)
      )}
    </div>
  );
};

export default MatchHistory;
