import { pending, showError, success } from '../ui/ui-actions';
// eslint-disable-next-line import/no-cycle
import { runLogoutTimer } from './auth-services';
import { showModal } from '../modal/modal-action';
import { arrivedStartLocation } from '../location/loc-actions';

export const LOGOUT_ACTION = 'LOGOUT';
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';
export const FETCH_PROFILE_ACTION = 'FETCH_PROFILE_ACTION';
export const RETRIEVE_TOKEN_ACTION = 'RETRIEVE_TOKEN_ACTION';

export function retrieveTokenAction(token) {
  return {
    type: RETRIEVE_TOKEN_ACTION,
    token,
  };
}

export function loginConfirmAction(user) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    user,
  };
}

export function fetchProfileInfo(user) {
  return {
    type: FETCH_PROFILE_ACTION,
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

    const url = `${process.env.REACT_APP_BASE_URL}/auth/signin`;

    const cre = `username=${credentials.username}&password=${credentials.password}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: cre,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000,
        );
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationTime', expirationTime.toISOString());

        runLogoutTimer(dispatch, +data.expiresIn * 1000, history);
        dispatch(loginConfirmAction(data));
        dispatch(success());
        if (preLocation) {
          dispatch(arrivedStartLocation());
          history.replace(preLocation);
        } else {
          history.replace('/');
        }
      } else {
        dispatch(showError('Your account has not been registered! If you did please contact admin.'));
      }
    } catch (error) {
      dispatch(showError('Can not connect to server. Please try again later.'));
    }
  };
}

export function signUp(credentials, history, preLocation) {
  return async (dispatch) => {
    dispatch(pending());

    // post account to BE
    // recieve response data below

    const url = `${process.env.REACT_APP_BASE_URL}/auth/signup`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { status } = response;

      const data = await response.json();

      if (status === 200) {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000,
        );

        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationTime', expirationTime.toISOString());

        runLogoutTimer(dispatch, +data.expiresIn * 1000, history);
        dispatch(loginConfirmAction(data));
        dispatch(success());
        if (preLocation) {
          dispatch(arrivedStartLocation());
          history.replace(preLocation);
        } else {
          history.replace('/');
        }
      } else {
        dispatch(showModal(data.message));
      }
      dispatch(success());
    } catch (error) {
      dispatch(showError('Can not connect to server. Please try again later.'));
    }
  };
}

export function signInByGoogle(idToken, history, preLocation) {
  return async (dispatch) => {
    dispatch(pending());

    const url = `${process.env.REACT_APP_BASE_URL}/auth/signin_google`;

    try {
      const respone = await fetch(url, {
        method: 'POST',
        headers: {
          'x-goog-iap-jwt-assertion': idToken,
        },
      });

      const data = await respone.json();

      if (!respone.ok) {
        dispatch(success());
        dispatch(showError(data.message ? data.message : 'Your account has not been registered! If you did please contact admin.'));
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
          dispatch(arrivedStartLocation());
          history.replace(preLocation);
        } else {
          history.replace('/');
        }
      }
    } catch (error) {
      dispatch(showError('Can not connect to server. Please try again later.'));
    }
  };
}

export function getUserProfile() {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/user`;
    const tokenNew = localStorage.getItem('token');
    try {
      if (tokenNew) {
        dispatch(pending());
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': tokenNew,
          },
        });

        const data = await response.json();
        if (response.ok) {
          dispatch(fetchProfileInfo(data));
        } else {
          dispatch(showError(data.message));
        }
      }
      dispatch(success());
    } catch (error) {
      dispatch(showError('Can not connect to server. Please try again later.'));
    }
  };
}

export function updateUserProfile(userInfo) {
  return async (dispatch) => {
    dispatch(pending());
    const url = `${process.env.REACT_APP_BASE_URL}/user`;

    try {
      const tokenNew = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': tokenNew,
        },
      });

      if (response.ok) {
        dispatch(fetchProfileInfo(userInfo));
        dispatch(success());
      } else {
        const data = await response.json();
        dispatch(showError(data.message));
      }
    } catch (error) {
      dispatch(showError('Can not connect to server. Please try again later.'));
    }
  };
}
