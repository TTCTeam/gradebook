import { ARRIVED, START_AT } from './loc-actions';

const initialState = { location: null };

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_AT:
    return {
      ...state,
      location: action.location,
    };
  case ARRIVED:
    return {
      ...state,
      location: null,
    };
  default:
    return { ...initialState };
  }
};

export default locationReducer;
