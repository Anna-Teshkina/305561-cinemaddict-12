import AbstractView from "./abstract.js";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    // console.log(update);

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();

    let scroll = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = scroll;
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement

    this.restoreHandlers();
  }

  // восстанавливаем обработчики внутренние и внешние
  restoreHandlers() {
    this.setPopupCloseClickHandler(this._callback.popupCloseClick);
    // this.setPopupControlsClickHandler(this._callback.popupControlsClick);
    this.setPopupFormKeyDown(this._callback.popupFormKeyDown);

    this._setInnerHandlers();
  }
}
