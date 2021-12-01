import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { useParams } from 'react-router-dom';
import './CourseDetailPage.css';
import Stream from '../../components/Stream/Stream';
import People from '../../components/People/People';
import { getCourse, getLecturers, getStudents } from '../../api/courseAPI';

export default function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [value, setValue] = useState('stream');
  const [listStudent, setListStudent] = useState([]);
  const [listLecturer, setListLecturer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      const res = await getCourse(courseId);
      setCourse(res.data);
    };
    const fetchStudents = async (courseId) => {
      const res = await getStudents(courseId);
      setListStudent(res.data);
    };
    const fetchLecturers = async (courseId) => {
      const res = await getLecturers(courseId);
      setListLecturer(res.data);
      setIsLoading(false);
    };

    fetchCourse(id);
    fetchStudents(id);
    fetchLecturers(id);
  }, []);

  return (
    <div className="CourseDetailPage">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        className="CourseDetailPageTop"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <TabContext className="tabContext" value={value}>
          <TabList className="tabList" onChange={handleChange}>
            <Tab className="tab" label="Stream" value="stream" />
            <Tab className="tab" label="Grade" value="grade" />
            <Tab className="tab" label="People" value="people" />
          </TabList>
        </TabContext>
      </Box>

      <div className="subPage">
        {value === 'people' && (
          <People
            classroom={course}
            listStudent={listStudent}
            listLecturer={listLecturer}
          />
        )}
        {value === 'stream' && <Stream classroom={course} />}
      </div>
    </div>
  );
}
