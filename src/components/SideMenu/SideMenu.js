import { NavLink, Link } from "react-router-dom";
import "./SideMenu.css";

function SideMenu({ isOpen, onCloseClick }) {  
  return (
    <div className={"side-menu" + (isOpen ? " side-menu_opened" : "")}>
      <div className="side-menu__cover" />
      <div className="side-menu__container">
        <button className="side-menu__button" type="button" onClick={onCloseClick}/>
        <menu className="side-menu__menu">
          <li className="side-menu__menu-item">
            <NavLink className="side-menu__link side-menu__link_type_navlink" to="/">Главная</NavLink>
          </li>
          <li className="side-menu__menu-item">
            <NavLink className="side-menu__link side-menu__link_type_navlink" to="/movies">Фильмы</NavLink>
          </li>
          <li className="side-menu__menu-item">
            <NavLink className="side-menu__link side-menu__link_type_navlink" to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>
        </menu>
        <Link className="side-menu__link side-menu__link_type_account" to="/profile">Аккаунт</Link>
      </div>
    </div>
  );
}    

export default SideMenu;


