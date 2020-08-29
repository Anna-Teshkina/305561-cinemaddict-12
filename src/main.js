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

  // п.1.3. Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;
  const cardTitle = cardComponent.getElement().querySelector(`.film-card__title`);
  const cardPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const cardComments = cardComponent.getElement().querySelector(`.film-card__comments`);

  cardComponent.getElement().addEventListener(`click`, (evt) => {
    if ((evt.target === cardTitle) || (evt.target === cardPoster) || (evt.target === cardComments)) {
      showPopup();
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  });

  // - при клике на кнопку закрыть или при нажатии на клавишу ESC попап удаляется из DOM
  const popupCloseBtn = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  popupCloseBtn.addEventListener(`click`, () => popupComponent.getElement().remove());

  const onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      popupComponent.getElement().remove();
    }
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  render(boardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

// - отрисовка компоненты со званием пользователя
render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты меню
render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты сортировки
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты доски
render(siteMainElement, new BoardView().getElement(), RenderPosition.BEFOREEND);

const mainBoardElement = document.querySelector(`.films-list`);

if (films.length === 0) {
  render(mainBoardElement, new NoFilmsTitleView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(mainBoardElement, new FilmsTitleView().getElement(), RenderPosition.BEFOREEND);
  render(mainBoardElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);

  const mainBoardListElement = mainBoardElement.querySelector(`.films-list__container`);

  // Ограничим первую отрисовку по минимальному количеству,
  // чтобы не пытаться рисовать 8 задач, если всего 5
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderCard(mainBoardListElement, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP; // счетчик показанных фильмов
    render(mainBoardElement, new ShowBtnView().getElement(), RenderPosition.BEFOREEND);

    const showMoreButton = mainBoardElement.querySelector(`.films-list__show-more`);

    // По клику будем допоказывать задачи, опираясь на счётчик
    showMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderCard(mainBoardListElement, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      // Если показаны все фильмы - скроем кнопку
      if (renderedFilmCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }
}


// - отрисовка кнопки загрузки
// render(mainBoardListElement, createShowBtnTemplate(), `afterend`);


// - отрисовка 2 extra блоков для фильмов с высоким рейтингом и наиболее обсуждаемых
// for (let i = 0; i < EXTRA_BOARD_TITLES.length; i++) {
//   render(mainBoardElement, createExtraBoardTemplate(EXTRA_BOARD_TITLES[i]), `beforeend`);
// }

// const extraFilmContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

// Array.from(extraFilmContainers).forEach(function (item) {
//   for (let i = 0; i < CARD_FOOTER_COUNT; i++) {
//     render(item, createCardTemplate(), `beforeend`);
//   }
// });

// - отрисовка статистики в подвале сайта
render(footerStatisticElement, new FooterStatisticView(films).getElement(), RenderPosition.BEFOREEND);

// - отрисовка попапа с информацией о фильме
// render(siteBodyElement, new PopupView(films[0]).getElement(), RenderPosition.BEFOREEND);

// const popupElement = document.querySelector(`.film-details`);
// const popupCommentList = popupElement.querySelector(`.film-details__comments-list`);

// // - отрисовка комменатриев в попапе
// for (let i = 0; i < films[0].commentsCount; i++) {
//   render(popupCommentList, new CommentView(comments[i]).getElement(), `beforeend`);
// }

// // - при клике на кнопку закрыть попап удаляется из DOM
// const popupCloseBtn = popupElement.querySelector(`.film-details__close-btn`);
// popupCloseBtn.addEventListener(`click`, () => popupElement.remove());

// const onPopupEscPress = function (evt) {
//   if (evt.keyCode === ESC_CODE) {
//     popupElement.remove();
//   }
// };

// document.addEventListener(`keydown`, onPopupEscPress);


// 6. Экспорты
