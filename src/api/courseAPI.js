import axios from 'axios';

require('dotenv').config();

export async function getCourse(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response.data;
}

export async function getStudents(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/students`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response.data;
}

export async function getLecturers(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/lecturers`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response.data;
}
