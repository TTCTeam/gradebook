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
import JoinCourse from './pages/JoinCourse';
import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage';
import ManageProfilePage from './pages/ManageProfilePage/ManageProfilePage';

import Message from './components/UI/Message';
import { checkAutoLogin } from './store/auth/auth-services';
import { startAt } from './store/location/loc-actions';

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
        <Route exact path="/">
          <Redirect to="/courses" />
        </Route>
        <Route path="/profile">
          <ManageProfilePage />
        </Route>
        <Route path="/new-course">
          <CourseForm />
        </Route>
        <Route exact path="/courses">
          <AllCourses />
        </Route>
        <Route exact path="/courses/:id">
          <CourseDetailPage />
        </Route>
        <Route path="/courses/:id/join">
          <JoinCourse />
        </Route>

        <Route>
          <div>Page not found</div>
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
