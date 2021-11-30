/* eslint-disable import/no-cycle */
import { retrieveStoredToken } from '../../utils/calc';
import { loginConfirmAction, signOut } from './auth-actions';

let logoutTimer;

export function runLogoutTimer(dispatch, timer, history) {
  logoutTimer = setTimeout(() => {
    dispatch(signOut(history));
  }, timer);
}
export function checkAutoLogin(dispatch, history, location) {
  const tokenData = retrieveStoredToken();
  if (tokenData) {
    const user = {};
    user.token = tokenData.token;
    dispatch(loginConfirmAction(user));
    runLogoutTimer(dispatch, tokenData.duration, history);
    history.replace(location.pathname + location.search);
  }
}

export function logoutHandlerAction(dispatch, history) {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  dispatch(signOut(history));
}
