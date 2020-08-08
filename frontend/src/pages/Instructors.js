import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import SocialMediaIcons from "../components/SocialMediaIcons";
import axios from "../axiosConfig/axiosConfig";
import UserLogo from "../assets/images/anonym.png";
import Badge from "react-bootstrap/Badge";
import {Link} from "@reach/router";

export default function Instructors() {

    const [instructors, setInstructors] = useState(null);

    useEffect(() => {
        axios.get("user", {
            params: {
                isInstructor: true
            }
        })
            .then(res => setInstructors(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <h5 className="section-title h1">OUR TEAM</h5>
            <div id="instructors" className="row">
                {instructors && instructors.length && instructors.map((instructor, index) =>
                    <div key={index} className="col-xs-12 col-sm-6 col-md-4">
                        <div className="image-flip">
                            <div className="mainflip flip-0">
                                <div className="frontside">
                                    <Card style={{height: '400px'}}>
                                        <Card.Body className="flex-center-column text-center">
                                            <p className="pb-3">
                                                <img className=" img-fluid"
                                                     src={instructor.picture
                                                         ? ("data:image/png;base64," + instructor.picture)
                                                         : UserLogo}
                                                     alt="card image"/>
                                            </p>
                                            <Card.Subtitle><Badge variant="info">Instructor</Badge></Card.Subtitle>
                                            <Card.Title>{instructor.name + " " + instructor.surname}</Card.Title>
                                            <Card.Subtitle
                                                className="mb-2 text-muted">as {instructor.username}</Card.Subtitle>
                                            <Card.Text>You can get more informations about {instructor.name} by clicking on the next link</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className="backside">
                                    <Card>
                                        <Card.Body className="text-center">
                                            <Card.Title>Contact Info</Card.Title>
                                            <Card.Text>Email - <a
                                                href={"mailto: " + instructor.email}>{instructor.email}</a></Card.Text>
                                            <Card.Text>Get more <Link to={`user/${instructor.username}`}>details</Link>, or follow {instructor.name} on the social
                                                medias</Card.Text>
                                            <SocialMediaIcons/>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
        </>
    )
}