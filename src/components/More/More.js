import "./More.css";

function More({ onMoreClick }) {
  return (
    <section className="more" aria-label="Ещё">
      <button className="more__button" type="button" onClick={onMoreClick}>Ещё</button>
    </section>
  );
}

export default More;