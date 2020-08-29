// - шаблон меню
import {convertFirstLetterToUppercase, createElement} from "../utils.js";

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}"> 
      ${name === `all` ? convertFirstLetterToUppercase(name) + ` movies` : convertFirstLetterToUppercase(name)}
      ${((name !== `all`) && (count < 5)) ? `<span class="main-navigation__item-count"> ${count} </span>` : ``}
    </a>`
  );
};

const createMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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

