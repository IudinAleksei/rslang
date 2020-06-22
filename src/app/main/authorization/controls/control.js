import { loginUser, createUser } from '../../../common/index';

function showError() {
  const errors = document.createElement('div');
  errors.className = 'error';
  errors.innerHTML = '<p class="error-massage">Failed to register</p>';
  document.querySelector('body').append(errors);
  setTimeout(() => {
    document.querySelector('body').lastElementChild.remove();
  }, 4000);
}

function getSign(email, password) {
  if (document.getElementById('signin').checked) {
    loginUser({ email: `${email}`, password: `${password}` }).then((data) => data.token);
  }
  if (document.getElementById('signup').checked) {
    createUser({ email: `${email}`, password: `${password}` }).then((data) => {
      if (data === null) {
        showError();
      } else {
        loginUser({ email: `${email}`, password: `${password}` }).then((result) => result.token);
      }
    });
  }
}
export default function formHandling() {
  document.getElementById('authorization').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    getSign(email, password);
  });
}
