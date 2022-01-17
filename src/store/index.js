import { combineReducers, createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './auth/auth';
import uiReducer from './ui/ui';
import modalReducer from './modal/modal';
import locationReducer from './location/location';
import notificationReducer from './notification/notification';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  modal: modalReducer,
  location: locationReducer,
  notification: notificationReducer,
});

const composedEnhencer = composeWithDevTools(applyMiddleware(ThunkMiddleware));

const store = createStore(rootReducer, composedEnhencer);

export default store;
