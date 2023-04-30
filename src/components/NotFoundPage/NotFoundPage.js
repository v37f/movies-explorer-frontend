import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-page__container">
        <h2 className="not-found-page__title">404</h2>
        <p className="not-found-page__text">Страница не найдена</p>
        <Link className="not-found-page__link" to="/">Назад</Link>
      </section>
    </main>
  );
}

export default NotFoundPage;