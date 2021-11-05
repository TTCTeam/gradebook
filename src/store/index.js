import { combineReducers, createStore } from "redux";
import authReducer from "./auth";
import uiReducer from "./ui";
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { applyMiddleware } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
});

const composedEnhencer = composeWithDevTools(applyMiddleware(ThunkMiddleware));


const store = createStore(rootReducer, composedEnhencer);

export default store;