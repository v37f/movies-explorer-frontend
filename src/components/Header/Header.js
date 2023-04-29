import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header({ isLoggedIn }) {
  const { pathname } = useLocation();

  return (
    <header className={"header" + (pathname==="/" ? " header_color_blue" : "")}>
      <div className="header__container">
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}

export default Header;
