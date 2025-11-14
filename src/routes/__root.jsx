import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../Header";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </>
    );
  },
});
