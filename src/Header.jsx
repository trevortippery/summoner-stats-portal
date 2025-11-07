import { Link, useLocation } from "@tanstack/react-router";
import Search from "./Search";

const Header = () => {
  const location = useLocation();
  const showSearch = location.pathname !== "/";

  return (
    <header>
      <nav className="sticky top-0 z-50 flex w-screen h-[50px] bg-indigo-500 text-white items-center pl-5 text-xs md:text-md lg:text-lg">
        <Link
          to={"/"}
          className="mr-6 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 hover:text-amber-300 transition-colors duration-200 font-bold"
        >
          <p>Home</p>
        </Link>
        {showSearch && <Search />}
      </nav>
    </header>
  );
};

export default Header;
