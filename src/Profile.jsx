import useProfile from "./useProfile";

const gameModes = {
  rankedSolo: "Ranked Solo/Duo",
  rankedFlex: "Ranked Flex",
};

const Profile = () => {
  const profile = useProfile();
  console.log(profile);

  return (
    <>
    <article>
        {gameModes.rankedSolo ? profile[0]?.queueType === "RANKED_SOLO_5x5" : gameModes.rankedFlex}
    </article>
    </>
    )
};

export default Profile;