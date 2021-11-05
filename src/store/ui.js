const initialState = { request: null }

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PENDING':
            console.log('request is pending');
            return {
                ...state,
                request: 'pending'
            }
        case 'SUCCESS':
            console.log('request is success');
            return {
                ...state,
                request: 'success'
            }
        case 'ERROR':
            console.log('Request is failed.!');
            return {
                ...state,
                request: 'error'
            }
        default:
            return {...state }
    }
}

export default uiReducer;