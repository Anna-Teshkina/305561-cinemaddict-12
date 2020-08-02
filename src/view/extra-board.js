// - шаблон блоков для фильмов с высоким рейтингом и наиболее обсуждаемых
export const createExtraBoardTemplate = (title) => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">` + title + `</h2>
      <div class="films-list__container"></div>
    </section>`;
};
