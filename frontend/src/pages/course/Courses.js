import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";
import axios from './../../axiosConfig/axiosConfig'
import CourseCard from "../../components/CourseCard";
import {showSmallDescription, showSmallTitle} from "../../components/TruncatedText"

export default function Courses(props) {
    const [courses, setCourses] = useState(null);
    const [addCourseModal, setAddCourseModal] = useState(false);

    useEffect(() => {
        axios.get("courses")
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => console.log(error))
    }, [props.loggedUser, addCourseModal]);



    return (
        <>
            <h1 className="title-font">Courses</h1>
            <div className="row mt-4">
                {courses && courses.length ? courses.map((course, index) =>
                    <div key={index} className="col-md-3 mb-4">
                        <CourseCard
                            courseId={course.id}
                            title={showSmallTitle(course.name)}
                            description={showSmallDescription(course.description)}
                            category={course.category}
                            instructor={course.instructor}
                            loggedUser={props.loggedUser}/>
                    </div>
                ) : <p> No courses available </p>}
            </div>
            <div className="fa-pull-right">
                {
                    props.loggedUser?.isInstructor && <><Button variant={"outline-primary rounded-content"} onClick={() => setAddCourseModal(true)}> Add
                        Course</Button>
                        <AddUpdateCourse loggedUser={props.loggedUser} showModal={addCourseModal}
                                         setShowModal={setAddCourseModal}/> </>
                }
            </div>
        </>
    )
}