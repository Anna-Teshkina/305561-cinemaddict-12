import {EMOJIES, ENTER_CODE, ESC_CODE} from "../const.js";
import {convertFirstLetterToUppercase} from "../utils/common.js";
import Smart from "./smart.js";
// import {remove} from "../utils/render.js";


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
const createPopupTemplate = (data) => {
  const {poster, ageRaiting, originalName, raiting, description, director, writers, actors, release, runtime, country, commentsCount, watchlist, watched, favorite, genre, emoji, comment} = data;

  const emojiesTemplate = createEmojiListTemplate();

  const controls = {watchlist, watched, favorite};

  const controlsTemplate = createControlsListTemplate(controls);

  const table = {director, writers, actors, release, runtime, country};
  const tableTemplate = createTableTemplate(table);

  const genresList = genre.split(`,`).map((item) => item.trim());
  const genresTemplate = createGenresTemplate(genresList);

  const chosenEmoji = emoji ? `<img src="${emoji}" width="55" height="55" alt="emoji-smile">` : ``;

  const currentComment = comment ? comment : ``;

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
             <div for="add-emoji" class="film-details__add-emoji-label"> ${chosenEmoji} </div>

             <label class="film-details__comment-label">
               <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${currentComment}</textarea>
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

export default class Popup extends Smart {
  constructor(film) {
    super();
    this._data = Popup.parseFilmToData(film);

    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
    this._popupControlsClickHandler = this._popupControlsClickHandler.bind(this);
    this._popupFormKeyDownHandler = this._popupFormKeyDownHandler.bind(this);

    this._onEscPressHandler = this._onEscPressHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    // console.log(this._data);
    return createPopupTemplate(this._data);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          emoji: null,
          comment: null
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.emoji;
    delete data.comment;

    return data;
  }

  // при клике на кнопку закрыть или при нажатии на клавишу ESC попап удаляется из DOM
  _popupCloseClickHandler(evt) {
    const popupCloseBtn = this.getElement().querySelector(`.film-details__close-btn`);

    if (evt.target === popupCloseBtn) {
      // console.log('popup close');
      this._callback.popupCloseClick(Popup.parseDataToFilm(this._data));
      // console.log(Popup.parseDataToFilm(this._data));
    }
  }

  _onEscPressHandler(evt) {
    if (evt.keyCode === ESC_CODE) {
      // console.log(this);
      this._callback.popupEscPress(Popup.parseDataToFilm(this._data));
      document.removeEventListener(`keydown`, this._onEscPressHandler);
    }
  }

  _popupControlsClickHandler(evt) {
    const popupControls = this.getElement().querySelector(`.film-details__controls`);
    const popupControlsList = popupControls.querySelectorAll(`.film-details__control-label`);

    Array.from(popupControlsList).forEach((item) => {
      if (evt.target === item) {
        // evt.preventDefault();
        // console.log(`controls click (popup)`);

        let key;

        if (item.classList.contains(`film-details__control-label--watchlist`)) {
          key = `watchlist`;
        }
        if (item.classList.contains(`film-details__control-label--watched`)) {
          key = `watched`;
        }
        if (item.classList.contains(`film-details__control-label--favorite`)) {
          key = `favorite`;
        }

        // item.classList.contains(`film-details__control-label--watchlist`) ? key = `watchlist` : ``;
        // item.classList.contains(`film-details__control-label--watched`) ? key = `watched` : ``;
        // item.classList.contains(`film-details__control-label--favorite`) ? key = `favorite` : ``;

        this.updateData({[key]: !this._data[key]});
        this.updateData({comment: this._comment});
      }
    });
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    // console.log(this._comment);

    this.updateData({comment: this._comment});

    if (evt.target.src) {
      this.updateData({emoji: evt.target.src});
    }
  }

  _popupFormKeyDownHandler(evt) {
    // evt.preventDefault();
    // const comment = evt.target.value;
    let emojiFlag = null;
    this._comment = evt.target.value;
    // this.updateData({comment: this._comment});
    // console.log(this._comment);

    if (this.getElement().querySelector(`.film-details__add-emoji-label img`) !== null) {
      emojiFlag = true;
    }

    const sendCommentCondition = this._comment !== `` && emojiFlag &&
    (evt.ctrlKey && evt.keyCode === ENTER_CODE) || (evt.metaKey && evt.keyCode === ENTER_CODE);

    // если стоит картинка и текстовое поле не пусто, то
    if (sendCommentCondition) {
      // 1 - reset формы
      this._reset();

      // 2 - увеличить кол-во комментариев на 1 (для карточки на доске и количества комментариев в списке)
      this.updateData({commentsCount: this._data.commentsCount + 1});

      // 3 - обновить массив с комментариями
      // не сделано
    }
  }

  _reset() {
    // 1 - удалить картинку
    this.getElement().querySelector(`.film-details__add-emoji-label img`).remove();
    // 2 - очистить value textarea
    this._comment = null;
    this.updateData({comment: null});
  }

  // устанавливаем внутренние обработчики
  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiClickHandler);
    this.getElement().addEventListener(`click`, this._popupControlsClickHandler);
    document.addEventListener(`keydown`, this._onEscPressHandler);
  }

  setPopupFormKeyDown(callback) {
    this._callback.popupFormKeyDown = callback;
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keyup`, this._popupFormKeyDownHandler);
  }

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().addEventListener(`click`, this._popupCloseClickHandler);
  }

  setPopupESQCallback(callback) {
    this._callback.popupEscPress = callback;
    // document.addEventListener(`keydown`, this._popupESQPressHandler);
  }
}
