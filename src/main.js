// 1. Импорты
import UserProfileView from "./view/user-profile.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
import {createBoardTemplate} from "./view/board.js";
// import {createExtraBoardTemplate} from "./view/extra-board.js";
import {createShowBtnTemplate} from "./view/show-btn.js";
import {createCardTemplate} from "./view/card.js";
import {createPopupTemplate} from "./view/popup.js";
import {createCommentTemplate} from "./view/comment.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";

import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

import {ESC_CODE} from "./const.js";

import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

// 2. Объявление констант
const CARD_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
// const CARD_FOOTER_COUNT = 2;
// const EXTRA_BOARD_TITLES = [`Top rated`, `Most commented`];

// 3. Объявление переменных, значение которых известно до начала работы программы

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

// 4. Объявление функций

// 5. Код программы. Вызов функций, использование ранее объявленных переменных, объявление класса. Объявление вычисляемых переменных

const films = new Array(CARD_COUNT).fill().map(generateFilm);
// console.log(films);
const comments = new Array(films[0].commentsCount).fill().map(generateComment);
// console.log(comments);
const filters = generateFilter(films);
// console.log(filters);

// - отрисовка компоненты со званием пользователя
renderElement(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты меню
renderElement(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты сортировки
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// - отрисовка компоненты доски
renderTemplate(siteMainElement, createBoardTemplate(), `beforeend`);

const mainBoardElement = document.querySelector(`.films`);
const mainBoardListElement = document.querySelector(`.films-list .films-list__container`);

// - отрисовка кнопки загрузки
// render(mainBoardListElement, createShowBtnTemplate(), `afterend`);

// Ограничим первую отрисовку по минимальному количеству,
// чтобы не пытаться рисовать 8 задач, если всего 5
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(mainBoardListElement, createCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP; // счетчик показанных фильмов
  renderTemplate(mainBoardListElement, createShowBtnTemplate(), `afterend`);

  const showMoreButton = mainBoardElement.querySelector(`.films-list__show-more`);

  // По клику будем допоказывать задачи, опираясь на счётчик
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(mainBoardListElement, createCardTemplate(film), `beforeend`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    // Если показаны все фильмы - скроем кнопку
    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

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
renderTemplate(footerStatisticElement, createFooterStatisticTemplate(films), `beforeend`);

// - отрисовка попапа с информацией о фильме
renderTemplate(siteFooterElement, createPopupTemplate(films[0]), `afterend`);

const popupElement = document.querySelector(`.film-details`);
const popupCommentList = popupElement.querySelector(`.film-details__comments-list`);

// - отрисовка комменатриев в попапе
for (let i = 0; i < films[0].commentsCount; i++) {
  renderTemplate(popupCommentList, createCommentTemplate(comments[i]), `beforeend`);
}

// - при клике на кнопку закрыть попап удаляется из DOM
const popupCloseBtn = popupElement.querySelector(`.film-details__close-btn`);
popupCloseBtn.addEventListener(`click`, () => popupElement.remove());

const onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    popupElement.remove();
  }
};

document.addEventListener(`keydown`, onPopupEscPress);


// 6. Экспорты
