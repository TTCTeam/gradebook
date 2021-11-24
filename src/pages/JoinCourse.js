import { useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation, useParams } from 'react-router-dom';

function JoinCourse() {
  const { id } = useParams();
  const { search } = useLocation();
  const history = useHistory();

  const query = new URLSearchParams(search);
  console.log(query);
  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${id}/join?${query}`);
    if (res.status === 200) {
      history.replace(`/courses/${id}`);
    }
  }, []);

  return (
    <div>Joining...</div>
  );
}

export default JoinCourse;
