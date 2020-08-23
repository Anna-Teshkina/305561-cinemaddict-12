const filmsToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films
    .filter((film) => film.watchlist).length,
  history: (films) => films
    .filter((film) => film.watched).length,
  favorites: (films) => films
    .filter((film) => film.favorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmsToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};

