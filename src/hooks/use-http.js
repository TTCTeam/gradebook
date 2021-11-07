import { useCallback, useReducer } from 'react';

const httpReducer = (state, action) => {
  switch (action.type) {
  case 'HTTP_SEND':
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  case 'HTTP_SUCCESS':
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  case 'HTTP_ERROR':

    return {
      data: null,
      error: action.error,
      status: 'completed',
    };
  default:
    return state;
  }
};

const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, { status: startWithPending ? 'pending' : null, data: null, error: null });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: 'HTTP_SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'HTTP_SUCCESS', responseData });
      } catch (error) {
        dispatch({ type: 'HTTP_ERROR', error: error.message || 'Something went wrong went while fetching courses.' });
      }
    }, [requestFunction],
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
