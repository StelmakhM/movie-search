import refs from './refs';
import { AuthErrorCodes } from 'firebase/auth';

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
