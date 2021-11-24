import axios from 'axios';

require('dotenv').config();

const token = localStorage.getItem('token');

export const baseAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': token,
  },
});

export async function getAllCourse() {
  const url = `${process.env.REACT_APP_BASE_URL}/courses`;
  console.log(token);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch courses.');
  }

  return data;
}

export async function addCourse(newCourse) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newCourse),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const data = await response.json();
  console.log(newCourse);
  console.log(response);
  console.log(data);
  /* if (!response.ok) {
          throw new Error(data.message || 'Could not fetch courses.');
      }
      */
  return data;
}

export async function checkExistCredential(credentials) {
  const url = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_NEWCOURSE}`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      returnToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const data = await response.json();
  return data;
}
