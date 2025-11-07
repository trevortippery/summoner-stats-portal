import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../Header";
import Footer from "../Footer";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header />
        <main className="h-screen">
          <Outlet />
        </main>
        <Footer />
        <TanStackRouterDevtools />
      </>
    );
  },
});
