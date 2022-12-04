const refs = {
  // closeModalBtnTeam: document.querySelector('#modal-close-team'),
  closeModalBtnTeam: document.querySelector('.modal__btn-close-team'),
  linkTeam: document.querySelector('.footer__btn'),
  backdropTeamEl: document.querySelector('.backdrop-team'),
};

refs.linkTeam.addEventListener('click', openTeamModal);
refs.closeModalBtnTeam.addEventListener('click', closeTeamModal);

function openTeamModal(ev) {
  refs.backdropTeamEl.classList.remove('is-hidden-team');
  document.addEventListener('keydown', onEscDownTeam);
  document.addEventListener('click', onTeamBackdropClick);
  document.body.style.overflow = 'hidden';
}

function closeTeamModal(ev) {
  refs.backdropTeamEl.classList.add('is-hidden-team');
  document.removeEventListener('keydown', onEscDownTeam);
  document.body.style.overflow = '';
}

function onEscDownTeam(ev) {
  if (ev.code === 'Escape') {
    closeTeamModal();
    console.log(ev.code);
  }
}

function onTeamBackdropClick(e) {
  if (e.target === refs.backdropTeamEl) {
    closeTeamModal();
    console.log(e.target);
  }
}
