import { PENDING_ACTION, SUCCESS_ACTION, ERROR_ACTION } from './ui-actions';

const initialState = { request: null, message: null };

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
  case PENDING_ACTION:
    return {
      ...state,
      request: 'pending',
    };
  case SUCCESS_ACTION:
    return {
      ...state,
      request: 'success',
    };
  case ERROR_ACTION:
    return {
      ...state,
      request: 'error',
      message: action.message,
    };
  default:
    return { ...state };
  }
};

export default uiReducer;
