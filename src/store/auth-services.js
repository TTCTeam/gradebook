import { retrieveStoredToken } from '../utils/calc';
// eslint-disable-next-line import/no-cycle
import { loginConfirmAction, signOut } from './auth-actions';

let logoutTimer;

export function runLogoutTimer(dispatch, timer, history) {
  logoutTimer = setTimeout(() => {
    dispatch(signOut(history));
  }, timer);
}
export function checkAutoLogin(dispatch, history) {
  const tokenData = retrieveStoredToken();
  if (tokenData) {
    dispatch(loginConfirmAction(tokenData.token));
    runLogoutTimer(dispatch, tokenData.duration, history);
    history.replace('/');
  }
}

export function logoutHandlerAction(dispatch, history) {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  dispatch(signOut(history));
}
