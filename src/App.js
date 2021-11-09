import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignIn from './components/auth/SigIn';
import SignUp from './components/auth/SignUp';
import CourseForm from './components/courses/CourseForm';
import MainNavigation from './components/layouts/MainNavigation';
import AllCourses from './pages/AllCourses';
import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage';

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
              <Redirect to="/courses" />
            </Route>
            <Route path="/courses" exact>
              <AllCourses />
            </Route>
            <Route path="/courses/:id">
              <CourseDetailPage />
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
