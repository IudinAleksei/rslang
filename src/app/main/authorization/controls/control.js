import {
  loginUser,
  createUser,
  upsertUserSettings,
  getAndInitLocalData,
  getUserSettings,
  setLocalData,
  setSessionData,
  getSessionData,
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
    loginResponse = await loginUser({
      email: `${email}`,
      password: `${password}`,
    });
    if (loginResponse) {
      setSessionData({
        authorized: JSON.stringify(loginResponse),
      });
      const settingsUser = await getUserSettings(loginResponse.token, loginResponse.userId);
      setLocalData(settingsUser.optional);
    }
    return loginResponse;
  }
  if (document.getElementById('signup').checked) {
    const result = await createUser({
      email: `${email}`,
      password: `${password}`,
    });
    if (result === null) {
      showError();
      return null;
    }
    loginResponse = await loginUser({
      email: `${email}`,
      password: `${password}`,
    });
    if (loginResponse) {
      setSessionData({
        authorized: JSON.stringify(loginResponse),
      });
      localStorage.clear();
      upsertUserSettings(loginResponse.token, loginResponse.userId, {
        optional: getAndInitLocalData(),
      }).then((q) => console.log(q));
    }
  }
  return loginResponse;
}

async function formHandling(nextPageFunction) {
  if (getSessionData().authorized) {
    const loginResponse = JSON.parse(getSessionData().authorized);
    if (loginResponse) {
      nextPageFunction(loginResponse);
    }
  } else {
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
}

function checkAuthorization() {
  return !!getSessionData().authorized;
}

export {
  formHandling,
  checkAuthorization,
};
