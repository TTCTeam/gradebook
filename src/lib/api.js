require('dotenv').config();

export async function getAllCourse() {
  const url = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_COURSES}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch courses.');
  }

  return data;
}

export async function addCourse(newCourse) {
  const url = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_NEWCOURSE}`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newCourse),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

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
    },
  });
  const data = await response.json();
  return data;
}
