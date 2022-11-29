

  const refs = {
    // openModalBtn: document.querySelector('.btn-open'),
    closeModalBtn: document.querySelector('.modal__btn-close'),
    modal: document.querySelector('.modal'),
    body: document.body,
    filmCard: document.querySelector('.films__list'),
    backdropEl: document.querySelector('.backdrop')
      };

  refs.filmCard.addEventListener('click', toggleModal);

  refs.closeModalBtn.addEventListener('click', closeleModal)

  function toggleModal(e) {
    const item = e.target.closest('.films__list')
    if (!item) {
      return;
    }
    refs.backdropEl.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscDown);
  };

  function closeleModal(e) {
    refs.backdropEl.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscDown);
  }

document.addEventListener('keydown', onEscDown);
function onEscDown(e) {
if (e.code === "Escape") {
  closeleModal();
  console.log(e.code)
}

}