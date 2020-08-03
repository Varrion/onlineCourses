import React, {useEffect, useState} from "react";
import axios from "../axiosConfig/axiosConfig"

export default function Dashboard() {
    const [freeCourses, setFreeCourses] = useState(null);
    const [instructors, setInstructors] = useState(null);

    useEffect(() => {
        axios.get("courses", {
            params: {
                isFree: true
            }
        })
            .then(res => setFreeCourses(res.data))
            .catch(err => console.log(err))

        axios.get("user", {
            params: {
                isInstructor: true
            }
        })
            .then(res => setInstructors(res.data))
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            Free Courses:
            {freeCourses && freeCourses.length && freeCourses.map( (course, index) => <div key={index}>
                {course.name}
            </div>)}

            Instructors:
            {instructors && instructors.length && instructors.map( (instructor, index) => <div key={index}>
                {instructor.name}
            </div>)}
        </div>
    )
}