const Game = ({ gameInfo, champion, summoners, augments, items }) => {
  return (
    <article
      className={
        gameInfo.result === "Victory"
          ? "bg-blue-200 rounded-md p-2"
          : "bg-red-200 rounded-md p-2"
      }
    >
      <div className="grid grid-cols-5">
        <div>
          <p className="match-type">{gameInfo.gameType}</p>
          <p className="match-date">{gameInfo.date}</p>
          <p className="match-result">{gameInfo.result}</p>
          <p className="match-duration">{gameInfo.duration}</p>
        </div>
        <div className="col-span-3">
          <div className="flex pb-2 space-x-1">
            <img
              className="box-border h-12 w-12 rounded-full"
              src={champion.image}
              alt={champion.name}
            />
            <div className="block">
              <img
                className="h-8 w-8 rounded mb-0.5"
                src={summoners[0].image}
                alt={summoners[0].name}
              />
              <img
                className="h-8 w-8 rounded"
                src={summoners[1].image}
                alt={summoners[1].name}
              />
            </div>
            <div className="block">
              <img
                className=""
                src={augments[0].image}
                alt={augments[0].name}
              />
              <img
                className="h-7 w-7 rounded"
                src={augments[1].image}
                alt={augments[1].name}
              />
            </div>
          </div>
          <div className="flex space-x-1">
            {items.map((item) => (
              <img
                className="h-8 w-8 rounded last:rounded-full"
                key={item.id}
                src={item.image}
                alt={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Game;
