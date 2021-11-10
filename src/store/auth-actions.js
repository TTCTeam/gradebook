// import { checkExistCredential } from '../lib/api';
import { pending, success } from './ui-actions';
// eslint-disable-next-line import/no-cycle
import { runLogoutTimer } from './auth-services';

export const LOGOUT_ACTION = 'LOGOUT';
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';
export const REGISTER_SUCCCESS_ACTION = 'REGISTER_SUCCESS';

export function loginConfirmAction(token) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    token: token || 'SSDFGHJU6TRDSAQWSDFVBGYUJHBGF',
  };
}

export function signOut(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    history.replace('/signin');
    dispatch({ type: 'LOGOUT' });
  };
}

export function signIn(credentials, history) {
  return async (dispatch) => {
    dispatch(pending());
    console.log(credentials);
    // check pass and username from request to BE
    // const data = await checkExistCredential(credentials);
    const data = { token: 'SSDFGHJU6TRDSAQWSDFVBGYUJHBGF', expiresIn: '6000' };
    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000,
    );

    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationTime', expirationTime.toISOString());

    setTimeout(() => {
      runLogoutTimer(dispatch, 5000, history);
      dispatch(loginConfirmAction(data.token));
      dispatch(success());
      history.replace('/');
    }, 1000);
  };
}

export function signUp(credentials, history) {
  return (dispatch) => {
    dispatch(pending());
    console.log(credentials);
    // post account to BE
    // recieve response data below
    const data = { token: 'SSDFGHJU6TRDSAQWSDFVBGYUJHBGF', expiresIn: '6000' };
    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000,
    );

    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationTime', expirationTime.toISOString());
    setTimeout(() => {
      runLogoutTimer(dispatch, 5000, history);
      dispatch(loginConfirmAction(data.token));
      dispatch(success());
      history.replace('/');
    }, 1000);
  };
}
