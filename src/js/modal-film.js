
(() => {
  const refs = {
    openModalBtn: document.querySelector('.btn-open'),
    closeModalBtn: document.querySelector('.modal__btn-close'),
    modal: document.querySelector('.modal'),
    body: document.body,
      };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', () => {
     toggleModal();
  });

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    refs.body.classList.toggle('overflow');
  }
})();

