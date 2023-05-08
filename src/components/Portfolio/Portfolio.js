import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects">
          <li className="portfolio__project">
            <a className="portfolio__link" href="https://github.com/v37f/how-to-learn" target="_blank" rel="noreferrer">
              <p className="portfolio__link-text">Статичный сайт</p>
              <p className="portfolio__link-text">↗</p>
            </a>
          </li>
          <li className="portfolio__project">
            <a className="portfolio__link" href="https://github.com/v37f/russian-travel" target="_blank" rel="noreferrer">
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <p className="portfolio__link-text">↗</p>
            </a>
          </li>
          <li className="portfolio__project">
            <a className="portfolio__link" href="https://github.com/v37f/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <p className="portfolio__link-text portfolio__link-text_type_icon">↗</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
