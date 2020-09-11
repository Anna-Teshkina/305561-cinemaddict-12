// - шаблон меню
import {convertFirstLetterToUppercase} from "../utils.js";
import AbstractView from "./abstract.js";

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

export default class Menu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
