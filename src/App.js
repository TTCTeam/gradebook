import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import CourseForm from './components/courses/CourseForm';
import MainNavigation from './components/layouts/MainNavigation';
import AllCourses from './pages/AllCourses';

import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage';
import ManageProfilePage from './pages/ManageProfilePage/ManageProfilePage';
import JoinCourse from './pages/JoinCourse';

function App() {
  // const auth = useSelector((state) => state.auth);
  // const history = useHistory();
  // const dispatch = useDispatch();

  // let logoutTimer;

  // useEffect(() => {
  //   checkAutoLogin(dispatch, history);
  // }, []);

  return (
    <>

      {/* <Switch> */}
      {/*  <Route path="/signin"> */}
      {/*    <SignIn /> */}
      {/*  </Route> */}
      {/*  <Route path="/signup"> */}
      {/*    <SignUp /> */}
      {/*  </Route> */}
      {/*  <Route path="*"> */}
      {/*    <Redirect to="/signin" /> */}
      {/*  </Route> */}
      {/* </Switch> */}

      {/* {auth.token !== null && ( */}
      <MainNavigation>
        <Switch>
          <Route path="/courses" exact>
            <AllCourses />
          </Route>
          <Route path="/courses/:id" exact>
            <CourseDetailPage />
          </Route>
          <Route path="/courses/:id/join">
            <JoinCourse />
          </Route>
          <Route path="/profile" exact>
            <ManageProfilePage />
          </Route>
          <Route path="/new-course">
            <CourseForm />
          </Route>
          <Route path="/" exact>
            <Redirect to="/courses" />
          </Route>
        </Switch>
      </MainNavigation>
      {/* )} */}
    </>
  );
}

export default App;
