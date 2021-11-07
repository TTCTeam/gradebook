export const emailValidate = (email) => email.includes('@');

export const passwordValidate = (password) => password.length >= 8;

export const nameValidate = (name) => name.trim() !== '';
