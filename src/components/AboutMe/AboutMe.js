import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import MyPhoto from "../../images/my-photo.jpg"

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <SectionTitle text="Студент" />
        <div className="about-me__info">
          <div className="about-me__text-box">
            <p className="about-me__name">Владимир</p>
            <p className="about-me__about">Инженер, фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">Я родился и живу в Москве. Окончил РГТУ МАТИ им. К.Э. Циолковского.
                С 2015 года работаю инженером, занимался разработкой антенно-фидерных устройств и систем мониторинга Мирового океана.
                Веб-разработкой занимаюсь с 2022 года. В вебе меня привлекает наличие интересных, актуальных задач и возможность личного 
                развития как технического специалиста.</p>
            <a className="about-me__link" href="https://github.com/v37f" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="about-me__photo" src={MyPhoto} alt="Моё фото" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;