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
        isRoot ? "pt-0" : "h-auto py-2"
      }`}
    >
      <form className="space-x-2" onSubmit={handleSubmit}>
        <input
          name="gameName"
          type="text"
          placeholder="Game Name"
          className={`p-2 rounded focus:outline-amber-300 ${isRoot ? "border rounded" : "bg-white p-2 rounded text-black"}`}
        />
        <input
          name="tagLine"
          type="text"
          placeholder="Tag Line"
          className={`p-2 rounded ${isRoot ? "border rounded" : "bg-white p-2 rounded text-black"}`}
        />
        <button
          type="submit"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-600 hover:text-amber-300 transition-colors duration-200"
        >
          Go!
        </button>
        {error && <div className="text-red-600 text-center mt-5">{error}</div>}
      </form>
    </div>
  );
};

export default Search;
