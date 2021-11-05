export function signOut() {
    return (dispatch, getState) => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
    }
};

export function signIn(credentials) {
    return (dispatch, getState) => {
        dispatch({ type: 'PENDING' });
        console.log(credentials);
        //check pass and username from request to BE
        setTimeout(() => {
            dispatch({ type: 'LOGIN_SUCCESS', token: 'SSDFGHJU6TRDSAQWSDFVBGYUJHBGF' });
            dispatch({ type: 'SUCCESS' });
        }, 1000);

    }
}