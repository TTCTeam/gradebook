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
import AssignmentPage from './pages/AssignmentPage/AssignmentPage';
import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage';
import ManageProfilePage from './pages/ManageProfilePage/ManageProfilePage';
import Message from './components/UI/Message';
import { checkAutoLogin } from './store/auth/auth-services';
import { startAt } from './store/location/loc-actions';
import Activation from './components/activation/Activation';
import ActivationProgess from './components/activation/ActivationProgess';
import { getUserProfile } from './store/auth/auth-actions';
import NewPassword from './components/password-remake/NewPassword';
import { unrecordRoute } from './utils/calc';

function App() {
  const auth = useSelector((state) => state.auth);
  const modal = useSelector((state) => state.modal);
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  if (!auth.token && !unrecordRoute.includes(location.pathname)) {
    dispatch(startAt(location.pathname + location.search));
  }
  useEffect(() => {
    dispatch(getUserProfile());
    checkAutoLogin(dispatch, history, location);
  }, []);

  useEffect(() => {
    if (auth.status && auth.status === 2 && !query.has('activateId')) {
      history.push('/activate');
    }
  }, [auth.status]);

  const routeWithoutSignIn = (
    <Switch>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/change-password">
        <NewPassword />
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
        <Route path="/activate">
          <Activation />
        </Route>
        <Route path="/activating">
          <ActivationProgess />
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
        <Route path="/courses/:id/assignment/edit">
          <AssignmentPage />
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
