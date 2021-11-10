export const PENDING_ACTION = 'PENDING';
export const SUCCESS_ACTION = 'SUCCESS';

export function pending() {
  return { type: PENDING_ACTION };
}

export function success() {
  return { type: SUCCESS_ACTION };
}
