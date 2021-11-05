import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import SignIn from "./components/auth/SigIn";
import SignUp from "./components/auth/SignUp";
import CourseForm from "./components/courses/CourseForm";
import MainNavigation from "./components/layouts/MainNavigation";
import NotFound from "./pages/NotFound";
import AllCourses from "./pages/AllCourses";

const DUMMY_COURSE = [{
        id: "c1",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c2",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c3",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c4",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c10",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c5",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c6",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c7",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c8",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "c9",
        name: "PTUDWNC [CQ] -18/3",
        author: "Nguyen Huy Khanh",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
];

function App() {
    const auth = useSelector((state) => state.auth);
    const history = useHistory();


    return ( <
        React.Fragment > { <
            Switch >
            <
            Route path = "/signin" >
            <
            SignIn / >
            <
            /Route> <
            Route path = "/signup" >
            <
            SignUp / >
            <
            /Route> <
            Route path = "*" >
            <
            Redirect to = "/signin" / >
            <
            /Route> <
            /Switch>
        }

        {
            auth.token !== null && ( <
                MainNavigation >
                <
                Switch >
                <
                Route path = "/"
                exact >
                <
                Redirect to = "/courses" / >
                <
                /Route> <
                Route path = "/courses"
                exact >
                <
                AllCourses courses = { DUMMY_COURSE }
                /> <
                /Route> <
                Route path = "/courses/:id" > < /Route> <
                Route path = "/new-course" >
                <
                CourseForm / >
                <
                /Route> <
                /Switch> <
                /MainNavigation>
            )
        } <
        /React.Fragment>
    );
}

export default App;