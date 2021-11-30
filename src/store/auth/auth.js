import { LOGIN_SUCCESS_ACTION } from './auth-actions';

const initialState = { authError: null, token: null, isLoggedIn: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS_ACTION:
    console.log(action);
    return {
      ...state,
      token: action.user.token,
      isLoggedIn: true,
    };
  case 'LOGIN_ERROR':
    return {
      ...state,
      authError: action.error,
    };
  case 'REGISTER_SUCCESS':
    return {
      ...state,
      token: action.token,
      isLoggedIn: true,
    };
  case 'LOGOUT':
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default authReducer;