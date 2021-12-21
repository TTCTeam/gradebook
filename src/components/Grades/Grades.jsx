/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState, useCallback } from 'react';
import './Grades.css';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import {
  getAllAssignment,
  getGradeBoard,
  uploadAssignmentList,
  uploadStudentList,
} from '../../api/assignmentAPI';
import { sortByField } from '../../utils/common';
import GradeTitle from './GradeTitle/GradeTitle';
import PointBox from './PointBox/PointBox';
import { readCSV, writeCSV } from '../../service/csvFile';

export default function Grades({ course }) {
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  let totalAssignmentPoint = 0;

  const fetchStudents = async (courseId) => {
    setIsLoading(true);
    const res = await getGradeBoard(courseId);
    if (res.status === 200) {
      setStudents(res.data);
    }
    setIsLoading(false);
  };

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
    fetchStudents(id);
  }, []);

  if (assignments.length > 0) {
    totalAssignmentPoint = assignments.reduce((acc, cur) => acc + cur.point, 0);
  }

  const onUploadStudentList = async (data) => {
    const response = await uploadStudentList(id, data);
    fetchStudents(id);
  };

  const generateHandlers = (assignment, courseId, studentsData) => ({
    onImport: async (file) => {
      const data = await readCSV(file, ['studentId', 'point']);
      const response = await uploadAssignmentList(
        assignment.id,
        courseId,
        data
      );
    },
    onExport: async () => {
      const fields = ['Student ID', 'Point'];
      const nameFile = `${courseId}_${assignment.name}.csv`;
      const data = studentsData.map((student) => ({
        studentId: student.studentId,
        point: student.points.find(
          (point) => point.assignmentId === assignment.id
        ).point,
      }));

      writeCSV(nameFile, data, fields);
    },
  });

  const nameHandlers = {
    onImport: async (file) => {
      const data = await readCSV(file, ['studentId', 'fullname']);
      onUploadStudentList(data);
    },
    onExport: async () => {
      const fields = ['Student ID', 'Full Name'];
      const nameFile = `${id}_Students.csv`;
      const data = students.map((student) => ({
        studentId: student.studentId,
        fullName: student.fullname,
      }));

      writeCSV(nameFile, data, fields);
    },
  };

  const exportFullGradeBoard = () => {
    const fields = ['Student ID', 'Full Name'];
    const assignmentNames = assignments.map((assignment) => assignment.name);
    fields.push(...assignmentNames);
    fields.push('Final');
    const nameFile = `${id}_FullGradeBoard.csv`;
    const data = students.map((student) => {
      const studentAssignments = {};
      student.assignments.forEach((assignment) => {
        Object.assign(studentAssignments, {
          [assignment.id]: assignment.point,
        });
      });

      const finalPoint = student.assignments.reduce(
        (acc, cur) => acc + cur.point,
        0
      );
      const object = {
        studentId: student.studentId,
        fullName: student.fullname,
        ...studentAssignments,
        finalPoint,
      };
      console.log(object);
      return object;
    });

    writeCSV(nameFile, data, fields);
  };

  return (
    <div>
      <Button onClick={exportFullGradeBoard} variant="contained">
        Export Full Gradeboard
      </Button>
      <div className="grades">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>

        <div className="gradesboard">
          <div className="gradesboard__titles">
            <GradeTitle course={course} name="Student ID" isID={true} />
            <GradeTitle
              course={course}
              isName={true}
              name="Name"
              handlers={nameHandlers}
            />
            {sortByField(assignments, 'order').map((assignment) => (
              <GradeTitle
                key={assignment.id}
                name={assignment.name}
                assignment={assignment}
                handlers={generateHandlers(assignment, id, students)}
              />
            ))}
            <GradeTitle
              course={course}
              name="Tổng kết"
              point={totalAssignmentPoint}
            />
          </div>

          {students.map((student) => (
            <div key={student.id} className="gradesboard__row">
              <PointBox content={student.id} isID={true} />
              <PointBox isName={true} content={student.fullname} />
              {student.assignments.map((point) => (
                <PointBox
                  studentId={student.id}
                  key={point.assignmentId}
                  content={point.point}
                />
              ))}
              <PointBox
                studentId={student.id}
                content={student.assignments.reduce(
                  (acc, cur) => acc + cur.point,
                  0
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
