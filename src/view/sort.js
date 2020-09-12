import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

// - шаблон сортировки
const createSortTemplate = () => {
  return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RAITING}">Sort by rating</a></li>
    </ul>`;
};

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
