import React, {useEffect, useState} from "react";
import CourseRatings from "./ratings/CourseRatings";
import axios from './../../axiosConfig/axiosConfig'
import AddUpdateCourseVideo from "../../components/AddUpdateCourseVideo";
import Button from "react-bootstrap/Button";
import AddUpdateCourse from "../../components/AddUpdateCourse";
import {Player} from 'video-react';

export default function CourseDetails(props) {

    const [course, setCourse] = useState(null);
    const [courseVideos, setCourseVideos] = useState(null);
    const [addVideo, setAddVideo] = useState(false);
    const [editCourse, setEditCourse] = useState(false);
    const [video, setVideo] = useState(null);


    useEffect(() => {
        axios.get(`courses/${props.courseId}`, props.courseId)
            .then(response => setCourse(response.data))
            .catch(err => console.log(err))

        axios.get(`courses/${props.courseId}/videos`)
            .then(res => {
                setCourseVideos(res.data)
                console.log(res.data);
            })
            .catch(err => console.log(err))

    }, [addVideo, editCourse])

    return (
        <div>
            {course && <div><p>Name: {course.name}</p>
                <p>Description: {course.description}</p>
                <p>Category: {course.category?.name}</p>
                <p>Price: ${course.price}</p>
                <CourseRatings/>
                <Button onClick={() => setAddVideo(true)}> Insert Video</Button>
                <AddUpdateCourseVideo courseId={course.id} showModal={addVideo} setShowModal={setAddVideo}/>

                <Button onClick={() => setEditCourse(true)}> Edit Course</Button>
                <AddUpdateCourse course={course} showModal={editCourse} setShowModal={setEditCourse}/>

                {courseVideos && courseVideos.length
                && courseVideos.map((video, index) => <div key={index}>
                    {video.fileType && video.fileType.includes("image")
                        ? <div><img src={"data:image/png;base64," + video.video} width={340} height={340}
                                    alt="test"/> test </div>
                        : <Player
                            playsInline
                            src={process.env.PUBLIC_URL + '/videos/'+ video.fileName}
                        />}
                    {video.title}

                </div>)}
            </div>}
        </div>
    )
}
