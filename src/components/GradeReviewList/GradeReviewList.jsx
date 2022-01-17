import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GradeReviewList.css';
import monent from 'moment';
import { getCourse } from '../../api/courseAPI';
import MemberRole from '../../constant/course';

const data = [
  {
    id: 1,
    title: 'Review 1',
    date: '2020-01-01',
  },
  {
    id: 2,
    title: 'Review 2',
    date: '2020-01-01',
  },
  {
    id: 3,
    title: 'Review 3',
    date: '2020-01-01',
  },
  {
    id: 4,
    title: 'Review 4',
    date: '2020-01-01',
  },
];

export default function GradeReviewList() {
  const [classroom, setClassroom] = useState({});
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  const { role, course } = classroom;

  useEffect(() => {
    const fetchClassroom = async (courseId) => {
      const res = await getCourse(courseId);
      setClassroom(res.data);
    };

    fetchClassroom(id);
  }, []);

  useEffect(() => {
    if (role === MemberRole.STUDENT) {
      console.log('Lấy list của học sinh');
      setReviews(data);
    } else if (role === MemberRole.LECTURER || role === MemberRole.OWNER) {
      console.log('Lấy list của giáo viên');
      setReviews(data);
    }
  }, [role]);

  return (
    <div className="grade-review-list">
      <div className="container">
        <div className="title">
          <Link className="link" to={`/courses/${id}`}>
            {`Back to ${course?.name}`}
          </Link>
          <h2>List Grade Review</h2>
        </div>

        <div className="list">
          {reviews.map((review) => (
            <div key={review.id}>
              <Link
                className="link review-item"
                to={`/courses/${id}/grade-review/${review.id}`}
              >
                <h3>{review.title}</h3>
                <div>{monent(review.date).format('DD/MM/YYYY')}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
