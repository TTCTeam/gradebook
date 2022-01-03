import { LOGIN_SUCCESS_ACTION, FETCH_PROFILE_ACTION, RETRIEVE_TOKEN_ACTION } from './auth-actions';

const initialState = {
  email: null,
  firstname: null,
  lastname: null,
  username: null,
  userId: null,
  token: null,
  status: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS_ACTION:
    return {
      ...state,
      token: action.user.token,
      email: action.user.email,
      firstname: action.user.firstname,
      lastname: action.user.lastname,
      username: action.user.username,
      userId: action.user.id,
      status: action.user.status,
    };
  case FETCH_PROFILE_ACTION:
    return {
      ...state,
      email: action.user.email,
      firstname: action.user.firstname,
      lastname: action.user.lastname,
      username: action.user.username,
      userId: action.user.id,
      status: action.user.status,
    };
  case RETRIEVE_TOKEN_ACTION:
    return {
      ...state,
      token: action.token,
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
