import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Jumbotron} from "react-bootstrap";
import axios from "../../../axiosConfig/axiosConfig"
import {navigate} from "@reach/router";

export default function AddCategory(props) {

    const [category, setCategory] = useState({
        name: '',
        description: ''
    });

    const handleChange = name => event => {
        setCategory({...category, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post("category", category)
            .then(res => navigate(`${res.data.id}`)
                .then(() => window.location.reload()))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Jumbotron>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCategoryName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={category.name} onChange={handleChange("name")} type="text"
                                      placeholder="Alex"/>
                    </Form.Group>

                    <Form.Group controlId="formCategoryDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={category.description} onChange={handleChange("description")}
                                      as="textarea"
                                      rows="4"
                                      placeholder="Course description"/>
                    </Form.Group>

                    <div className={"d-flex flex-column align-items-center"}>
                        <Button variant="primary" type="submit" className={"text-center justify-content-center"}>
                            Add
                        </Button>
                    </div>
                </Form>
            </Jumbotron>
        </>
    )

}