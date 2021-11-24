import { useEffect, useState } from 'react';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { useParams } from 'react-router-dom';
import './CourseDetailPage.css';
import Stream from '../../components/Stream/Stream';
import People from '../../components/People/People';

export default function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [value, setValue] = useState('stream');
  const { id } = useParams();
  console.log(id);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${courseId}`);
      setCourse(res.data);
      console.log(res.data);
    };

    fetchCourse(id);
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
            <Tab className="tab" label="Grade" value="grade" />
            <Tab className="tab" label="People" value="people" />
          </TabList>
        </TabContext>
      </Box>

      <div className="subPage">
        {value === 'people' && <People course={course} />}
        {value === 'stream' && <Stream course={course} />}
      </div>
    </div>
  );
}
