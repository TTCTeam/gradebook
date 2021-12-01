import { LOCATION_ARRIVED, LOCATION_START_AT } from './loc-actions';

const initialState = { location: null };

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_START_AT:
    return {
      ...state,
      location: action.location,
    };
  case LOCATION_ARRIVED:
    return {
      ...state,
      location: null,
    };
  default:
    return { ...state };
  }
};

export default locationReducer;
