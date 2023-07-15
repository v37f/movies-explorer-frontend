import "./InfoPopup.css";


function InfoPopup({ isOpen, onClose, data }) {

  function closeByClickingOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`info-popup` + (isOpen ? " info-popup_opened" : "")} onClick={closeByClickingOverlay}>
      <div className="info-popup__container">
        <button className="info-popup__close" type="button" aria-label="Закрыть окно" title="Закрыть" onClick={onClose}></button>
        <img className="info-popup__image" src={data.image} alt="Не удалось загрузить картинку" />
        <h2 className="info-popup__title">{data.message}</h2>
      </div>
    </div>
  )
}

export default InfoPopup;