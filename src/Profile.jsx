import useProfile from "./useProfile";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const profile = useProfile();
  console.log(profile);

  return (
    <>
      {profile.map((gameMode) => (
          <ProfileCard key={gameMode.leagueId} {...gameMode}/>
      ))}
    </>
    );
};

export default Profile;