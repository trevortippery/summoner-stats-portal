import { useNavigate } from "@tanstack/react-router";
import { useSummoner } from "./contexts/SummonerContext";
import { useState } from "react";

const Search = () => {
  const { setSummonerInfo } = useSummoner();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const gameName = formData.get("gameName")?.toString().trim();
    const tagLine = formData.get("tagLine")?.toString().trim();

    if (!gameName || !tagLine) {
      setError("Both Game Name and Tag Line are required.");
      return;
    }

    setSummonerInfo({ gameName, tagLine });

    navigate({ to: "/summoner" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-600">{error}</div>}
        <input name="gameName" type="text" placeholder="Game Name" />
        <input name="tagLine" type="text" placeholder="Tag Line" />
        <button type="submit">Go!</button>
      </form>
    </div>
  );
};

export default Search;
