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
  // const url = `${process.env.REACT_APP_BASE_URL}/courses/${courseId}/reviews/${gradeReviewId}`;

  // const tokenNew = localStorage.getItem('token');

  // const response = await axios.get(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-access-token': tokenNew,
  //   },
  // });

  // return response;
  console.log(courseId, gradeReviewId);
  const data = {
    id: 1,
    date: '2020-01-01',
    studentFullName: 'Hà Minh Cường',
    studentId: '18120297',
    assignmentId: 1,
    assignmentName: 'Cột 1',
    currentPoint: '10',
    expectedPoint: '50',
    explanation: 'Em đã làm đủ rồi',
  };

  return data;
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
