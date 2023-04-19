import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-item"><a className="navtab__link" href="#about-project">О проекте</a></li>
        <li className="navtab__list-item"><a className="navtab__link" href="#">Технологии</a></li>
        <li className="navtab__list-item"><a className="navtab__link" href="#">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
