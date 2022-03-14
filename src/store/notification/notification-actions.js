export const SET_NOTIFICATIONS = 'notification/setNotifications';
export const ADD_NOTIFICATION = 'notification/addNotification';

export function setNotifications(notifications) {
  return { type: SET_NOTIFICATIONS, payload: notifications };
}

export function addNotification(notification) {
  return { type: ADD_NOTIFICATION, payload: notification };
}
