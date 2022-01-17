import axios from 'axios';

require('dotenv').config();

// eslint-disable-next-line import/prefer-default-export
export async function getNotifications() {
  const url = `${process.env.REACT_APP_BASE_URL}/user/notifications`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}
