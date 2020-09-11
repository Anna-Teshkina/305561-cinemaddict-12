import AbstractView from "./abstract.js";

// - шаблон кнопки show more
const createShowBtnTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowBtn extends AbstractView {
  getTemplate() {
    return createShowBtnTemplate();
  }
}
