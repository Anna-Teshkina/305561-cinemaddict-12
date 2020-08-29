import {createElement} from "../utils.js";

const createFilmsTitleTemplate = () => {
  return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2><div class="films-list__container"></div>`;
};

export default class FilmsTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTitleTemplate();
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
