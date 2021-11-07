import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
  CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import useInput from '../../hooks/use-input';
import { emailValidate, passwordValidate } from '../../utils/inputValidate';
import { signIn } from '../../store/auth-actions';

const SignIn = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const auth = useSelector((state) => state.auth);

  const {
    value: email,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,

  } = useInput(emailValidate);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    valueHasError: passwordHasError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,

  } = useInput(passwordValidate);

  if (auth.token) {
    return <Redirect to="/" />;
  }

  const formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatch(signIn({ email, password }));

    /* emailResetValue();
    passwordResetValue(); */
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
          container
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
                emailHasError ? 'Email must not be empty and include \'@\'' : ''
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
                  <Link href="/#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don`&apos;`t have an account? Sign Up
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
                  <Link href="/#" variant="body2">
                    <img src="/google.png" height="50px" alt="google icon" />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/#" variant="body2">
                    <img src="/facebook.png" height="50px" alt="facebook icon" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
