import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "./../../axiosConfig/axiosConfig"
import {navigate} from "@reach/router";

export default function CustomerRegister() {


    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        isInstructor: false
    });

    const handleChange = name => event => {
        if (name !== "isInstructor") {
            setUser({...user, [name]: event.target.value});
        } else {
            setUser({...user, [name]: event.target.checked});
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post("user", user)
            .then(() => navigate("/"))
            .catch(err => console.log(err))
    };


    return (
        <div className="text-left mt-4 offset-2 col-lg-8">
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUserFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control value={user.firstName} onChange={handleChange("firstName")} type="text"
                                      placeholder="Enter your first name"/>
                    </Form.Group>

                    <Form.Group controlId="formUserLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control value={user.lastName} onChange={handleChange("lastName")} type="text"
                                      placeholder="Enter your last name"/>
                    </Form.Group>

                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={user.email} onChange={handleChange("email")} type="email"
                                      placeholder="Enter your email address"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

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

                    <Form.Group controlId="formCourseIsFree">
                        <Form.Check value={user.isInstructor} onChange={handleChange("isInstructor")} type="checkbox"
                                    label="Is Course Free"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    )
}
