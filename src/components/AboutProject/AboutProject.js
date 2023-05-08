import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <SectionTitle text="О проекте" />
        <ul className="about-project__facts">
          <li className="about-project__fact">
            <h3 className="about-project__fact-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__fact-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__fact">
            <h3 className="about-project__fact-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__fact-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__timeline">
          <div className="about-project__timeline-strip about-project__timeline-strip_color_green">
            <p className="about-project__timeline-text">1 неделя</p>
          </div>
          <div className="about-project__timeline-strip">
            <p className="about-project__timeline-text">4 недели</p>
          </div>
          <p className="about-project__timeline-text about-project__timeline-text_type_caption">Back-end</p>
          <p className="about-project__timeline-text about-project__timeline-text_type_caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
