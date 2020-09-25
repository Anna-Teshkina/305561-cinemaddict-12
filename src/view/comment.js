// import AbstractView from "./abstract.js";
import Smart from "./smart.js";

// - шаблон комментария
const createCommentTemplate = (comment) => {
  // console.log(1);
  // console.log(comment);
  const {emoji, commentary, author, date} = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${commentary}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class Comment extends Smart {
  constructor(comment) {
    super();
    this._comment = comment;
    // this._container = container;
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    // console.log(1);
  }

  setDeleteClickHandler() {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }
}
