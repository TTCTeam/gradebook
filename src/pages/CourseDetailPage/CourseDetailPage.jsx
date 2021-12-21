/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { useParams } from 'react-router-dom';
import './CourseDetailPage.css';
import StudentGradeBoard from '../../components/StudentGradeboard/StudentGradeboard';
import Stream from '../../components/Stream/Stream';
import People from '../../components/People/People';
import { getCourse, getLecturers, getStudents } from '../../api/courseAPI';
import Grades from '../../components/Grades/Grades';
import MemberRoles from '../../constant/course';

export default function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [value, setValue] = useState('stream');
  const [listStudent, setListStudent] = useState([]);
  const [listLecturer, setListLecturer] = useState([]);
  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      const res = await getCourse(courseId);
      console.log(res.data);
      setCourse(res.data);
    };
    const fetchStudents = async (courseId) => {
      const res = await getStudents(courseId);
      setListStudent(res.data);
    };
    const fetchLecturers = async (courseId) => {
      const res = await getLecturers(courseId);
      setListLecturer(res.data);
    };

    fetchCourse(id);
    fetchStudents(id);
    fetchLecturers(id);
  }, []);

  return (
    <div className="CourseDetailPage">
      <Box
        className="CourseDetailPageTop"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <TabContext className="tabContext" value={value}>
          <TabList className="tabList" onChange={handleChange}>
            <Tab className="tab" label="Stream" value="stream" />
            <Tab className="tab" label="People" value="people" />
            <Tab className="tab" label="Grades" value="grades" />
          </TabList>
        </TabContext>
      </Box>

      <div className="subPage">
        {value === 'stream' && <Stream classroom={course} />}
        {value === 'people' && (
          <People
            classroom={course}
            listStudent={listStudent}
            listLecturer={listLecturer}
          />
        )}

        {value === 'grades' &&
          (course.role === MemberRoles.STUDENT ? (
            <StudentGradeBoard course={course} />
          ) : (
            <Grades course={course} />
          ))}
      </div>
    </div>
  );
}
