import { ADD_NOTIFICATION, SET_NOTIFICATIONS } from './notification-actions';
import { sortReverseByField } from '../../utils/common';

const initialState = [];

const notificationReducer = (state = initialState, action) => {
  let notifications;
  switch (action.type) {
  case SET_NOTIFICATIONS:
    notifications = state.concat(action.payload);
    sortReverseByField(notifications, 'id');
    return notifications;
  case ADD_NOTIFICATION:
    notifications = state.concat(action.payload);
    sortReverseByField(notifications, 'id');
    return notifications;
  default:
    return state;
  }
};

export default notificationReducer;
