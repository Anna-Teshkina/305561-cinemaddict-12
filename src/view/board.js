// - шаблон доски
// const createBoardTemplate = () => {
//   return (
//     `<section class="films">
//      <section class="films-list">
//        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
//        <div class="films-list__container"></div>
//      </section>

//      <section class="films-list--extra">
//        <h2 class="films-list__title">Top rated</h2>
//        <div class="films-list__container"></div>
//      </section>

//      <section class="films-list--extra">
//        <h2 class="films-list__title">Most commented</h2>
//        <div class="films-list__container"></div>
//      </section>
//    </section>`
//   );
// };

import {createElement} from "../utils.js";

// - шаблон доски
const createBoardTemplate = () => {
  return `<section class="films">
      <section class="films-list">
      </section>
    </section>`;
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
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
