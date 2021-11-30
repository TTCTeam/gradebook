import React, { useEffect } from 'react';
import {
  Switch, Route, Redirect, useHistory, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CourseForm from './components/courses/CourseForm';
import MainNavigation from './components/layouts/MainNavigation';
import AllCourses from './pages/AllCourses';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage';
import ManageProfilePage from './pages/ManageProfilePage/ManageProfilePage';

import Message from './components/UI/Message';
import AssignmentPage from './pages/AssignmentPage/AssignmentPage';
import { checkAutoLogin } from './store/auth/auth-services';
import { startAt } from './store/location/loc-actions';
import JoinCourse from './pages/JoinCourse';

function App() {
  const auth = useSelector((state) => state.auth);
  const modal = useSelector((state) => state.modal);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // let logoutTimer;
  console.log(location, 'location');
  console.log(history, 'history');
  if (!auth.token && (location.pathname !== '/signin' && location.pathname !== '/signup')) {
    console.log(location.pathname + location.search, 'inititate...');
    dispatch(startAt(location.pathname + location.search));
  }
  useEffect(() => {
    checkAutoLogin(dispatch, history, location);
  }, []);

  const routeWithoutSignIn = (
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
  );

  const routerWithSignIn = (
    <MainNavigation>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/courses" />
        </Route>
        <Route path="/courses" exact>
          <AllCourses />
        </Route>
        <Route path="/courses/:id" exact>
          <CourseDetailPage />
        </Route>
        <Route path="/profile" exact>
          <ManageProfilePage />
        </Route>
        <Route path="/courses/:id/assignment/edit" exact>
          <AssignmentPage />
        </Route>
        <Route path="/new-course">
          <CourseForm />
        </Route>
        <Route path="/courses/:id/join">
          <JoinCourse />
        </Route>
      </Switch>
    </MainNavigation>
  );

  const routeContent = auth.token !== null ? routerWithSignIn : routeWithoutSignIn;
  return (
    <>
      {routeContent}
      {modal.isShown && <Message message={modal.message} />}
    </>
  );
}

export default App;
