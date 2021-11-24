import React from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInByGoogle, signUp } from '../../store/auth-actions';
import { showModal } from '../../store/modal-action';

require('dotenv').config();

const clientId = '657202594687-9bi5bovau03kobm94cnhbhgcnsf1cpjb.apps.googleusercontent.com';

export default function GoogleSign({ isSignIn, username }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLoginSuccess = (res) => {
    const idToken = res.tokenId;
    console.log(res);
    if (isSignIn) {
      dispatch(signInByGoogle(idToken, history));
    }
    if (username) {
      const user = {
        firstname: res.profileObj.givenName,
        lastname: res.profileObj.familyName,
        email: res.profileObj.email,
        password: null,
        username,
      };

      dispatch(signUp(user, history));
    } else if (!isSignIn) {
      dispatch(showModal('Please enter StudentID before.'));
    }
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
