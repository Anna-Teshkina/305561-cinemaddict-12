import AbstractView from "./abstract.js";

// - шаблон кнопки show more
const createShowBtnTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowBtn extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowBtnTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
