import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle";

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <SectionTitle text="Технологиии" />
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__cards">
          <li className="techs__card">
            <p className="techs__card-title">HTML</p>
          </li>
          <li className="techs__card">
            <p className="techs__card-title">CSS</p>
          </li>
          <li className="techs__card">
            <p className="techs__card-title">JS</p>
          </li>
          <li className="techs__card">
            <p className="techs__card-title">React</p>
          </li>
          <li className="techs__card">
            <p className="techs__card-title">Git</p>
          </li>
          <li className="techs__card">
            <p className="techs__card-title">Express.js</p>
          </li>
          <li className="techs__card">
            <p className="techs__card-title">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
