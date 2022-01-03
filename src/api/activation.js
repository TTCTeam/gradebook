import axios from 'axios';

export async function resendActivateEmail() {
  const url = `${process.env.REACT_APP_BASE_URL}/user/activate`;
  const token = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response.status;
}

export async function activeAccountAPI(query) {
  const token = localStorage.getItem('token');
  const url = `${process.env.REACT_APP_BASE_URL}/user/activate${query}`;
  const res = await axios.post(url, {}, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return res.status;
}
