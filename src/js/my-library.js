import { watchedArr, queueArr } from './save-buttons.js';
import { MovieApi } from './movieApi.js';

const refs = {
  filmContainer: document.querySelector('.films__list'),
  watchedBtn: document.querySelector('.js-watched'),
  queueBtn: document.querySelector('.js-queue'),
};

window.addEventListener('load', onWindowLoad);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onqueueBtnClick);
const movieApi = new MovieApi();

function onWindowLoad() {
  refs.filmContainer.innerHTML = createMarkUp(watchedArr);
}

function onWatchedBtnClick() {
  refs.filmContainer.innerHTML = createMarkUp(watchedArr);
}

function onqueueBtnClick() {
  refs.filmContainer.innerHTML = createMarkUp(queueArr);
}

function createMarkUp(filmsArray) {
  return filmsArray
    .map(
      ({
        genres,
        originalTitle,
        overview,
        populatiry,
        posterPath,
        releaseDate,
        title,
        voteAverage,
        voteCount,
        id,
      }) => {
        const genresArr = genres.split(',');
        const truereleaseDate = new Date(releaseDate).getFullYear();
        const placeholderUrl =
          'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
        const trueposterPath = posterPath
          ? `${movieApi.imgUrl}${movieApi.imgSize}${posterPath}`
          : placeholderUrl;
        return ` <li class='films__item' style="min-height:100px" data-id='${id}' data-title='${title}' data-release-date='${releaseDate}' data-poster-path='${posterPath}' data-genres='${genres}' data-vote-average='${voteAverage}' data-vote-count='${voteCount}' data-original-title='${originalTitle}' data-overview='${overview}' data-populatiry='${populatiry}'>
                    <a class='films__link'>
                    <img class='films__poster' src='${trueposterPath}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${
                      genresArr.length > 3
                        ? genresArr[0] + ', ' + genresArr[1] + ' and others'
                        : genresArr.join(', ') || 'No genre'
                    } | ${truereleaseDate || 'Unknown release date'}</p>
                    </div></a>
                </li>`;
      }
    )
    .join('');
}
