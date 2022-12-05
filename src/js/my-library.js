import { MovieApi } from './movieApi.js';
import { getFromLocalStorage, addToLocalStorage } from './storage.js';
import { Notify } from 'notiflix';
import { closeModal } from './modal-film-library.js';
import placeholderImagePath from '../images/ghostlibrary.png';


const WATCHED_KEY = 'watchedList';
const QUEUE_KEY = 'queueList';
const watchedArr = getFromLocalStorage(WATCHED_KEY) || [];
const queueArr = getFromLocalStorage(QUEUE_KEY) || [];
const isCreated = false;

const refs = {
  filmContainer: document.querySelector('.films__list'),
  watchedBtn: document.querySelector('.js-watched'),
  queueBtn: document.querySelector('.js-queue'),
  removeFromWatchedBtn: document.querySelector('.btn-add-watched'),
  removeFromQueueBtn: document.querySelector('.btn-add-queue'),
  backdropEl: document.querySelector('.backdrop'),
};

const movieApi = new MovieApi();
window.addEventListener('load', onWindowLoad);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);
refs.removeFromWatchedBtn.addEventListener('click', onRemoveFromWatchedClick);
refs.removeFromQueueBtn.addEventListener('click', onRemoveFromQueueClick);

function onWindowLoad() {
  if (!watchedArr.length) {
    createPlaceholder();
    return;
  }
  refs.removeFromWatchedBtn.innerHTML = 'Remove from watched';
  refs.removeFromQueueBtn.style.display = 'none';
  refs.filmContainer.innerHTML = createMarkUp(watchedArr);
}

function onWatchedBtnClick() {
  if (!watchedArr.length && refs.filmContainer.innerHTML === '') {
    createPlaceholder();
    return;
  }
  if (refs.filmContainer.firstElementChild.classList.contains('empty__container')) {
    return;
  }
  refs.removeFromWatchedBtn.style.display = 'block';
  refs.removeFromWatchedBtn.innerHTML = 'Remove from watched';
  refs.removeFromQueueBtn.style.display = 'none';
  refs.filmContainer.innerHTML = createMarkUp(watchedArr);
}

function onQueueBtnClick() {
  if (!queueArr.length && refs.filmContainer.innerHTML === '') {
    createPlaceholder();
    return;
  }

  refs.removeFromQueueBtn.style.display = 'block';
  refs.removeFromQueueBtn.innerHTML = 'Remove from queue';
  refs.removeFromWatchedBtn.style.display = 'none';
  refs.filmContainer.innerHTML = createMarkUp(queueArr);
  if (!queueArr.length && refs.filmContainer.innerHTML === '') {
    createPlaceholder();
    return;
  }
}

function onRemoveFromWatchedClick(e) {
  if (!watchedArr.length) {
    createPlaceholder();
    return;
  }
  const id = e.target.closest('#film-modal').dataset.id;
  const movieToDelete = watchedArr.find(movie => movie.id === id);
  watchedArr.splice(watchedArr.indexOf(movieToDelete), 1);
  addToLocalStorage(WATCHED_KEY, watchedArr);
  refs.filmContainer.innerHTML = createMarkUp(watchedArr);
  closeModal();
  Notify.success('This movie was successfully removed from your watched list');
  if (!watchedArr.length) {
    createPlaceholder();
  }
}

function onRemoveFromQueueClick(e) {
  if (!queueArr.length) {
    createPlaceholder();
  }
  const id = e.target.closest('#film-modal').dataset.id;
  const movieToDelete = queueArr.find(movie => movie.id === id);
  queueArr.splice(queueArr.indexOf(movieToDelete), 1);
  addToLocalStorage(QUEUE_KEY, queueArr);
  refs.filmContainer.innerHTML = createMarkUp(queueArr);
  closeModal();
  Notify.success('This movie was successfully removed from your queue list');
  if (!queueArr.length) {
    createPlaceholder();
  }

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
                    <p class='films__genres'>${genresArr.length > 3
            ? genresArr[0] + ', ' + genresArr[1] + ' and others'
            : genresArr.join(', ') || 'No genre'
          } | ${truereleaseDate || 'Unknown release date'}</p>
                    </div></a>
                </li>`;
      }
    )
    .join('');
}

function createPlaceholder() {
  const placeholder = document.createElement('li');
  placeholder.classList.add('empty__container');

  const img = document.createElement('img');
  img.src = placeholderImagePath;
  img.alt = 'Empty library';
  img.classList.add('empty__image');
  placeholder.append(img);
  refs.filmContainer.append(placeholder);
  isCreated = true;
}