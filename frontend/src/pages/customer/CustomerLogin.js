import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, navigate} from "@reach/router";
import {Jumbotron} from "react-bootstrap";

export default function CustomerLogin() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };


    const handleSubmit = event => {
        event.preventDefault();
        setLoggedIn(true);
    };

    return (
        <div className="text-left mt-4 offset-2 col-lg-8">
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={user.username} onChange={handleChange("username")} type="text"
                                      placeholder="Alex"/>
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={user.password} onChange={handleChange("password")} type="password"
                                      placeholder="UtEc56d2XY..."/>
                    </Form.Group>

                    <div className={"d-flex flex-column align-items-center"}>
                        <Button variant="primary" type="submit" className={"text-center justify-content-center"}>
                            Login
                        </Button>
                        <p>Don't have an Account? <Link to={"/register"}> Register now </Link></p>
                    </div>
                </Form>
            </Jumbotron>
        </div>
    )
}
