import React, {useEffect, useState} from "react";
import CourseRatings from "./ratings/CourseRatings";
import axios from './../../axiosConfig/axiosConfig'
import AddUpdateCourseVideo from "../../components/AddUpdateCourseVideo";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";
import {navigate} from "@reach/router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CourseVideos from "./videos/CourseVideos";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function CourseDetails(props) {

    const [course, setCourse] = useState(null);
    const [courseVideos, setCourseVideos] = useState(null);
    const [courseRatings, setCourseRatings] = useState(null);
    const [addVideo, setAddVideo] = useState(false);
    const [editCourse, setEditCourse] = useState(false);
    const [courseInShoppingCart, setCourseInShoppingCart] = useState(null);
    const [addedInShoppingCart, setAddedInShoppingCart] = useState(false);
    const [isOwnedCourse, setIsOwnedCourse] = useState(false);


    useEffect(() => {
        axios.get(`courses/${props.courseId}`, props.courseId)
            .then(response => {
                setCourse(response.data)
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

        if (course) {
            axios.get(`courses/${props.courseId}/videos`)
                .then(res => {
                    setCourseVideos(res.data)
                })
                .catch(err => console.log(err))

            axios.get(`courses/${props.courseId}/ratings`)
                .then(res => {
                    console.log(res.data);
                    setCourseRatings(res.data)
                })
                .catch(err => console.log(err))

            axios.get(`user/${props.loggedUser?.id}/owned-courses`)
                .then(res => {
                    res.data.map(ownedCourse => {
                        if (ownedCourse.id === course.id) {
                            setIsOwnedCourse(true);
                        }
                    })
                })
                .catch(err => console.log(err))
        }
    }, [addVideo, editCourse, props.loggedUser, addedInShoppingCart, isOwnedCourse])

    const deleteCourse = () => {
        axios.delete(`courses/${props.courseId}`)
            .then(() => navigate(-1))
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
                        <div><p>Name: {course.name}</p>
                            <p>Description: {course.description}</p>
                            <p>Category: {course.category?.name}</p>
                            <p>Price: ${course.price}</p>

                            { props.loggedUser && props.loggedUser.id === course.instructor?.id &&
                            <>
                                <Button onClick={() => setAddVideo(true)}> Insert Video</Button>
                                <AddUpdateCourseVideo courseId={course.id} showModal={addVideo}
                                                      setShowModal={setAddVideo}/>

                                <Button variant="danger" onClick={deleteCourse}>Delete Course</Button>
                                <Button onClick={() => setEditCourse(true)}> Edit Course</Button>
                                <AddUpdateCourse course={course} showModal={editCourse} setShowModal={setEditCourse}/>
                            </>

                            }
                            {!props.loggedUser?.isInstructor && !courseInShoppingCart && !isOwnedCourse &&
                            <Button onClick={() => addToShoppingCart(course)}> Add Course to shopping cart </Button>}
                        </div>
                    </Card.Body>
                </Card>
                <Jumbotron>
                    <Tabs defaultActiveKey="courseRating" id="course_tabs">
                        <Tab eventKey="courseRating" title="CourseRatings">
                            <CourseRatings loggedUser={props.loggedUser} ratings={courseRatings} course={course}/>
                        </Tab>
                        <Tab eventKey="videos" title="Videos">
                            {isOwnedCourse || (props.loggedUser && props.loggedUser.id === course.instructor?.id) || course.isFree
                                ? <CourseVideos course={course} videos={courseVideos}/>
                                : <p> You need to buy the course first</p>}
                        </Tab>
                    </Tabs>
                </Jumbotron>
            </div>}
        </>
    )
}
