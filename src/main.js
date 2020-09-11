// 1. Импорты
import UserProfileView from "./view/user-profile.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
import BoardView from "./view/board.js";
import FilmsTitleView from "./view/films-title.js";
import FilmsContainerView from "./view/films-container.js";
import NoFilmsTitleView from "./view/no-films-title.js";
// import {createExtraBoardTemplate} from "./view/extra-board.js";
import ShowBtnView from "./view/show-btn.js";
import CardView from "./view/card.js";
import PopupView from "./view/popup.js";
import CommentView from "./view/comment.js";
import FooterStatisticView from "./view/footer-statistic.js";

import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

import {ESC_CODE} from "./const.js";

import {render, RenderPosition} from "./utils.js";

// 2. Объявление констант
const CARD_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
// const CARD_FOOTER_COUNT = 2;
// const EXTRA_BOARD_TITLES = [`Top rated`, `Most commented`];

// 3. Объявление переменных, значение которых известно до начала работы программы

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

// 4. Объявление функций

// 5. Код программы. Вызов функций, использование ранее объявленных переменных, объявление класса. Объявление вычисляемых переменных

const films = new Array(CARD_COUNT).fill().map(generateFilm);
// console.log(films);

// const comments = new Array(films[i].commentsCount).fill().map(generateComment);
// const comments = films.map((film) => new Array(film.commentsCount).fill().map(generateComment));
// console.log(comments);

const filters = generateFilter(films);
// console.log(filters);

const renderCard = (boardListElement, film) => {
  const cardComponent = new CardView(film);
  const popupComponent = new PopupView(film);

  // массив комментариев для данного фильма
  const comments = new Array(film.commentsCount).fill().map(generateComment);

  const showPopup = () => {
    render(siteBodyElement, popupComponent.getElement(), RenderPosition.BEFOREEND);
    const popupCommentList = popupComponent.getElement().querySelector(`.film-details__comments-list`);

    // - отрисовка комменатриев в попапе
    for (let i = 0; i < film.commentsCount; i++) {
      render(popupCommentList, new CommentView(comments[i]).getElement(), RenderPosition.BEFOREEND);
    }
  };

  // Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;
  cardComponent.setCardClickHandler(() => {
    showPopup();
    siteBodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onPopupEscPress);
  });

  // при клике на кнопку закрыть или при нажатии на клавишу ESC попап удаляется из DOM
  // используем дилегирование
  popupComponent.setPopupCloseClickHandler(() => {
    popupComponent.getElement().remove();
    siteBodyElement.classList.remove(`hide-overflow`);
  });

  // этот метод потом вынесем
  const onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      popupComponent.getElement().remove();
      siteBodyElement.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  render(boardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

// - отрисовка компоненты со званием пользователя
render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты меню
render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты сортировки
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const renderBoard = (boardContainer, boardsFilms) => {
  const boardComponent = new BoardView();
  const filmsListComponent = new FilmsContainerView();
  // - отрисовка компоненты доски
  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);

  const mainBoardElement = boardComponent.getElement().querySelector(`.films-list`);

  if (boardsFilms.length === 0) {
    render(mainBoardElement, new NoFilmsTitleView().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(mainBoardElement, new FilmsTitleView().getElement(), RenderPosition.BEFOREEND);
    render(mainBoardElement, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

    // const mainBoardListElement = mainBoardElement.querySelector(`.films-list__container`);

    // Ограничим первую отрисовку по минимальному количеству,
    // чтобы не пытаться рисовать 8 задач, если всего 5
    boardsFilms
      .slice(0, Math.min(boardsFilms.length, FILM_COUNT_PER_STEP))
      .forEach((boardFilm) => renderCard(filmsListComponent.getElement(), boardFilm));

    if (boardsFilms.length > FILM_COUNT_PER_STEP) {
      let renderedFilmCount = FILM_COUNT_PER_STEP; // счетчик показанных фильмов

      const showMoreButton = new ShowBtnView();
      render(mainBoardElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

      // По клику будем допоказывать задачи, опираясь на счётчик
      showMoreButton.setClickHandler(() => {
        // evt.preventDefault();
        boardsFilms
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
          .forEach((film) => renderCard(filmsListComponent.getElement(), film));

        renderedFilmCount += FILM_COUNT_PER_STEP;

        // Если показаны все фильмы - скроем кнопку
        if (renderedFilmCount >= boardsFilms.length) {
          showMoreButton.getElement().remove();
        }
      });
    }
  }
};

renderBoard(siteMainElement, films);

// - отрисовка статистики в подвале сайта
render(footerStatisticElement, new FooterStatisticView(films).getElement(), RenderPosition.BEFOREEND);


// 6. Экспорты
