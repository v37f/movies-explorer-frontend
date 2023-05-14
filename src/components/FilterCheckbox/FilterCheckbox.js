import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckboxChange, value }) {
  return (
    <fieldset className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox" name="shortfilms" id="shortfilms" checked={value} onChange={handleCheckboxChange} />
      <label className="filter-checkbox__label" htmlFor="short-films">Короткометражки</label>
    </fieldset>
  );
}

export default FilterCheckbox;
