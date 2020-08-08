import React, {useEffect, useState} from "react";
import axios from "../../../axiosConfig/axiosConfig"
import AddUpdateCourse from "../../../components/AddUpdateCourse";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import CourseCard from "../../../components/CourseCard";
import {showSmallDescription, showSmallTitle} from "../../../components/TruncatedText";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Category(props) {
    const [category, setCategory] = useState(null);
    const [courses, setCourses] = useState(null);
    const colors = ["#00ff00",
        "#ff33cc",
        "#cc33ff",
        "#ffff00",
        "#EC0B0B",
        "#ffa812",
        "#d8bfd8",
        "#ffa07a",
        "#ee82ee",
        "#ff1a1a",
        "#7FFFD4",
        "#00BFFF",
        "#D2B48C",
        "#fc6868",
        "#00FF46",
        "#29FFDF",
        "#FFB700",
        "#75ebff",
        "#53eb87",
        "#ff5c67"];

    const getColor = () => {
        let len = colors.length;
        let randomNum = Math.floor(Math.random() * len);
        let color = colors[randomNum];
        colors.splice(randomNum, 1);
        return color;
    };

    const [showAddCourseModal, setShowAddCourseModal] = useState(false);

    useEffect(() => {
        axios.get(`category/${props.categoryId}`)
            .then(res => setCategory(res.data))
            .catch(err => console.log(err))

        axios.get(`courses/category/${props.categoryId}`)
            .then(res => setCourses(res.data))
            .catch(err => console.log(err))

    }, [props.categoryId, showAddCourseModal, props.loggedUser])

    return (
        <>
            <Jumbotron className="row rounded-content card-background">
                {category &&
                <Card className={"rounded-content col-md-3"}
                      style={{backgroundColor: getColor(), height: 'fit-content', boxShadow: `5px 10px ${getColor()}`}}>
                    <Card.Body className="text-left">
                        <Card.Title className="title-font"> {category.name} <Badge pill variant={"light"}
                                                                                   className="pull-right">{courses && courses.length ? courses.length : 0}</Badge></Card.Title>
                        <p> {category.description}</p>
                        <Button variant="outline-dark" className="rounded-content pull-right"
                                onClick={() => setShowAddCourseModal(true)}>Add Course </Button>
                        <AddUpdateCourse loggedUser={props.loggedUser} showModal={showAddCourseModal}
                                         setShowModal={setShowAddCourseModal} category={category}/>
                    </Card.Body>
                </Card>}
                <div className="col-md-9">
                    <div className="row ml-2">
                        {courses && courses.length ? courses.map((course, index) =>
                            <div key={index} className="col-md-5 mb-4">
                                <CourseCard
                                    courseId={course.id}
                                    title={showSmallTitle(course.name)}
                                    description={showSmallDescription(course.description)}
                                    category={course.category}
                                    instructor={course.instructor}
                                    loggedUser={props.loggedUser}/>
                            </div>
                        ) : <p> No courses are added for this category yet </p>}
                    </div>
                </div>
            </Jumbotron>
        </>
    )
}