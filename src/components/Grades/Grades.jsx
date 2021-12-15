/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from 'react';
import './Grades.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { getAllAssignment } from '../../api/assignmentAPI';
import { sortByField } from '../../utils/common';
import GradeTitle from './GradeTitle/GradeTitle';
import PointBox from './PointBox/PointBox';

const students = [
  {
    id: 1,
    name: 'Ha Minh Cuong',
    points: [
      {
        assignmentId: 1,
        point: 90,
      },
      {
        assignmentId: 2,
        point: 80,
      },
      {
        assignmentId: 3,
        point: 100,
      },
    ],
  },
  {
    id: 2,
    name: 'Nguyen Van A',
    points: [
      {
        assignmentId: 1,
        point: 100,
      },
      {
        assignmentId: 2,
        point: 80,
      },
      {
        assignmentId: 3,
        point: 90,
      },
    ],
  },
  {
    id: 3,
    name: 'Nguyen Van B',
    points: [
      {
        assignmentId: 1,
        point: 100,
      },
      {
        assignmentId: 2,
        point: 70,
      },
      {
        assignmentId: 3,
        point: 50,
      },
    ],
  },
  {
    id: 4,
    name: 'Huỳnh Hồ Thanh Trà',
    points: [
      {
        assignmentId: 1,
        point: 100,
      },
      {
        assignmentId: 2,
        point: 70,
      },
      {
        assignmentId: 3,
        point: 50,
      },
    ],
  },
];

export default function Grades() {
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

    fetchAssignments(id);
  }, []);

  return (
    <div className="grades">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div className="gradesboard">
        <div className="gradesboard__titles">
          <GradeTitle
            className="title"
            name="Student ID"
            width={150}
            isID={true}
          />
          <GradeTitle className="title" name="Name" width={260} />
          {sortByField(assignments, 'order').map((assignment) => (
            <GradeTitle
              key={assignment.id}
              className="title"
              name={assignment.name}
              point={assignment.point}
              assignmentId={assignment.id}
              width={170}
            />
          ))}
          <GradeTitle className="title" name="Tổng kết" width={170} />
        </div>

        {students.map((student) => (
          <div key={student.id} className="gradesboard__row">
            <PointBox
              className="title"
              content={student.id}
              width={150}
              isID={true}
            />
            <PointBox
              isName={true}
              className="title"
              content={student.name}
              width={260}
            />
            {student.points.map((point) => (
              <PointBox
                studentId={student.id}
                key={point.assignmentId}
                className="title"
                content={point.point}
                width={170}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
