import { combineReducers, createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './auth';
import uiReducer from './ui';
import modalReducer from './modal';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  modal: modalReducer,
});

const composedEnhencer = composeWithDevTools(applyMiddleware(ThunkMiddleware));

const store = createStore(rootReducer, composedEnhencer);

export default store;
