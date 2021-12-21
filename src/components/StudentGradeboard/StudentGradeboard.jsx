/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllAssignment } from '../../api/assignmentAPI';
import './StudentGradeboard.css';

const student = {
  studentId: 1,
  points: [
    {
      assignmentId: 1,
      point: 90,
      status: 1,
    },
    {
      assignmentId: 2,
      point: 80,
      status: 1,
    },
    {
      assignmentId: 3,
      point: 100,
      status: 1,
    },
    {
      assignmentId: 4,
      point: 100,
      status: 1,
    },
  ],
};

export default function StudentGradeBoard() {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  console.log(student, assignments);

  useEffect(() => {
    const fetchAssignments = async (courseId) => {
      setIsLoading(true);
      const res = await getAllAssignment(courseId);
      if (res.status === 200) {
        setAssignments(res.data);
      }
      setIsLoading(false);
    };

    fetchAssignments(id);
  }, []);

  return (
    <div className="student-gradeboard">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div className="header">
        <div className="title">Grade Name</div>
        <div className="title">Grade Point</div>
        <div className="title">Your Point</div>
      </div>
    </div>
  );
}
