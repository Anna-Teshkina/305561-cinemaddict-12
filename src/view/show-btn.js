import {createElement} from "../utils.js";

// - шаблон кнопки show more
const createShowBtnTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowBtnTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
