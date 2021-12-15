import React, { useCallback, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import CoursesList from '../components/courses/CoursesList';
import useHttp from '../hooks/use-http';

import NotFound from './NotFound';
import { getAllCourse } from '../lib/api';

const AllCourses = () => {
  const {
    data: loadedCourses,
    error,
    status,
    sendRequest: fetchData,
  } = useHttp(getAllCourse, true);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  const addedCourseHandler = useCallback(() => {
    fetchData();
  }, [fetchData]);

  if (status === 'pending') {
    return <CircularProgress color="inherit" />;
  }
  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (
    status === 'completed'
    && !(loadedCourses || loadedCourses.length === 0)
  ) {
    return <NotFound />;
  }
  return (
    <>
      <Typography gutterBottom variant="h4" component="div" fontWeight="500" align="center">
        All Courses
      </Typography>
      <CoursesList courses={loadedCourses} onAddedCourse={addedCourseHandler} />
    </>
  );
};

export default AllCourses;
