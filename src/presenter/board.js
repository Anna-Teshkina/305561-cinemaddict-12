
import BoardView from "../view/board.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsTitleView from "../view/films-title.js";
import NoFilmsTitleView from "../view/no-films-title.js";
import ShowBtnView from "../view/show-btn.js";

import CardView from "../view/card.js";
import PopupView from "../view/popup.js";
import CommentView from "../view/comment.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {sortDate, sortRaiting} from "../utils/common.js";

import {generateComment} from "../mock/film.js";
import {ESC_CODE, SortType} from "../const.js";

const FILM_COUNT_PER_STEP = 5;

const siteBodyElement = document.querySelector(`body`);

export default class Board {
  constructor(boardContainer, sortComponent) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._sortComponent = sortComponent;
    this._boardComponent = new BoardView();
    this._mainBoardComponent = new FilmsListView();
    this._boardListComponent = new FilmsContainerView();
    this._noFilmComponent = new NoFilmsTitleView();
    this._showMoreButton = new ShowBtnView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
  }

  init(boardFilms) {
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js

    this._boardFilms = boardFilms.slice();
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this._sourcedBoardFilms = boardFilms.slice();

    // - отрисовка компоненты доски
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._mainBoardComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _sortCards(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortDate);
        break;
      case SortType.RAITING:
        this._boardFilms.sort(sortRaiting);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);

    // - Очищаем список
    this._clearCardList();

    // - Рендерим список заново
    this._renderCardList();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(film) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js

    const cardComponent = new CardView(film);
    const popupComponent = new PopupView(film);

    // массив комментариев для данного фильма
    const comments = new Array(film.commentsCount).fill().map(generateComment);

    const showPopup = () => {
      render(siteBodyElement, popupComponent, RenderPosition.BEFOREEND);
      const popupCommentList = popupComponent.getElement().querySelector(`.film-details__comments-list`);

      // - отрисовка комменатриев в попапе
      for (let i = 0; i < film.commentsCount; i++) {
        render(popupCommentList, new CommentView(comments[i]), RenderPosition.BEFOREEND);
      }
    };

    // Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;
    cardComponent.setCardClickHandler(() => {
      showPopup();
      siteBodyElement.classList.add(`hide-overflow`);
      document.addEventListener(`keydown`, onPopupEscPress);

      // при клике на кнопку закрыть или при нажатии на клавишу ESC попап удаляется из DOM
      // используем дилегирование
      popupComponent.setPopupCloseClickHandler(() => {
        remove(popupComponent);
        siteBodyElement.classList.remove(`hide-overflow`);
      });
    });

    // этот метод потом вынесем
    const onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_CODE) {
        remove(popupComponent);
        siteBodyElement.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, onPopupEscPress);
      }
    };

    render(this._boardListComponent, cardComponent, RenderPosition.BEFOREEND);
  }

  _renderCards(from, to) {
    // Метод для рендеринга N-задач за раз
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderCard(boardFilm));
  }

  _renderCardList() {
    if (this._boardFilms.length === 0) {
      this._renderNoCards();
    } else {
      render(this._mainBoardComponent, new FilmsTitleView(), RenderPosition.BEFOREEND);
      render(this._mainBoardComponent, this._boardListComponent, RenderPosition.BEFOREEND);

      // Ограничим первую отрисовку по минимальному количеству,
      // чтобы не пытаться рисовать 8 задач, если всего 5
      this._renderCards(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

      if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
        this._renderLoadMoreButton();
      }
    }
  }

  _clearCardList() {
    this._boardListComponent.getElement().innerHTML = ``;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderNoCards() {
    // Метод для рендеринга заглушки
    render(this._mainBoardComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    // Если показаны все фильмы - скроем кнопку
    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreButton);
    }
  }

  _renderLoadMoreButton() {
    render(this._mainBoardComponent, this._showMoreButton, RenderPosition.BEFOREEND);

    // По клику будем допоказывать задачи, опираясь на счётчик
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js

    this._renderCardList();
    this._renderSort();
  }
}
