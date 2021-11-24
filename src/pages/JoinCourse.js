import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { baseAxios } from '../lib/api';

function JoinCourse() {
  const { id } = useParams();
  const { search } = useLocation();
  const history = useHistory();

  const query = new URLSearchParams(search);
  console.log(query);
  useEffect(async () => {
    const res = await baseAxios.get(`${process.env.REACT_APP_BASE_URL}/courses/${id}/join?${query}`);
    if (res.status === 200) {
      history.replace(`/courses/${id}`);
    }
  }, []);

  return (
    <div>Joining...</div>
  );
}

export default JoinCourse;
