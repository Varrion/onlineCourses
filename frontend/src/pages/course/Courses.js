import React, {useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";
import axios from './../../axiosConfig/axiosConfig'
import Card from "react-bootstrap/Card";
import {navigate} from "@reach/router";

export default function Courses() {
    const [courses, setCourses] = useState(null);
    const [addCourseModal, setAddCourseModal] = useState(false);

    useEffect(() => {
        axios.get("courses")
            .then(response => {
                setCourses(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
        <div className="row mt-4">
            {courses ? courses.map((course, index) =>
                <div key={index} className="col-md-3 mb-4">
                    <Card style={{minHeight: '250px'}}>
                        <Card.Body>
                            <Card.Title>{course.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{course.category?.name}</Card.Subtitle>
                            <Card.Text>
                                {course.description}
                                {course.price}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="link" onClick={() => navigate(`/courses/${course.id}`)}>Go to details</Button>
                        </Card.Footer>
                    </Card>
                </div>
                ) : <p> No courses available </p>}
        </div>
        <div className="fa-pull-right">
            <Button onClick={() => setAddCourseModal(true)}> Add Course</Button>
            <AddUpdateCourse showModal={addCourseModal} setShowModal={setAddCourseModal}/>
        </div>
    </>
    )
}