import React, { Fragment, useCallback, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import CoursesList from "../components/courses/CoursesList";
import useHttp from "../hooks/use-http";

import NotFound from "./NotFound";
import { getAllCourse } from "../lib/api";

const AllCourses = (props) => {
  const {
    data: loadedCourses,
    error,
    status,
    sendRequest:fetchData,
  } = useHttp(getAllCourse, true);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  const addedCourseHandler =useCallback(()=>{
    fetchData();
  },[fetchData])
  
  if (status === "pending") {
    return <CircularProgress color="inherit" />;
  }
  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (
    status === "completed" &&
    !(loadedCourses || loadedCourses.length === 0)
  ) {
    return <NotFound />;
  }
  return (
    <Fragment>
      <Typography gutterBottom variant="h4" component="div" fontWeight="500">
        All Courses
      </Typography>
      <CoursesList courses={loadedCourses} onAddedCourse={addedCourseHandler}/>
    </Fragment>
  );
};

export default AllCourses;
