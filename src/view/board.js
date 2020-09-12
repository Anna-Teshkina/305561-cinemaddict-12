import AbstractView from "./abstract.js";

// - шаблон доски
const createBoardTemplate = () => {
  return `<section class="films"></section>`;
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
