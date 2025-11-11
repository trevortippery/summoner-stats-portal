import { rankImages } from "./assets/images";


const ProfileCard = ({ queueType, tier, rank, leaguePoints, wins, losses }) => {
  const winrate = Math.round(((wins / (wins + losses)) * 100));
  const rankImage = rankImages[tier] || rankImages.IRON;

  if (!queueType) {
    return (
      <article>
        <h2>No ranks on record</h2>
      </article>
    )
  }

  return (
    <article className="flex flex-col h-40 mx-5 bg-gray-300 mt-4 px-2 pt-5">
      <h3>{queueType === "RANKED_SOLO_5x5" ? "Ranked Solo/Duo" : "Ranked Flex"}</h3>
      <div className="flex justify-between items-center">
        <img className="w-20 h-20" src={rankImage} alt={`${tier} rank emblem`} />
        <div className="flex flex-col">
          <h2 className="font-bold">{tier} {rank} </h2>
          <p>{leaguePoints} LP</p>
        </div>
        <div className="flex flex-col">
          <p className="">{wins}W {losses}L</p>
          <p>{winrate}% Win Rate</p>
        </div>

      </div>

    </article>
  )

};

export default ProfileCard;