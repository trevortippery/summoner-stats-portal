import { useLocation, useNavigate } from "@tanstack/react-router";
import { useSummoner } from "./contexts/SummonerContext";
import { useState } from "react";

const Search = () => {
  const { setSummonerInfo } = useSummoner();
  const navigate = useNavigate();
  const location = useLocation();

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

    navigate({ to: `/summoner/${gameName}/${tagLine}` });
  };

  const isRoot = location.pathname === "/";

  return (
    <div
      className={`flex justify-center items-center ${
        isRoot ?  "pt-0" : "h-auto py-2"
      }`}
    >
      <form className="flex space-x-2" onSubmit={handleSubmit}>
        {error && <div className="text-red-600">{error}</div>}
        <input
          name="gameName"
          type="text"
          placeholder="Game Name"
          className={`p-2 rounded ${isRoot ? "border rounded" : "bg-white p-2 rounded text-black"}`}
        />
        <input
          name="tagLine"
          type="text"
          placeholder="Tag Line"
          className={`p-2 rounded ${isRoot ? "border rounded" : "bg-white p-2 rounded text-black"}`}
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 hover:text-amber-300 transition-colors duration-200 font-bold"
        >
          Go!
        </button>
      </form>
    </div>
  );
};

export default Search;
