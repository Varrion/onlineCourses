import React, {useEffect, useState} from "react";
import axios from "../axiosConfig/axiosConfig"
import CourseCard from "../components/CourseCard";
import Instructors from "./Instructors";
import {showSmallDescription, showSmallTitle} from "../components/TruncatedText"


export default function Dashboard() {
    const [freeCourses, setFreeCourses] = useState(null);

    useEffect(() => {
        axios.get("courses", {
            params: {
                isFree: true
            }
        })
            .then(res => setFreeCourses(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <section className="container containerDiv">
                <h1 className="section-title">Welcome to e-Course Platform</h1>
                <p className="blockquote-footer text-right">
                    <span className="text-muted">
                        Make it work, make it right, make it fast.
                    </span>
                </p>
                <h4 className={"text-left"}>Check out our free courses to improve your skills</h4>
                <div className="row flex-nowrap horizontal-scrollable mb-5">
                    {freeCourses && freeCourses.length && freeCourses.map((course, index) =>
                        <div className="col-md-5 mb-4 mt-1"
                             key={index}>
                            <CourseCard
                                courseId={course.id}
                                title={showSmallTitle(course.name)}
                                description={showSmallDescription(course.description)}
                                instructor={course.instructor}
                                category={course.category}
                                height={'100px'}
                                width={100}
                            />
                        </div>)}
                </div>
                <Instructors/>
            </section>
        </>
    )
}