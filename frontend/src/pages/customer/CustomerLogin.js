import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, navigate} from "@reach/router";
import {Jumbotron} from "react-bootstrap";
import axios from "../../axiosConfig/axiosConfig"

export default function CustomerLogin(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };


    const createBasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post("user/login", user)
            .then((res) => {
                props.setLoggedUser(res.data);
                sessionStorage.setItem("user", createBasicAuthToken(user.username, user.password))
                sessionStorage.setItem("instructor", res.data.isInstructor ?? false)
                navigate("/").then(() => window.location.reload());
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className="text-left mt-4 offset-2 col-lg-8">
            <Jumbotron className={"rounded-content"}>
                <h2 className="title-font mb-4">Login</h2>
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
                        <Button variant="outline-primary" type="submit" className={"rounded-content mb-3"}>
                            Login
                        </Button>
                        <p>Don't have an Account? <Link to={"/register"}> Register now </Link></p>
                    </div>
                </Form>
            </Jumbotron>
        </div>
    )
}
