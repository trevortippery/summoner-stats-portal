import Game from "./Game";
import useMatchHistory from "./useMatchHistory";

const MatchHistory = () => {
  const { matches, loading } = useMatchHistory();

  if (loading) {
    return <div className="text-center p-4">Loading match history...</div>;
  }

  if (!matches || matches.length === 0) {
    return <div className="text-center p-4">No matches found</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {matches.map((match) => (
        <Game key={match.id} {...match} />
      ))}
    </div>
  );
};

export default MatchHistory;
