import React from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInByGoogle } from '../../store/auth/auth-actions';

require('dotenv').config();

const clientId = '657202594687-9bi5bovau03kobm94cnhbhgcnsf1cpjb.apps.googleusercontent.com';

export default function GoogleSign() {
  const dispatch = useDispatch();
  const history = useHistory();
  const preLocation = useSelector((state) => state.location.location);

  const onLoginSuccess = (res) => {
    const idToken = res.tokenId;
    console.log(res);

    dispatch(signInByGoogle(idToken, history, preLocation));
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

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
