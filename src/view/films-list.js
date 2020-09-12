import AbstractView from "./abstract.js";

const createFilmsListTemplate = () => {
  return `<section class="films-list"></section>`;
};

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
