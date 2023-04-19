import "./SectionTitle.css";

function SectionTitle({ text }) {
  return (
    <div className="section-title">
      <h2 className="section-title__text">{`${text}`}</h2>
    </div>
  );
}

export default SectionTitle;