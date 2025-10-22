import { useEffect, useState } from "react";

const useQueueInfo = () => {
  const [queueMap, setQueueMap] = useState(null);

  useEffect(() => {
    async function fetchQueues() {
      try {
        const res = await fetch(
          "https://static.developer.riotgames.com/docs/lol/queues.json",
        );
        const data = await res.json();

        const map = {};
        for (const q of data) {
          map[q.queueId] =
            q.description?.replace("games", "").trim() || "Match";
        }

        setQueueMap(map);
      } catch (err) {
        console.error("Failed to fetch queue info:", err);
      }
    }

    fetchQueues();
  }, []);

  return queueMap;
};

export default useQueueInfo;
