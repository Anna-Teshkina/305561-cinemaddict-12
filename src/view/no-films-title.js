import AbstractView from "./abstract.js";

const createNoFilmsTitleTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilmsTitle extends AbstractView {
  getTemplate() {
    return createNoFilmsTitleTemplate();
  }
}
