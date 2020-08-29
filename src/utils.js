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

// Рендер шаблона
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Принцип работы:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент

// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>

export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
