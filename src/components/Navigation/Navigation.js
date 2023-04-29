import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn }) {  
  return (
    <nav className="navigation">
      {isLoggedIn 
        ? 
          <ul className="navigation__links">
            <Link className="navigation__link" to="/movies">Фильмы</Link>
            <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
            <Link className="navigation__link navigation__link_type_icon" to="/profile">Аккаунт</Link>
          </ul>
        : 
          <ul className="navigation__links navigation__links_type_unlogged">
            <Link className="navigation__link navigation__link_type_small" to="/signup">Регистрация</Link>
            <Link className="navigation__link navigation__link_type_green-box" to="/signin">Войти</Link>
          </ul>
        }
    </nav>
  );
}

export default Navigation;
