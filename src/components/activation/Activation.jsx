import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { resendActivateEmail } from '../../api/activation';
import useHttp from '../../hooks/use-http';
import classes from './Activation.module.css';

const Activation = () => {
  const {
    status, sendRequest: resendActivateLink,
  } = useHttp(resendActivateEmail);
  const onResendActivateLinkHandle = () => {
    resendActivateLink();
  };

  return (
    <div>
      <div className={classes.activation}>
        <div className={classes['activation-content']}>
          <h3>Welcome to Gradebook!</h3>
          <p>
            Gradebook is HCMUS&apos;s E-learning system to start using you need
            to activate your account fisrt.
          </p>
          <p>
            The activate link is sent to your email. Please check and confirm
            your email before your starting with Gradebook.
          </p>
          <p>
            If you have actived your account, please reload to start your journey.
          </p>
          <p>
            If you don&apos;t recieve the activate email:
            <Button color="secondary" onClick={onResendActivateLinkHandle}>
              {status === 'pending' ? <CircularProgress /> : 'Resend email.'}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activation;
