import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GradeReviewList.css';
import { getCourse } from '../../api/courseAPI';

export default function GradeReviewList() {
  const [course, setCourse] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      const res = await getCourse(courseId);
      setCourse(res.data);
    };

    fetchCourse(id);
  }, []);
  console.log(course);
  return (
    <div className="grade-review-list">
      <div className="container">List</div>
    </div>
  );
}
