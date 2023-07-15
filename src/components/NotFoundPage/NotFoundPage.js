import "./NotFoundPage.css";

function NotFoundPage({ onBackClick }) {
  return (
    <main className="not-found-page">
      <section className="not-found-page__container">
        <h2 className="not-found-page__title">404</h2>
        <p className="not-found-page__text">Страница не найдена</p>
        <button className="not-found-page__button" onClick={onBackClick}>Назад</button>
      </section>
    </main>
  );
}

export default NotFoundPage;