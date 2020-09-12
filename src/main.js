// 1. Импорты
import UserProfileView from "./view/user-profile.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
// import BoardView from "./view/board.js";
// import FilmsTitleView from "./view/films-title.js";
// import FilmsContainerView from "./view/films-container.js";
// import NoFilmsTitleView from "./view/no-films-title.js";
// import {createExtraBoardTemplate} from "./view/extra-board.js";
// import ShowBtnView from "./view/show-btn.js";
// import CardView from "./view/card.js";
// import PopupView from "./view/popup.js";
// import CommentView from "./view/comment.js";
import FooterStatisticView from "./view/footer-statistic.js";

import BoardPresenter from "./presenter/board.js";

import {generateFilm} from "./mock/film.js";
// import {generateComment} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

// import {ESC_CODE} from "./const.js";

// import {render, RenderPosition, remove} from "./utils/render.js";
import {render, RenderPosition} from "./utils/render.js";

// 2. Объявление констант
const CARD_COUNT = 22;

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

// - отрисовка компоненты со званием пользователя
render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);

// - отрисовка компоненты меню
render(siteMainElement, new MenuView(filters), RenderPosition.BEFOREEND);

// - отрисовка компоненты сортировки
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement);
boardPresenter.init(films);

// - отрисовка статистики в подвале сайта
render(footerStatisticElement, new FooterStatisticView(films), RenderPosition.BEFOREEND);

// 6. Экспорты
