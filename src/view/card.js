import AbstractView from "./abstract.js";

// - шаблон карточки фильма
const createCardTemplate = (film) => {
  const {name, raiting, year, runtime, genre, poster, shortDescription, commentsCount, watchlist, watched, favorite} = film;

  // устанавливаем  активный класс на кнопку в зависимости от переданного флага
  const setActiveClassName = (flag) => flag ? `film-card__controls-item--active` : ``;

  // для карточки фильма указываем в качестве жанра первый из списка
  const genresList = genre.split(`,`).map((item) => item.trim());
  const filmGenre = genresList[0];

  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${raiting}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${filmGenre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setActiveClassName(watchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setActiveClassName(watched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${setActiveClassName(favorite)}">Mark as favorite</button>
    </form>
  </article>`;
};

export default class Card extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._cardControlsClickHandler = this._cardControlsClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  _cardClickHandler(evt) {
    // п.1.3. Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;
    const cardTitle = this.getElement().querySelector(`.film-card__title`);
    const cardPoster = this.getElement().querySelector(`.film-card__poster`);
    const cardComments = this.getElement().querySelector(`.film-card__comments`);

    if ((evt.target === cardTitle) || (evt.target === cardPoster) || (evt.target === cardComments)) {
      evt.preventDefault();
      this._callback.cardClick();
    }
  }

  _cardControlsClickHandler(evt) {
    const cardControls = this.getElement().querySelector(`.film-card__controls`);
    // смена активного класса при нажатии
    const cardControlsList = cardControls.querySelectorAll(`.film-card__controls-item`);

    Array.from(cardControlsList).forEach((item) => {
      if (evt.target === item) {
        evt.preventDefault();
        item.classList.toggle('film-card__controls-item--active');

        let key;
        item.classList.contains(`film-card__controls-item--add-to-watchlist`) ? key = `watchlist` : ``;
        item.classList.contains(`film-card__controls-item--mark-as-watched`) ? key = `watched` : ``;
        item.classList.contains(`film-card__controls-item--favorite`) ? key = `favorite` : ``;
        this._callback.controlsClick(key);
      }
    });
  }

  setCardControlsClickHandler(callback) {
    this._callback.controlsClick = callback;
    this.getElement().addEventListener(`click`, this._cardControlsClickHandler);
  }

  setCardClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().addEventListener(`click`, this._cardClickHandler);
  }
}
