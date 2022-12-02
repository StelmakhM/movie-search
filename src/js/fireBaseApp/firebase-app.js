import { initializeApp } from 'firebase/app';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  showLoginError,
  hideLoginError,
  resetFform,
  hideFormLoginRegister,
  showFormLoginRegister,
  showRegisterError,
  hideRegisterError,
} from '../registration-form';

import refs from '../refs';

// import { openHomePage } from '.';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuQ3Z4Z3kA0AyS-7y5txnfbaFVNd8hSRE',
  authDomain: 'cinema-9adf7.firebaseapp.com',
  databaseURL: 'https://cinema-9adf7-default-rtdb.firebaseio.com',
  projectId: 'cinema-9adf7',
  storageBucket: 'cinema-9adf7.appspot.com',
  messagingSenderId: '585812537809',
  appId: '1:585812537809:web:9ec0360e35a04f027f30f0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create new account using email/password
const createAccount = async (displayName, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName,
    });
    hideRegisterError();
    resetFform();
    hideFormLoginRegister();
  } catch (error) {
    console.dir(error);
    showRegisterError(error);
  }
};

// Login using email/password
const loginEmailPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    hideLoginError();
    resetFform();
    hideFormLoginRegister();
  } catch (error) {
    showLoginError(error);
  }
};

// Log out
const logout = async () => {
  try {
    await signOut(auth);
    showFormLoginRegister();
    openHomePage();
  } catch (error) {}
};

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      refs.loginUser.innerHTML = '';
      refs.btnLoginHeader.style.display = 'none';
      refs.userMenu.style.display = 'flex';
      refs.firstLetter.innerHTML = user.displayName.slice(0, 1);
      refs.userMenuName.innerHTML = user.displayName.toUpperCase();
    } else {
      refs.loginUser.innerHTML = `Click to login`;
      refs.btnLoginHeader.style.display = 'block';
      refs.userMenu.style.display = 'none';
      refs.userMenu.classList.remove('active-user-menu');
    }
  });
};

refs.registerFormSignIn.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  loginEmailPassword(email, password);
});

refs.registerFormSignUp.addEventListener('submit', e => {
  e.preventDefault();
  const displayName = e.target.name.value.trim();
  const email = e.target.email.value;
  const password = e.target.password.value;
  if (!validateEmail(email)) {
    const error = { message: 'No validate email' };
    showRegisterError(error);
  } else if (!displayName) {
    const error = { message: 'No validate Name' };
    showRegisterError(error);
  } else {
    createAccount(displayName, email, password);
  }
});

refs.btnLogoutHeader.addEventListener('click', logout);
refs.btnLoginHeader.addEventListener('click', showFormLoginRegister);

monitorAuthState();

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
