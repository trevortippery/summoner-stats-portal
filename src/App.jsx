import { createRoot } from "react-dom/client";
import MatchHistory from "./MatchHistory";
import { StrictMode } from "react";
import "./assets/styles/index.css";

const App = () => {
  return (
    <StrictMode>
      <div className="grid grid-cols-3">
        <div>
          <p>player stats</p>
        </div>
        <div className="col-span-2">
          <MatchHistory></MatchHistory>
        </div>
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
