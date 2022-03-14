export async function sendChangePasswordEmail(email) {
  const url = `${process.env.REACT_APP_BASE_URL}/auth/change-password`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },

  });

  return response.status;
}

export async function submitNewPassword({ userId, passwordId, password }) {
  const url = `${process.env.REACT_APP_BASE_URL}/auth/${userId}?passwordId=${passwordId}`;

  const cre = `password=${password}`;
  const res = await fetch(url, {
    /*     mode: 'no-cors', */
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: cre,

  });

  return res.status;
}
