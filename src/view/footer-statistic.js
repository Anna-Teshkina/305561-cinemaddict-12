import AbstractView from "./abstract.js";

// - шаблон блока статистики в подвале
const createFooterStatisticTemplate = (films) => {
  return `<p> ${films.length} movies inside</p>`;
};

export default class FooterStatistic extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._films);
  }
}
