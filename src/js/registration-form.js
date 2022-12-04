import refs from './refs';
import { AuthErrorCodes } from 'firebase/auth';

import { GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();

refs.signUpButton.addEventListener('click', () => {
  refs.container.classList.add('right-panel-active');
});

refs.signInButton.addEventListener('click', () => {
  refs.container.classList.remove('right-panel-active');
});
refs.registerFormCloseBtn.addEventListener('click', () => {
  hideFormLoginRegister();
});

refs.formLoginRegister.addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    resetFform();
    hideFormLoginRegister();
  }
});
export const resetFform = () => {
  refs.registerFormSignIn.reset();
  refs.registerFormSignUp.reset();
};
export const showFormLoginRegister = () => {
  refs.formLoginRegister.classList.remove('is-hidden');
  window.addEventListener('keydown', hideFormLoginRegisterByKey);
};
const hideFormLoginRegisterByKey = e => {
  if (e.key === 'Escape') {
    hideFormLoginRegister();
    window.removeEventListener('keydown', hideFormLoginRegisterByKey);
  }
};
export const hideFormLoginRegister = () => {
  refs.formLoginRegister.classList.add('is-hidden');
};

export const showApp = () => {
  refs.login.style.display = 'none';
  refs.app.style.display = 'block';
};
export const hideLoginError = () => {
  refs.divLoginError.style.display = 'none';
  refs.divLoginError.innerHTML = '';
};

export const showLoginError = error => {
  refs.divLoginError.style.display = 'block';
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    if (localStorage.getItem('language') === 'ua') {
      refs.divLoginError.innerHTML = `Wrong password. Try again.`;
    }
  } else if (error.code === 'auth/user-not-found') {
    refs.divLoginError.innerHTML = `User not found!`;
  } else {
    refs.divLoginError.innerHTML = `Error: ${error.message}`;
  }
};

export const hideRegisterError = () => {
  refs.divRegisterError.style.display = 'none';
  refs.divRegisterError.innerHTML = '';
};

export const showRegisterError = error => {
  refs.divRegisterError.style.display = 'block';
  if (error.code === 'auth/weak-password') {
    refs.divRegisterError.innerHTML = `Password should be at least 6 characters`;
  } else if (error.code === 'auth/email-already-in-use') {
    refs.divRegisterError.innerHTML = `Email already in use!`;
  } else {
    refs.divRegisterError.innerHTML = `Error: ${error.message}`;
  }
};

export const showLoginState = user => {
  refs.lblAuthState.innerHTML = `You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `;
};

hideLoginError();
hideRegisterError();

// USer menu
refs.firstLetter.addEventListener('click', toggleMenu);
function toggleMenu(e) {
  if (e.target === e.currentTarget) {
    refs.userMenu.classList.add('active-user-menu');
    window.addEventListener('keydown', closeMenuEscKey);
    document.querySelector('.user-menu__box').addEventListener('click', e => {
      if (e.currentTarget === e.target) {
        refs.userMenu.classList.remove('active-user-menu');
        window.removeEventListener('keydown', closeMenuEscKey);
      }
    });
  }
}

const closeMenuEscKey = e => {
  if (e.code === 'Escape') {
    refs.userMenu.classList.remove('active-user-menu');
    window.removeEventListener('keydown', closeMenuEscKey);
  }
};
