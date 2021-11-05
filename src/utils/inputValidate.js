export const emailValidate = (email) => {
    return email.includes('@');
}

export const passwordValidate = (password) => {
    return password.length >= 8;
}

export const nameValidate = (name) => {
    return name.trim() !== "";
}