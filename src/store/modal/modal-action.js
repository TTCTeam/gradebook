export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function showModal(message) {
  return { type: SHOW_MODAL, message };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}
