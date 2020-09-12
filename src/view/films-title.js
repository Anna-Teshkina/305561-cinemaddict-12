import AbstractView from "./abstract.js";

const createFilmsTitleTemplate = () => {
  return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2><div class="films-list__container"></div>`;
};

export default class FilmsTitle extends AbstractView {
  getTemplate() {
    return createFilmsTitleTemplate();
  }
}
