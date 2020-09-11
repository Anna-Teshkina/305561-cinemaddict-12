// Создаем абстрактный класс

export default class Abstract {
  constructor() {
  	// Проверка в конструкторе на "new.target" позволит использовать абстрактный
	// класс только в качестве родительского класса. 
	// При попытке выполнить "new Abstract()" разработчик получит ошибку.
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
  }
}