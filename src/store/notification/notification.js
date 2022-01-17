import { ADD_NOTIFICATION, SET_NOTIFICATIONS } from './notification-actions';

const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_NOTIFICATIONS:
    return action.payload;
  case ADD_NOTIFICATION:
    return state.concat(action.payload);
  default:
    return state;
  }
};

export default notificationReducer;
