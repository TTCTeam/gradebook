import React from 'react';
import { Grid, Fab } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CourseItem from './CourseItem';
import BasicModal from '../layouts/BasicModal';
import CourseForm from './CourseForm';

const fabStyle = {
  position: 'absolute',
  bottom: 50,
  right: 16,
};

const CoursesList = ({ onAddedCourse, courses }) => {
  const macth = useRouteMatch();
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <>

      <Grid
        container
        spacing={{ xs: 2, md: 6 }}
        columns={{ xs: 2, sm: 8, md: 10 }}

      >
        {courses.map((course) => (
          <Grid item xs={2} sm={4} md={2} key={course.id}>
            <Link to={`${macth.path}/${course.id}`}>
              <CourseItem course={course} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Fab
        sx={{ ...fabStyle }}
        aria-label="Add Course"
        color="primary"
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Fab>
      <BasicModal open={openModal} handleClose={handleCloseModal}>
        <CourseForm onAddedCourse={onAddedCourse} />
      </BasicModal>
    </>
  );
};

export default CoursesList;
