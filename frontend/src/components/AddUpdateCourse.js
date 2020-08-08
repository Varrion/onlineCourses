import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from './../axiosConfig/axiosConfig';

function AddUpdateCourse(props) {

    const [category, setCategory] = useState(null);

    const initialCourse = {
        name: '',
        description: '',
        price: 0,
        categoryId: props.category ? props.category.id : 0,
        isFree: false,
        instructorId: props.loggedUser ? props.loggedUser.id : 0
    }

    const [course, setCourse] = useState(props.course ? props.course : initialCourse);

    useEffect(() => {
        axios.get("category")
            .then(res => setCategory(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleChange = name => event => {
        if (name === "isFree") {
            setCourse({...course, [name]: event.target.checked});
        } else if (name === "category") {
            setCourse({...course, category: {id: event.target.value}});
        } else {
            setCourse({...course, [name]: event.target.value});
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (course.isFree) {
            course.price = 0
        }

        console.log(course);
        if (!props.course) {
            axios.post("courses", course)
                .then(() => {
                    props.setShowModal(false);
                    setCourse(initialCourse);
                })
                .catch(err => console.log(err))
        } else {
            axios.put("courses", course)
                .then(() => {
                    props.setShowModal(false);
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Modal
            size="lg"
            show={props.showModal}
            onHide={() => props.setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Add Update Course
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCourseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={course.name} onChange={handleChange("name")} type="text"
                                      placeholder="Course name"/>
                    </Form.Group>

                    <Form.Group controlId="formCourseDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={course.description} onChange={handleChange("description")} as="textarea"
                                      rows="4"
                                      placeholder="Course description"/>
                    </Form.Group>

                    {!props.category && <Form.Group controlId="formCourseCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={course.categoryId} onChange={handleChange("categoryId")}>
                            <option value={0}>Select Category</option>
                            {category != null && category.map((item, index) =>
                                <option value={item.id} key={index}>{item.name}</option>
                            )}

                        </Form.Control>
                    </Form.Group>}

                    <Form.Group controlId="formCourseIsFree">
                        <Form.Check value={course.isFree} onChange={handleChange("isFree")} type="checkbox"
                                    label="Is Course Free"/>
                    </Form.Group>

                    {
                        !course.isFree && <Form.Group controlId="formCoursePrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={course.price} onChange={handleChange("price")} type="number"
                                          placeholder="Course price"/>
                        </Form.Group>
                    }

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddUpdateCourse
