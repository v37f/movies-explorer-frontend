import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation, Link } from "react-router-dom";

function Header({ isLoggedIn, isSmallScreen, handleMenuClick }) {
  const { pathname } = useLocation();

  return (
    <header className={"header" + (pathname==="/" ? " header_color_blue" : "")}>
      <div className="header__container">
        <Logo />
        <div className={"header__links" + (pathname==="/" || isSmallScreen ? " header__links_position_right" : "")}>
          {isLoggedIn
            ? isSmallScreen 
              ? <button className="header__button" type="button" onClick={handleMenuClick} />
              : <>
                  <Navigation />
                  <Link 
                    className={"header__link header__link_type_account" + 
                      (pathname==="/" ? " header__link_style_icon-bordered" : " header__link_style_icon")} 
                    to="/profile"
                  >
                    Аккаунт
                  </Link>
                </>
            : <>
                <Link className="header__link header__link_type_login" to="/signup">Регистрация</Link>
                <Link className="header__link header__link_type_login header__link_style_green-box" to="/signin">Войти</Link>
              </>
          }
        </div>
        
      </div>
    </header>
  );
}

export default Header;
