import {EMOJIES} from "../const.js";
import {convertFirstLetterToUppercase} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createEmojiListTemplate = () => {
  return EMOJIES.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="${emoji}-smile">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`).join(``);
};

const controlsDictionary = {
  watchlist: `Add to watchlist`,
  watched: `Already watched`,
  favorite: `Add to favorites`
};

const createControlsListTemplate = (controls) => {
  return Object.entries(controls).map(([control, checked]) => `<input type="checkbox" class="film-details__control-input visually-hidden" id="${control}" name="${control}" ${checked ? `checked` : ``}>
  <label for="${control}" class="film-details__control-label film-details__control-label--${control}">${controlsDictionary[control]}</label>`).join(``);
};

const createTableTemplate = (table) => {
  return Object.entries(table).map(([key, value]) =>
    `<tr class="film-details__row">
      <td class="film-details__term"> ${key === `release` ? convertFirstLetterToUppercase(key) + ` Date` : convertFirstLetterToUppercase(key)} </td>
      <td class="film-details__cell"> ${value} </td>
    </tr>`).join(``);
};

const createGenresTemplate = (genres) => {
  return `<tr class="film-details__row">
    <td class="film-details__term"> ${genres.length > 1 ? `Genres` : `Genre`} </td>
    <td class="film-details__cell"> ${genres.map((item) => `<span class="film-details__genre">` + item + `</span>`).join(``)} </td>
  </tr>`;
};

// - шаблон попапа с информацией о фильме
const createPopupTemplate = (film) => {
  const {poster, ageRaiting, originalName, raiting, description, director, writers, actors, release, runtime, country, commentsCount, watchlist, watched, favorite, genre} = film;

  const emojiesTemplate = createEmojiListTemplate();

  const controls = {watchlist, watched, favorite};
  // console.log(controls);
  const controlsTemplate = createControlsListTemplate(controls);

  const table = {director, writers, actors, release, runtime, country};
  const tableTemplate = createTableTemplate(table);

  const genresList = genre.split(`,`).map((item) => item.trim());
  const genresTemplate = createGenresTemplate(genresList);

  return `<section class="film-details">
     <form class="film-details__inner" action="" method="get">
       <div class="form-details__top-container">
         <div class="film-details__close">
           <button class="film-details__close-btn" type="button">close</button>
         </div>
         <div class="film-details__info-wrap">
           <div class="film-details__poster">
             <img class="film-details__poster-img" src="${poster}" alt="">

             <p class="film-details__age">${ageRaiting}</p>
           </div>

           <div class="film-details__info">
             <div class="film-details__info-head">
               <div class="film-details__title-wrap">
                 <h3 class="film-details__title">${name}</h3>
                 <p class="film-details__title-original">Original: ${originalName}</p>
               </div>

               <div class="film-details__rating">
                 <p class="film-details__total-rating">${raiting}</p>
               </div>
             </div>

             <table class="film-details__table">
                ${tableTemplate}
                ${genresTemplate}
             </table>

             <p class="film-details__film-description">
               ${description}
             </p>
           </div>
         </div>

         <section class="film-details__controls">
            ${controlsTemplate}
         </section>
       </div>

       <div class="form-details__bottom-container">
         <section class="film-details__comments-wrap">
           <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

           <ul class="film-details__comments-list">
           </ul>

           <div class="film-details__new-comment">
             <div for="add-emoji" class="film-details__add-emoji-label"></div>

             <label class="film-details__comment-label">
               <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
             </label>

             <div class="film-details__emoji-list">
                ${emojiesTemplate}
             </div>
           </div>
         </section>
       </div>
     </form>
   </section>`;
};

export default class Popup extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _popupCloseClickHandler(evt) {
    // при клике на кнопку закрыть или при нажатии на клавишу ESC попап удаляется из DOM
    const popupCloseBtn = this.getElement().querySelector(`.film-details__close-btn`);

    if (evt.target === popupCloseBtn) {
      this._callback.popupCloseClick();
    }
  }

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().addEventListener(`click`, this._popupCloseClickHandler);
  }
}
