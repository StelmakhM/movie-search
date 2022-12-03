import { renderFilmCard } from './render-film-card';
import { launchTrailer } from './trailer';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-close]'),
  filmCard: document.querySelector('.films__list'),
  backdropEl: document.querySelector('.backdrop'),
  startTrailerBtn: document.querySelector('.trailer__btn'),
};

refs.filmCard.addEventListener('click', toggleModal);
refs.startTrailerBtn.addEventListener('click', e => launchTrailer(e));

function toggleModal(e) {
  const item = e.target.closest('.films__item');
  if (!item) {
    return;
  }
  refs.backdropEl.classList.remove('is-hidden');
  refs.closeModalBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscDown);
  document.addEventListener('click', onBackdropClick);
  document.body.style.overflow = 'hidden';
  renderFilmCard(e);
}

function closeModal(e) {
  refs.backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscDown);
  document.body.style.overflow = '';
}

function onEscDown(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === refs.backdropEl) {
    closeModal();
  }
}
