import CardView from "../view/card.js";
import PopupView from "../view/popup.js";
import CommentView from "../view/comment.js";

import {render, RenderPosition, remove} from "../utils/render.js";

import {generateComment} from "../mock/film.js";
import {ESC_CODE} from "../const.js";

const siteBodyElement = document.querySelector(`body`);

export default class Card {
  constructor(boardListComponent) {
    this._boardListComponent = boardListComponent;

    this._cardComponent = null;
    this._popupComponent = null;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._onEscPressHandler = this._onEscPressHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._cardComponent = new CardView(film);
    this._popupComponent = new PopupView(film);

    this._cardComponent.setCardClickHandler(this._handleCardClick);
    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);
  }

  _showPopup() {
    render(siteBodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    const popupCommentList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);

    // массив комментариев для данного фильма
    const comments = new Array(this._film.commentsCount).fill().map(generateComment);

    // - отрисовка комменатриев в попапе
    for (let i = 0; i < this._film.commentsCount; i++) {
      render(popupCommentList, new CommentView(comments[i]), RenderPosition.BEFOREEND);
    }
  }

  // Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;
  _handleCardClick() {
    this._showPopup();
    siteBodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._onEscPressHandler);

    // при клике на кнопку закрыть или при нажатии на клавишу ESC попап удаляется из DOM
    // используем дилегирование
    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
  }

  _handlePopupCloseClick() {
    remove(this._popupComponent);
    siteBodyElement.classList.remove(`hide-overflow`);
  }

  // этот метод потом вынесем
  _onEscPressHandler(evt) {
    if (evt.keyCode === ESC_CODE) {
      remove(this._popupComponent);
      siteBodyElement.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._onEscPressHandler);
    }
  }
}
