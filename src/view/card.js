// - шаблон карточки фильма
export const createCardTemplate = (film) => {
  const {name, raiting, year, duration, genre, poster, shortDescription, commentsCount, isInWatchlist, isWatched, isFavorite} = film;

  // устанавливаем  активный класс на кнопку в зависимости от переданного флага
  const setActiveClassName = (flag) => flag ? `film-card__controls-item--active` : ``;

  // для карточки фильма указываем в качестве жанра первый из списка
  const gengesList = genre.split(`,`).map((item) => item.trim());
  const filmGenre = gengesList[0];

  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${raiting}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${filmGenre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setActiveClassName(isInWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setActiveClassName(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${setActiveClassName(isFavorite)}">Mark as favorite</button>
    </form>
  </article>`;
};
