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

  return response;
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

  return response;
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

  return response;
}

export async function getInvitation(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/invite-link`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}

export async function sendInvitationByEmail(courseId, listEmail, role) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/invite`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.post(
    url,
    {
      emails: listEmail,
      role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': tokenNew,
      },
    },
  );
  return response;
}
