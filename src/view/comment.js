import AbstractView from "./abstract.js";

// - шаблон комментария
const createCommentTemplate = (comment) => {
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

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }
  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
