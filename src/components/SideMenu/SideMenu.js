import { NavLink, Link } from "react-router-dom";
import "./SideMenu.css";
import { useEffect } from "react";

function SideMenu({ isOpen, onCloseClick }) {  

  useEffect(() => {
    if(isOpen) { 
      document.querySelector(".side-menu").addEventListener("touchmove", disableTouchScroll);
      return () => {
        document.querySelector(".side-menu").removeEventListener("touchmove", disableTouchScroll);
      }
    }
  }, [isOpen]);

  function disableTouchScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  return (
    <div className={"side-menu" + (isOpen ? " side-menu_opened" : "")}>
      <div className="side-menu__cover" />
      <div className="side-menu__container">
        <button className="side-menu__button" type="button" onClick={onCloseClick}/>
        <menu className="side-menu__menu">
          <li className="side-menu__menu-item">
            <NavLink className="side-menu__link side-menu__link_type_navlink" onClick={onCloseClick} to="/">Главная</NavLink>
          </li>
          <li className="side-menu__menu-item">
            <NavLink className="side-menu__link side-menu__link_type_navlink" onClick={onCloseClick} to="/movies">Фильмы</NavLink>
          </li>
          <li className="side-menu__menu-item">
            <NavLink className="side-menu__link side-menu__link_type_navlink" onClick={onCloseClick} to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>
        </menu>
        <Link className="side-menu__link side-menu__link_type_account" onClick={onCloseClick} to="/profile">Аккаунт</Link>
      </div>
    </div>
  );
}    

export default SideMenu;


