import {
  loginUser, createUser, upsertUserSettings, getAndInitLocalData,
  getUserSettings,
} from '../../../common/index';

function showError() {
  const errors = document.createElement('div');
  errors.className = 'error';
  errors.innerHTML = '<p class="error-massage">Failed to register</p>';
  document.querySelector('body').append(errors);
  setTimeout(() => {
    document.querySelector('body').lastElementChild.remove();
  }, 4000);
}

async function getSign(email, password) {
  let loginResponse = null;
  if (document.getElementById('signin').checked) {
    loginResponse = await loginUser({ email: `${email}`, password: `${password}` });
    return loginResponse;
  }
  if (document.getElementById('signup').checked) {
    const result = createUser({ email: `${email}`, password: `${password}` });
    if (result === null) {
      showError();
      return null;
    }
    loginResponse = await loginUser({ email: `${email}`, password: `${password}` });
    upsertUserSettings(loginResponse.token, loginResponse.userId,
      { optional: getAndInitLocalData() });
  }
  const settingsUser = await getUserSettings(loginResponse.token, loginResponse.userId);
  localStorage.setItem(settingsUser);
  return loginResponse;
}
export default function formHandling(nextPageFunction) {
  document.getElementById('authorization').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginResponse = await getSign(email, password);
    if (loginResponse) {
      nextPageFunction(loginResponse);
    }
  });
}
