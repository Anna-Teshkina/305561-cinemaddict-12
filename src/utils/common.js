import moment from "moment";
import {MINUTES_IN_HOUR} from "../const.js";

// Функция по генерации ЦЕЛОГО случайного числа из диапазона
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция по генерации ДРОБНОГО случайного числа из диапазона
export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

// Функция возвращает ПРОИЗВОЛЬНЫЙ ЭЛЕМЕНТ МАССИВА
export const getRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

// Продолжительность в формате часы минуты (например «1h 36m»);
// Дата и год релиза в формате день месяц год (например: «01 April 1995»);
// Дата комментария отображается в формате год/месяц/день часы:минуты (например «2019/12/31 23:59»).

export const formatFilmDuration = (duration) => {
  switch (true) {
    case duration < MINUTES_IN_HOUR:
      return moment.utc().startOf(`day`).add({minutes: duration}).format(`m[m]`);
    case duration % MINUTES_IN_HOUR === 0:
      return moment.utc().startOf(`day`).add({minutes: duration}).format(`h[h]`);
    default:
      return moment.utc().startOf(`day`).add({minutes: duration}).format(`h[h] m[m]`);
  }
};

export const formatReleaseDate = (releaseDate) => {
  if (!(releaseDate instanceof Date)) {
    return ``;
  }
  return moment(releaseDate).format(`D MMMM Y`);
};

export const formatCommentaryDate = (commentaryDate) => {
  if (!(commentaryDate instanceof Date)) {
    return ``;
  }
  return moment(commentaryDate).format(`Y/MM/DD h:mm`);
};

// Функция генерирует СТРОКУ СЛУЧАЙНОЙ ДЛИНЫ ИЗ УНИКАЛЬНЫХ СЛУЧАЙНЫХ ЭЛЕМЕНТОВ
// - элементы отделены друг от друга сепаратором
// - если флаг истина, то оставляем сепаратор в конце последнего элемента, если ложь - убираем.
export const getRandomString = (array, seperator, minCount, maxCount, flag = true) => {
  const elementsCount = getRandomInteger(minCount, maxCount);
  let randomString = ``;
  let randomSet = new Set();

  while (randomSet.size !== elementsCount) {
    randomSet.add(getRandomElement(array));
  }

  randomSet.forEach((item) => {
    randomString += item + seperator;
  });

  // убираем пробелы в конце строки
  randomString = randomString.trim();

  // если флаг истина то оставляем сепаратор в конце последнего элемента
  // если ложь - убираем.
  return flag === true ? randomString : randomString.substring(0, randomString.length - 1);
};

// Функция делает первую букву строки заглавной
export const convertFirstLetterToUppercase = (word) =>
  word.slice(0, 1).toUpperCase() + word.slice(1, word.length);

export const sortDate = (cardA, cardB) => {
  return moment(cardB.release) - moment(cardA.release);
};

export const sortRaiting = (cardA, cardB) => {
  return cardB.raiting - cardA.raiting;
};

// универсальная функция обновления элемента массива
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
