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
    valueHasError: nameHasError,
    onBlurHandler: nameOnBlurHandler,
    onChangeHandler: nameOnChangeHandler,
  } = useInput(nameValidate);

  const {
    value: lecturer,
    valueIsValid: lecturerIsValid,
    valueHasError: lecturerHasError,
    onBlurHandler: lecturerOnBlurHandler,
    onChangeHandler: lecturerOnChangeHandler,
  } = useInput(nameValidate);

  const {
    value: description,
    valueIsValid: descriptionIsValid,
    valueHasError: descriptionHasError,
    onBlurHandler: descriptionOnBlurHandler,
    onChangeHandler: descriptionOnChangeHandler,
  } = useInput(nameValidate);

  const { status, error, sendRequest } = useHttp(addCourse);

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedCourse();
    }
  }, [status, error, onAddedCourse]);

  const formIsValid = nameIsValid && lecturerIsValid && descriptionIsValid;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    sendRequest({ name, lecturer, description });
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
        error={nameHasError}
        onBlur={nameOnBlurHandler}
        onChange={nameOnChangeHandler}
        value={name}
        helperText={nameHasError ? 'Name must be not empty.' : ''}
      />
      <TextField
        label="Owner"
        color="primary"
        type="teacher"
        error={lecturerHasError}
        onBlur={lecturerOnBlurHandler}
        onChange={lecturerOnChangeHandler}
        value={lecturer}
        helperText={lecturerHasError ? 'Owner must be not empty.' : ''}
      />
      <TextField
        label="Description"
        color="primary"
        type="description"
        error={descriptionHasError}
        onBlur={descriptionOnBlurHandler}
        onChange={descriptionOnChangeHandler}
        value={description}
        helperText={descriptionHasError ? 'Description must be not empty.' : ''}
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
