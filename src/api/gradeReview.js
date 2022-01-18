import axios from 'axios';

require('dotenv').config();

export async function getAllGradeReview(courseId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/reviews`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}

export async function getGradeReview(courseId, gradeReviewId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/reviews/${gradeReviewId}`;

  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}

export async function createGradeReview(courseId, gradeReview) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/reviews`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.post(url, gradeReview, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}

export async function getAllComment(courseId, gradeReviewId) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/reviews/${gradeReviewId}/comments`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}

export async function createComment(courseId, gradeReviewId, comment) {
  const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/reviews/${gradeReviewId}/comments`;
  const tokenNew = localStorage.getItem('token');

  const response = await axios.post(url, comment, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenNew,
    },
  });

  return response;
}
