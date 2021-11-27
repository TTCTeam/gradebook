export const PENDING_ACTION = 'PENDING';
export const SUCCESS_ACTION = 'SUCCESS';
export const ERROR_ACTION = 'ERROR';

export function pending() {
  return { type: PENDING_ACTION };
}

export function success() {
  return { type: SUCCESS_ACTION };
}

export function showError(message) {
  return { type: ERROR_ACTION, message };
}
