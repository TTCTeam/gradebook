import React from 'react';
import { Grid, Fab } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CourseItem from './CourseItem';
import BasicModal from '../layouts/BasicModal';
import CourseForm from './CourseForm';

const fabStyle = {
  position: 'absolute',
  top: 75,
  right: 20,
};

const CoursesList = ({ onAddedCourse, courses }) => {
  const macth = useRouteMatch();
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <div className="CourseList">
      <Grid container spacing={3} alignItems="stretch">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
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
    </div>
  );
};

export default CoursesList;
