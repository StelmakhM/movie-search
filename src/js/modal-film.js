const refs = {
  closeModalBtn: document.querySelector('.modal__btn-close'),
  // body: document.body,
  filmCard: document.querySelector('.films__list'),
  backdropEl: document.querySelector('.backdrop'),
};

refs.filmCard.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', closeModal);

function toggleModal(e) {
  const item = e.target.closest('.films__list');
  if (!item) {
    return;
  }
  refs.backdropEl.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscDown);
  document.addEventListener('click', onBackdropClick);
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  refs.backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscDown);
  document.body.style.overflow = '';
}

function onEscDown(e) {
  if (e.code === 'Escape') {
    closeModal();
    console.log(e.code);
  }
}

function onBackdropClick(e) {
  if (e.target === refs.backdropEl) {
    closeModal();
    console.log(e.target);
  }
}
