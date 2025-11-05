import { createLazyFileRoute } from "@tanstack/react-router";
import Search from "../Search";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <Search />;
}
