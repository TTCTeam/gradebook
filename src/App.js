import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/auth/SigIn';
import SignUp from './components/auth/SignUp';
import CourseDetail from './components/courses/CourseDetail';
import CourseForm from './components/courses/CourseForm';
import MainNavigation from './components/layouts/MainNavigation';
import AllCourses from './pages/AllCourses';

function App() {
  const auth = useSelector((state) => state.auth);

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
        <MainNavigation>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/courses/1" />
            </Route>
            <Route path="/courses" exact>
              <AllCourses />
            </Route>
            <Route path="/courses/1" exact>
              <CourseDetail />
            </Route>
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
