import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect, useState } from "react";

function SearchForm({ onSearchSubmit }) {
  const [isSearchButtonClicked, setIsSearhButtonClicked] = useState(false);
  const { values, handleChange, handleCheckboxChange } = useFormAndValidation({
    keyword: '',
    shortfilms: false,
  });

  useEffect(() => {
    if (isSearchButtonClicked && values.keyword) {
      onSearchSubmit(values.keyword, values.shortfilms);
    }
  }, [values.shortfilms]);

  useEffect(() => {
    setIsSearhButtonClicked(false);
  }, [values.keyword]);

  function handleSearchClick(evt) {
    evt.preventDefault();
    onSearchSubmit(values.keyword, values.shortfilms);
    setIsSearhButtonClicked(true);
  }

  return (
    <form className="search-form" action="#" onSubmit={handleSearchClick} >
      <fieldset className="search-form__text-fieldset">
        <input 
          className="search-form__input" 
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Фильм"
          value={values.keyword || ''}
          onChange={handleChange}
        />
        <button type="submit" className="search-form__button" />
      </fieldset>
      <FilterCheckbox onCheckboxChange={handleCheckboxChange} value={values.shortfilms} />
    </form>
  );
}

export default SearchForm;