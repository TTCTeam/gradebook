import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { activeAccountAPI } from '../../api/activation';
import useHttp from '../../hooks/use-http';

const ActivationProgess = () => {
  const history = useHistory();
  const location = useLocation();

  const {
    status,
    data,
    sendRequest: activeAccount,
  } = useHttp(activeAccountAPI, true);

  useEffect(() => {
    activeAccount(location.search);
  }, []);

  useEffect(() => {
    if (data === 200) {
      history.push('/');
    }
  }, [data]);

  function getContent() {
    if (status === 'pending') {
      return <CircularProgress />;
    }
    // if (status === 'completed' && data !== 200) {
    return (
      <p>
        Something went wrong please check your active link in your email
        again.
      </p>
    );
  }
  const displayContent = getContent();
  return <div>{displayContent}</div>;
};

export default ActivationProgess;
