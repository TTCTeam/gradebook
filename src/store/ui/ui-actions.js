export const PENDING_ACTION = 'UI_PENDING';
export const SUCCESS_ACTION = 'UI_SUCCESS';
export const ERROR_ACTION = 'UI_ERROR';

export function pending() {
  return { type: PENDING_ACTION };
}

export function success() {
  return { type: SUCCESS_ACTION };
}

export function showError(message) {
  return { type: ERROR_ACTION, message };
}
