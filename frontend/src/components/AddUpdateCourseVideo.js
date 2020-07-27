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
        uploadedOn: Date.now(),
        length: '',
        course: {
            id: props.courseId
        },
    }

    const [courseVideo, setCourseVideo] = useState(initialCourseVideo);

    const handleChange = name => event => {
        setCourseVideo({...courseVideo, [name]: event.target.value});
    };

    const handleDrop = files => {
        setCourseVideo({...courseVideo, video: files[0]})

        let video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            let duration = video.duration;
            console.log('test', duration)
        }
        video.src = URL.createObjectURL(files[0]);;
        setVideoPreview(video);
        console.log(video);
    }

    const handleClearDropzone = event => {
        event.stopPropagation();

        setCourseVideo({...courseVideo, video: null})
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`courses/${props.courseId}/videos`, courseVideo)
            .then(() => {
                props.setShowModal(false);
                setCourseVideo(initialCourseVideo);
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
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCourseName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={courseVideo.title} onChange={handleChange("title")} type="text"
                                      placeholder="Video Title"/>
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6">
                            <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section className="custom_dropzone">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {courseVideo.video ?
                                                <div className="dropzone_text"><p>{courseVideo.video.path}</p>
                                                <Button className="roundedButton" variant="danger" size="sm" onClick={handleClearDropzone}>X</Button>
                                                </div> : <p>Drag & drop your video here </p>}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddUpdateCourseVideo