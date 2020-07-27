import React, {useEffect, useRef, useState} from "react";
import CourseRatings from "./ratings/CourseRatings";
import axios from './../../axiosConfig/axiosConfig'
import AddUpdateCourseVideo from "../../components/AddUpdateCourseVideo";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";

export default function CourseDetails(props) {

    const [course, setCourse] = useState(null);

    const [addVideo, setAddVideo] = useState(false);
    const [editCourse, setEditCourse] = useState(false);


    useEffect( () => {
        axios.get(`courses/${props.courseId}`, props.courseId )
            .then(response => setCourse(response.data))
            .catch(err => console.log(err))
    }, [addVideo,editCourse])

    return(
        <div>
            {course && <div> <p>Name: {course.name}</p>
                <p>Description: {course.description}</p>
                <p>Category: {course.category?.name}</p>
                <p>Price: ${course.price}</p>
                <CourseRatings/>
                <Button onClick={() => setAddVideo(true)}> Insert Video</Button>
                <AddUpdateCourseVideo courseId={course.id} showModal={addVideo} setShowModal={setAddVideo} />

                <Button onClick={() => setEditCourse(true)}> Edit Course</Button>
                <AddUpdateCourse course={course} showModal={editCourse} setShowModal={setEditCourse}/>

            </div>}
        </div>
    )
}
