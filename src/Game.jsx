const Game = ({ gameInfo, champion, summoners, augments, items }) => {
  return (
    <article
      className={`${
        gameInfo.result === "Victory" ? "bg-blue-300" : "bg-red-300"
      } rounded-md p-1 sm:p-2 md:px-4 max-w-full overflow-hidden`}
    >
      <div className="lg:grid lg:grid-cols-7 w-full min-w-0 overflow-hidden">
        <div
          className={`flex flex-wrap gap-2 border-b mb-2 text-gray-600 lg:block lg:border-0 ${
            gameInfo.result === "Victory"
              ? "border-blue-400"
              : "border-red-400"
          }`}
        >
          <p
            className={`order-3 ml-auto font-bold text-xs sm:text-sm lg:text-base ${
              gameInfo.result === "Victory" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {gameInfo.gameType}
          </p>
          <p className="order-4 text-xs sm:text-sm">{gameInfo.date}</p>
          <p
            className={`order-1 font-semibold text-xs sm:text-sm lg:mt-2 ${
              gameInfo.result === "Victory"
                ? "text-blue-600 lg:text-inherit"
                : "text-red-600 lg:text-inherit"
            }`}
          >
            {gameInfo.result}
          </p>
          <p className="order-2 text-xs sm:text-sm">{gameInfo.duration}</p>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 lg:col-span-3 lg:grid lg:grid-cols-3 min-w-0">
          <div className="flex space-x-1 min-w-0">
            <img
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full shrink-0"
              src={champion.image}
              alt={champion.name}
            />
            <div className="flex flex-col justify-center space-y-0.5">
              <img
                className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded"
                src={summoners[0].image}
                alt={summoners[0].name}
              />
              <img
                className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded"
                src={summoners[1].image}
                alt={summoners[1].name}
              />
            </div>
            <div className="flex flex-col justify-center space-y-0.5">
              <img
                className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded"
                src={augments[0].image}
                alt={augments[0].name}
              />
              <img
                className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded"
                src={augments[1].image}
                alt={augments[1].name}
              />
            </div>
          </div>

          <div className="flex justify-center items-center m-auto text-xs sm:text-sm md:text-base">
            <p className="flex items-center space-x-1 font-semibold">
              <span className="text-slate-700">{gameInfo.kills}</span>
              <span className="text-gray-400">/</span>
              <span className="text-red-700">{gameInfo.deaths}</span>
              <span className="text-gray-400">/</span>
              <span className="text-slate-700">{gameInfo.assists}</span>
            </p>
          </div>
          <div className="flex flex-cols items-center justify-center min-w-0">
            <div className="grid grid-cols-3 gap-0.5">
              {items.slice(0, -1).map((item) => (
                <img
                  className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded"
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                />
              ))}
            </div>
            <div className="flex items-center justify-center mt-1 ml-1">
              <img
                className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded-full"
                src={items.at(-1).image}
                alt={items.at(-1).name}
              />
            </div>
          </div>
        </div>
        <div>
            <span>{gameInfo.kda}</span>
          </div>
      </div>
    </article>
  );
};

export default Game;
