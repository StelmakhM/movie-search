import { renderFilmCard } from "./render-film-card";

const refs = {
  closeModalBtn: document.querySelector('[data-modal-close]'),
  filmCard: document.querySelector('.films__list'),
  backdropEl: document.querySelector('.backdrop'),
};

refs.filmCard.addEventListener('click', toggleModal);

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
    console.log(e.target);
  }
}
