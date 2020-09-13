import {MONTHS} from "../const.js";

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


const convertToNumberDate = (dateArray) => {
  const newDateArray = [];

  dateArray.forEach((item) => {
    const flag = MONTHS.indexOf(item);
    if (flag === -1) {
      newDateArray.push(parseInt(item, 10));
    } else {
      newDateArray.push(MONTHS.indexOf(item) + 1);
    }
  });
  return newDateArray;
};

const compare = (a, b) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
};

export const sortDate = (cardA, cardB) => {
  // переведем дату из формата 18 October 1965 в массив [1965, 10, 18]
  // и сравним даты сначала по году, потом по месяцу и по дате
  const dateFirstArray = convertToNumberDate(cardA.release.split(` `).reverse());
  const dateSecondArray = convertToNumberDate(cardB.release.split(` `).reverse());

  const stepLength = dateFirstArray.length;

  let weight;
  for (let i = 0; i < stepLength; i++) {
    weight = compare(dateFirstArray[i], dateSecondArray[i]);
    if (weight !== 0) {
      break;
    }
  }

  return weight;
};

export const sortRaiting = (cardA, cardB) => {
  return cardB.raiting - cardA.raiting;
};
