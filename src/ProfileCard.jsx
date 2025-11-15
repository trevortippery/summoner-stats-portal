import { useEffect, useState } from "react";
import { getCurrentVersion } from "./utils/version";

const ProfileCard = ({ profileIconId, summonerLevel, gameName }) => {

  const [currentVersion, setCurrentVersion] = useState(null);

  useEffect(() => {
    async function loadVersion() {
      const version = await getCurrentVersion();
      setCurrentVersion(version);
    }
    loadVersion();

  }, [])

  if (!profileIconId || !gameName) {
    return (
      <article>
        <h2>No profile data</h2>
      </article>
    );
  }

  return (
    <article className="flex flex-col h-40 bg-gray-300 mb-2 px-5 pt-5 rounded">
      <h3 className="font-semibold">Summoner Profile</h3>

      <div className="flex gap-4 mt-2 items-center">
        <img
          className="w-20 h-20 rounded-full"
          src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${profileIconId}.png`}
          alt={`${gameName}'s profile icon`}
        />

        <div className="flex flex-col">
          <h2 className="font-bold">{gameName}</h2>
          <p>Level {summonerLevel}</p>
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
