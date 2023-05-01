import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {  
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li className="navigation__links-item">
          <NavLink className="navigation__link" to="/movies">Фильмы</NavLink>
        </li>
        <li className="navigation__links-item">
          <NavLink className="navigation__link" to="/saved-movies">Сохранённые фильмы</NavLink>
        </li>
      </ul>
    </nav>
  );
}

      

export default Navigation;


