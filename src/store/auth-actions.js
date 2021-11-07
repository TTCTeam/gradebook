export function signOut() {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_SUCCESS' });
  };
}

export function signIn(credentials) {
  return (dispatch) => {
    dispatch({ type: 'PENDING' });
    console.log(credentials);
    // check pass and username from request to BE
    setTimeout(() => {
      dispatch({ type: 'LOGIN_SUCCESS', token: 'SSDFGHJU6TRDSAQWSDFVBGYUJHBGF' });
      dispatch({ type: 'SUCCESS' });
    }, 1000);
  };
}

export function signUp(credentials) {
  return (dispatch) => {
    dispatch({ type: 'PENDING' });
    console.log(credentials);
    // check pass and username from request to BE
    setTimeout(() => {
      dispatch({ type: 'REGISTER_SUCCESS', token: 'SSDFGHJU6TRDSAQWSDFVBGYUJHBGF' });
      dispatch({ type: 'SUCCESS' });
    }, 1000);
  };
}
