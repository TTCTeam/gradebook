/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getAllAssignment,
  getAllAssignmentByUser,
} from '../../api/assignmentAPI';
import './StudentGradeboard.css';
import Row from './Row';

export default function StudentGradeBoard() {
  const [student, setStudent] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAssignments = async (courseId) => {
      setIsLoading(true);
      const res = await getAllAssignment(courseId);
      if (res.status === 200) {
        setAssignments(res.data);
      }
      setIsLoading(false);
    };

    const fetchStudent = async (courseId) => {
      setIsLoading(true);
      const res = await getAllAssignmentByUser(courseId);
      if (res.status === 200) {
        setStudent(res.data);
      }
      setIsLoading(false);
    };

    fetchAssignments(id);
    fetchStudent(id);
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

      {student?.map((assignment) => (
        <Row
          key={assignment.assignmentId}
          assignment={assignment}
          assignments={assignments}
        />
      ))}
    </div>
  );
}
