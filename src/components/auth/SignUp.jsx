import React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import {
  emailValidate,
  nameValidate,
  passwordValidate,
} from '../../utils/inputValidate';
import { signUp } from '../../store/auth-actions';
import GoogleSign from './GoogleSignin';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ui = useSelector((state) => state.ui);

  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    valueHasError: firstNameHasError,
    onChangeHandler: firstNameOnChangeHandler,
    onBlurHandler: firstNameOnBlurHandler,
  } = useInput(nameValidate);

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    valueHasError: lastNameHasError,
    onChangeHandler: lastNameOnChangeHandler,
    onBlurHandler: lastNameOnBlurHandler,
  } = useInput(nameValidate);

  const {
    value: email,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    onChangeHandler: emailOnChangeHandler,
    onBlurHandler: emailOnBlurHandler,
  } = useInput(emailValidate);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    valueHasError: passwordHasError,
    onChangeHandler: passwordOnChangeHandler,
    onBlurHandler: passwordOnBlurHandler,
  } = useInput(passwordValidate);

  const {
    value: studentID,
    valueIsValid: studentIDIsValid,
    valueHasError: studentIDHasError,
    onChangeHandler: studentIDOnChangeHandler,
    onBlurHandler: studentIDOnBlurHandler,
  } = useInput(nameValidate);

  const formIsValid = firstNameIsValid && lastNameIsValid
  && emailIsValid && passwordIsValid && studentIDIsValid;

  const submitHandler = () => {
    if (formIsValid) {
      dispatch(signUp({
        lastname: lastName,
        firstname: firstName,
        password,
        email,
        username: studentID,
      }, history));
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6}>
        <img
          src="/hcmus2.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="brand"
        />
      </Grid>
      <Grid item container xs={12} sm={6} spacing={2}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="center">
            <img src="/Elearning.png" width="75%" alt="logo" />
          </Grid>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ m: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameHasError}
                  onBlur={firstNameOnBlurHandler}
                  onChange={firstNameOnChangeHandler}
                  value={firstName}
                  helperText={
                    firstNameHasError
                      ? 'Fistname must not be empty and include \'@\''
                      : ''
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  error={lastNameHasError}
                  onBlur={lastNameOnBlurHandler}
                  onChange={lastNameOnChangeHandler}
                  value={lastName}
                  helperText={
                    lastNameHasError
                      ? 'Lastname must not be empty and include \'@\''
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  error={emailHasError}
                  onBlur={emailOnBlurHandler}
                  onChange={emailOnChangeHandler}
                  value={email}
                  helperText={emailHasError ? 'Email must hace "@".' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordHasError}
                  onBlur={passwordOnBlurHandler}
                  onChange={passwordOnChangeHandler}
                  value={password}
                  helperText={
                    passwordHasError
                      ? 'Pass must has more than 8 characters.'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="studentId"
                  label="StudentID"
                  type="number"
                  id="studentId"
                  autoComplete="studentId"
                  error={studentIDHasError}
                  onBlur={studentIDOnBlurHandler}
                  onChange={studentIDOnChangeHandler}
                  value={studentID}
                  helperText={
                    studentIDHasError
                      ? 'StudentID must not empty'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree with HCMUS's policy."
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                  '& > :not(style)': { m: 2 },
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={submitHandler}
                    variant="contained"
                    sx={{
                      maxHeight: 80,
                      borderRadius: 4,
                      height: 50,
                      fontSize: 20,
                      textTransform: 'none',
                      width: 200,
                    }}

                  >
                    {ui.request === 'pending' ? <CircularProgress color="inherit" /> : 'Sign Up'}
                  </Button>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to="/signin">
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>

                <Divider>
                  <Typography
                    gutterBottom
                    variant="h7"
                    component="div"
                    sx={{ opacity: 0.7, fontWeight: 400, marginBottom: '-7px' }}
                  >
                    Or With
                  </Typography>
                </Divider>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    '& > :not(style)': { m: 2 },
                  }}
                >
                  <Grid item>
                    <GoogleSign username={studentID} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
