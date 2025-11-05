import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <nav>
      <Link to={"/"}>
        <p>Home</p>
      </Link>

      <Link to={"/summoner"}>
        <p>Tippery's Stats Page</p>
      </Link>
    </nav>
  );
};

export default Header;
