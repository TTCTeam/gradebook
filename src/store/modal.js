import { CLOSE_MODAL, SHOW_MODAL } from './modal-action';

const initialState = { message: null, isShown: false };

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
  case SHOW_MODAL:
    return {
      ...state,
      message: action.message,
      isShown: true,
    };
  case CLOSE_MODAL:
    return initialState;
  default:
    return initialState;
  }
};

export default modalReducer;
