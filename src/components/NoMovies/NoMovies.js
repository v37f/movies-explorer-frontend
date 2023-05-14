import "./NoMovies.css";
import Preloader from "../Preloader/Preloader";

function NoMovies({ isLoading, message }) {
  return (
    <section className="no-movies">
      {isLoading ? <Preloader />
                 : <h2 className="no-movies__title">{message}</h2>}
    </section>
  );
}

export default NoMovies;