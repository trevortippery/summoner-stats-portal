import { Link, useLocation } from "@tanstack/react-router";
import Search from "./Search";

const Header = () => {
  const location = useLocation();
  const showSearch = location.pathname !== "/";

  return (
    <header>
      <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 flex w-screen h-[50px] bg-gray-300 text-black items-center pl-5 text-xs md:text-md lg:text-lg border-b border-gray-500">
        <Link
          to={"/"}
          className="mr-6 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-600 hover:text-amber-300 transition-colors duration-200"
        >
        Home
        </Link>
        {showSearch && <Search />}
      </nav>
    </header>
  );
};

export default Header;
