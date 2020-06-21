import { loginUser, createUser } from '../../../common/index';

let email = '';
let password = '';

function getSign() {
  if (document.getElementById('signin').checked) {
    loginUser({ email: `${email}`, password: `${password}` });
  }
  if (document.getElementById('signup').checked) {
    createUser({ email: `${email}`, password: `${password}` });
  }
}
export default function formHandling() {
  document.getElementById('authorization').addEventListener('submit', (event) => {
    event.preventDefault();
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    getSign();
  });
}
