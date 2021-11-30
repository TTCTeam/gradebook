import axios from 'axios';

require('dotenv').config();

export async function getAllAssignment(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/assignments`;
  console.log(url);
  const token = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function createAssignment(courseId, newAssignment) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/assignments`;
  const token = localStorage.getItem('token');

  const response = await axios.post(url, newAssignment, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function updateAssignment(courseId, assignmentId, newAssignment) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/assignments/${assignmentId}`;
  const token = localStorage.getItem('token');

  const response = await axios.put(url, newAssignment, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function deleteAssignment(courseId, assignmentId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/assignments/${assignmentId}`;
  const token = localStorage.getItem('token');

  const response = await axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}

export async function reorderAssignment(courseId, assignments) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/assignments`;
  const token = localStorage.getItem('token');

  const response = await axios.put(url, assignments, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
}
