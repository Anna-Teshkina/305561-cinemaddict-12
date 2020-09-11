import AbstractView from "./abstract.js";

// - шаблон доски
const createBoardTemplate = () => {
  return `<section class="films">
      <section class="films-list">
      </section>
    </section>`;
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
