import axios from 'axios';

require('dotenv').config();

export async function getAllGrade(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/grades`;
  const token = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function createGrade(courseId, newGrade) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/grades`;
  const token = localStorage.getItem('token');

  const response = await axios.post(url, newGrade, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function updateGrade(courseId, gradeId, newGrade) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/grades/${gradeId}`;
  const token = localStorage.getItem('token');

  const response = await axios.put(url, newGrade, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function deleteGrade(courseId, gradeId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/grades/${gradeId}`;
  const token = localStorage.getItem('token');

  const response = await axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}
