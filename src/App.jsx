import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./assets/styles/index.css";
import { SummonerProvider } from "./contexts/SummonerContext";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

const App = () => {
  return (
    <StrictMode>
      <SummonerProvider>
        <RouterProvider router={router} />
      </SummonerProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
