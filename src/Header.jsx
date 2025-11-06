import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <nav>
      <Link to={"/"}>
        <p>Home</p>
      </Link>
    </nav>
  );
};

export default Header;
