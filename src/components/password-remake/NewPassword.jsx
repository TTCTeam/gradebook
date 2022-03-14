import {
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PASSWORD_ID, USER_ID } from '../../constant/password';
import { submitNewPassword } from '../../api/password';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import { passwordValidate } from '../../utils/inputValidate';

const NewPassword = () => {
  const {
    value: password,
    valueIsValid: passwordIsValid,
    valueHasError: passwordHasError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,
  } = useInput(passwordValidate);

  const {
    value: retypePassword,
    valueIsValid: retypePasswordIsValid,
    valueHasError: retypePasswordHasError,
    onBlurHandler: retypePasswordOnBlurHandler,
    onChangeHandler: retypePasswordOnChangeHandler,
  } = useInput(passwordValidate);

  const [formInValidMessage, setFormInValidMessage] = React.useState(null);

  const location = useLocation();
  // const history = useHistory();

  const {
    data,
    status,
    error,
    sendRequest: submitNewPasswordHandler,
  } = useHttp(submitNewPassword);

  const formIsValid = retypePasswordIsValid && passwordIsValid;

  React.useEffect(() => {
    if ((status === 'completed' && error) || data !== 200) {
      setFormInValidMessage(error);
    }
  }, [data, status, error]);

  React.useEffect(() => {
    if (
      passwordValidate(password)
      && passwordValidate(retypePassword)
      && password !== retypePassword
    ) {
      setFormInValidMessage('Retype password dose not match.');
    } else {
      setFormInValidMessage('');
    }
  }, [password, retypePassword]);

  const onSubmitHandler = () => {
    if (password !== retypePassword) {
      setFormInValidMessage('Retype password dose not match.');
      return;
    }
    const query = new URLSearchParams(location.search);
    const userId = query.get(USER_ID);
    const passwordId = query.get(PASSWORD_ID);

    submitNewPasswordHandler({ userId, passwordId, password });
  };

  const isDoneChangePassContent = (
    <>
      <Typography variant="h4" sx={{ textAlignLast: 'center' }}>
        Change Password successfully
      </Typography>
      <Link to="/signin">
        Go to login page
      </Link>
    </>
  );
  const isChaningPassContent = (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ textAlignLast: 'center' }}>
        Change Password
      </Typography>
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

      <TextField
        margin="normal"
        required
        fullWidth
        name="retype-password"
        label="Retype password"
        type="password"
        id="retype-password"
        autoComplete="current-password"
        error={retypePasswordHasError}
        onBlur={retypePasswordOnBlurHandler}
        onChange={retypePasswordOnChangeHandler}
        value={retypePassword}
        helperText={
          retypePasswordHasError
            ? 'Pass must has more than 8 characters.'
            : ''
        }
      />
      <FormHelperText error={formIsValid}>
        {formInValidMessage}
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
          onClick={onSubmitHandler}
          variant="contained"
          disabled={!formIsValid}
          sx={{
            maxHeight: 80,
            borderRadius: 4,
            height: 50,
            fontSize: 20,
            textTransform: 'none',
          }}
        >
          {status === 'pending' ? (
            <CircularProgress color="inherit" />
          ) : (
            'Confirm'
          )}
        </Button>
      </Grid>
    </Box>
  );

  return (
    <Grid
      container
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {(!error && status === 'completed') ? isDoneChangePassContent : isChaningPassContent}
    </Grid>
  );
};

export default NewPassword;
