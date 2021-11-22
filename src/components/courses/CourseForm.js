import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import {
  TextField,
  Button,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import useInput from '../../hooks/use-input';
import { nameValidate } from '../../utils/inputValidate';
import useHttp from '../../hooks/use-http';
import { addCourse } from '../../lib/api';

const CourseForm = ({ onAddedCourse }) => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    valueHasError: namelHasError,
    onBlurHandler: nameOnBlurHandler,
    onChangeHandler: nameOnChangeHandler,
  } = useInput(nameValidate);

  const {
    value: lecturer,
    valueIsValid: teacherIsValid,
    valueHasError: teacherlHasError,
    onBlurHandler: teacherOnBlurHandler,
    onChangeHandler: teacherOnChangeHandler,
  } = useInput(nameValidate);

  const {
    value: description,
    valueIsValid: desIsValid,
    valueHasError: deslHasError,
    onBlurHandler: desOnBlurHandler,
    onChangeHandler: desOnChangeHandler,
  } = useInput(nameValidate);

  const { status, error, sendRequest } = useHttp(addCourse);

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedCourse();
    }
  }, [status, error, onAddedCourse]);

  const formIsValid = nameIsValid && teacherIsValid && desIsValid;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    sendRequest({ name, lecturer, coursedes: description });
  };
  const formContent = (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { display: 'flex', flexDirection: 'column', m: 4 },
      }}
      autoComplete="on"
      alignItems="center"
    >
      <TextField
        label="Name"
        color="primary"
        type="name"
        error={namelHasError}
        onBlur={nameOnBlurHandler}
        onChange={nameOnChangeHandler}
        value={name}
        helperText={namelHasError ? 'Name must be not empty.' : ''}
      />
      <TextField
        label="Teacher"
        color="primary"
        type="teacher"
        error={teacherlHasError}
        onBlur={teacherOnBlurHandler}
        onChange={teacherOnChangeHandler}
        value={lecturer}
        helperText={teacherlHasError ? 'Teacher must be not empty.' : ''}
      />
      <TextField
        label="Description"
        color="primary"
        type="description"
        error={deslHasError}
        onBlur={desOnBlurHandler}
        onChange={desOnChangeHandler}
        value={description}
        helperText={deslHasError ? 'Description must be not empty.' : ''}
      />
      <Button
        disabled={!formIsValid}
        onClick={onSubmitHandler}
        variant="contained"
        sx={{ maxWidth: 80 }}
      >
        Create
      </Button>
    </Box>
  );

  return (
    <>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" fontWeight="500">
          NEW COURSE
        </Typography>
      </CardContent>
      {status === 'pending' ? (
        <CircularProgress color="primary" />
      ) : (
        formContent
      )}
    </>
  );
};

export default CourseForm;
