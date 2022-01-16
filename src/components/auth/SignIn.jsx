import React from 'react';
import { /* Redirect, */ useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { Box } from '@mui/system';
import useInput from '../../hooks/use-input';
import { nameValidate, passwordValidate } from '../../utils/inputValidate';
import { signIn } from '../../store/auth/auth-actions';
import GoogleSignin from './GoogleSignin';
import classes from './SignIn.module.css';
import useHttp from '../../hooks/use-http';
import { sendChangePasswordEmail } from '../../api/password';
import { showModal } from '../../store/modal/modal-action';

const SignIn = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const preLocation = useSelector((state) => state.location.location);
  // const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const {
    value: email,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
  } = useInput(nameValidate);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    valueHasError: passwordHasError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,
  } = useInput(passwordValidate);

  const {
    data,
    status,
    error,
    sendRequest: sendReuestRenewPassword,
  } = useHttp(sendChangePasswordEmail);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data === 200 && !error) {
        dispatch(
          showModal(
            'The email reset your password has been seen. Check your email! ',
          ),
        );
      } else {
        dispatch(showModal(error || 'Please check your input email first.'));
      }
    }
  }, [data, status, error]);

  const formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatch(signIn({ username: email, password }, history, preLocation));
  };

  const forgotPasswordHandler = () => {
    if (!email && email.trim() === '') {
      dispatch(showModal('You need to provide your email first!.'));
      return;
    }
    sendReuestRenewPassword({ email });
  };

  return (
    <div>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <img
            src="/hcmus2.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="brand"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ padding: '2rem' }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            '& > :not(style)': { m: 2 },
          }}
          autoComplete="on"
          alignItems="center"
        >
          <Grid container justifyContent="center">
            <img src="/Elearning.png" width="75%" alt="logo" />
          </Grid>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailHasError}
              onBlur={emailOnBlurHandler}
              onChange={emailOnChangeHandler}
              value={email}
              helperText={
                emailHasError
                  ? 'Username must not be empty and include \'@\' if it is email and is a number if it is your studentID'
                  : ''
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordHasError}
              onBlur={passwordOnBlurHandler}
              onChange={passwordOnChangeHandler}
              value={password}
              helperText={
                passwordHasError ? 'Pass must has more than 8 characters.' : ''
              }
            />
            <FormHelperText error={ui.request === 'error'}>
              {ui.message}
            </FormHelperText>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                '& > :not(style)': { m: 2 },
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
                }}
              >
                {ui.request === 'pending' ? (
                  <CircularProgress color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <div
                    className={classes['forgot-password']}
                    aria-hidden="true"
                    onClick={forgotPasswordHandler}
                  >
                    Forgot password?
                    {' '}
                    {status === 'pending' ? <CircularProgress size={15} /> : ''}
                  </div>
                </Grid>
                <Grid item>
                  <Link to="/signup">Don&apos;t have an account? Sign Up</Link>
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
                <GoogleSignin />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
