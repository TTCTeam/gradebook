// import { checkExistCredential } from '../lib/api';
import { pending, showError, success } from '../ui/ui-actions';
// eslint-disable-next-line import/no-cycle
import { runLogoutTimer } from './auth-services';
import { showModal } from '../modal/modal-action';

export const LOGOUT_ACTION = 'LOGOUT';
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';
export const REGISTER_SUCCCESS_ACTION = 'REGISTER_SUCCESS';

export function loginConfirmAction(user) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    user,
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

export function signIn(credentials, history, preLocation) {
  return async (dispatch) => {
    dispatch(pending());
    console.log(credentials);
    // check pass and username from request to BE
    // const data = await checkExistCredential(credentials);
    const url = `${process.env.REACT_APP_BASE_URL}/auth/signin`;

    const cre = `username=${credentials.username}&password=${credentials.password}`;
    const response = await fetch(url, {
      method: 'POST',
      body: cre,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('expirationTime', expirationTime.toISOString());

      runLogoutTimer(dispatch, +data.expiresIn * 1000, history);
      dispatch(loginConfirmAction(data.token));
      dispatch(success());
      if (preLocation) {
        history.replace(preLocation);
      } else {
        history.replace('/');
      }
    } else {
      console.log('ạkfbklhfdbsd');
      dispatch(showError('Your account has not been registered!'));
    }
  };
}

export function signUp(credentials, history, preLocation) {
  return async (dispatch) => {
    dispatch(pending());
    console.log(credentials);
    // post account to BE
    // recieve response data below

    const url = `${process.env.REACT_APP_BASE_URL}/auth/signup`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status } = response;

    const data = await response.json();
    console.log(response);
    console.log(data);

    if (status === 200) {
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('expirationTime', expirationTime.toISOString());

      runLogoutTimer(dispatch, +data.expiresIn * 1000, history);
      dispatch(loginConfirmAction(data.token));
      dispatch(success());
      if (preLocation) {
        history.replace(preLocation);
      } else {
        history.replace('/');
      }
    } else {
      dispatch(showModal(data.message));
    }
    dispatch(success());
  };
}

export function signInByGoogle(idToken, history, preLocation) {
  return async (dispatch) => {
    dispatch(pending());

    // check pass and username from request to BE
    // const data = await checkExistCredential(credentials);
    const url = `${process.env.REACT_APP_BASE_URL}/auth/signin_google`;

    const respone = await fetch(url, {
      method: 'POST',
      headers: {
        'x-goog-iap-jwt-assertion': idToken,
      },
    });

    console.log(respone, 'google login respone');

    const data = await respone.json();
    console.log(data, 'data response');

    if (!respone.ok) {
      dispatch(showModal(data.message));
      dispatch(success());
    } else {
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('expirationTime', expirationTime.toISOString());

      runLogoutTimer(dispatch, +data.expiresIn * 1000, history);
      dispatch(loginConfirmAction(data));
      dispatch(success());
      if (preLocation) {
        history.replace(preLocation);
      } else {
        history.replace('/');
      }
    }
  };
}
