// Абстрактный класс
// Общие методы выносим в абстрактный класс
import {createElement} from "../utils.js";

export default class Abstract {
  constructor() {
    // Проверка в конструкторе на "new.target" позволит использовать абстрактный
    // класс только в качестве родительского класса.
    // При попытке выполнить "new Abstract()" разработчик получит ошибку.
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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
