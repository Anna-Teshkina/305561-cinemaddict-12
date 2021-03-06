import CardView from "../view/card.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

// import {generateComment} from "../mock/film.js";
// import {ESC_CODE} from "../const.js";

const siteBodyElement = document.querySelector(`body`);

// default - карточка в обычном состоянии,
// popup - карточка в режиме попапа
const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Card {
  constructor(boardListComponent, changeData, changeMode) {
    this._boardListComponent = boardListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._popupComponent = null;
    this._mode = null;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCardControlsClick = this._handleCardControlsClick.bind(this);

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handlePopupControlsChange = this._handlePopupControlsChange.bind(this);
    this._onEscPopupPressHandler = this._onEscPopupPressHandler.bind(this);

    this._onPopupFormKeyDown = this._onPopupFormKeyDown.bind(this);
  }

  init(film) {
    this._film = film;
    // console.log(film);
    const prevCardComponent = this._cardComponent;

    this._cardComponent = new CardView(film);

    this._cardComponent.setCardClickHandler(this._handleCardClick);
    this._cardComponent.setCardControlsClickHandler(this._handleCardControlsClick);

    // console.log('init');
    // console.log(this._mode);

    // Если предыдущие компоненты null, то есть не создавались, рендерим как раньше.
    if (prevCardComponent === null) {
      render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._cardComponent, prevCardComponent);
    remove(prevCardComponent);

    // if (this._mode === null) {
    //   this._cardComponent = new CardView(film);

    //   this._cardComponent.setCardClickHandler(this._handleCardClick);
    //   this._cardComponent.setCardControlsClickHandler(this._handleCardControlsClick);

    //   render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    // if (this._mode === Mode.POPUP) {
    //   this._cardComponent = new CardView(film);

    //   this._cardComponent.setCardClickHandler(this._handleCardClick);
    //   this._cardComponent.setCardControlsClickHandler(this._handleCardControlsClick);

    //   replace(this._cardComponent, prevCardComponent);
    //   remove(prevCardComponent);
    // }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT && this._popupComponent) {
      remove(this._popupComponent);
    }
  }

  // _showPopup() {
  //   render(siteBodyElement, this._popupComponent, RenderPosition.BEFOREEND);
  //   const popupCommentList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);

  //   // массив комментариев для данного фильма
  //   const comments = new Array(this._film.commentsCount).fill().map(generateComment);

  //   // - отрисовка комменатриев в попапе
  //   for (let i = 0; i < this._film.commentsCount; i++) {
  //     render(popupCommentList, new CommentView(comments[i]), RenderPosition.BEFOREEND);
  //   }
  // }

  // Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;
  _handleCardClick() {
    this._changeMode();
    this._mode = Mode.POPUP;

    this._popupComponent = new PopupView(this._film);

    // this._showPopup();
    this._popupComponent.showPopup();
    siteBodyElement.classList.add(`hide-overflow`);

    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
    this._popupComponent.setPopupEscCallback(this._onEscPopupPressHandler);
    this._popupComponent.setPopupControlsChangeHandler(this._handlePopupControlsChange);
    this._popupComponent.setPopupFormKeyDown(this._onPopupFormKeyDown);
  }

  // Клик по панели контролов меняет флаги watchlist, watched, favorite
  _handleCardControlsClick(controlKey) {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              [controlKey]: !this._film[controlKey]
            }
        )
    );

    // console.log(this._film);
    // console.log({[controlKey]: !this._film[controlKey]});
  }

  _handlePopupCloseClick() {
    remove(this._popupComponent);
    // this._popupComponent === null;
    siteBodyElement.classList.remove(`hide-overflow`);
  }

  _handlePopupControlsChange(update) {
    this._changeData(
        Object.assign(
            {},
            this._film,
            update
        )
    );

    // console.log(this._film);
    // console.log({[controlKey]: !this._film[controlKey]});
  }

  _onPopupFormKeyDown(key) {
    // console.log(update);
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              [key]: this._film[key] + 1
            }
        )
    );
  }

  _onEscPopupPressHandler(film) {
    this._mode = Mode.DEFAULT;
    this._changeData(film);
    remove(this._popupComponent);
    // this._popupComponent === null;
    siteBodyElement.classList.remove(`hide-overflow`);
  }

  destroy() {
    remove(this._cardComponent);
    // remove(this._popupComponent);
  }
}
