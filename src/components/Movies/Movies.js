import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MovieCard/MoviesCard";

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList>
        <MoviesCard />
      </MoviesCardList>
  
    </div>
  );
}

export default Movies;
