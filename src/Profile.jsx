import useRank from "./useRank";
import RankCard from "./RankCard";
import useProfile from "./useProfile";
import ProfileCard from "./ProfileCard";
import { useSummoner } from "./contexts/SummonerContext";

const Profile = () => {
  const profile = useProfile();
  const rank = useRank();
  const { summoner } = useSummoner();

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <ProfileCard
        profileIconId={profile.profileIconId}
        summonerLevel={profile.summonerLevel}
        gameName={summoner.gameName}
      />
      {rank.map((gameMode) => (
        <RankCard key={gameMode.leagueId} {...gameMode} />
      ))}
    </>
  );
};

export default Profile;
