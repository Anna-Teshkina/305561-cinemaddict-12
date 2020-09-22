import CardView from "../view/card.js";
import PopupView from "../view/popup.js";
import CommentView from "../view/comment.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";

import {generateComment} from "../mock/film.js";
import {ESC_CODE} from "../const.js";

const siteBodyElement = document.querySelector(`body`);

export default class Card {
  constructor(boardListComponent, changeData) {
    this._boardListComponent = boardListComponent;
    this._changeData = changeData;

    this._cardComponent = null;
    this._popupComponent = null;

    this.currentElem = null;
    //this.prevElem = null;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCardControlsClick = this._handleCardControlsClick.bind(this);

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handlePopupControlsClick = this._handlePopupControlsClick.bind(this);

    this._onEscPressHandler = this._onEscPressHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    // this._cardComponent = new CardView(film);
    // this._popupComponent = new PopupView(film);

    // this._cardComponent.setCardClickHandler(this._handleCardClick);
    // this._cardComponent.setCardControlsClickHandler(this._handleCardControlsClick);

    // this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
    // this._popupComponent.setPopupControlsClickHandler(this._handlePopupControlsClick);

    // render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);

    // if (prevCardComponent === null || prevPopupComponent === null) {
    //   render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    console.log('init');

    console.log(this.currentElem);

    if (this.currentElem === null) {
      this._cardComponent = new CardView(film);
      this._popupComponent = new PopupView(film);

      this._cardComponent.setCardClickHandler(this._handleCardClick);
      this._cardComponent.setCardControlsClickHandler(this._handleCardControlsClick);

      this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
      this._popupComponent.setPopupControlsClickHandler(this._handlePopupControlsClick);

      render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.currentElem === 'popup') {
      this._cardComponent = new CardView(film);

      this._cardComponent.setCardClickHandler(this._handleCardClick);
      this._cardComponent.setCardControlsClickHandler(this._handleCardControlsClick);
      // console.log('Перерисовка при открытом попапе');

      // if (this._boardListComponent.getElement().contains(prevCardComponent.getElement())) {
      //   replace(this._cardComponent, prevCardComponent);
      // }

      // console.log('reinit card');

      // render(this._boardListComponent, this._cardComponent, RenderPosition.BEFOREEND);
      // console.log(prevCardComponent);
      // console.log(this._cardComponent);

      replace(this._cardComponent, prevCardComponent);
      // replace(this._popupComponent, prevPopupComponent);
      remove(prevCardComponent);
      // remove(prevPopupComponent);
    }

    if (this.currentElem === 'card') {
      this._popupComponent = new PopupView(film);

      this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
      this._popupComponent.setPopupControlsClickHandler(this._handlePopupControlsClick);

      replace(this._popupComponent, prevPopupComponent);
      remove(prevPopupComponent);
    }

    

    // remove(prevCardComponent);
    // remove(prevPopupComponent);
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

  // Клик по панели контролов меняет флаги watchlist, watched, favorite
  _handleCardControlsClick(controlKey) {

    this.currentElem  = 'card';

    this._changeData(
      Object.assign(
        {}, 
        this._film, 
        {
          [controlKey]: !this._film[controlKey]
        }
      )
    );
    
    console.log(this._film);

    // console.log({[controlKey]: !this._film[controlKey]});
  }

  _handlePopupCloseClick() {
    //remove(this.prevElem);
    // console.log(this._popupComponent._element);
     remove(this._popupComponent);
    // remove(prevPopupComponent);
    // if (this.currentElem  === 'popup') {
    //   remove(prevPopupComponent);
    // }

    siteBodyElement.classList.remove(`hide-overflow`);
  }

  _handlePopupControlsClick(controlKey) {
    this.currentElem  = 'popup';
     //this.prevElem = this._popupComponent;

    this._changeData(
      Object.assign(
        {}, 
        this._film, 
        {
          [controlKey]: !this._film[controlKey]
        }
      )
    );

    // console.log(this._popupComponent);

    // this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);
    
    // console.log({[controlKey]: !this._film[controlKey]});
  }

  // этот метод потом вынесем
  _onEscPressHandler(evt) {
    if (evt.keyCode === ESC_CODE) {
      remove(this._popupComponent);
      siteBodyElement.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._onEscPressHandler);
    }
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }
}
