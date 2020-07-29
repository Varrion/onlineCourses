import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../axiosConfig/axiosConfig";
import '../global.css';
import Dropzone from "react-dropzone";

function AddUpdateCourseVideo(props) {
    const [videoPreview, setVideoPreview] = useState(null);

    const initialCourseVideo = {
        title: '',
        video: null,
        length: '',
        course: {
            id: props.courseId
        },
    }

    const [courseVideo, setCourseVideo] = useState(null);

    const handleChange = name => event => {
        setCourseVideo({...courseVideo, [name]: event.target.value});
    };

    const handleDrop = files => {

        let file = files[0];
        setCourseVideo(file);
    }

    const handleClearDropzone = event => {
        event.stopPropagation();

        setCourseVideo(null)
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("video", courseVideo);
        console.log(formData);

        axios.post(`courses/${props.courseId}/videos`, formData)
            .then(() => {
                props.setShowModal(false);
            })
            .catch(err => console.log(err))
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
                    Course Video
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>

                    <div className="row">
                        <div className="col-md-6">
                            <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section className="custom_dropzone">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {courseVideo ?
                                                <div className="dropzone_text"><p>{courseVideo.path}</p>
                                                <Button className="roundedButton" variant="danger" size="sm" onClick={handleClearDropzone}>X</Button>
                                                </div> : <p>Drag & drop your video here </p>}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUpdateCourseVideo