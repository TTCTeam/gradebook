import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch, Route, Redirect, useHistory,
} from 'react-router-dom';
import './App.css';
import SignIn from './components/auth/SigIn';
import SignUp from './components/auth/SignUp';
import CourseForm from './components/courses/CourseForm';
import MainNavigation from './components/layouts/MainNavigation';
import AllCourses from './pages/AllCourses';
import { checkAutoLogin } from './store/auth-services';

function App() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  let logoutTimer;

  useEffect(() => {
    checkAutoLogin(dispatch, history);
  }, []);

  return (
    <>

      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="*">
          <Redirect to="/signin" />
        </Route>
      </Switch>

      {auth.token !== null && (
        <MainNavigation logoutTimer={logoutTimer}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/courses" />
            </Route>
            <Route path="/courses" exact>
              <AllCourses />
            </Route>
            <Route path="/courses/:id"> </Route>
            <Route path="/new-course">
              <CourseForm />
            </Route>
          </Switch>
        </MainNavigation>
      )}
    </>
  );
}

export default App;
