import "./ErrorPopup.css"

function ErrorPopup({ isOpen, onClose, message }) {

  function closeByClickingOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`error-popup` + (isOpen ? " error-popup_opened" : "")} onClick={closeByClickingOverlay}>
      <div className="error-popup__container">
        <button className="error-popup__close" type="button" aria-label="Закрыть окно" title="Закрыть" onClick={onClose}></button>
        <div className="error-popup__background-image" />
        <h2 className="error-popup__title">{message}</h2>
      </div>
    </div>
  )
}

export default ErrorPopup;