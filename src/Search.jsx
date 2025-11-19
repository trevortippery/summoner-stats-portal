import { useLocation, useNavigate } from "@tanstack/react-router";
import { useSummoner } from "./contexts/SummonerContext";
import { useState } from "react";

const regionsList = [
  { name: "North America", platform: "na1", region: "americas" },
  { name: "Europe West", platform: "euw1", region: "europe" },
  { name: "Europe North & East", platform: "eun1", region: "europe" },
  { name: "Middle East", platform: "me1", region: "europe" },
  { name: "Latin America North", platform: "la1", region: "americas" },
  { name: "Latin America South", platform: "la2", region: "americas" },
  { name: "Brazil", platform: "br1", region: "americas" },
  { name: "Korea", platform: "kr", region: "asia" },
  { name: "Japan", platform: "jp1", region: "asia" },
  { name: "Oceania", platform: "oc1", region: "sea" },
  { name: "Philippines", platform: "ph2", region: "sea" },
  { name: "Singapore", platform: "sg2", region: "sea" },
  { name: "Thailand", platform: "th2", region: "sea" },
  { name: "Taiwan", platform: "tw2", region: "sea" },
  { name: "Vietnam", platform: "vn2", region: "asia" },
];

const Search = () => {
  const { setSummonerInfo } = useSummoner();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");

  const inputClasses = (isRoot) =>
    `p-2 rounded ${
      isRoot ? "border" : "bg-white text-black"
    } focus:outline-amber-300`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const gameName = formData.get("gameName")?.toString().trim();
    const tagLine = formData.get("tagLine")?.toString().trim();
    const selected = formData.get("platform");

    if (!gameName || !tagLine) {
      setError("Both Game Name and Tag Line are required.");
      return;
    }

    const [platform, region] = selected.split("|");

    setSummonerInfo({ gameName, tagLine, platform, region });

    navigate({ to: `/summoner/${gameName}/${tagLine}` });
  };

  const isRoot = location.pathname === "/";

  return (
    <div
      className={`flex justify-center items-center ${isRoot ? "pt-0" : "py-2"}`}
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        {/* Region Select */}
        <select name="platform" className={inputClasses(isRoot)}>
          {regionsList.map((r) => (
            <option key={r.platform} value={`${r.platform}|${r.region}`}>
              {r.name}
            </option>
          ))}
        </select>

        {/* Game Name Input */}
        <input
          name="gameName"
          type="text"
          placeholder="Game Name"
          className={inputClasses(isRoot)}
        />

        {/* Tag Line Input */}
        <input
          name="tagLine"
          type="text"
          placeholder="Tag Line"
          className={inputClasses(isRoot)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-300 text-black px-4 py-2 rounded
                     hover:bg-gray-600 hover:text-amber-300 transition-colors duration-200"
        >
          Go!
        </button>

        {error && (
          <div className="text-red-600 text-center mt-5 w-full">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Search;
