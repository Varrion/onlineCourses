import React, {useEffect, useState} from "react";
import axios from "../../axiosConfig/axiosConfig";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import UserLogo from "../../assets/images/anonym.png";
import CourseCard from "../../components/CourseCard";
import {showSmallDescription, showSmallTitle} from "../../components/TruncatedText";

export default function CustomerInfo(props) {

    const [user, setUser] = useState(null);
    const [ownedCourses, setOwnedCourses] = useState(null);

    useEffect(() => {
        axios.get(`user/${props.username}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))

        if (props.location.state.loggedUser) {
            axios.get(`user/${props.location.state.loggedUser.id}/owned-courses`)
                .then(res => {
                    setOwnedCourses(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [props.location.state.loggedUser, props.username])

    return (
        <div>
            {user && <div className="container">
                <h1 className={"title-font"}>User Details</h1>

                <Card className={"rounded-content"}>
                    <div className="row">
                        <div className="col-md-5">
                            <Card.Img src={user.picture ? "data:image/jpeg;base64," + user.picture : UserLogo}
                                      alt="user"
                                      width={380}
                                      height={500}
                                      style={{padding:'15px'}}
                                      className="rounded-content"/>
                        </div>

                        <div id="userDetails" className="height-inherit col-md-7 card-vertical-line flex-center-column">
                            <h4> {user.name + " " + user.surname}</h4>
                            {user.isInstructor && <p><Badge variant="info" >Instructor</Badge></p>}
                            <p>
                                <small><cite title="San Francisco, USA">Skopje, Macedonia <i
                                    className="fa fa-map-marker">
                                </i></cite></small>
                            </p>
                            <p><i className="fa fa-envelope-square"/> <a href={user.email}> {user.email} </a></p>
                            <p><i className="fas fa-user-tag"/> {user.username}</p>
                            <p><i className="far fa-calendar-alt"/> June 02, 1988</p>
                        </div>
                    </div>
                    {!user.isInstructor && <Card.Footer>
                        <Card.Title><h2 className="title-font">My Courses</h2></Card.Title>
                        <div className="row flex-nowrap horizontal-scrollable mb-5 height-inherit">
                            {ownedCourses && ownedCourses.length ? ownedCourses.map((course, index) =>
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
                                </div>) : <p>You dont have any courses yet.</p>}
                        </div>
                    </Card.Footer>}
                </Card>
            </div>}
        </div>)
}