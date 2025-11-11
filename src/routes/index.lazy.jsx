import { createLazyFileRoute } from "@tanstack/react-router";
import Search from "../Search";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h1 className="flex justify-center items-center h-75 w-auto text-md md:text-lg lg:text-3xl">
        Summoner Stats Portal
      </h1>
      <Search />
    </>
  );
}
