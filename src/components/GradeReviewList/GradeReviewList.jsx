import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GradeReviewList.css';
import monent from 'moment';
import { getCourse } from '../../api/courseAPI';
import { getAllGradeReview } from '../../api/gradeReview';
import { sortReverseByField } from '../../utils/common';

export default function GradeReviewList() {
  const [classroom, setClassroom] = useState({});
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  const { course } = classroom;
  console.log(reviews);

  useEffect(() => {
    const fetchClassroom = async (courseId) => {
      const res = await getCourse(courseId);
      setClassroom(res.data);
    };
    const fetchReviews = async (courseId) => {
      const res = await getAllGradeReview(courseId);
      setReviews(res.data);
    };
    fetchReviews(id);
    fetchClassroom(id);
  }, []);

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
          {sortReverseByField(reviews, 'id').map((review) => (
            <div key={review.id}>
              <Link
                className="link review-item"
                to={`/courses/${id}/grade-review/${review.id}`}
              >
                <h3>{`${review.student.studentId} - ${review.student.fullname} - ${review.assignment.name}`}</h3>
                <div>{monent(review.createdAt).format('DD/MM/YYYY')}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
