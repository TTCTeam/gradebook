import React, { useEffect } from 'react';
import {
  Switch, Route, Redirect, useHistory,
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
import { checkAutoLogin } from './store/auth-services';
import GradePage from './pages/GradePage/GradePage';

function App() {
  const auth = useSelector((state) => state.auth);
  const modal = useSelector((state) => state.modal);
  const history = useHistory();
  const dispatch = useDispatch();

  // let logoutTimer;

  useEffect(() => {
    checkAutoLogin(dispatch, history);
    console.log('Initite...');
  }, []);

  const routeWithoutSignIn = (
    <>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      {/* <Route path="*">
        <Redirect to="/signin" />
      </Route> */}
    </>
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
        <Route path="/courses/:id/grade/edit" exact>
          <GradePage />
        </Route>
        <Route path="/new-course">
          <CourseForm />
        </Route>
      </Switch>
    </MainNavigation>
  );

  const routeContent = auth.token !== null ? routerWithSignIn : routeWithoutSignIn;
  return (
    <>
      <Switch>
        {routeContent}
      </Switch>
      {modal.isShown && <Message message={modal.message} />}
    </>
  );
}

export default App;
