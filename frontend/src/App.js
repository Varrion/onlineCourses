import React from 'react';
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

function App() {
    return (
        <>
            <Header/>
            <div className="App container">
                <Router>
                    <CustomerLogin path="login"/>
                    <CustomerRegister path="register"/>
                    <CustomerInfo path="user/:id"/>
                    <Courses path="courses"/>
                    <CourseDetails path="courses/:courseId"/>
                    <CourseVideos path="courses/:courseId/videos"/>
                    <CourseVideoDetails path="courses/:courseId/videos/:videoId"/>
                    <Category path="category/:categoryId"/>
                    <AddCategory path="category/add"/>
                </Router>
            </div>
            <Footer/>
        </>
    );
}

export default App;
