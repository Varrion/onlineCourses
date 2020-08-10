import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "./../../axiosConfig/axiosConfig"
import Col from "react-bootstrap/Col";
import {navigate} from "@reach/router";

export default function CustomerRegister() {

    const initialUser = {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        isInstructor: false
    }

    const [user, setUser] = useState(initialUser);

    const [userPhoto, setUserPhoto] = useState(null);

    const handleChange = name => event => {
        if (name !== "isInstructor") {
            setUser({...user, [name]: event.target.value});
        } else {
            setUser({...user, [name]: event.target.checked});
        }
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setUserPhoto(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userPhoto", userPhoto);
        formData.append("userData", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));

        axios.post("user", formData)
            .then(() => {
                navigate("/login");
                setUserPhoto(null);
                setUser(initialUser);
            })
            .catch(err => console.log(err))
    };


    return (
        <div className="text-left mt-4 offset-2 col-lg-8">
            <Jumbotron className={"rounded-content"}>
                <h2 className="title-font mb-4">Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formUserFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={user.name} onChange={handleChange("name")} type="text"
                                          placeholder="Enter your first name"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUserLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={user.surname} onChange={handleChange("surname")} type="text"
                                          placeholder="Enter your last name"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={user.username} onChange={handleChange("username")} type="text"
                                      placeholder="Enter your username"/>
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={user.password} onChange={handleChange("password")} type="password"
                                      placeholder="We recommend using strong password for your safety"/>
                    </Form.Group>

                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={user.email} onChange={handleChange("email")} type="email"
                                      placeholder="Enter your email address"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formCourseIsFree">
                        <Form.Check value={user.isInstructor} onChange={handleChange("isInstructor")} type="checkbox"
                                    label="Instructor"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.File id="formCustomerPicture" onChange={handleDrop} label="Photo" />
                    </Form.Group>
                    <div className="row justify-content-center">
                        <Button className={"rounded-content"} variant="outline-primary" type="submit">
                            Register
                        </Button>
                    </div>
                </Form>
            </Jumbotron>
        </div>
    )
}
