import React, {useEffect, useState} from 'react';
import './App.css';
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'video-react/dist/video-react.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import {Router} from "@reach/router";
import CustomerInfo from "./pages/customer/CustomerInfo";
import Courses from "./pages/course/Courses";
import CourseDetails from "./pages/course/CourseDetails";
import CourseVideos from "./pages/course/videos/CourseVideos";
import CourseVideoDetails from "./pages/course/videos/CourseVideoDetails";
import Category from "./pages/course/category/Category";
import AddCategory from "./pages/course/category/AddCategory";
import {AuthContext} from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import UserShoppingCart from "./pages/customer/shoppingCart/UserShoppingCart";
import axios from "./axiosConfig/axiosConfig"
import Dashboard from "./pages/Dashboard";

function App() {

    const existingUser = {
        user: sessionStorage.getItem("user"),
        instructor: sessionStorage.getItem("instructor")
    };

    const [authUser, setAuthUser] = useState(existingUser);
    const [loggedUser, setLoggedUser] = useState(null);

    const setUser = (data) => {
        sessionStorage.setItem("user", data);
        sessionStorage.setItem("instructor", data);
        setAuthUser(data);
    };

    const getUsername = authUser => {
        let encodedUser = authUser.split(" ")[1];
        let encodedString = atob(encodedUser);
        return encodedString.split(":")[0]
    }

    useEffect(() => {
        if (authUser.user) {
            axios.get(`user/${getUsername(authUser.user)}`)
                .then(res => {
                    setLoggedUser(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [authUser.user])

    return (
        <>
            <AuthContext.Provider value={{authUser, setAuthUser: setUser}}>
                <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
                <div className="App container">
                    <Router>
                        <Dashboard path="/"/>
                        <CustomerLogin loggedUser={loggedUser} setLoggedUser={setLoggedUser} authUser={authUser}
                                       path="login"/>
                        <CustomerRegister path="register"/>
                        <PrivateRoute component={CustomerInfo} path="user/:username"/>
                        <Courses loggedUser={loggedUser} path="courses"/>
                        <CourseDetails loggedUser={loggedUser} path="courses/:courseId"/>
                        <CourseVideos path="courses/:courseId/videos"/>
                        <CourseVideoDetails path="courses/:courseId/videos/:videoId"/>
                        <Category loggedUser={loggedUser} path="category/:categoryId"/>
                        <PrivateRoute component={AddCategory} path="category/add"/>
                        <PrivateRoute loggedUser={loggedUser} component={UserShoppingCart} path="user/:userId/cart"/>
                    </Router>
                </div>
                <Footer/>
            </AuthContext.Provider>
        </>
    );
}

export default App;
