import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import htmlLogoPath from '../../images/HTML-logo.png';
import cssLogoPath from '../../images/css-logo.png';
import jsLogoPath from '../../images/JS-logo.png';
import reactLogoPath from '../../images/react-logo.png';
import gitLogoPath from '../../images/git-logo.png';
import expressLogoPath from '../../images/Expressjs-logo.png';
import mongoLogoPath from '../../images/Mongodb-logo.png';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <SectionTitle text="Технологиии" />
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__cards">
          <li className="techs__card">
            <img className="techs__card-image" src={htmlLogoPath} alt="HTML5"/>
          </li>
          <li className="techs__card">
            <img className="techs__card-image" src={cssLogoPath} alt="CSS3"/>
          </li>
          <li className="techs__card">
            <img className="techs__card-image" src={jsLogoPath} alt="JavaScript"/>
          </li>
          <li className="techs__card">
            <img className="techs__card-image" src={reactLogoPath} alt="ReactJS"/>
          </li>
          <li className="techs__card">
            <img className="techs__card-image" src={gitLogoPath} alt="Git"/>
          </li>
          <li className="techs__card">
            <img className="techs__card-image" src={expressLogoPath} alt="Express.js"/>
          </li>
          <li className="techs__card">
            <img className="techs__card-image" src={mongoLogoPath} alt="mongoDB"/>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
