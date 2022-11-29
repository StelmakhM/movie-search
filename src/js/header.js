// ----------------visually hidden для ЛОГО-----------------

const logoEl = document.querySelector('.nav__logo-title');

window.onresize = function () {
  if (window.matchMedia('(max-width: 767px)').matches) {
    logoEl.classList.add('visually-hidden');
  } else {
    logoEl.classList.remove('visually-hidden');
  }
};

// ----------------          -----------------
