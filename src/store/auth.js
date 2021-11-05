const initialState = { authError: null, token: null };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('login success...');
            return {
                ...state,
                token: action.token
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.error
            }
        case 'LOGOUT_FAILED':
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export default authReducer;