import React, {useEffect, useState} from "react";
import CourseRatings from "./ratings/CourseRatings";
import axios from './../../axiosConfig/axiosConfig'
import AddUpdateCourseVideo from "../../components/AddUpdateCourseVideo";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";
import {Link, navigate} from "@reach/router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CourseVideos from "./videos/CourseVideos";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import ReactStars from "react-rating-stars-component";
import RatingMapper from "../../components/RatingMapper";

export default function CourseDetails(props) {

    const [course, setCourse] = useState(null);
    const [addVideo, setAddVideo] = useState(false);
    const [editCourse, setEditCourse] = useState(false);
    const [courseInShoppingCart, setCourseInShoppingCart] = useState(null);
    const [addedInShoppingCart, setAddedInShoppingCart] = useState(false);
    const [isOwnedCourse, setIsOwnedCourse] = useState(false);
    const [averageRating, setAverageRating] = useState(null);


    useEffect(() => {
        axios.get(`courses/${props.courseId}`, props.courseId)
            .then(response => {
                setCourse(response.data)
                const courseData = response.data;
                axios.get(`user/${props.loggedUser?.username}/owned-courses`)
                    .then(res => {
                        const ownedCourses = res.data;
                        ownedCourses && ownedCourses.map(ownedCourse => {
                            if (ownedCourse.id === courseData.id) {
                                setIsOwnedCourse(true);
                            }
                        })
                    })
                    .catch(err => console.log(err))

                axios.get(`courses/${props.courseId}/rating`)
                    .then(res => setAverageRating(res.data))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        if (props.loggedUser) {
            axios.get(`courses/${props.courseId}/cart/${props.loggedUser.id}`)
                .then(res => {
                    setCourseInShoppingCart(res.data);
                    setAddedInShoppingCart(false);
                })
                .catch(err => console.log(err))
        }
    }, [addVideo, editCourse, props.loggedUser, addedInShoppingCart, isOwnedCourse, averageRating])

    const deleteCourse = () => {
        axios.delete(`courses/${props.courseId}`)
            .then(() => navigate("/courses"))
            .catch(err => console.log(err))
    }

    const addToShoppingCart = (course) => {
        axios.put(`user/${props.loggedUser.id}/cart`, course)
            .then(() => setAddedInShoppingCart(true))
    }

    return (
        <>
            {course && <div>
                <Card className={"card-background"}>
                    <Card.Body>
                        <div className="row">
                            <div
                                className={`col-md-${props.loggedUser && course && props.loggedUser?.id === course.instructor?.id ? "8" : "12"}`}>
                                <h1 className="title-font mb-5">Course Details</h1>
                                <div className="row">
                                    <div className={"col-md-6 flex-start-column"}>
                                        <p><span className={"title-font"}>Name: </span>{course.name}</p>
                                        <p className="card-subtitle text-muted title-font font-italic mb-2">by {course.instructor ? course.instructor.name + " " + course.instructor.surname : "None"}</p>
                                        <p><span className={"title-font"}>Category: </span><Link
                                            to={`/category/${course.category && course.category.id}`}> {course.category?.name} </Link>
                                        </p>
                                        <p> <span className={"title-font"}>Price: </span> {course.price !== 0
                                            ? <> <i className="fa fa-euro-sign"/>{course.price}</>
                                            : "Free"}</p>
                                    </div>
                                    <div className={"col-md-6 flex-justify-end"}>
                                        <p className={"text-left"}> <span className={"title-font"}>Description: </span> {course.description}</p>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-12 flex-content-end-center"}>
                                        {averageRating !== null && <><span className={"title-font pr-1"}>Overall Rating </span> <ReactStars
                                            count={5}
                                            size={30}
                                            edit={false}
                                            value={averageRating}
                                            activeColor="#ffd700"
                                        /> </>}
                                    </div>
                                </div>
                                {!course.isFree && (props.loggedUser && !props.loggedUser.isInstructor) && !courseInShoppingCart && !isOwnedCourse &&
                                <Button onClick={() => addToShoppingCart(course)}> Add Course to shopping
                                    cart </Button>}
                            </div>
                            {props.loggedUser && props.loggedUser.id === course.instructor?.id &&
                            <Jumbotron className="col-md-4 rounded-content flex-center-column align-items-center">
                                <h3 className="pb-4 title-font">Instructor panel</h3>
                                <div className="mb-2 flex-space_between">
                                    <Button className="rounded-content mr-4" variant="outline-primary"
                                            onClick={() => setAddVideo(true)}> Insert
                                        Video</Button>
                                    <Button className="rounded-content" variant="outline-primary"
                                            onClick={() => setEditCourse(true)}> Edit
                                        Course</Button>
                                </div>
                                <Button className="rounded-content" variant="outline-danger" onClick={deleteCourse}>Delete
                                    Course</Button>
                                <AddUpdateCourse course={course} showModal={editCourse} setShowModal={setEditCourse}/>
                                <AddUpdateCourseVideo courseId={course.id} showModal={addVideo}
                                                      setShowModal={setAddVideo}/>
                            </Jumbotron>

                            }
                        </div>
                    </Card.Body>
                </Card>
                <Jumbotron>
                    <Tabs defaultActiveKey="courseRating" id="course_tabs">
                        <Tab eventKey="courseRating" title="CourseRatings">
                            <CourseRatings loggedUser={props.loggedUser} courseId={course.id} course={course}
                                           isCourseOwned={isOwnedCourse}/>
                        </Tab>
                        <Tab eventKey="videos" title="Videos">
                            {isOwnedCourse || (props.loggedUser && props.loggedUser.id === course.instructor?.id) || course.isFree
                                ? <CourseVideos course={course} addedVideo={addVideo}/>
                                : <p> You need to buy the course first</p>}
                        </Tab>
                    </Tabs>
                </Jumbotron>
            </div>}
        </>
    )
}
