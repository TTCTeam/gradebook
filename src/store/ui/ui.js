import { PENDING_ACTION, SUCCESS_ACTION, ERROR_ACTION } from './ui-actions';

const initialState = { request: null, message: null };

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
  case PENDING_ACTION:
    console.log('request is pending');
    return {
      ...state,
      request: 'pending',
    };
  case SUCCESS_ACTION:
    console.log('request is success');
    return {
      ...state,
      request: 'success',
    };
  case ERROR_ACTION:
    console.log('Request is failed.!');
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
