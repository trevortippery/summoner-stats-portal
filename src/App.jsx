import { createRoot } from "react-dom/client";
import MatchHistory from "./MatchHistory";
import { StrictMode } from "react";
import "./assets/styles/index.css";

const App = () => {
  return (
    <StrictMode>
      <div>
        <MatchHistory></MatchHistory>
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
