// СГЕНЕРИРУЕМ МОКИ ДЛЯ ОПИСАНИЯ КАРТОЧЕК ФИЛЬМА
import {EMOJIES} from "../const.js";
import {getRandomInteger, getRandom, getRandomElement, getRandomString} from "../utils/common.js";

// ---------------------------------------------------------------------------------
// ----- МОКОВЫЕ ДАННЫЕ ------------------------------------------------------------
// ---------------------------------------------------------------------------------

// массив месяцев
const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

// максимальное число предложений в описании карточки фильма
const SENTENCES_LIMIT = 5;

// ограничения по длительности фильма
const START_TIME_DURATION = 65;
const END_TIME_DURATION = 180;

// массив имен для режиссеров и сценаристов
const PERSONS = [`Steven Spielberg`, `Martin Scorsese`, `Quentin Tarantino`, `Guy Ritchie`, `Woody Allen`, `James Cameron`, `Ridley Scott`, `Tim Burton`, `Clint Eastwood`, `Christopher Nolan`, `David Fincher`, `Frank Darabont`];

// жанры
const GENRES = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`];

// название фильма
const NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`, `Made for Each Other`];

// название изображений
const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

// возрастные ограничения
const AGE_RAITINGS = [`0`, `6`, `12`, `16`, `18`];

// страны
const COUNTRIES = [`USA`, `Russia`, `China`, `France`, `Germany`, `India`, `Netherlands`, `Poland`];
// ---------------------------------------------------------------------------------


// текст для формирования описаний фильмов
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

// сформируем из него массив, состоящий из предложений
const splitDescription = text.split(`.`).map((item) => item.trim());
// console.log(splitDescription);
// удаляем последний пустой элемент массива
splitDescription.pop();

// если описание фильма больше 140 символов, то в карточке отображается
// 139 символов описания и знак многоточие (…).
const generateShortDescription = (description) =>
  description.length < 140 ? description : description.slice(0, 139) + `...`;

// переводим время в минутах к формату 12h 35m
const convertMinToHours = (minutes) =>
  minutes < 60 ? minutes + `m` : Math.ceil(minutes / 60) + `h ` + (minutes % 60) + `m`;

// функция возвращает произвольную дату из интервала
const getRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// ограничение по году выпуска фильма
// произвольный диапазон 1930 - 1964
const startProductionDate = new Date(1930, 0, 1);
const endProductionDate = new Date(1964, 0, 1);

const generateDate = () => {
  const startDay = new Date(2020, 0, 1);
  const endDay = new Date(2021, 0, 1);
  const randomDate = getRandomDate(endDay, startDay);

  return randomDate.getFullYear() + `/` + randomDate.getMonth() + `/` + randomDate.getDate() + ` ` + randomDate.getHours() + `:` + randomDate.getMinutes();
};

export const generateComment = () => {
  return {
    emoji: `/images/emoji/` + getRandomElement(EMOJIES) + `.png`,
    commentary: getRandomElement(splitDescription),
    author: getRandomElement(PERSONS),
    date: generateDate(),
  };
};

// const comments = new Array(commentsCount).fill().map(generateComment);
// console.log(comments);

export const generateFilm = () => {
  const description = getRandomString(splitDescription, `. `, 1, SENTENCES_LIMIT, true);
  const currentDuration = getRandomInteger(START_TIME_DURATION, END_TIME_DURATION);
  const releaseDate = getRandomDate(startProductionDate, endProductionDate);
  const filmName = getRandomElement(NAMES);

  return {
    name: filmName,
    originalName: filmName,
    poster: `/images/posters/` + getRandomElement(POSTERS),
    description,
    shortDescription: generateShortDescription(description),
    raiting: parseFloat(getRandom(1, 10).toFixed(1)),
    release: releaseDate.getDate() + ` ` + MONTHS[releaseDate.getMonth()] + ` ` + releaseDate.getFullYear(),
    year: releaseDate.getFullYear(),
    runtime: convertMinToHours(currentDuration),
    genre: getRandomString(GENRES, `, `, 1, GENRES.length - 1, false),
    ageRaiting: getRandomElement(AGE_RAITINGS) + `+`,
    director: getRandomElement(PERSONS),
    writers: getRandomString(PERSONS, `, `, 1, NAMES.length - 1, false),
    actors: getRandomString(PERSONS, `, `, 1, NAMES.length - 1, false),
    commentsCount: getRandomInteger(0, 5),
    country: getRandomElement(COUNTRIES),
    watchlist: Boolean(getRandomInteger(0, 1)),
    watched: Boolean(getRandomInteger(0, 1)),
    favorite: Boolean(getRandomInteger(0, 1)),
  };
};
