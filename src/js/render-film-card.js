import imgPath from '../images/sprite.svg';

const refs = {
    filmCard: document.querySelector('.modal'),
    filmsContainer: document.querySelector('.films__list')
};

export function renderFilmCard(e) {
    const dataset = e.target.closest('li').dataset;
    const filmObject = {
        ...dataset
    };

    const { genres, originalTitle, overview, posterPath, title, voteAverage, voteCount, populatiry } = filmObject;
    const arrOfGenres = genres.split(',');
    const fixedGenres = arrOfGenres.length > 3 ? arrOfGenres[0] + ', ' + arrOfGenres[1] + ' and others' : arrOfGenres.join(', ') || 'No genre';
    const markUp = `
  <div class="modal">
    <button class="modal__btn-close" data-modal-close>
        <svg class="icon icon-close" width="16" height="16">
            <use href=${imgPath}#icon-close></use>
        </svg>
    </button>
    <div class="general-wrapper">
        <div class="card__img-wrapper">
            <img src=${posterPath} alt=${title} />
        </div>
        <div>
            <h2 class="card__film-title">${title || originalTitle}</h2>
            <div class="card__info-wrapper">
                <div class="card__info-wrapper-left">
                    <p class="card__subdivision card__votes">Votes</p>
                    <p class="card__subdivision">Popularity</p>
                    <p class="card__subdivision">Original Title</p>
                    <p class="card__subdivision">Genre</p>
                </div>
                <div class="card__info-wrapper-right">
                    <p class="card__votes">
                        <span class="card__vote-title">${Number.parseFloat(voteAverage).toFixed(1)}</span> /
                        <span class="card__info-text card__vote-number">
                              ${voteCount}
                        </span>
                    </p>
                    <p class="card__info-text">${Number.parseFloat(populatiry).toFixed(1)}</p>
                    <p class="card__info-text">${title || originalTitle}</p>
                    <p class="card__genre">${fixedGenres}</p>
                </div>
            </div>
            <p class="card__about">About</p>
            <p class="card__description">${overview}</p>
            <div class="btn-wrapper">
                <button class="btn-add-watched" type="button">
                    add to Watched
                </button>
                <button class="btn-add-queue" type="button">
                    add to queue
                </button>
            </div>
        </div>
    </div>
</div>`;

    refs.filmCard.innerHTML = markUp;

}

