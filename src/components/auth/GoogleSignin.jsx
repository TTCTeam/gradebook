import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/auth-actions';

require('dotenv').config();

const clientId = '657202594687-9bi5bovau03kobm94cnhbhgcnsf1cpjb.apps.googleusercontent.com';

export default function GoogleSign() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLoginSuccess = (res) => {
    dispatch(signIn({ res }, history));
    console.log('Login Success:', res);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };
  console.log(clientId);
  // const onSignoutSuccess = () => {
  //     alert("You have been logged out successfully");
  //     console.clear();
  //     setShowloginButton(true);
  //     setShowlogoutButton(false);
  // };
  return (
    <div className="GoogleLogin">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}
