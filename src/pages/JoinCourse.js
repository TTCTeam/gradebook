import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function JoinCourse() {
  const { id } = useParams();
  const { search } = useLocation();
  const history = useHistory();

  const query = new URLSearchParams(search);
  console.log(query);
  useEffect(async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${id}/join?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    if (res.status === 200) {
      history.replace(`/courses/${id}`);
    }
  }, []);

  return (
    <div>Joining...</div>
  );
}

export default JoinCourse;
