import { PENDING_ACTION, SUCCESS_ACTION } from './ui-actions';

const initialState = { request: null };

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
  case 'ERROR':
    console.log('Request is failed.!');
    return {
      ...state,
      request: 'error',
    };
  default:
    return { ...state };
  }
};

export default uiReducer;
