import React, {useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";
import axios from './../../axiosConfig/axiosConfig'
import Card from "react-bootstrap/Card";
import {navigate} from "@reach/router";

export default function Courses(props) {
    const [courses, setCourses] = useState(null);
    const [addCourseModal, setAddCourseModal] = useState(false);

    useEffect(() => {
        axios.get("courses")
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => console.log(error))
    }, [props.loggedUser, addCourseModal])

    return (
        <>
            <div className="row mt-4">
                {courses ? courses.map((course, index) =>
                    <div key={index} className="col-md-3 mb-4">
                        <Card style={{minHeight: '250px'}} onClick={() => navigate(`courses/${course.id}`, {state: {loggedUser: props.loggedUser}})}>
                            <Card.Body>
                                <Card.Title>{course.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{course.category?.name}</Card.Subtitle>
                                <Card.Text>
                                    {course.description}
                                    {course.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ) : <p> No courses available </p>}
            </div>
            <div className="fa-pull-right">
                {
                    props.loggedUser?.isInstructor && <><Button onClick={() => setAddCourseModal(true)}> Add
                        Course</Button>
                        <AddUpdateCourse loggedUser={props.loggedUser} showModal={addCourseModal}
                                         setShowModal={setAddCourseModal}/> </>
                }
            </div>
        </>
    )
}