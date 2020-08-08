import React from "react";
import {navigate} from "@reach/router";
import Card from "react-bootstrap/Card";
import CourseLogo from "../assets/images/d495250df1ecc82d22f994675e0248ed.jpg";

export default function CourseCard(props) {
    return (
        <>
            <Card style={{minHeight:'460px'}} className={"rounded-content"}
                  onClick={() => navigate(`/courses/${props.courseId}`, {state: {loggedUser: props.loggedUser}})}>
                <Card.Img src={CourseLogo} alt={"courses"} className="rounded-content"/>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-left">
                        <p>by {props.instructor ? props.instructor.name : "None"}</p></Card.Subtitle>
                    <Card.Text className={"text-left"}>
                        {props.description}
                    </Card.Text>
                    <hr width="200" align="center"/>
                    <Card.Subtitle
                        className="mb-2 text-muted text-left">category: {props.category ? props.category.name : "None"}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    )
}