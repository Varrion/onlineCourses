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
    const [tabKey, setTabKey] = useState('videos');


    useEffect(() => {
        axios.get(`courses/${props.courseId}`, props.courseId)
            .then(response => {
                setCourse(response.data)
            })
            .catch(err => console.log(err))

        axios.get(`courses/${props.courseId}/videos`)
            .then(res => {
                setCourseVideos(res.data)
            })
            .catch(err => console.log(err))

        axios.get(`courses/${props.courseId}/ratings`)
            .then(res => {
                setCourseRatings(res.data)
            })
            .catch(err => console.log(err))

    }, [addVideo, editCourse, props.loggedUser])

    const deleteCourse = () => {
        axios.delete(`courses/${props.courseId}`)
            .then(() => navigate(-1))
            .catch(err => console.log(err))
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

                            {course.instructor?.id === props.loggedUser?.id &&
                            <>
                                <Button onClick={() => setAddVideo(true)}> Insert Video</Button>
                                <AddUpdateCourseVideo courseId={course.id} showModal={addVideo}
                                                      setShowModal={setAddVideo}/>

                                <Button variant="danger" onClick={deleteCourse}>Delete Course</Button>
                            </>
                            }

                            <Button onClick={() => setEditCourse(true)}> Edit Course</Button>
                            <AddUpdateCourse course={course} showModal={editCourse} setShowModal={setEditCourse}/>

                        </div>
                    </Card.Body>
                </Card>
                <Jumbotron>
                    <Tabs defaultActiveKey="videos" id="uncontrolled-tab-example"
                          onSelect={(key) => setTabKey(key)}>
                        <Tab eventKey="videos" title="Videos">
                            <CourseVideos videos={courseVideos}/>
                        </Tab>
                        <Tab eventKey="courseRating" title="CourseRatings">
                            <CourseRatings ratings={courseRatings} courseId={course.id}/>
                        </Tab>
                    </Tabs>
                </Jumbotron>
            </div>}
        </>
    )
}
